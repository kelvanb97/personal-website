import { posthogClient } from "#server/client"

interface IPosthogAliasProps {
	userId: string
	anonId: string
}

export async function posthogAlias({
	userId,
	anonId,
}: IPosthogAliasProps): Promise<void> {
	const posthog = posthogClient()

	posthog.alias({
		distinctId: userId,
		alias: anonId,
	})
}
