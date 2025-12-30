"use server"

import { actionClient } from "@kelvan-core/next-safe-action"
import { contactSchema } from "#schema/contact-schema"

export const contactAction = actionClient
	.inputSchema(contactSchema)
	.action(async ({ parsedInput }): Promise<{ success: boolean }> => {
		console.log("Contact form submitted:", parsedInput)

		return {
			success: true,
		}
	})
