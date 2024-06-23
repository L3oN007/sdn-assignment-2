import { useAuthContext } from "@/contexts/auth-provider"
import { StarFilledIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { format } from "date-fns"
import { EllipsisVertical } from "lucide-react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

import { CommentResponseType, CommentType } from "@/schemas/comment.schema"

import api from "@/lib/api"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = Omit<CommentType, "createdAt"> & {
  onEdit: () => void
}

export default function RenderCommentSection({
  _id,
  content,
  author,
  updatedAt,
  rating,
  onEdit,
}: Props) {
  const { member } = useAuthContext()
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteComment } = useMutation({
    mutationKey: ["deleteComment", _id],
    mutationFn: async () => {
      const { data } = await api.delete<CommentResponseType>(
        `/watches/${id}/comments/${_id}`
      )
      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["watches"],
      })
      queryClient.invalidateQueries({
        queryKey: ["watch", id],
      })
      toast.success("Success", {
        description: data.message,
      })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ??
          "An error occurred while deleting comment."
        toast.error(errorMessage)
      }
    },
  })
  return (
    <div className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 border-b">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3  text-sm text-gray-900 dark:text-white font-semibold">
            <Avatar className="size-8">
              <AvatarImage src="/ava.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <div className="ml-2 flex items-center gap-1">
              <p className="first-letter:uppercase">{author.memberName}</p>
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: rating }).map((_, index) => (
                  <StarFilledIcon key={index} className="size-3" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {format(new Date(updatedAt), "MMM dd, yyyy hh:mm aa")}
          </p>
          {member?._id === author._id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <EllipsisVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-800 hover:!text-red-800 hover:!bg-red-100"
                  onClick={() => deleteComment()}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">{content}</p>
    </div>
  )
}
