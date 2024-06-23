"use client"

import { ColumnDef } from "@tanstack/react-table"

import { WatchType } from "@/schemas/watch.schema"

import DataTableRowActions from "@/pages/admin/watches/data-table/data-table-row-actions"

export const columns: ColumnDef<WatchType>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.image}
          alt="watch-image"
          className="size-40 aspect-square rounded-md object-cover"
        />
      )
    },
  },
  {
    accessorKey: "brand.brandName",
    header: "Brand",
  },
  {
    accessorKey: "watchName",
    header: "Watch Name",
  },
  {
    accessorKey: "watchDescription",
    header: "Description",
    cell: ({ row }) => {
      return <p className="max-w-[400px]">{row.original.watchDescription}</p>
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <span>$ {row.original.price}</span>
    },
  },
  {
    accessorKey: "automatic",
    header: "Automatic",
    cell: ({ row }) => {
      return (
        <div className=" ">
          <span>{row.original.automatic ? "Yes" : "No"}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />
    },
  },
]
