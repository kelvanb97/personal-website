"use server"

import { errFrom, ok, type TResult } from "@kelvan-core/result"
import { Resend } from "resend"
import { config } from "./config"

const resendClient = () => {
	const _config = config()
	return new Resend(_config.resendApiKey)
}

interface ISendEmailProps {
	from: string
	to: string | string[]
	subject: string
	html: string
}

export async function resendSendEmail({
	from,
	to,
	subject,
	html,
}: ISendEmailProps): Promise<TResult<{ success: boolean }>> {
	const client = resendClient()

	const { error } = await client.emails.send({
		from,
		to,
		subject,
		html,
	})

	if (error) return errFrom(`Resend error: ${error.message}`)

	return ok({ success: true })
}
