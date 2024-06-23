import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Row } from "@tanstack/react-table"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { CommonResponseType } from "@/schemas/common.schema"
import { WatchType } from "@/schemas/watch.schema"

import api from "@/lib/api"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export default function DataTableRowActions({
  row,
}: DataTableRowActionsProps<WatchType>) {
  const watch = row.original
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync: deleteWatch } = useMutation({
    mutationKey: ["deleteWatch", watch._id],
    mutationFn: async () => {
      const { data } = await api.delete<CommonResponseType>(
        `/watches/${watch._id}`
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watches"] })
      toast.success("Watch deleted successfully")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ??
          "An error occurred while deleting watch."
        toast.error(errorMessage)
      }
    },
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => navigate(`/admin/watch/${watch._id}`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-800 hover:!text-red-800 hover:!bg-red-100"
          onClick={() => deleteWatch()}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
