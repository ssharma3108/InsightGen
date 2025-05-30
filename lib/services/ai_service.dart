import 'dart:convert';
import 'dart:math';
import 'package:http/http.dart' as http;
import '../models/business_metric.dart';

class AIService {
  static const String _baseUrl = 'https://api.openai.com/v1';
  static const String _apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual API key

  // Generate AI insights from business data
  Future<List<AIInsight>> generateInsights(List<BusinessMetric> metrics) async {
    try {
      // Prepare data context for AI
      final dataContext = _prepareDataContext(metrics);
      
      // Call OpenAI API for insights
      final insights = await _callOpenAI(dataContext);
      
      return insights;
    } catch (e) {
      print('Error generating AI insights: $e');
      // Return mock insights as fallback
      return _generateMockInsights();
    }
  }

  // Answer user questions about business data
  Future<String> answerQuestion(String question, List<BusinessMetric> metrics) async {
    try {
      final dataContext = _prepareDataContext(metrics);
      final prompt = '''
Based on the following business data:
$dataContext

User question: $question

Please provide a detailed, actionable answer based on the data provided.
''';

      final response = await _callOpenAIChat(prompt);
      return response;
    } catch (e) {
      print('Error answering question: $e');
      return _generateMockAnswer(question);
    }
  }

  // Generate predictive analytics
  Future<List<ChartData>> generatePredictions(List<ChartData> historicalData) async {
    try {
      // Simple linear regression for demo
      if (historicalData.length < 2) return [];

      final predictions = <ChartData>[];
      final lastValue = historicalData.last.value;
      final trend = _calculateTrend(historicalData);

      for (int i = 1; i <= 7; i++) {
        final predictedValue = lastValue + (trend * i);
        predictions.add(ChartData(
          label: 'Prediction ${i}',
          value: predictedValue,
          timestamp: DateTime.now().add(Duration(days: i)),
          metadata: {'confidence': max(0.5, 0.95 - (i * 0.05))},
        ));
      }

      return predictions;
    } catch (e) {
      print('Error generating predictions: $e');
      return [];
    }
  }

  // Detect anomalies in data
  Future<List<Map<String, dynamic>>> detectAnomalies(List<ChartData> data) async {
    final anomalies = <Map<String, dynamic>>[];
    
    if (data.length < 5) return anomalies;

    final mean = data.map((d) => d.value).reduce((a, b) => a + b) / data.length;
    final variance = data.map((d) => pow(d.value - mean, 2)).reduce((a, b) => a + b) / data.length;
    final stdDev = sqrt(variance);

    for (final point in data) {
      final zScore = (point.value - mean) / stdDev;
      if (zScore.abs() > 2.5) { // Anomaly threshold
        anomalies.add({
          'timestamp': point.timestamp,
          'value': point.value,
          'severity': zScore.abs() > 3 ? 'high' : 'medium',
          'description': 'Unusual ${zScore > 0 ? 'spike' : 'drop'} detected in ${point.label}',
          'confidence': min(0.99, 0.7 + (zScore.abs() - 2.5) * 0.1),
        });
      }
    }

    return anomalies;
  }

  // Private helper methods
  String _prepareDataContext(List<BusinessMetric> metrics) {
    final buffer = StringBuffer();
    buffer.writeln('Current Business Metrics:');
    
    for (final metric in metrics) {
      buffer.writeln('- ${metric.title}: ${metric.value}${metric.unit} (${metric.change > 0 ? '+' : ''}${metric.change.toStringAsFixed(1)}%)');
    }
    
    return buffer.toString();
  }

