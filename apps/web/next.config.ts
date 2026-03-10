import type { NextConfig } from "next"

export const nextConfig: NextConfig = {
	// NOTE: PostHog reverse proxy configuration
	async rewrites() {
		return [
			{
				source: "/relay-A9Pm/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/relay-A9Pm/:path*",
				destination: "https://us.i.posthog.com/:path*",
			},
		]
	},
	// NOTE: This is required to support PostHog trailing slash API requests
	skipTrailingSlashRedirect: true,
	transpilePackages: ["@kelvan-design/ui"],
}
