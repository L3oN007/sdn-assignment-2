import * as z from "zod"

import { CommonSchema } from "@/schemas/common.schema"

export const BrandSchema = z.object({
  _id: z.string().min(1, "Brand name is required"),
  brandName: z.string().min(1, "Brand name is required"),
})

const BrandResponseSchema = CommonSchema.extend({
  response: z.array(BrandSchema),
})

const BrandDetailResponseSchema = CommonSchema.extend({
  response: BrandSchema,
})

export const CreateBrandSchema = BrandSchema.omit({
  _id: true,
})

export type CreateBrandType = z.infer<typeof CreateBrandSchema>

export type BrandResponseType = z.infer<typeof BrandResponseSchema>

export type BrandDetailResponseType = z.infer<typeof BrandDetailResponseSchema>

export type BrandType = z.infer<typeof BrandSchema>
