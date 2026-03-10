import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const env = createEnv({
	shared: {
		NEXT_PUBLIC_POSTHOG_API_KEY: z.string().trim().min(1),
		NEXT_PUBLIC_POSTHOG_HOST: z.string().trim().min(1),
	},
	runtimeEnv: {
		NEXT_PUBLIC_POSTHOG_API_KEY: process.env["NEXT_PUBLIC_POSTHOG_API_KEY"],
		NEXT_PUBLIC_POSTHOG_HOST: process.env["NEXT_PUBLIC_POSTHOG_HOST"],
	},
})

type Config = {
	readonly posthogApiKey: string
	readonly posthogHost: string
}

const createConfig = (): Config => {
	return {
		posthogApiKey: env.NEXT_PUBLIC_POSTHOG_API_KEY,
		posthogHost: env.NEXT_PUBLIC_POSTHOG_HOST,
	} as const
}

let _config: Config | null = null

export const config = () => {
	if (!_config) _config = createConfig()
	return _config
}
