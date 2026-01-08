import { emailTemplateWrapper } from "./email-template-wrapper"
import { escapeHtml } from "./escape-html"

export type TContactTemplateProps = {
	name: string
	email: string
	message: string | undefined
}

export function renderContactTemplate({
	name,
	email,
	message,
}: TContactTemplateProps) {
	const subject = `Email from ${name} <${email}>`

	const html = emailTemplateWrapper({
		title: subject,
		body: contactBodyHTML({ name, email, message }),
	})

	return { subject, html }
}

function contactBodyHTML({ name, email, message }: TContactTemplateProps) {
	const safeName = escapeHtml(name)
	const safeEmail = escapeHtml(email)
	const safeMessage = message?.trim() ? escapeHtml(message) : null

	return `
<h1 class="h1">New contact form submission</h1>

<div class="kv">
  <div class="kv-row">
    <span class="kv-label">Name:</span> ${safeName}
  </div>

  <div class="kv-row">
    <span class="kv-label">Email:</span>
    <a href="mailto:${safeEmail}">${safeEmail}</a>
  </div>

  ${
		safeMessage
			? `<div class="kv-row">
           <span class="kv-label">Message:</span>
         </div>
         <blockquote class="blockquote">${safeMessage.replace(/\n/g, "<br />")}</blockquote>`
			: `<div class="kv-row">
           <span class="kv-label">Message:</span> <em>(No message provided)</em>
         </div>`
  }
</div>
`
}
