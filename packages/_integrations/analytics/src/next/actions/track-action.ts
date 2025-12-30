"use server"

import { posthogTrackAction } from "@kelvan-integrations/posthog-analytics/track-action"
import { IGNORE_LOCAL_TRACKING } from "@kelvan-shared/consts/analytics"
import type { TEvent } from "#types"

export interface ITrackActionProps {
	anonId?: string
	event: TEvent
	properties?: Record<string, unknown>
}

export async function trackAction({
	anonId,
	event,
	properties = {},
}: ITrackActionProps) {
	if (IGNORE_LOCAL_TRACKING) return

	const isAnon = true

	const baseProperties = {
		isAnon,
		timestamp: new Date().toISOString(),
	}

	if (isAnon && !anonId) {
		// TODO: track with sentry or similar
		console.error("anonId is required for anonymous users")
		return
	}

	try {
		await posthogTrackAction({
			distinctId: anonId ?? "",
			event,
			properties: {
				...baseProperties,
				...properties,
			},
		})
	} catch (error) {
		console.error("Error tracking action:", error)
	}
}
