import { errFrom, ok, type TResult } from "@kelvan-core/result"
import { renderContactTemplate, type TContactTemplateProps } from "./contact"

export type TEmailTemplate = {
	type: "contact"
	data: TContactTemplateProps
}

export function renderEmailTemplate(
	t: TEmailTemplate,
): TResult<{ subject: string; html: string }> {
	switch (t.type) {
		case "contact":
			return ok(renderContactTemplate(t.data))
		default:
			return errFrom(
				`Unknown template type: ${(t as unknown as { type: string }).type}`,
			)
	}
}
