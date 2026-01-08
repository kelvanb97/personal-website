"use server"

import { errFrom, ok, type TResult } from "@kelvan-core/result"
import { resendSendEmail } from "@kelvan-integrations/resend"
import { IGNORE_LOCAL_EMAILS } from "@kelvan-shared/consts/emails"
import {
	renderEmailTemplate,
	type TEmailTemplate,
} from "./email-templates/get-email-template"

type TFrom = "notify"

interface ISendEmailProps {
	from: TFrom
	to: string | string[]
	template: TEmailTemplate
}

export async function sendEmail({
	from,
	to,
	template,
}: ISendEmailProps): Promise<TResult<{ success: boolean }>> {
	if (IGNORE_LOCAL_EMAILS) return ok({ success: true })

	const fromResult = getFromAddress(from)
	if (!fromResult.ok) return fromResult
	const _from = fromResult.data

	const renderEmailTemplateResult = renderEmailTemplate(template)
	if (!renderEmailTemplateResult.ok) return renderEmailTemplateResult
	const { subject, html } = renderEmailTemplateResult.data

	const sendResult = await resendSendEmail({
		from: _from,
		to,
		subject,
		html,
	})

	if (!sendResult.ok) {
		return errFrom(`Resend error: ${sendResult.error.message}`)
	}

	return ok({ success: true })
}

function getFromAddress(from: TFrom): TResult<string> {
	if (from === "notify") {
		return ok("Kelvan <no-reply@notify.kelvanbrandt.com>")
	} else {
		return errFrom(`Unknown from address: ${from}`)
	}
}
