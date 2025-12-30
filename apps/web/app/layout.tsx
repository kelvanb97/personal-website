import type { Metadata } from "next"
import "@kelvan-design/ui/global.css"
import { Providers } from "../ui/react/providers"

export const metadata: Metadata = {
	title: "kelvan",
	description:
		"Turn outbound lists into booked meetings with real personalization.",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		// TODO: fix hydration warning
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
