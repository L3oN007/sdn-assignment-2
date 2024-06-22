import * as z from "zod"

export const LoginSchema = z.object({
  memberName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

export type LoginType = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
  memberName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  name: z.string().min(1, "Name is required"),
  YOB: z.coerce
    .number()
    .min(1990, "Year of birth must be between 1990 and 2024")
    .max(2024, "Year of birth must be between 1990 and 2024"),
})

export type RegisterType = z.infer<typeof RegisterSchema>

export type LoginResponseType = {
  success: boolean
  message: string
}
