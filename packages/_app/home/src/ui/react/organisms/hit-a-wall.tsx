import { Card, CardContent } from "@kelvan-design/ui/library/card"
import { H2, TextBody } from "@kelvan-design/ui/library/text"
import {
	CircleAlertIcon,
	ClockIcon,
	TrendingUpIcon,
} from "@kelvan-design/ui/lucide-icons"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"

export function HitAWall() {
	return (
		<YStack className="mx-auto text-center space-y-12">
			<YStack className="space-y-4">
				<H2 variant="accent-foreground">
					Why teams hit a wall with outbound
				</H2>
				<TextBody variant="muted-foreground">
					Scaling personalization is the single largest blocker to
					qualified pipeline.
				</TextBody>
			</YStack>
			<XStack className="gap-4 justify-center flex-wrap">
				<WhyCard
					icon={<ClockIcon className="text-destructive" />}
					title="SDR research time"
					description="15-20 minutes per prospect. Manual personalization rarely scales past 20 sends/day without burning out your team."
				/>
				<WhyCard
					icon={<CircleAlertIcon className="text-destructive" />}
					title="Generic AI doesn't work"
					description="ChatGPT writes fluffy nonsense. Hurts sender reputation and qualified reply rates tank."
				/>
				<WhyCard
					icon={<TrendingUpIcon className="text-destructive" />}
					title="Scaling quality is hard"
					description="You can have volume or you can have quality. At 10k+ sends/month, you shouldn't have to choose."
				/>
			</XStack>
		</YStack>
	)
}

interface IWhyCardProps {
	icon: React.ReactNode
	title: string
	description: string
}

function WhyCard({ icon, title, description }: IWhyCardProps) {
	return (
		<Card className="w-full max-w-xs">
			<CardContent className="text-left flex flex-col space-y-2 items-start">
				<Flex className="border-destructive border-[0.5px] bg-destructive/20 p-2 rounded-md items-center justify-center">
					{icon}
				</Flex>
				<TextBody
					size="xl"
					variant="accent-foreground"
					className="font-bold mt-3"
				>
					{title}
				</TextBody>
				<TextBody size="sm" variant="muted-foreground">
					{description}
				</TextBody>
			</CardContent>
		</Card>
	)
}
