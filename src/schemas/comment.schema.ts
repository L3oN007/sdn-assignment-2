import * as z from "zod"

export const CommentSchema = z.object({
  _id: z.string(),
  content: z.string().min(1, "Comment is required"),
  createdAt: z.string(),
  updatedAt: z.string(),
  author: z.object({
    _id: z.string(),
    memberName: z.string(),
  }),
  rating: z.coerce
    .number()
    .nonnegative()
    .min(1, {
      message: "Rating must be between 1 and 3",
    })
    .max(3, { message: "Rating must be between 1 and 3" }),
})

export type CommentType = z.infer<typeof CommentSchema>

export const CreateCommentSchema = CommentSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
  author: true,
})

export type CreateCommentType = z.infer<typeof CreateCommentSchema>

export type CommentResponseType = {
  success: boolean
  message: string
}
