import { z } from "zod"

export const contactSchema = z.object({
	name: z
		.string({ message: "Name is required" })
		.min(1, { message: "Name is required" })
		.max(100, { message: "Name must be 100 characters or less" }),
	email: z
		.string({ message: "Email is required" })
		.email({ message: "Please enter a valid email address" })
		.max(255, { message: "Email must be 255 characters or less" }),
	message: z
		.string()
		.max(5000, { message: "Message must be 5000 characters or less" })
		.optional(),
})

export type TContactSchema = z.infer<typeof contactSchema>
