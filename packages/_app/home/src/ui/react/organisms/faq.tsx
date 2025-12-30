"use client"

import { cn } from "@kelvan-design/ui/cn"
import { H2, TextBody } from "@kelvan-design/ui/library/text"
import { ChevronDownIcon } from "@kelvan-design/ui/lucide-icons"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useState } from "react"

export function Faq() {
	return (
		<YStack className="mx-auto text-center space-y-12">
			<YStack className="space-y-4">
				<H2 variant="accent-foreground">FAQ</H2>
				<TextBody variant="muted-foreground">
					Common questions about how kelvan works.
				</TextBody>
			</YStack>
			<YStack className="space-y-4 w-full">
				<FaqItem
					question="How do you prevent AI hallucinations?"
					answer="We use confidence scoring and grounding checks. Every personalization is tied to a real signal (LinkedIn post, job change, company news, etc.). Low-confidence outputs either get flagged for human review or fall back to proven templates. We'd rather send a good template than AI nonsense."
				/>
				<FaqItem
					question="Do you actually send the emails for us?"
					answer="No. We generate the personalizations and integrate with your existing outbound stack (Outreach, Salesloft, Apollo, etc.). You stay in control of your sender reputation and deliverability. We're not a full-service agency—we're a personalization engine for teams already running outbound."
				/>
				<FaqItem
					question="What if our list quality is low?"
					answer="Garbage in, garbage out. We can't personalize a bad list. If your targeting is off or your data is stale, we'll flag that during onboarding and help you tighten your ICP. We only work with teams who have a baseline list hygiene process."
				/>
				<FaqItem
					question="How long until we see results?"
					answer="Pilot tests run for 2 weeks (1,000 sends). You'll have a performance report with qualified reply lift vs your control by week 3. Growth packages show measurable lift within the first month. This isn't a 6-month black box—you'll know if it's working fast."
				/>
				<FaqItem
					question="What integrations do you support?"
					answer="We integrate with Outreach, Salesloft, Apollo, HubSpot, and most major sales engagement platforms. We can also push data via CSV/API if you have a custom workflow. If you're using something obscure, let's talk—we've built custom integrations before."
				/>
				<FaqItem
					question="How do you measure success?"
					answer="We track qualified reply rate (not just any reply—qualified interest), meetings booked per 1,000 sends, and SDR time saved. We A/B test kelvan personalizations vs your control template so you can see the exact lift. No vanity metrics, no fuzzy attribution."
				/>
			</YStack>
		</YStack>
	)
}

interface IFaqItemProps {
	question: string
	answer: string
}

function FaqItem({ question, answer }: IFaqItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	const toggleOpen = () => setIsOpen(!isOpen)
	const onMouseEnter = () => setIsHovered(true)
	const onMouseLeave = () => setIsHovered(false)

	return (
		<YStack className="w-full max-w-2xl mx-auto bg-card/70 border-border border-1 rounded-md">
			<XStack
				className={cn(
					"justify-between items-center p-4 cursor-pointer",
					isHovered ? "bg-card" : "",
				)}
				onClick={toggleOpen}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<TextBody
					size="sm"
					variant="accent-foreground"
					className="font-bold"
				>
					{question}
				</TextBody>
				<ChevronDownIcon
					className={`text-muted-foreground size-5 transition-transform duration-300 ease-in-out ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</XStack>
			{isOpen && (
				<YStack className="w-full text-left space-y-2 p-4 border-border border-t-1 bg-card/80">
					<TextBody size="sm" variant="muted-foreground">
						{answer}
					</TextBody>
				</YStack>
			)}
		</YStack>
	)
}
