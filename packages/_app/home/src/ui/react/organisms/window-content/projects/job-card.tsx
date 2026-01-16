import { cn } from "@kelvan-design/ui/cn"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import Image from "next/image"
import { useMemo } from "react"

interface IJobCard {
	name: string
	startDate: string
	endDate: string
	position: string
	src: string
	badgeText?: string
	isVideo?: boolean
	onClick?: () => void
}

export function JobCard({
	name,
	src,
	startDate,
	endDate,
	position,
	badgeText,
	isVideo = false,
	onClick,
}: IJobCard) {
	const isClickable = useMemo(() => !!onClick, [onClick])

	return (
		<YStack
			className={cn(
				"space-y-4 border-border border-2 rounded-xl p-3",
				isClickable && "cursor-pointer hover:border-accent-foreground",
			)}
			onClick={onClick}
		>
			<Flex
				className={cn(
					"relative w-[250px] h-[250px]",
					"justify-center items-center",
					"rounded-xl bg-white/5",
				)}
			>
				{!isVideo ? (
					<Image src={src} alt={name} fill className="rounded-xl" />
				) : (
					<video
						src={src}
						autoPlay
						loop
						muted
						playsInline
						preload="auto"
						className="w-full h-auto object-cover rounded-xl"
					/>
				)}
			</Flex>
			<YStack className="space-y-1">
				<XStack className="space-x-2 items-center">
					<TextBody size="lg" variant="accent-foreground">
						{name}
					</TextBody>
					{badgeText && (
						<Flex className="justify-center items-center bg-[linear-gradient(135deg,var(--color-knockout)_40%,var(--color-primary)_90%)] rounded-xs px-2 py-0.5">
							<TextBody size="xs" variant="accent-foreground">
								{badgeText}
							</TextBody>
						</Flex>
					)}
				</XStack>
				<TextBody size="xs" variant="muted-foreground">
					{startDate} - {endDate}
				</TextBody>
				<TextBody variant="accent-foreground" className="font-semibold">
					{position}
				</TextBody>
			</YStack>
		</YStack>
	)
}
