import { cn } from "#utils/cn"

export function YStack({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex flex-col", className)} {...props}>
			{children}
		</div>
	)
}
