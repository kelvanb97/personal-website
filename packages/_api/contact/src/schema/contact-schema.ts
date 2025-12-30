import { z } from "zod"

export const contactSchema = z.object({
	name: z.string().min(1).max(100),
	email: z.email().max(255),
	phone: z.string().min(0).max(20).optional(),
	message: z.string().min(0).max(5000).optional(),
})

export type TContactSchema = z.infer<typeof contactSchema>
