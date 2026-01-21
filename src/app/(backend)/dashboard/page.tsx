import { AppSidebar } from "@/components/admin/app-sidebar"
import { RealtimeChart } from "@/components/admin/realtime-chart"
import { SiteHeader } from "@/components/admin/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { RealtimeTable } from "../affiliate/realtime-table"
import { getAffiliateLinks } from "@/actions/affiliate-actions"
import { getWebsiteVisitors, getVisitorStats, getVisitorChartData } from "@/actions/dashboard-actions"
import { RealtimeVisitorTable } from "@/components/admin/tables/realtime-visitor-table"
import { RealtimeStatsTable } from "@/components/admin/tables/realtime-stats-table"

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
                <RealtimeChart initialData={chartData} />
              </div>
              <div className="px-4 lg:px-6 grid gap-4 md:grid-cols-2">
                <RealtimeVisitorTable initialData={visitorData} />
                <RealtimeStatsTable initialData={statsData} />
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
