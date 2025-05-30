import 'package:flutter/foundation.dart';
import '../models/business_metric.dart';
import '../services/firebase_service.dart';
import '../services/ai_service.dart';
import '../services/data_service.dart';

class DashboardProvider with ChangeNotifier {
  final FirebaseService _firebaseService = FirebaseService();
  final AIService _aiService = AIService();
  final DataService _dataService = DataService();

  List<BusinessMetric> _metrics = [];
  List<ChartData> _revenueData = [];
  List<ChartData> _categoryData = [];
  List<AIInsight> _insights = [];
  List<Map<String, dynamic>> _anomalies = [];
  List<ChartData> _predictions = [];
  
  bool _isLoading = false;
  String _error = '';
  DateTime _lastUpdated = DateTime.now();

  // Getters
  List<BusinessMetric> get metrics => _metrics;
  List<ChartData> get revenueData => _revenueData;
  List<ChartData> get categoryData => _categoryData;
  List<AIInsight> get insights => _insights;
  List<Map<String, dynamic>> get anomalies => _anomalies;
  List<ChartData> get predictions => _predictions;
  bool get isLoading => _isLoading;
  String get error => _error;
  DateTime get lastUpdated => _lastUpdated;

  // Initialize dashboard data
  Future<void> initialize() async {
    _setLoading(true);
    
    try {
      // Start real-time data generation
      _dataService.startRealTimeDataGeneration();
      
      // Set up real-time listeners
      _setupRealTimeListeners();
      
      // Generate initial AI insights
      await _generateInsights();
      
      _setError('');
    } catch (e) {
      _setError('Failed to initialize dashboard: $e');
    } finally {
      _setLoading(false);
    }
  }

  void _setupRealTimeListeners() {
    // Listen to metrics changes
    _firebaseService.getMetricsStream().listen(
      (metrics) {
        _metrics = metrics;
        _lastUpdated = DateTime.now();
        notifyListeners();
        
        // Generate insights when metrics update
        _generateInsights();
      },
      onError: (error) {
        _setError('Error loading metrics: $error');
      },
    );

    // Listen to revenue chart data
    _firebaseService.getChartDataStream('revenue').listen(
      (data) {
        _revenueData = data;
        notifyListeners();
        
        // Generate predictions and detect anomalies
        _generatePredictions();
        _detectAnomalies();
      },
      onError: (error) {
        _setError('Error loading revenue data: $error');
      },
    );

    // Listen to category data
    _firebaseService.getChartDataStream('categories').listen(
      (data) {
        _categoryData = data;
        notifyListeners();
      },
      onError: (error) {
        _setError('Error loading category data: $error');
      },
    );

    // Listen to AI insights
    _firebaseService.getInsightsStream().listen(
      (insights) {
        _insights = insights;
        notifyListeners();
      },
      onError: (error) {
        _setError('Error loading insights: $error');
      },
    );
  }

  // AI-powered features
  Future<void> _generateInsights() async {
    if (_metrics.isEmpty) return;
    
    try {
      final newInsights = await _aiService.generateInsights(_metrics);
      
      // Add insights to Firebase
      for (final insight in newInsights) {
        await _firebaseService.addInsight(insight);
      }
    } catch (e) {
      print('Error generating insights: $e');
    }
  }

  Future<String> askQuestion(String question) async {
    try {
      return await _aiService.answerQuestion(question, _metrics);
    } catch (e) {
      return 'Sorry, I encountered an error while processing your question. Please try again.';
    }
  }

  Future<void> _generatePredictions() async {
    if (_revenueData.isEmpty) return;
    
    try {
      _predictions = await _aiService.generatePredictions(_revenueData);
      notifyListeners();
    } catch (e) {
      print('Error generating predictions: $e');
    }
  }

  Future<void> _detectAnomalies() async {
    if (_revenueData.isEmpty) return;
    
    try {
      _anomalies = await _aiService.detectAnomalies(_revenueData);
      notifyListeners();
    } catch (e) {
      print('Error detecting anomalies: $e');
    }
  }

  // Data export
  Future<Map<String, dynamic>> exportData(String format) async {
    try {
      return await _dataService.exportData(format);
    } catch (e) {
      throw Exception('Failed to export data: $e');
    }
  }

  // Refresh data
  Future<void> refreshData() async {
    _setLoading(true);
    
    try {
      await _firebaseService.generateMockData();
      await _generateInsights();
      _lastUpdated = DateTime.now();
      _setError('');
    } catch (e) {
      _setError('Failed to refresh data: $e');
    } finally {
      _setLoading(false);
    }
  }

  // Filter data by date range
  void filterDataByDateRange(DateTime start, DateTime end) {
    _revenueData = _dataService.filterDataByDateRange(_revenueData, start, end);
    _categoryData = _dataService.filterDataByDateRange(_categoryData, start, end);
    notifyListeners();
  }

  // Helper methods
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String error) {
    _error = error;
    notifyListeners();
  }

  @override
  void dispose() {
    _dataService.stopRealTimeDataGeneration();
    super.dispose();
  }
}
