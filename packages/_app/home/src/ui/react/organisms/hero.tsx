"use client"

import { cn } from "@kelvan-design/ui/cn"
import { Button } from "@kelvan-design/ui/library/button"
import { Card, CardContent } from "@kelvan-design/ui/library/card"
import { H1, H4, TextBody } from "@kelvan-design/ui/library/text"
import {
	ArrowRightIcon,
	ThumbsDownIcon,
	ThumbsUpIcon,
} from "@kelvan-design/ui/lucide-icons"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import Link from "next/link"

export function Hero() {
	return (
		<YStack className="mx-auto text-center -px-3">
			<YStack className="space-y-4">
				<H4 variant="gradient">Deliverability - Replies - Deals</H4>
				<H1
					variant="accent-foreground"
					className="font-semibold text-5xl lg:text-7xl tracking-wide w-full max-w-4xl mx-auto leading-[1.15]"
				>
					Turn outbound lists into booked meetings with{" "}
					<span className="text-gradient bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-knockout)_100%)]">
						real
					</span>{" "}
					personalization
				</H1>
			</YStack>
			<TextBody
				size="lg"
				variant="muted-foreground"
				className="mt-8 max-w-2xl mx-auto"
			>
				Grounded, role-relevant openers and angles from LinkedIn +
				company signals. Built for teams already running outbound.
			</TextBody>
			<XStack className="justify-center flex-wrap gap-4 mt-8">
				<Link href="#generate-a-sample">
					<Button size="xl" className="font-bold">
						Generate a sample <ArrowRightIcon />
					</Button>
				</Link>
				<Button
					variant="outline"
					size="xl"
					className="font-bold"
					onClick={() =>
						window.open(
							"https://cal.com/tanner-kelvan/15-min",
							"_blank",
						)
					}
				>
					Book a call
				</Button>
			</XStack>
			<PersonalizationCompare className="mt-20" />
		</YStack>
	)
}

interface IPersonalizationCampareProps {
	className?: string
}

function PersonalizationCompare({ className }: IPersonalizationCampareProps) {
	return (
		<XStack
			className={cn("justify-center flex-wrap gap-4 mt-6", className)}
		>
			<Card className="w-full max-w-sm border-border">
				<CardContent className="text-left flex flex-col space-y-4 items-start">
					<XStack className="space-x-3 items-center">
						<Flex className="border-destructive border-[0.5px] bg-destructive/20 p-2 rounded-md items-center justify-center">
							<ThumbsDownIcon className="text-destructive" />
						</Flex>
						<TextBody
							size="xl"
							className="font-bold text-accent-foreground"
						>
							Generic personalization
						</TextBody>
					</XStack>
					<TextBody size="sm" className="text-muted-foreground">
						Hi John,
						<br />
						<br /> Reaching out because we help companies just like
						Acme Inc. and I thought this might be relevant. We help
						teams improve outreach and conversion with better
						personalization. <br />
						<br />
						Open to a quick chat this week?
					</TextBody>
				</CardContent>
			</Card>
			<Card className="w-full max-w-sm border-border">
				<CardContent className="text-left flex flex-col space-y-4 items-start">
					<XStack className="space-x-3 items-center">
						<Flex className="border-destructive border-[0.5px] bg-destructive/20 p-2 rounded-md items-center justify-center">
							<ThumbsDownIcon className="text-destructive" />
						</Flex>
						<TextBody
							size="xl"
							className="font-bold text-accent-foreground"
						>
							Lazy AI personalization
						</TextBody>
					</XStack>
					<TextBody size="sm" className="text-muted-foreground">
						Hi John,
						<br />
						<br />
						Noticed Acme's recent legal entity update and that
						you've added Web3 consulting to your PMP/ISTQB-backed
						test automation offering - the Java internship listing
						shows you're scaling hands-on engineering alongside
						blockchain advising.
						<br />
						<br />
						Reaching out because we help companies just like Acme
						Inc. We help teams improve outreach and conversion with
						better personalization. <br />
						<br />
						Would you be open to a 15-minute intro to see if there's
						a fit?
					</TextBody>
				</CardContent>
			</Card>
			<Card className="w-full max-w-sm border-border">
				<CardContent className="text-left flex flex-col space-y-4 items-start">
					<XStack className="space-x-3 items-center">
						<Flex className="border-success border-[0.5px] bg-success/20 p-2 rounded-md items-center justify-center">
							<ThumbsUpIcon className="text-success" />
						</Flex>
						<TextBody
							size="xl"
							className="font-bold text-accent-foreground"
						>
							Our personalization
						</TextBody>
					</XStack>
					<TextBody size="sm" className="text-muted-foreground">
						Hi John,
						<br />
						<br />
						Expanding your Web3 offerings into consulting creates
						new outbound opportunities.
						<br />
						<br />
						I'd like to create you a list of 100 relevant prospects
						with personalized openers.
						<br />
						<br />
						Let me know if that sounds interesting.
					</TextBody>
				</CardContent>
			</Card>
		</XStack>
	)
}
