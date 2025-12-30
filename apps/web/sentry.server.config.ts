import { init } from "@sentry/nextjs"

// https://docs.sentry.io/platforms/javascript/guides/nextjs/
init({
	dsn: process.env["NEXT_PUBLIC_SENTRY_DSN"]!,
	tracesSampleRate: 1,
	debug: false,
})
