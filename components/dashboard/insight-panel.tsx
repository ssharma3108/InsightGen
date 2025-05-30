"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, Brain, Target, Zap, Star } from "lucide-react"
import { useState } from "react"

const insights = [
  {
    id: 1,
    title: "Revenue Acceleration",
    description:
      "Revenue surged 15% in Week 2 due to a spike in electronics sales in the southern region. Mobile accessories led the category with 23% growth.",
    trend: "up",
    importance: "high",
    confidence: 94,
    impact: "Revenue increase of $12,500",
    actionable: true,
    category: "revenue",
  },
  {
    id: 2,
    title: "Customer Behavior Shift",
    description:
      "Customer preferences are shifting from Home goods to Electronics, with a 12% increase in the latter category. This trend is accelerating among millennials.",
    trend: "neutral",
    importance: "medium",
    confidence: 87,
    impact: "Inventory optimization needed",
    actionable: true,
    category: "customer",
  },
  {
    id: 3,
    title: "Seasonal Decline Alert",
    description:
      "Beauty product sales have declined by 8% compared to the previous period, potentially indicating seasonal trends or market saturation.",
    trend: "down",
    importance: "medium",
    confidence: 76,
    impact: "Revenue at risk: $8,200",
    actionable: false,
    category: "risk",
  },
]

const recommendations = [
  {
    title: "Optimize Product Mix",
    description: "Increase electronics inventory by 20% and reduce beauty products by 10% based on demand trends.",
    priority: "high",
    effort: "medium",
    impact: "high",
    timeline: "2 weeks",
  },
  {
    title: "Regional Marketing Focus",
    description:
      "Amplify marketing efforts in the southern region where electronics sales are performing exceptionally well.",
    priority: "medium",
    effort: "low",
    impact: "medium",
    timeline: "1 week",
  },
  {
    title: "Customer Retention Campaign",
    description: "Launch targeted campaigns for beauty product customers to prevent further churn.",
    priority: "high",
    effort: "high",
    impact: "medium",
    timeline: "3 weeks",
  },
]

const anomalies = [
  {
    title: "Unusual Order Spike",
    description: "Electronics orders increased 300% on Tuesday between 2-4 PM, significantly above normal patterns.",
    severity: "medium",
    confidence: 92,
    detected: "2 hours ago",
  },
  {
    title: "Payment Failure Increase",
    description: "Payment failures increased by 45% in the last 24 hours, primarily affecting mobile payments.",
    severity: "high",
    confidence: 98,
    detected: "30 minutes ago",
  },
]

export function InsightPanel() {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateNewInsights = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-yellow-500" />
            AI Intelligence Hub
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <Zap className="h-3 w-3 mr-1" />
              Auto-generated
            </Badge>
            <Button variant="outline" size="sm" onClick={generateNewInsights} disabled={isGenerating}>
              {isGenerating ? "Analyzing..." : "Refresh Insights"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Key Insights
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="anomalies" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Anomalies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4 pt-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`rounded-lg border p-4 cursor-pointer transition-all ${
                  selectedInsight === insight.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
              >
                <div className="flex items-start gap-3">
                  {insight.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
                  ) : insight.trend === "down" ? (
                    <TrendingDown className="h-5 w-5 text-red-500 mt-1" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{insight.title}</h3>
                      <div className="flex items-center gap-2">
                        {insight.actionable && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Actionable
                          </Badge>
                        )}
                        <Badge
                          variant={
                            insight.importance === "high"
                              ? "default"
                              : insight.importance === "medium"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {insight.importance}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>

                    {selectedInsight === insight.id && (
                      <div className="mt-4 space-y-3 border-t pt-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Confidence:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={insight.confidence} className="flex-1" />
                              <span className="text-xs">{insight.confidence}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Impact:</span>
                            <p className="text-muted-foreground mt-1">{insight.impact}</p>
                          </div>
                        </div>
                        {insight.actionable && (
                          <Button size="sm" className="w-full">
                            View Action Plan
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4 pt-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{rec.title}</h3>
                  <Badge variant={rec.priority === "high" ? "default" : "secondary"}>{rec.priority} priority</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-medium">Effort:</span>
                    <p className="text-muted-foreground">{rec.effort}</p>
                  </div>
                  <div>
                    <span className="font-medium">Impact:</span>
                    <p className="text-muted-foreground">{rec.impact}</p>
                  </div>
                  <div>
                    <span className="font-medium">Timeline:</span>
                    <p className="text-muted-foreground">{rec.timeline}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Implement Recommendation
                </Button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-4 pt-4">
            {anomalies.map((anomaly, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{anomaly.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={anomaly.severity === "high" ? "destructive" : "secondary"}>
                      {anomaly.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{anomaly.detected}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{anomaly.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">Confidence:</span>
                    <Progress value={anomaly.confidence} className="w-20" />
                    <span className="text-xs">{anomaly.confidence}%</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Investigate
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
