"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity } from "lucide-react"
import { useEffect, useState } from "react"

interface Metric {
  id: string
  title: string
  value: string
  change: number
  icon: React.ComponentType<{ className?: string }>
  trend: "up" | "down" | "neutral"
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: "revenue",
      title: "Total Revenue",
      value: "$45,231.89",
      change: 20.1,
      icon: DollarSign,
      trend: "up",
    },
    {
      id: "users",
      title: "Active Users",
      value: "2,350",
      change: 15.3,
      icon: Users,
      trend: "up",
    },
    {
      id: "orders",
      title: "Orders",
      value: "1,234",
      change: -5.2,
      icon: ShoppingCart,
      trend: "down",
    },
    {
      id: "conversion",
      title: "Conversion Rate",
      value: "3.24%",
      change: 8.7,
      icon: Activity,
      trend: "up",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          change: metric.change + (Math.random() - 0.5) * 2,
          value: updateValue(metric.id, metric.value),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const updateValue = (id: string, currentValue: string): string => {
    const change = (Math.random() - 0.5) * 0.1
    switch (id) {
      case "revenue":
        const revenue = Number.parseFloat(currentValue.replace(/[$,]/g, ""))
        return `$${(revenue * (1 + change)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "users":
        const users = Number.parseInt(currentValue.replace(/,/g, ""))
        return Math.floor(users * (1 + change)).toLocaleString()
      case "orders":
        const orders = Number.parseInt(currentValue.replace(/,/g, ""))
        return Math.floor(orders * (1 + change)).toLocaleString()
      case "conversion":
        const conversion = Number.parseFloat(currentValue.replace("%", ""))
        return `${(conversion * (1 + change)).toFixed(2)}%`
      default:
        return currentValue
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.id} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
                <span>from last hour</span>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary/50 to-primary animate-pulse" />
          </Card>
        )
      })}
    </div>
  )
}
