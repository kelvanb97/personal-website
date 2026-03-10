import { config } from "#config"
import { PostHog } from "posthog-node"

// DOCs: https://posthog.com/docs/libraries/node
export const posthogClient = () => {
	const _config = config()

	return new PostHog(_config.posthogApiKey, {
		host: _config.posthogHost,
	})
}
