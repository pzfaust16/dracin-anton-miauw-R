import { AppSidebar } from "@/components/admin/app-sidebar"
import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive"
import { SiteHeader } from "@/components/admin/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { RealtimeTable } from "../affiliate/realtime-table"
import { getAffiliateLinks } from "@/actions/affiliate-actions"
import { getWebsiteVisitors, getVisitorStats, getVisitorChartData } from "@/actions/dashboard-actions"
import { VisitorTable } from "@/components/admin/tables/visitor-table"
import { StatsTable } from "@/components/admin/tables/stats-table"

export default async function DashboardPage() {

  const affiliateData = await getAffiliateLinks()
  const visitorData = await getWebsiteVisitors()
  const statsData = await getVisitorStats()
  const chartData = await getVisitorChartData()

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-black">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive data={chartData} />
              </div>
              <div className="px-4 lg:px-6 grid gap-4 md:grid-cols-2">
                <VisitorTable data={visitorData} />
                <StatsTable data={statsData} />
              </div>
              <div className="px-4 lg:px-6">
                <RealtimeTable initialData={affiliateData} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
