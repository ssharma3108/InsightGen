import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/business_metric.dart';

class FirebaseService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Authentication
  Future<User?> signInAnonymously() async {
    try {
      final UserCredential result = await _auth.signInAnonymously();
      return result.user;
    } catch (e) {
      print('Error signing in anonymously: $e');
      return null;
    }
  }

  Future<User?> signInWithEmailAndPassword(String email, String password) async {
    try {
      final UserCredential result = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return result.user;
    } catch (e) {
      print('Error signing in: $e');
      return null;
    }
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }

  User? get currentUser => _auth.currentUser;

  // Real-time data streams
  Stream<List<BusinessMetric>> getMetricsStream() {
    return _firestore
        .collection('metrics')
        .orderBy('timestamp', descending: true)
        .limit(10)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => BusinessMetric.fromJson({
                  ...doc.data(),
                  'id': doc.id,
                }))
            .toList());
  }

  Stream<List<ChartData>> getChartDataStream(String chartType) {
    return _firestore
        .collection('chartData')
        .where('type', isEqualTo: chartType)
        .orderBy('timestamp', descending: false)
        .limit(20)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => ChartData.fromJson(doc.data()))
            .toList());
  }

  Stream<List<AIInsight>> getInsightsStream() {
    return _firestore
        .collection('insights')
        .orderBy('timestamp', descending: true)
        .limit(20)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => AIInsight.fromJson({
                  ...doc.data(),
                  'id': doc.id,
                }))
            .toList());
  }

  // Data writing
  Future<void> addMetric(BusinessMetric metric) async {
    await _firestore.collection('metrics').add(metric.toJson());
  }

  Future<void> addChartData(String type, ChartData data) async {
    await _firestore.collection('chartData').add({
      'type': type,
      ...data.toJson(),
    });
  }

  Future<void> addInsight(AIInsight insight) async {
    await _firestore.collection('insights').add(insight.toJson());
  }

  // Batch operations for real-time simulation
  Future<void> generateMockData() async {
    final batch = _firestore.batch();
    final now = DateTime.now();

    // Generate metrics
    final metrics = [
      BusinessMetric(
        id: 'revenue',
        title: 'Total Revenue',
        value: 45231.89 + (DateTime.now().millisecond % 1000),
        change: 20.1 + (DateTime.now().millisecond % 10 - 5),
        unit: '\$',
        trend: MetricTrend.up,
        timestamp: now,
        confidence: 94.5,
      ),
      BusinessMetric(
        id: 'users',
        title: 'Active Users',
        value: 2350 + (DateTime.now().millisecond % 100),
        change: 15.3 + (DateTime.now().millisecond % 8 - 4),
        unit: '',
        trend: MetricTrend.up,
        timestamp: now,
        confidence: 87.2,
      ),
      BusinessMetric(
        id: 'orders',
        title: 'Orders',
        value: 1234 + (DateTime.now().millisecond % 50),
        change: -5.2 + (DateTime.now().millisecond % 6 - 3),
        unit: '',
        trend: MetricTrend.down,
        timestamp: now,
        confidence: 91.8,
      ),
      BusinessMetric(
        id: 'conversion',
        title: 'Conversion Rate',
        value: 3.24 + (DateTime.now().millisecond % 100) / 1000,
        change: 8.7 + (DateTime.now().millisecond % 4 - 2),
        unit: '%',
        trend: MetricTrend.up,
        timestamp: now,
        confidence: 89.3,
      ),
    ];

    for (final metric in metrics) {
      final docRef = _firestore.collection('metrics').doc();
      batch.set(docRef, metric.toJson());
    }

    await batch.commit();
  }
}
