import { cn } from "@kelvan-design/ui/cn"
import {
	Carousel,
	type TCarouselSlide,
} from "@kelvan-design/ui/library/carousel"
import { Progress } from "@kelvan-design/ui/library/progress"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { MOUNT_RAINIER_DATA } from "./data/20250807-mt-rainier"
import { NORTH_TWIN_DATA } from "./data/20250818-north-twin"
import { LARRABEE_DATA } from "./data/20250819-larrabee"
import { MOUNT_BAKER_DATA } from "./data/20250902-mt-baker"
import { MOUNT_DANIEL_DATA } from "./data/20250918-mt-daniel"

export function Mountaineering() {
	return (
		<YStack className="space-y-24 py-16 mb-16 mx-auto">
			<YStack className="max-w-4xl mx-auto space-y-4 text-center">
				<TextBody
					size="5xl"
					variant="accent-foreground"
					className="text-center"
				>
					Mountaineering
				</TextBody>
				<TextBody variant="accent-foreground">
					My latest and greatest hobby is mountaineering. I enjoy
					exploring mountains, challenging myself physically, and
					going places that fewer people visit.
				</TextBody>
				<TextBody size="sm" variant="muted-foreground">
					*stats provided are for the days that I went out, NOT in
					general.
				</TextBody>
				<TextBody size="sm" variant="muted-foreground">
					*my ratings will likely become stale over time, after I
					climb more mountains.
				</TextBody>
			</YStack>
			<YStack>
				<MountainEntry {...MOUNT_RAINIER_DATA} />
				<TimeLineDivider />
				<MountainEntry {...NORTH_TWIN_DATA} className="-mt-1.5" />
				<TimeLineDivider flipHorizontal />
				<MountainEntry {...LARRABEE_DATA} className="-mt-1.5" />
				<TimeLineDivider />
				<MountainEntry {...MOUNT_BAKER_DATA} className="-mt-1.5" />
				<TimeLineDivider flipHorizontal />
				<MountainEntry {...MOUNT_DANIEL_DATA} className="-mt-1.5" />
			</YStack>
			{/* HACK: space divider */}
			<div>&nbsp;</div>
		</YStack>
	)
}

type TMonth =
	| "January"
	| "February"
	| "March"
	| "April"
	| "May"
	| "June"
	| "July"
	| "August"
	| "September"
	| "October"
	| "November"
	| "December"

export interface IMountainEntryProps {
	name: string
	startDate: { month: TMonth; day: number; year: number }
	endDate: { month: TMonth; day: number; year: number } | null
	dayEntries: string[]
	slides: TCarouselSlide[]
	stats: { physical: number; exposure: number; skill: number }
	className?: string
}

function MountainEntry({
	name,
	startDate,
	endDate,
	dayEntries,
	slides,
	stats,
	className,
}: IMountainEntryProps) {
	return (
		<YStack
			className={cn(
				"rounded-xl border-border border p-6 space-y-6 max-w-5xl",
				className,
			)}
		>
			<YStack className="space-y-6">
				<YStack className="shrink-0">
					<TextBody size="5xl" variant="accent-foreground">
						{name}
					</TextBody>
					<TextBody size="sm" variant="accent-foreground">
						{startDate.month} {startDate.day}
						{endDate ? " - " : ""}
						{startDate.month === endDate?.month || endDate == null
							? ""
							: `${endDate?.month} `}
						{endDate?.day}, {startDate.year}
					</TextBody>
				</YStack>
				<XStack className="space-x-4 w-full bg-card-foreground/7.5 p-4 rounded-lg">
					<YStack className="w-1/3 space-y-0.5">
						<XStack className="justify-between items-baseline">
							<TextBody size="sm" variant="muted-foreground">
								Physical
							</TextBody>
							<TextBody size="xs" variant="muted-foreground">
								{stats.physical}/10
							</TextBody>
						</XStack>
						<Progress currentValue={stats.physical} maxValue={10} />
					</YStack>
					<YStack className="w-1/3 space-y-0.5">
						<XStack className="justify-between items-baseline">
							<TextBody size="sm" variant="muted-foreground">
								Exposure
							</TextBody>
							<TextBody size="xs" variant="muted-foreground">
								{stats.exposure}/10
							</TextBody>
						</XStack>
						<Progress currentValue={stats.exposure} maxValue={10} />
					</YStack>
					<YStack className="w-1/3 space-y-0.5">
						<XStack className="justify-between items-baseline">
							<TextBody size="sm" variant="muted-foreground">
								Skill
							</TextBody>
							<TextBody size="xs" variant="muted-foreground">
								{stats.skill}/10
							</TextBody>
						</XStack>
						<Progress currentValue={stats.skill} maxValue={10} />
					</YStack>
				</XStack>
				<YStack className="space-y-2">
					{dayEntries.map((entry, index) => (
						<Flex
							key={name + "day" + index}
							className="bg-card-foreground/3 p-4 rounded-lg"
						>
							<TextBody size="sm" variant="muted-foreground">
								<span className="font-bold text-accent-foreground">
									Day {index + 1}
								</span>{" "}
								- {entry}
							</TextBody>
						</Flex>
					))}
				</YStack>
			</YStack>
			<Carousel slides={slides} />
		</YStack>
	)
}

interface ITimelineDividerProps {
	flipHorizontal?: boolean
}

function TimeLineDivider({ flipHorizontal = false }: ITimelineDividerProps) {
	return (
		<YStack
			className="relative mx-auto items-center w-72 h-48 -mt-1.5"
			style={{
				transform: flipHorizontal ? "scaleX(-1)" : "none",
			}}
		>
			<YStack className="absolute top-0 right-0 items-center">
				<Flex className="bg-accent-foreground w-3 h-3 rounded-full" />
				<Flex className="bg-accent-foreground w-1 h-22 -mt-1" />
			</YStack>
			<Flex className="absolute top-1/2 bg-accent-foreground w-70 h-1" />
			<YStack className="absolute bottom-0 left-0 items-center">
				<Flex className="bg-accent-foreground w-1 h-22 -mb-1" />
				<Flex className="bg-accent-foreground w-3 h-3 rounded-full" />
			</YStack>
		</YStack>
	)
}
