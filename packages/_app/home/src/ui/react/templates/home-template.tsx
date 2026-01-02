"use client"

import { Logo } from "@kelvan-design/ui/logo"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useEffect, useRef, useState } from "react"
import { Desktop } from "../organisms/desktop"

// import { NavbarFooter } from "#organisms/navfooter"

const RADIAL_MASK_CLASS_NAME =
	"bg-[linear-gradient(180deg,var(--color-card)_0%,var(--color-background)_100%)]"

export function HomeTemplate() {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [viewport, setViewport] = useState({ width: 0, height: 0 })

	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const updateFromWindow = () => {
			const w = window.innerWidth
			const h = window.innerHeight
			setViewport((s) =>
				s.width === w && s.height === h ? s : { width: w, height: h },
			)
		}

		updateFromWindow()

		const ro = new ResizeObserver(() => {
			updateFromWindow()
		})

		ro.observe(el)
		window.addEventListener("resize", updateFromWindow)

		return () => {
			ro.disconnect()
			window.removeEventListener("resize", updateFromWindow)
		}
	}, [])

	return (
		<YStack
			ref={containerRef}
			className={`p-8 bg-background h-screen w-screen min-h-[100vh] relative overflow-hidden ${RADIAL_MASK_CLASS_NAME}`}
		>
			<GridBackground />
			<LogoSection />
			<Desktop viewportSize={viewport} />
			{/* <NavbarFooter /> */}
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
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<Logo width={500} />
		</div>
	)
}
