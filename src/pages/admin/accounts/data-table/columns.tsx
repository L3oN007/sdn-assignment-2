"use client"

import { ColumnDef } from "@tanstack/react-table"

import { MemberType } from "@/schemas/auth.schema"

export const columns: ColumnDef<MemberType>[] = [
  {
    accessorKey: "memberName",
    header: "Username",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "YOB",
    header: "Year of Birth",
  },

  {
    accessorKey: "isAdmin",
    header: "Admin",
    cell: ({ row }) => {
      return (
        <div className=" ">
          <span>{row.original.isAdmin ? "Yes" : "No"}</span>
        </div>
      )
    },
  },
]
