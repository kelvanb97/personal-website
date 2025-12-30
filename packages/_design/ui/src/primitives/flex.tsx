import { cn } from "#utils/cn"

export function Flex({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex", className)} {...props}>
			{children}
		</div>
	)
}
