"use client"

import { useQuery } from "@tanstack/react-query"
import { VisitorTable, Visitor } from "./visitor-table"
import { getWebsiteVisitors } from "@/actions/dashboard-actions"

interface RealtimeVisitorTableProps {
  initialData: Visitor[]
}

export function RealtimeVisitorTable({ initialData }: RealtimeVisitorTableProps) {
  const { data: visitorData = [] } = useQuery({
    queryKey: ["website-visitors"],
    queryFn: async () => await getWebsiteVisitors(),
    refetchInterval: 5000,
    initialData
  })

  return <VisitorTable data={visitorData} />
}
