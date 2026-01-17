"use client"

import { useQuery } from "@tanstack/react-query"
import { DataTable, schema } from "@/components/admin/data-table"
import { getAffiliateLinks } from "@/actions/affiliate-actions"
import { z } from "zod"

interface RealtimeTableProps {
  initialData: any[] // Replace 'any' with proper type if available, e.g. AffiliateLink[]
}

export function RealtimeTable({ initialData }: RealtimeTableProps) {
  const { data: affiliateLinks = [] } = useQuery({
    queryKey: ["affiliate-links"],
    queryFn: async () => await getAffiliateLinks(),
    refetchInterval: 5000,
    initialData
  })

  // Map database data to table schema
  const tableData: z.infer<typeof schema>[] = affiliateLinks.map((link: any) => ({
    id: link.id,
    header: link.provider || "Unknown Provider",
    type: link.link,
    status: "Active", // Placeholder
    target: "N/A", // Placeholder
    limit: link.clickCount.toString(),
    reviewer: "System", // Placeholder
  }))

  return <DataTable data={tableData} />
}