  Future<List<AIInsight>> _callOpenAI(String dataContext) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/chat/completions'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $_apiKey',
      },
      body: jsonEncode({
        'model': 'gpt-4',
        'messages': [
          {
            'role': 'system',
            'content': 'You are a business intelligence AI that generates actionable insights from business data. Provide insights in JSON format with title, description, type, priority, confidence, impact, and recommendations.',
          },
          {
            'role': 'user',
            'content': 'Analyze this business data and provide 3-5 key insights:\n$dataContext',
          },
        ],
        'max_tokens': 1000,
        'temperature': 0.7,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final content = data['choices'][0]['message']['content'];
      
      // Parse AI response and convert to AIInsight objects
      return _parseAIResponse(content);
    } else {
      throw Exception('Failed to call OpenAI API: ${response.statusCode}');
    }
  }

  Future<String> _callOpenAIChat(String prompt) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/chat/completions'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $_apiKey',
      },
      body: jsonEncode({
        'model': 'gpt-4',
        'messages': [
          {
            'role': 'system',
            'content': 'You are a business intelligence assistant. Provide clear, actionable answers based on the provided business data.',
          },
          {
            'role': 'user',
            'content': prompt,
          },
        ],
        'max_tokens': 500,
        'temperature': 0.7,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['choices'][0]['message']['content'];
    } else {
      throw Exception('Failed to call OpenAI API: ${response.statusCode}');
    }
  }

  List<AIInsight> _parseAIResponse(String content) {
    // For demo purposes, return mock insights
    // In production, parse the actual AI response
    return _generateMockInsights();
  }

  double _calculateTrend(List<ChartData> data) {
    if (data.length < 2) return 0;
    
    double sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    final n = data.length;
    
    for (int i = 0; i < n; i++) {
      sumX += i;
      sumY += data[i].value;
      sumXY += i * data[i].value;
      sumXX += i * i;
    }
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  }

  List<AIInsight> _generateMockInsights() {
    final now = DateTime.now();
    return [
      AIInsight(
        id: 'insight_1',
        title: 'Revenue Acceleration Detected',
        description: 'Revenue has increased by 15% this week, primarily driven by electronics sales in the southern region. Mobile accessories are leading the growth.',
        type: InsightType.revenue,
        priority: Priority.high,
        confidence: 94.5,
        impact: 'Revenue increase of \$12,500',
        isActionable: true,
        timestamp: now,
        recommendations: [
          'Increase electronics inventory by 20%',
          'Expand marketing in southern region',
          'Focus on mobile accessories promotion'
        ],
      ),
      AIInsight(
        id: 'insight_2',
        title: 'Customer Behavior Shift',
        description: 'Customer preferences are shifting from home goods to electronics. This trend is accelerating among millennials.',
        type: InsightType.customer,
        priority: Priority.medium,
        confidence: 87.2,
        impact: 'Inventory optimization needed',
        isActionable: true,
        timestamp: now.subtract(const Duration(hours: 2)),
        recommendations: [
          'Adjust product mix strategy',
          'Target millennial demographics',
          'Reduce home goods inventory'
        ],
      ),
      AIInsight(
        id: 'insight_3',
        title: 'Seasonal Decline Alert',
        description: 'Beauty product sales have declined by 8% compared to the previous period, indicating seasonal trends.',
        type: InsightType.risk,
        priority: Priority.medium,
        confidence: 76.8,
        impact: 'Revenue at risk: \$8,200',
        isActionable: false,
        timestamp: now.subtract(const Duration(hours: 4)),
        recommendations: [
          'Launch seasonal beauty campaigns',
          'Introduce winter product lines',
          'Partner with beauty influencers'
        ],
      ),
    ];
  }

  String _generateMockAnswer(String question) {
    final responses = {
      'revenue': 'Based on current trends, your revenue is projected to grow by 18% next quarter. The main drivers are increased customer acquisition in electronics and improved conversion rates.',
      'customers': 'Customer behavior analysis shows a 23% increase in repeat purchases. The southern region shows the highest customer lifetime value.',
      'inventory': 'Inventory optimization recommendations: Increase electronics stock by 25%, reduce beauty products by 15%. Predicted stockout risk for mobile accessories in 2 weeks.',
      'performance': 'Overall performance metrics show strong growth. Revenue per customer increased by 12%, and customer acquisition cost decreased by 8%.',
    };

    final lowerQuestion = question.toLowerCase();
    for (final key in responses.keys) {
      if (lowerQuestion.contains(key)) {
        return responses[key]!;
      }
    }

    return 'Based on your current data, I can see strong performance across key metrics. Your business is showing positive trends in revenue and customer engagement. Would you like me to dive deeper into any specific area?';
  }
}
