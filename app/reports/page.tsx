import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales Report</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This report provides a detailed analysis of sales performance over the past week.
            </p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Last generated: May 29, 2025</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              A comprehensive overview of business performance metrics for the current month.
            </p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Last generated: May 28, 2025</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analysis of customer behavior, preferences, and purchasing patterns.
            </p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Last generated: May 25, 2025</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Current inventory levels, restocking needs, and product performance.
            </p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Last generated: May 27, 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
