"use client"

import { useEffect, useMemo, useState } from "react"

export const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
}

export function useMedia() {
	const [width, setWidth] = useState<number>(
		typeof window !== "undefined" ? window.innerWidth : 0,
	)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const breakpoints = useMemo(() => {
		const baseBreakpoints = {
			isSm: width <= BREAKPOINTS.sm,
			isMd: width > BREAKPOINTS.sm && width <= BREAKPOINTS.md,
			isLg: width > BREAKPOINTS.md && width <= BREAKPOINTS.lg,
			isXl: width > BREAKPOINTS.lg && width <= BREAKPOINTS.xl,
			is2Xl: width > BREAKPOINTS.xl,
			gteSm: width >= BREAKPOINTS.sm,
			gteMd: width >= BREAKPOINTS.md,
			gteLg: width >= BREAKPOINTS.lg,
			gteXl: width >= BREAKPOINTS.xl,
			gte2Xl: width >= BREAKPOINTS["2xl"],
		}

		return {
			...baseBreakpoints,
			ltSm: !baseBreakpoints.gteSm,
			ltMd: !baseBreakpoints.gteMd,
			ltLg: !baseBreakpoints.gteLg,
			ltXl: !baseBreakpoints.gteXl,
			lt2Xl: !baseBreakpoints.gte2Xl,
		}
	}, [width])

	return breakpoints
}
