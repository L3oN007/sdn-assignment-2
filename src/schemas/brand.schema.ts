import * as z from "zod"

export const BrandSchema = z.object({
  _id: z.string().min(1, "Brand name is required"),
  brandName: z.string().min(1, "Brand name is required"),
})

export type BrandType = z.infer<typeof BrandSchema>
