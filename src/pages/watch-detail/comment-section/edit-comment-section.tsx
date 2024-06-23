import { zodResolver } from "@hookform/resolvers/zod"
import { StarFilledIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  CommentResponseType,
  CommentType,
  CreateCommentSchema,
  CreateCommentType,
} from "@/schemas/comment.schema"

import api from "@/lib/api"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Props = Omit<CommentType, "createdAt"> & {
  cancelEdit: () => void
}

export default function EditCommentSection({
  _id,
  author,
  cancelEdit,
  content,
  rating,
  updatedAt,
}: Props) {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const form = useForm<CreateCommentType>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: content,
      rating: rating,
    },
  })
  const { mutateAsync: updateComment } = useMutation({
    mutationKey: ["updateComment", _id],
    mutationFn: async (values: CreateCommentType) => {
      const { data } = await api.put<CommentResponseType>(
        `/watches/${id}/comments/${_id}`,
        values
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
      form.reset()
      cancelEdit()
      toast.success("Success", {
        description: data.message,
      })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ??
          "An error occurred while posting comment."
        toast.error(errorMessage)
      }
    },
  })

  const handleRatingChange = (rating: number) => {
    form.setValue("rating", rating)
  }

  async function onSubmit(values: CreateCommentType) {
    await updateComment(values)
  }
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
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {format(new Date(updatedAt), "MMM dd, yyyy hh:mm aa")}
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={4}
                    id="content"
                    placeholder="Write a comment..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="rating" className=" text-lg">
                    Rating
                  </Label>
                  <FormControl>
                    <div className="flex items-center">
                      {[1, 2, 3].map((value) => (
                        <StarFilledIcon
                          key={value}
                          className={cn(
                            "cursor-pointer size-6",
                            value <= field.value
                              ? "text-yellow-400"
                              : "text-gray-300"
                          )}
                          onClick={() => handleRatingChange(value)}
                        />
                      ))}
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" space-x-2">
            <Button variant="ghost" onClick={cancelEdit}>
              Cancel
            </Button>
            <Button type="submit">Update Comment</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
