import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  CommentResponseType,
  CreateCommentSchema,
  CreateCommentType,
} from "@/schemas/comment.schema"

import api from "@/lib/api"

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

export default function PostCommentSection() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const form = useForm<CreateCommentType>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
      rating: 1,
    },
  })

  const { mutateAsync: createComment } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: async (values: CreateCommentType) => {
      const { data } = await api.post<CommentResponseType>(
        `/watches/${id}/comments`,
        {
          content: values.content,
          rating: 2,
        }
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

  async function onSubmit(values: CreateCommentType) {
    await createComment(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (err) => console.error(err))}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="content" className="block mb-2 text-lg">
                  Comment
                </Label>
                <FormControl>
                  <Textarea
                    placeholder="Write a comment..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Post Comment</Button>
        </div>
      </form>
    </Form>
  )
}
