import { posthogBrowser } from "@kelvan-integrations/posthog-analytics/browser/client"

export function initBrowserAnalyticsInstrumentation() {
	posthogBrowser()
}
