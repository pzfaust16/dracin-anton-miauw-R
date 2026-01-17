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
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type Visitor = {
  id: string
  ipAddress: string
  deviceType: string // "MOBILE" | "DESKTOP" | "TABLET" | "OTHER"
  country: string | null
  visitedAt: Date
}

export const columns: ColumnDef<Visitor>[] = [
  {
    accessorKey: "ipAddress",
    header: "IP Address",
  },
  {
    accessorKey: "deviceType",
    header: "Device",
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => row.getValue("country") || "Unknown",
  },
  {
    accessorKey: "visitedAt",
    header: "Time",
    cell: ({ row }) => format(new Date(row.getValue("visitedAt")), "PPpp"),
  },
]

interface VisitorTableProps {
  data: Visitor[]
}

export function VisitorTable({ data }: VisitorTableProps) {
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
        <CardTitle>Recent Visitors</CardTitle>
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
