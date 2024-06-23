import * as z from "zod"

import { BrandSchema } from "@/schemas/brand.schema"
import { CommentSchema } from "@/schemas/comment.schema"

export const WatchSchema = z.object({
  watchName: z.string().min(1, "Watch name is required"),
  _id: z.string().min(1, "Watch name is required"),
  image: z.string().min(1, "Image is required").url({ message: "Invalid URL" }),
  price: z.coerce.number().min(1, "Price is required").nonnegative({
    message: "Price must be greater than 0",
  }),
  automatic: z.boolean(),
  watchDescription: z.string().min(1, "Description is required"),
  brand: BrandSchema,
  comments: z.array(CommentSchema),
})

export type WatchType = z.infer<typeof WatchSchema>

export const WatchWithAvgRatingSchema = WatchSchema.extend({
  avgRating: z.number().nonnegative(),
})

export type WatchWithAvgRatingType = z.infer<typeof WatchWithAvgRatingSchema>

export const WatchResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  response: z.array(WatchWithAvgRatingSchema),
})

export const WatchDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  response: WatchWithAvgRatingSchema,
})

export type WatchDetailResponseType = z.infer<typeof WatchDetailResponseSchema>

export type WatchResponseType = z.infer<typeof WatchResponseSchema>

export const CreateWatchSchema = WatchSchema.omit({
  _id: true,
  comments: true,
}).extend({
  brand: z.string().min(1, "Brand name is required"),
})

export type CreateWatchType = z.infer<typeof CreateWatchSchema>
