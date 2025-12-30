import { cn } from "#utils/cn"

interface NavbarContainerProps {
	className?: string
	children: React.ReactNode
}

export function NavbarContainer({ className, children }: NavbarContainerProps) {
	return (
		<div className={cn("w-full bg-background", className)}>
			<div className="container-lg mx-auto">
				<div className="py-3 px-6">
					<nav className="flex justify-between">{children}</nav>
				</div>
			</div>
		</div>
	)
}
