"use client"

import { posthogBrowser } from "@kelvan-integrations/posthog-analytics/browser/client"

// NOTE: this is the posthog distinct ID
export function getAnonId(): string {
	const posthog = posthogBrowser()
	return posthog?.get_distinct_id() ?? "anon-id"
}
