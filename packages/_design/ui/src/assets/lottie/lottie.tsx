import lottie, { AnimationEventName, AnimationItem } from "lottie-web"
import { useEffect, useRef } from "react"

export type TLottieProps = {
	/** Lottie JSON animation data */
	animationData: object

	/** Whether animation should autoplay on mount (default: true) */
	autoplay?: boolean

	/** Whether animation should loop (default: true) */
	loop?: boolean

	/** Playback speed multiplier (default: 1) */
	speed?: number

	/** Optionally play in reverse (default: false) */
	direction?: "forward" | "reverse"

	/** Callback when animation completes */
	onComplete?: () => void

	/** Callback when loop completes */
	onLoopComplete?: () => void

	/** Any CSS styles (size, etc.) */
	style?: React.CSSProperties

	/** Optional className for container */
	className?: string
}

/**
 * Generic Lottie player that works in any React environment
 * (Next.js, Vite, Chrome extensions, etc.).
 */
export function Lottie({
	animationData,
	autoplay = true,
	loop = true,
	speed = 1,
	direction = "forward",
	onComplete,
	onLoopComplete,
	style,
	className,
}: TLottieProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const animationRef = useRef<AnimationItem | null>(null)

	useEffect(() => {
		if (!containerRef.current) return

		animationRef.current?.destroy()

		const anim = lottie.loadAnimation({
			container: containerRef.current,
			renderer: "svg",
			loop,
			autoplay,
			animationData,
		})

		anim.setSpeed(speed)
		anim.setDirection(direction === "forward" ? 1 : -1)

		if (onComplete)
			anim.addEventListener("complete" as AnimationEventName, onComplete)
		if (onLoopComplete)
			anim.addEventListener(
				"loopComplete" as AnimationEventName,
				onLoopComplete,
			)

		animationRef.current = anim

		return () => {
			anim.destroy()
		}
	}, [
		animationData,
		autoplay,
		loop,
		speed,
		direction,
		onComplete,
		onLoopComplete,
	])

	return <div ref={containerRef} className={className} style={style} />
}
