interface ISectionWrapperProps {
	id: string
	className?: string
	children: React.ReactNode
}

export function SectionWrapper({
	id,
	children,
	className,
}: ISectionWrapperProps) {
	return (
		<section id={id} className={className}>
			<div className="container mx-auto py-48">{children}</div>
		</section>
	)
}
