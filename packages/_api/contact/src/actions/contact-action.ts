"use server"

import { actionClient, SafeForClientError } from "@kelvan-core/next-safe-action"
import { sendEmail } from "@kelvan-integrations/email"
import { contactSchema } from "#schema/contact-schema"

export const contactAction = actionClient
	.inputSchema(contactSchema)
	.action(async ({ parsedInput }): Promise<{ success: boolean }> => {
		const emailResult = await sendEmail({
			from: "notify",
			to: "kelvanb97@gmail.com",
			template: {
				type: "contact",
				data: {
					name: parsedInput.name,
					email: parsedInput.email,
					message: parsedInput.message,
				},
			},
		})

		if (!emailResult.ok) {
			console.error("Contact action email error:", emailResult.error)
			throw new SafeForClientError(
				`Hmm... something went wrong. Please try again later. Or email me directly at kelvanb97@gmail.com`,
			)
		}

		return {
			success: true,
		}
	})
