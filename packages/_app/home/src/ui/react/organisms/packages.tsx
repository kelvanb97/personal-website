"use client"

import { cn } from "@kelvan-design/ui/cn"
import { Button } from "@kelvan-design/ui/library/button"
import { Card, CardContent } from "@kelvan-design/ui/library/card"
import { H2, TextBody } from "@kelvan-design/ui/library/text"
import { CheckIcon } from "@kelvan-design/ui/lucide-icons"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"

export function Packages() {
	return (
		<YStack className="mx-auto text-center space-y-12">
			<YStack className="space-y-4">
				<H2 variant="accent-foreground">Packages</H2>
				<TextBody variant="muted-foreground">
					Choose the option that fits your current outbound volume and
					goals.
				</TextBody>
			</YStack>
			<XStack className="gap-4 justify-center flex-wrap">
				<PackageCard
					isPrimary={false}
					title="Pilot"
					description="Prove the concept with a controlled test"
					features={[
						"1,000 personalized sends",
						"A/B test setup vs your control",
						"2-week test duration",
						"Performance report + recommendation",
						"Slack/email support",
					]}
					bookACallLink="https://cal.com/tanner-kelvan/15-min"
				/>
				<PackageCard
					isPrimary={true}
					title="Scale"
					description="Scale what's working"
					features={[
						"10k+ personalized sends/month",
						"Ongoing A/B testing + iteration",
						"Weekly performance reports",
						"Custom fallback templates",
						"Dedicated account strategist",
						"Integration support (Outreach, Salesloft, Apollo)",
					]}
					bookACallLink="https://cal.com/tanner-kelvan/15-min"
				/>
				<PackageCard
					isPrimary={false}
					title="Enterprise"
					description="Multi-team, multi-region scale"
					features={[
						"50k+ personalized sends/month",
						"Multi-ICP personalization strategies",
						"Custom signal integrations",
						"Quarterly business reviews",
						"White-glove onboarding",
						"API access for custom workflows",
					]}
					bookACallLink="https://cal.com/tanner-kelvan/15-min"
				/>
			</XStack>
		</YStack>
	)
}

interface IPackageCardProps {
	isPrimary: boolean
	title: string
	description: string
	features: string[]
	bookACallLink: string
}

function PackageCard({
	isPrimary,
	title,
	description,
	features,
	bookACallLink,
}: IPackageCardProps) {
	return (
		<Card
			className={cn(
				"w-full max-w-[325px]",
				isPrimary ? "border-2 border-knockout/80 bg-knockout/15" : "",
			)}
		>
			<CardContent className="text-left flex flex-col h-full space-y-8">
				<YStack>
					<TextBody
						size="2xl"
						variant="accent-foreground"
						className="font-bold"
					>
						{title}
					</TextBody>
					<TextBody
						size="sm"
						variant="muted-foreground"
						className="mt-2"
					>
						{description}
					</TextBody>
					<YStack className="space-y-3 mt-6">
						{features.map((feature, index) => (
							<XStack key={index} className="space-x-2">
								<CheckIcon className="text-knockout size-4" />
								<TextBody size="xs" variant="accent-foreground">
									{feature}
								</TextBody>
							</XStack>
						))}
					</YStack>
				</YStack>
				<Button
					className="w-full mt-auto"
					onClick={() => window.open(bookACallLink, "_blank")}
				>
					Book a call
				</Button>
			</CardContent>
		</Card>
	)
}
