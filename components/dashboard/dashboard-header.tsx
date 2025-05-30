"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function DashboardHeader() {
  const [timeRange, setTimeRange] = useState("7d")
  const [dataset, setDataset] = useState("ecommerce")

  return (
    <div className="border-b bg-background">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-2xl font-bold">Business Dashboard</h1>
          <p className="text-muted-foreground">AI-powered insights for your business</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dataset} onValueChange={setDataset}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select dataset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="energy">Energy</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Refresh Data</Button>
        </div>
      </div>
    </div>
  )
}
