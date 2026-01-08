import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const env = createEnv({
	server: {
		RESEND_API_KEY: z.string().trim().min(1),
	},
	runtimeEnv: {
		RESEND_API_KEY: process.env["RESEND_API_KEY"],
	},
})

type Config = {
	readonly resendApiKey: string
}

const createConfig = (): Config => {
	return {
		resendApiKey: env.RESEND_API_KEY,
	} as const
}

let _config: Config | null = null

export const config = () => {
	if (!_config) _config = createConfig()
	return _config
}
