import type { Metadata } from "next"
import "@kelvan-design/ui/global.css"
import { Providers } from "../ui/react/providers"

export const metadata: Metadata = {
	title: "Kelvan Brandt",
	description: "Welcome to my personal website!",
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
