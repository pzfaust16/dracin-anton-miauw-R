"use client"

import { useQuery } from "@tanstack/react-query"
import { StatsTable, VisitorStat } from "./stats-table"
import { getVisitorStats } from "@/actions/dashboard-actions"

interface RealtimeStatsTableProps {
  initialData: VisitorStat[]
}

export function RealtimeStatsTable({ initialData }: RealtimeStatsTableProps) {
  const { data: statsData = [] } = useQuery({
    queryKey: ["visitor-stats"],
    queryFn: async () => await getVisitorStats(),
    refetchInterval: 5000,
    initialData
  })

  return <StatsTable data={statsData} />
}
