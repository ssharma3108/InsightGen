import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 4000, target: 2400 },
  { month: "Feb", sales: 3000, target: 2500 },
  { month: "Mar", sales: 2000, target: 2600 },
  { month: "Apr", sales: 2780, target: 2700 },
  { month: "May", sales: 1890, target: 2800 },
  { month: "Jun", sales: 2390, target: 2900 },
  { month: "Jul", sales: 3490, target: 3000 },
]

const trafficData = [
  { name: "Week 1", mobile: 4000, desktop: 2400, tablet: 1800 },
  { name: "Week 2", mobile: 3000, desktop: 1398, tablet: 2000 },
  { name: "Week 3", mobile: 2000, desktop: 9800, tablet: 2200 },
  { name: "Week 4", mobile: 2780, desktop: 3908, tablet: 2500 },
]

export default function AnalyticsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <Chart>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <ChartTooltip>
                                <ChartTooltipContent>
                                  <div className="font-medium">{payload[0].payload.month}</div>
                                  <div className="text-sm text-muted-foreground">Sales: ${payload[0].value}</div>
                                  <div className="text-sm text-muted-foreground">Target: ${payload[1].value}</div>
                                </ChartTooltipContent>
                              </ChartTooltip>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="target" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </Chart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Traffic by Device</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer>
                <Chart>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="mobile" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="desktop" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="tablet" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Chart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
