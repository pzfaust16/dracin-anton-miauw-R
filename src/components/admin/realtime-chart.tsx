"use client"

import { useQuery } from "@tanstack/react-query"
import { ChartAreaInteractive } from "./chart-area-interactive"
import { getVisitorChartData } from "@/actions/dashboard-actions"

interface RealtimeChartProps {
  initialData: any[]
}

export function RealtimeChart({ initialData }: RealtimeChartProps) {
  const { data: chartData = [] } = useQuery({
    queryKey: ["visitor-chart-data"],
    queryFn: async () => await getVisitorChartData(),
    refetchInterval: 5000,
    initialData
  })

  return <ChartAreaInteractive data={chartData} />
}
