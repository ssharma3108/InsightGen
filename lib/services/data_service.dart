import 'dart:async';
import 'dart:math';
import '../models/business_metric.dart';
import 'firebase_service.dart';

class DataService {
  final FirebaseService _firebaseService = FirebaseService();
  Timer? _dataGenerationTimer;

  // Start real-time data simulation
  void startRealTimeDataGeneration() {
    _dataGenerationTimer = Timer.periodic(const Duration(seconds: 10), (timer) {
      _generateAndSendMockData();
    });
  }

  void stopRealTimeDataGeneration() {
    _dataGenerationTimer?.cancel();
  }

  // Generate and send mock data to Firebase
  Future<void> _generateAndSendMockData() async {
    try {
      await _firebaseService.generateMockData();
      
      // Generate chart data
      await _generateChartData();
      
      print('Real-time data generated and sent to Firebase');
    } catch (e) {
      print('Error generating real-time data: $e');
    }
  }

  Future<void> _generateChartData() async {
    final now = DateTime.now();
    final random = Random();

    // Revenue chart data
    for (int i = 0; i < 7; i++) {
      final data = ChartData(
        label: 'Day ${i + 1}',
        value: 3000 + random.nextDouble() * 2000,
        timestamp: now.subtract(Duration(days: 6 - i)),
        metadata: {
          'target': 4000 + random.nextDouble() * 1000,
          'category': 'revenue',
        },
      );
      
      await _firebaseService.addChartData('revenue', data);
    }

    // Category performance data
    final categories = ['Electronics', 'Clothing', 'Home', 'Beauty'];
    for (final category in categories) {
      final data = ChartData(
        label: category,
        value: 100 + random.nextDouble() * 300,
        timestamp: now,
        metadata: {
          'growth': (random.nextDouble() - 0.5) * 20,
          'category': 'performance',
        },
      );
      
      await _firebaseService.addChartData('categories', data);
    }
  }

  // Export data functionality
  Future<Map<String, dynamic>> exportData(String format) async {
    // In a real app, this would generate actual export files
    return {
      'format': format,
      'timestamp': DateTime.now().toIso8601String(),
      'status': 'success',
      'downloadUrl': 'https://example.com/export/${DateTime.now().millisecondsSinceEpoch}.$format',
    };
  }

  // Data filtering and aggregation
  List<ChartData> filterDataByDateRange(List<ChartData> data, DateTime start, DateTime end) {
    return data.where((item) => 
      item.timestamp.isAfter(start) && item.timestamp.isBefore(end)
    ).toList();
  }

  Map<String, double> aggregateDataByCategory(List<ChartData> data) {
    final aggregated = <String, double>{};
    
    for (final item in data) {
      final category = item.metadata?['category'] ?? 'Unknown';
      aggregated[category] = (aggregated[category] ?? 0) + item.value;
    }
    
    return aggregated;
  }

  // Performance analytics
  double calculateGrowthRate(List<ChartData> data) {
    if (data.length < 2) return 0;
    
    data.sort((a, b) => a.timestamp.compareTo(b.timestamp));
    final first = data.first.value;
    final last = data.last.value;
    
    return ((last - first) / first) * 100;
  }

  List<ChartData> calculateMovingAverage(List<ChartData> data, int period) {
    if (data.length < period) return data;
    
    final result = <ChartData>[];
    
    for (int i = period - 1; i < data.length; i++) {
      double sum = 0;
      for (int j = i - period + 1; j <= i; j++) {
        sum += data[j].value;
      }
      
      result.add(ChartData(
        label: '${data[i].label} (MA)',
        value: sum / period,
        timestamp: data[i].timestamp,
        metadata: {'type': 'moving_average', 'period': period},
      ));
    }
    
    return result;
  }
}
