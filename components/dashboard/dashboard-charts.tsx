"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download, Maximize2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function DashboardCharts() {
  const [revenueData, setRevenueData] = useState([
    { name: "Week 1", revenue: 4000, target: 3800 },
    { name: "Week 2", revenue: 4600, target: 4200 },
    { name: "Week 3", revenue: 3800, target: 4000 },
    { name: "Week 4", revenue: 5000, target: 4500 },
  ])

  const [categoryData, setCategoryData] = useState([
    { name: "Electronics", value: 400, growth: 12.5 },
    { name: "Clothing", value: 300, growth: -2.1 },
    { name: "Home", value: 200, growth: 8.3 },
    { name: "Beauty", value: 100, growth: -5.7 },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateChartData()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const updateChartData = () => {
    setRevenueData((prev) =>
      prev.map((item) => ({
        ...item,
        revenue: Math.max(1000, item.revenue + (Math.random() - 0.5) * 500),
        target: item.target + (Math.random() - 0.5) * 200,
      })),
    )

    setCategoryData((prev) =>
      prev.map((item) => ({
        ...item,
        value: Math.max(50, item.value + (Math.random() - 0.5) * 50),
        growth: item.growth + (Math.random() - 0.5) * 2,
      })),
    )

    setLastUpdated(new Date())
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateChartData()
    setIsRefreshing(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Revenue vs Target</CardTitle>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Live
            </Badge>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="font-medium">{payload[0].payload.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  Revenue: ${payload[0].value?.toLocaleString()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Target: ${payload[1].value?.toLocaleString()}
                                </div>
                                <div className="text-sm text-green-600">
                                  Performance:{" "}
                                  {((((payload[0].value as number) / payload[1].value) as number) * 100).toFixed(1)}%
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="#82ca9d" radius={[4, 4, 0, 0]} opacity={0.7} />
                  </BarChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Category Performance</CardTitle>
            <p className="text-sm text-muted-foreground">Orders by category with growth indicators</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Interactive
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent, growth }) =>
                        `${name} ${(percent * 100).toFixed(0)}% (${growth > 0 ? "+" : ""}${growth.toFixed(1)}%)`
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={entry.growth > 0 ? "#10b981" : "#ef4444"}
                          strokeWidth={entry.growth > 0 ? 2 : 1}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <ChartTooltip>
                              <ChartTooltipContent>
                                <div className="font-medium">{data.name}</div>
                                <div className="text-sm text-muted-foreground">Orders: {data.value}</div>
                                <div className={`text-sm ${data.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                                  Growth: {data.growth > 0 ? "+" : ""}
                                  {data.growth.toFixed(1)}%
                                </div>
                              </ChartTooltipContent>
                            </ChartTooltip>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
