"use client"

import { cn } from "@kelvan-design/ui/cn"
import { Logo } from "@kelvan-design/ui/logo"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { ViewportProvider } from "#context/viewport-context"
import { Desktop } from "#organisms/desktop"
import { NavbarFooter } from "#organisms/navfooter"
import { useRef } from "react"

const RADIAL_MASK_CLASS_NAME =
	"bg-[linear-gradient(180deg,var(--color-card)_0%,var(--color-background)_100%)]"

export function HomeTemplate() {
	const containerRef = useRef<HTMLDivElement | null>(null)

	return (
		<YStack
			ref={containerRef}
			className={cn(
				`p-8 bg-background min-h-screen max-h-screen min-w-screen max-w-screen relative overflow-hidden`,
				RADIAL_MASK_CLASS_NAME,
			)}
		>
			<GridBackground />
			<LogoSection />
			<ViewportProvider containerRef={containerRef}>
				<Desktop />
			</ViewportProvider>
			<NavbarFooter className="-mx-8 overflow-hidden" />
		</YStack>
	)
}

function GridBackground() {
	return (
		<div
			className="absolute inset-0 z-0
      bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
      bg-[size:136px_136px]
      [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]
      pointer-events-none"
		/>
	)
}

function LogoSection() {
	return (
		<div className="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<Logo width={500} />
		</div>
	)
}
