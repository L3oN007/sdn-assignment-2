import * as z from "zod"

import { BrandSchema } from "@/schemas/brand.schema"
import { CommentSchema } from "@/schemas/comment.schema"

export const WatchSchema = z.object({
  watchName: z.string().min(1, "Watch name is required"),
  _id: z.string().min(1, "Watch name is required"),
  image: z.string().min(1, "Image is required"),
  price: z.number().min(1, "Price is required"),
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
