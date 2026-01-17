import { AppSidebar } from "@/components/admin/app-sidebar"
import { SiteHeader } from "@/components/admin/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

// import data from "./data.json"
import { DialogAddAff } from "@/components/admin/form/formAff"
import { RealtimeTable } from "./realtime-table"

import { getAffiliateLinks } from "@/actions/affiliate-actions"

export default async function AffiliatePage() {
  const initialData = await getAffiliateLinks()

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-black">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
              <DialogAddAff />
              <RealtimeTable initialData={initialData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
