import { Card, CardContent } from "@kelvan-design/ui/library/card"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { JobCard } from "../job-card"
import type { TProject } from "../projects"

const IMAGE_SRC = "/assets/projects/flip-sourcer.png"

interface IFlipSourcerJobCardProps {
	setActiveProject: (project: TProject | null) => void
}

export function FlipSourcerJobCard({
	setActiveProject,
}: IFlipSourcerJobCardProps) {
	return (
		<JobCard
			name="Flip Sourcer"
			startDate="January 2022"
			endDate="September 2023"
			src={IMAGE_SRC}
			position="Founder"
			badgeText="startup"
			onClick={() => setActiveProject("flip-sourcer")}
		/>
	)
}

export function FlipSourcer() {
	return (
		<YStack className="space-y-4 pb-16">
			<Flex className="mx-auto">
				<JobCard
					name="Flip Sourcer"
					startDate="January 2022"
					endDate="September 2023"
					src={IMAGE_SRC}
					position="Founder"
					badgeText="self-employed"
				/>
			</Flex>
			<Card>
				<CardContent>
					<YStack className="space-y-4">
						<TextBody variant="accent-foreground">
							Flip Sourcer was a product-sourcing platform I built
							end-to-end. The core problem was simple to describe
							but hard to execute: collect and normalize massive
							amounts of e-commerce product data reliably,
							cheaply, and quickly — while dealing with bot
							detection, rate limits, and constantly changing
							upstream behavior.
						</TextBody>

						<TextBody variant="accent-foreground">
							This project is where I went deepest on “real
							systems” work: distributed scraping, event-driven
							architecture, reliability guardrails, and cost
							control. It also forced me to get honest about
							engineering tradeoffs — building something that
							works at scale is very different from building
							something that works on your laptop.
						</TextBody>

						<YStack className="space-y-2">
							<TextBody
								variant="accent-foreground"
								className="font-semibold"
							>
								Highlights
							</TextBody>

							<ul className="list-disc pl-6 space-y-2">
								<li>
									<TextBody variant="accent-foreground">
										<strong>
											Cut infrastructure costs by 50%
										</strong>{" "}
										(~$10K/mo) by re-architecting the
										backend into an event-driven AWS system.
									</TextBody>
								</li>
								<li>
									<TextBody variant="accent-foreground">
										<strong>
											Scaled distributed scraping
										</strong>{" "}
										to <strong>30M+ products/day</strong>{" "}
										using rate-limited queuing and highly
										parallelized workers.
									</TextBody>
								</li>
								<li>
									<TextBody variant="accent-foreground">
										<strong>
											Tripled successful scraper responses
										</strong>{" "}
										by reverse-engineering bot detection
										patterns and integrating third-party
										APIs where it made sense.
									</TextBody>
								</li>
							</ul>
						</YStack>

						<YStack className="space-y-2">
							<TextBody
								variant="accent-foreground"
								className="font-semibold"
							>
								What I built
							</TextBody>

							<ul className="list-disc pl-6 space-y-2">
								<li>
									<TextBody variant="accent-foreground">
										A queuing system to coordinate highly
										parallel scraping processes while
										respecting strict rate limits (and
										avoiding thundering herds).
									</TextBody>
								</li>
								<li>
									<TextBody variant="accent-foreground">
										Event-driven backend services on AWS to
										decouple ingestion, enrichment, and
										downstream consumers (so scaling one
										didn’t break everything else).
									</TextBody>
								</li>
								<li>
									<TextBody variant="accent-foreground">
										CI/CD + Infrastructure-as-Code so
										deployments and infrastructure changes
										were repeatable, auditable, and
										reliable.
									</TextBody>
								</li>
							</ul>
						</YStack>

						<TextBody variant="accent-foreground">
							Flip Sourcer is the project I point to when someone
							asks if I’ve built systems that operate under
							real-world constraints: hostile environments,
							unpredictable inputs, cost pressure, and the need
							for observability + guardrails.
						</TextBody>
					</YStack>
				</CardContent>
			</Card>
		</YStack>
	)
}
