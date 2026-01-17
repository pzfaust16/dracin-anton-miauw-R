"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type VisitorStat = {
  id: string
  period: string // "DAILY" | "WEEKLY" | "MONTHLY"
  periodValue: string
  totalVisitors: number
  mobileCount: number
  desktopCount: number
}

export const columns: ColumnDef<VisitorStat>[] = [
  {
    accessorKey: "period",
    header: "Period Type",
  },
  {
    accessorKey: "periodValue",
    header: "Period",
  },
  {
    accessorKey: "totalVisitors",
    header: "Total Visitors",
  },
  {
    accessorKey: "mobileCount",
    header: "Mobile",
  },
  {
    accessorKey: "desktopCount",
    header: "Desktop",
  },
]

interface StatsTableProps {
  data: VisitorStat[]
}

export function StatsTable({ data }: StatsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
     initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <Card className="bg-neutral-800 border-neutral-700">
      <CardHeader>
        <CardTitle>Visitor Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-neutral-700">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-neutral-700 hover:bg-neutral-800">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-neutral-700 hover:bg-neutral-700/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
