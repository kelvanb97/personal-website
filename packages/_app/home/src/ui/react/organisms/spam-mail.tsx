import { Card, CardContent } from "@kelvan-design/ui/library/card"
import { H2, TextBody } from "@kelvan-design/ui/library/text"
import {
	BotOffIcon,
	CheckCheckIcon,
	CheckIcon,
	MailXIcon,
} from "@kelvan-design/ui/lucide-icons"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"

export function SpamMail() {
	return (
		<YStack className="mx-auto text-center space-y-12">
			<YStack className="space-y-4">
				<H2 variant="accent-foreground">
					Bad AI = <span className="text-destructive">Spam Mail</span>
				</H2>
				<TextBody variant="muted-foreground">
					Half the battle is writing great personalization. The other
					half is making sure it gets delivered.
				</TextBody>
			</YStack>
			<XStack className="justify-center flex-wrap gap-6">
				<YStack className="gap-6">
					<SpamCard
						icon={<MailXIcon className="text-destructive size-4" />}
						title="Inbox filtering"
						description={[
							"Inbox providers like Gmail, Outlook, and Yahoo are getting smarter at detecting AI-generated content.",
							"They detect language patterns and flag emails that lack genuine personalization, sending them straight to the spam folder.",
						]}
					/>
					<SpamCard
						icon={
							<BotOffIcon className="text-destructive size-4" />
						}
						title="Email agents"
						description={[
							"Many prospects are now using AI-powered email agents that can identify and filter out AI-generated emails or emails that don't provide genuine value.",
						]}
					/>
				</YStack>
				<Card className="w-full max-w-sm">
					<CardContent className="text-left flex flex-col space-y-2 items-start">
						<XStack className="space-x-3 items-center">
							<Flex className="border-knockout border-[0.5px] bg-knockout/20 p-2 rounded-md items-center justify-center">
								<CheckCheckIcon className="text-knockout size-4" />
							</Flex>
							<TextBody
								size="xl"
								className="font-bold text-accent-foreground"
							>
								Our solution
							</TextBody>
						</XStack>
						<YStack className="space-y-3 mt-6">
							<XStack className="space-x-3">
								<CheckIcon className="shrink-0 text-knockout size-6" />
								<TextBody size="md" variant="accent-foreground">
									We use 3rd party AI detection tools to
									ensure our personalizations are not flagged
									as AI-generated content.
								</TextBody>
							</XStack>
							<XStack className="space-x-3">
								<CheckIcon className="shrink-0 text-knockout size-6" />
								<TextBody size="md" variant="accent-foreground">
									We audit our AI models regularly to ensure
									they produce human-like, personalized
									content that passes spam filters.
								</TextBody>
							</XStack>
							<XStack className="space-x-3">
								<CheckIcon className="shrink-0 text-knockout size-6" />
								<TextBody size="md" variant="accent-foreground">
									We use deliverability testing tools to test
									and optimize email deliverability rates.
								</TextBody>
							</XStack>
							<XStack className="space-x-3">
								<CheckIcon className="shrink-0 text-knockout size-6" />
								<TextBody size="md" variant="accent-foreground">
									We use our own service... we want our emails
									to deliver.
								</TextBody>
							</XStack>
						</YStack>
					</CardContent>
				</Card>
			</XStack>
			<TextBody size="sm" variant="muted-foreground">
				Your team using AI without proper guardrails is a recipe for a
				deliverability disaster.
			</TextBody>
		</YStack>
	)
}

interface ISpamCardProps {
	icon: React.ReactNode
	title: string
	description: string[]
}

function SpamCard({ icon, title, description }: ISpamCardProps) {
	return (
		<Card className="w-full max-w-xs bg-transparent border-border">
			<CardContent className="text-left flex flex-col space-y-4 items-start">
				<XStack className="space-x-3 items-center">
					<Flex className="border-destructive border-[0.5px] bg-destructive/20 p-2 rounded-md items-center justify-center">
						{icon}
					</Flex>
					<TextBody
						size="xl"
						className="font-bold text-accent-foreground"
					>
						{title}
					</TextBody>
				</XStack>
				{description.map((desc, index) => (
					<TextBody
						key={index}
						size="sm"
						className="text-muted-foreground"
					>
						{desc}
					</TextBody>
				))}
			</CardContent>
		</Card>
	)
}
