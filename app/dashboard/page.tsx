import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { InsightPanel } from "@/components/dashboard/insight-panel"
import { DashboardActions } from "@/components/dashboard/dashboard-actions"
import { RealTimeMetrics } from "@/components/dashboard/real-time-metrics"
import { PredictiveAnalytics } from "@/components/dashboard/predictive-analytics"

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <RealTimeMetrics />
        <DashboardCharts />
        <div className="grid gap-6 lg:grid-cols-2">
          <InsightPanel />
          <PredictiveAnalytics />
        </div>
        <DashboardActions />
      </div>
    </div>
  )
}
