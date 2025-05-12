
import { z } from "zod"

export const loginSchema = z.object({
  username: 
    z.string()
    .min(5, { message: "Field must contain at least 5 character(s)"})
    .max(15, { message: "Field must contain at most 15 character(s)"})
    .or(z.string().email()),
  password: z.string()
})

export type LoginType = z.infer<typeof loginSchema>
