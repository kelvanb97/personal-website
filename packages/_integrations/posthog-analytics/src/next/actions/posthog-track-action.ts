import { posthogClient } from "#server/client"

interface ITrackActionProps {
	distinctId: string
	event: string
	properties: Record<string, unknown>
}

export async function posthogTrackAction({
	distinctId,
	event,
	properties,
}: ITrackActionProps) {
	const posthog = posthogClient()

	posthog.capture({
		distinctId,
		event,
		properties,
	})
}
