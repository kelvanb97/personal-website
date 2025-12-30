import { TextBody } from "@kelvan-design/ui/library/text"
import { Logo } from "@kelvan-design/ui/logo"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import Link from "next/link"

export function Footer() {
	return (
		<footer className="border-border border-t pt-12 pb-8">
			<YStack className="container mx-auto space-y-12 px-3">
				<Flex className="gap-16 flex-col lg:flex-row lg:justify-between lg:gap-32 flex-wrap">
					<YStack className="space-y-4 w-full max-w-3xs">
						<Link href="#home">
							<Logo />
						</Link>
						<TextBody size="sm" variant="muted-foreground">
							Cold email personalization that converts.
						</TextBody>
						<a href="mailto:contact@kelvan.com">
							<TextBody
								size="sm"
								variant="muted-foreground"
								className="hover:underline"
							>
								contact@kelvan.com
							</TextBody>
						</a>
					</YStack>
					<Flex className="gap-16 flex-col lg:flex-row lg:gap-32 flex-wrap">
						<YStack className="space-y-4">
							<TextBody
								size="sm"
								variant="accent-foreground"
								className="font-bold"
							>
								Product
							</TextBody>
							<YStack className="space-y-2">
								<Link href="#product">
									<TextBody
										size="sm"
										variant="muted-foreground"
										className="hover:underline"
									>
										Impact
									</TextBody>
								</Link>
								<Link href="#how-it-works">
									<TextBody
										size="sm"
										variant="muted-foreground"
										className="hover:underline"
									>
										How it works
									</TextBody>
								</Link>
								<Link href="#generate-a-sample">
									<TextBody
										size="sm"
										variant="muted-foreground"
										className="hover:underline"
									>
										Generate a sample
									</TextBody>
								</Link>
								<Link href="#pricing">
									<TextBody
										size="sm"
										variant="muted-foreground"
										className="hover:underline"
									>
										Pricing
									</TextBody>
								</Link>
								<Link href="#faq">
									<TextBody
										size="sm"
										variant="muted-foreground"
										className="hover:underline"
									>
										FAQ
									</TextBody>
								</Link>
							</YStack>
						</YStack>
						<YStack className="space-y-4">
							<TextBody
								size="sm"
								variant="accent-foreground"
								className="font-bold"
							>
								Legal
							</TextBody>
							<YStack className="space-y-2">
								<Link href="/privacy-policy">
									<TextBody
										size="sm"
										variant="muted-foreground"
										className="hover:underline"
									>
										Privacy policy
									</TextBody>
								</Link>
								<Link href="/terms-of-service">
									<TextBody
										size="sm"
										variant="muted-foreground"
										className="hover:underline"
									>
										Terms of service
									</TextBody>
								</Link>
								<Link href="/cookie-policy">
									<TextBody
										size="sm"
										variant="muted-foreground"
										className="hover:underline"
									>
										Cookie policy
									</TextBody>
								</Link>
							</YStack>
						</YStack>
					</Flex>
				</Flex>
				<YStack className="border-border border-t">
					<TextBody
						size="xs"
						variant="muted-foreground"
						className="text-center mt-8"
					>
						&copy; {new Date().getFullYear()} kelvan. All rights
						reserved.
					</TextBody>
				</YStack>
			</YStack>
		</footer>
	)
}
