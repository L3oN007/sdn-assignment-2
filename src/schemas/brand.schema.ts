import * as z from "zod"

import { CommonSchema } from "@/schemas/common.schema"

export const BrandSchema = z.object({
  _id: z.string().min(1, "Brand name is required"),
  brandName: z.string().min(1, "Brand name is required"),
})

const BrandResponseSchema = CommonSchema.extend({
  response: z.array(BrandSchema),
})

export type BrandResponseType = z.infer<typeof BrandResponseSchema>

export type BrandType = z.infer<typeof BrandSchema>
