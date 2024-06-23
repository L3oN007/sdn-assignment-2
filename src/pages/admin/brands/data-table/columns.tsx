"use client"

import { ColumnDef } from "@tanstack/react-table"

import { BrandType } from "@/schemas/brand.schema"

import DataTableRowActions from "@/pages/admin/brands/data-table/data-table-row-actions"

export const columns: ColumnDef<BrandType>[] = [
  {
    accessorKey: "brandName",
    header: "Username",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    },
  },
]
