import { Card, CardContent } from "@kelvan-design/ui/library/card"
import { H2, TextBody } from "@kelvan-design/ui/library/text"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"

export function ImpactOnQualifiedPipeline() {
	return (
		<YStack className="mx-auto text-center space-y-12">
			<YStack className="space-y-4">
				<H2 variant="accent-foreground">
					Impact on qualified pipeline
				</H2>
				<TextBody variant="muted-foreground">
					Validated via A/B test across 2M emails sent. More replies,
					more meetings, more deals closed.
				</TextBody>
			</YStack>
			<XStack className="gap-4 justify-center flex-wrap">
				<StatCard
					stat="+47%"
					title="Qualified reply rate"
					description="vs generic personalization"
				/>
				<StatCard
					stat="2.4x"
					title="Increased reply rate"
					description="vs generic templates"
				/>
				<StatCard
					stat="18 min"
					title="SDR time saved"
					description="per personalized send"
				/>
			</XStack>
		</YStack>
	)
}

interface IStatCardProps {
	stat: string
	title: string
	description: string
}

function StatCard({ stat, title, description }: IStatCardProps) {
	return (
		<Card className="w-full max-w-xs">
			<CardContent className="text-left flex flex-col space-y-2 items-start">
				<TextBody size="5xl" variant="gradient" className="font-bold">
					{stat}
				</TextBody>
				<TextBody
					size="xl"
					variant="accent-foreground"
					className="font-bold"
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
