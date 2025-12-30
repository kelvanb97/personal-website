import { cn } from "#utils/cn"

export function XStack({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex flex-row", className)} {...props}>
			{children}
		</div>
	)
}
