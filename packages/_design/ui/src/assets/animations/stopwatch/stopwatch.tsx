import { TextBody } from "#library/text/text"
import { YStack } from "#primitives/y-stack"
import { cn } from "#utils/cn"
import { useEffect, useState } from "react"

interface IStopwatchProps {
	className?: string
}

export function Stopwatch({ className }: IStopwatchProps) {
	const [ms, setMs] = useState(0)

	useEffect(() => {
		const start = performance.now()
		const interval = setInterval(() => {
			setMs(performance.now() - start)
		}, 10)
		return () => clearInterval(interval)
	}, [])

	const minutes = Math.floor(ms / 60000)
	const seconds = Math.floor((ms % 60000) / 1000)
	const milliseconds = Math.floor((ms % 1000) / 10)

	const showMinutes = minutes > 0
	const display = showMinutes
		? `${minutes.toString()}:${seconds.toString().padStart(2, "0")}.${milliseconds
				.toString()
				.padStart(2, "0")}`
		: `${seconds.toString()}.${milliseconds.toString().padStart(2, "0")}`

	return (
		<YStack
			className={cn(
				"items-center justify-center rounded-full border-input border-5 h-64 w-64",
				className,
			)}
		>
			<TextBody
				variant="accent-foreground"
				size="4xl"
				className="tabular-nums"
			>
				{display}
			</TextBody>
		</YStack>
	)
}
