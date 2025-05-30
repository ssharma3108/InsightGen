"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, AlertTriangle } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const predictionData = [
  { period: "Week 1", actual: 4000, predicted: 4100, confidence: 95 },
  { period: "Week 2", actual: 4600, predicted: 4550, confidence: 92 },
  { period: "Week 3", actual: 3800, predicted: 3900, confidence: 88 },
  { period: "Week 4", actual: 5000, predicted: 4950, confidence: 90 },
  { period: "Week 5", actual: null, predicted: 5200, confidence: 85 },
  { period: "Week 6", actual: null, predicted: 5400, confidence: 82 },
  { period: "Week 7", actual: null, predicted: 5100, confidence: 78 },
]

const predictions = [
  {
    title: "Revenue Forecast",
    description: "Expected 12% growth in next quarter based on current trends",
    confidence: 87,
    impact: "high",
    icon: Target,
  },
  {
    title: "Inventory Alert",
    description: "Electronics category may face stockout in 2 weeks",
    confidence: 94,
    impact: "medium",
    icon: AlertTriangle,
  },
  {
    title: "Customer Churn Risk",
    description: "15% of premium customers show churn indicators",
    confidence: 76,
    impact: "high",
    icon: Brain,
  },
]

export function PredictiveAnalytics() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Predictive Analytics
          </CardTitle>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            AI-Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[200px]">
          <ChartContainer>
            <Chart>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <ChartTooltip>
                            <ChartTooltipContent>
                              <div className="font-medium">{data.period}</div>
                              {data.actual && (
                                <div className="text-sm text-muted-foreground">Actual: ${data.actual}</div>
                              )}
                              <div className="text-sm text-muted-foreground">Predicted: ${data.predicted}</div>
                              <div className="text-sm text-muted-foreground">Confidence: {data.confidence}%</div>
                            </ChartTooltipContent>
                          </ChartTooltip>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Chart>
          </ChartContainer>
        </div>
        <div className="space-y-3">
          {predictions.map((prediction, index) => {
            const Icon = prediction.icon
            return (
              <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                <Icon className="h-4 w-4 text-purple-500 mt-1" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{prediction.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{prediction.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant={prediction.impact === "high" ? "default" : "secondary"} className="text-xs">
                    {prediction.confidence}% confidence
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
