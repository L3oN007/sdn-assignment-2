import * as z from "zod"

export const CommonSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})

export type CommonResponseType = z.infer<typeof CommonSchema>
