import { H2, TextBody } from "@kelvan-design/ui/library/text"
import {
	ChartColumnIcon,
	DatabaseIcon,
	RefreshCwIcon,
	ShieldIcon,
	SparklesIcon,
} from "@kelvan-design/ui/lucide-icons"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"

export function HowItWorks() {
	return (
		<YStack className="mx-auto text-center space-y-12">
			<YStack className="space-y-4">
				<H2 variant="accent-foreground">How it works</H2>
				<TextBody variant="muted-foreground">
					Plug into your existing outbound motion, A/B test, and
					iterate weekly
				</TextBody>
			</YStack>
			<XStack className="relative gap-8 justify-center flex-wrap">
				<div
					className="absolute top-7 left-0 right-0 z-0 h-px w-full hidden xl:block
  bg-gradient-to-r from-transparent via-[var(--color-primary)] dark:via-[var(--color-accent-foreground)] to-transparent"
				/>
				<HowItWorksCard
					icon={<DatabaseIcon className="text-white" />}
					title="Connect signals"
					description="LinkedIn profile + company website data"
				/>
				<HowItWorksCard
					icon={<SparklesIcon className="text-white" />}
					title="Generate openers + angles"
					description="Role-relevant, grounded personalizations"
				/>
				<HowItWorksCard
					icon={<ShieldIcon className="text-white" />}
					title="Confidence gating"
					description="Safe fallbacks when signals are weak"
				/>
				<HowItWorksCard
					icon={<ChartColumnIcon className="text-white" />}
					title="A/B test vs control"
					description="Validate lift in qualified replies"
				/>
				<HowItWorksCard
					icon={<RefreshCwIcon className="text-white" />}
					title="Weekly iteration"
					description="Refine angles based on performance"
				/>
			</XStack>
		</YStack>
	)
}

interface IHowItWorksCardProps {
	icon: React.ReactNode
	title: string
	description: string
}

function HowItWorksCard({ icon, title, description }: IHowItWorksCardProps) {
	return (
		<YStack className="space-y-4 w-full max-w-[240px] z-1">
			<div className="mx-auto">
				<Flex className="items-center justify-center bg-[linear-gradient(135deg,var(--color-knockout)_40%,var(--color-primary)_90%)] rounded-full size-14">
					{icon}
				</Flex>
			</div>
			<YStack className="space-y-2">
				<TextBody
					size="lg"
					variant="accent-foreground"
					className="font-bold"
				>
					{title}
				</TextBody>
				<TextBody variant="muted-foreground">{description}</TextBody>
			</YStack>
		</YStack>
	)
}
