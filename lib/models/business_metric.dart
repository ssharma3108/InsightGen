class BusinessMetric {
  final String id;
  final String title;
  final double value;
  final double change;
  final String unit;
  final MetricTrend trend;
  final DateTime timestamp;
  final double confidence;

  BusinessMetric({
    required this.id,
    required this.title,
    required this.value,
    required this.change,
    required this.unit,
    required this.trend,
    required this.timestamp,
    this.confidence = 0.0,
  });

  factory BusinessMetric.fromJson(Map<String, dynamic> json) {
    return BusinessMetric(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      value: (json['value'] ?? 0).toDouble(),
      change: (json['change'] ?? 0).toDouble(),
      unit: json['unit'] ?? '',
      trend: MetricTrend.values.firstWhere(
        (e) => e.toString().split('.').last == json['trend'],
        orElse: () => MetricTrend.neutral,
      ),
      timestamp: DateTime.parse(json['timestamp'] ?? DateTime.now().toIso8601String()),
      confidence: (json['confidence'] ?? 0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'value': value,
      'change': change,
      'unit': unit,
      'trend': trend.toString().split('.').last,
      'timestamp': timestamp.toIso8601String(),
      'confidence': confidence,
    };
  }
}

enum MetricTrend { up, down, neutral }

class ChartData {
  final String label;
  final double value;
  final DateTime timestamp;
  final Map<String, dynamic>? metadata;

  ChartData({
    required this.label,
    required this.value,
    required this.timestamp,
    this.metadata,
  });

  factory ChartData.fromJson(Map<String, dynamic> json) {
    return ChartData(
      label: json['label'] ?? '',
      value: (json['value'] ?? 0).toDouble(),
      timestamp: DateTime.parse(json['timestamp'] ?? DateTime.now().toIso8601String()),
      metadata: json['metadata'],
    );
  }
}

class AIInsight {
  final String id;
  final String title;
  final String description;
  final InsightType type;
  final Priority priority;
  final double confidence;
  final String impact;
  final bool isActionable;
  final DateTime timestamp;
  final List<String> recommendations;

  AIInsight({
    required this.id,
    required this.title,
    required this.description,
    required this.type,
    required this.priority,
    required this.confidence,
    required this.impact,
    required this.isActionable,
    required this.timestamp,
    this.recommendations = const [],
  });

  factory AIInsight.fromJson(Map<String, dynamic> json) {
    return AIInsight(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      type: InsightType.values.firstWhere(
        (e) => e.toString().split('.').last == json['type'],
        orElse: () => InsightType.general,
      ),
      priority: Priority.values.firstWhere(
        (e) => e.toString().split('.').last == json['priority'],
        orElse: () => Priority.medium,
      ),
      confidence: (json['confidence'] ?? 0).toDouble(),
      impact: json['impact'] ?? '',
      isActionable: json['isActionable'] ?? false,
      timestamp: DateTime.parse(json['timestamp'] ?? DateTime.now().toIso8601String()),
      recommendations: List<String>.from(json['recommendations'] ?? []),
    );
  }
}

enum InsightType { revenue, customer, risk, performance, general }
enum Priority { high, medium, low }
