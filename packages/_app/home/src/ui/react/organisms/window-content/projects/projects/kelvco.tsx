import { Card, CardContent } from "@kelvan-design/ui/library/card"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { JobCard } from "../job-card"
import type { TProject } from "../projects"

const IMAGE_SRC = "/assets/desktop-shortcut/k-square.png"

interface IKelvcoJobCardProps {
	setActiveProject: (project: TProject | null) => void
}

export function KelvcoJobCard({ setActiveProject }: IKelvcoJobCardProps) {
	return (
		<JobCard
			name="Kelvco LLC"
			startDate="October 2020"
			endDate="Current"
			src={IMAGE_SRC}
			position="Owner"
			onClick={() => setActiveProject("kelvco")}
		/>
	)
}

export function Kelvco() {
	return (
		<YStack className="space-y-4 pb-16">
			<Flex className="mx-auto">
				<JobCard
					name="Kelvco LLC"
					startDate="October 2020"
					endDate="Current"
					src={IMAGE_SRC}
					position="Owner"
				/>
			</Flex>
			<Card>
				<CardContent>
					<YStack className="space-y-4">
						<TextBody variant="accent-foreground">
							Kelvco LLC is my consulting umbrella for all tech
							work with early-stage startups and growth-stage
							teams across web, mobile, and AI. It started pretty
							much on accident — people started reaching out to me
							for help with projects in college. It started to
							snowball from there.
						</TextBody>
						<TextBody variant="accent-foreground">
							Since then, Kelvco has become the place where I
							“parachute in” when a team needs leverage:
							stabilizing performance, fixing foundational DX
							issues that are slowing everyone down, shipping
							high-impact features, and helping teams deliver with
							clearer technical direction (without me pretending
							to be a manager).
						</TextBody>
						<YStack className="space-y-2">
							<TextBody
								variant="accent-foreground"
								className="font-semibold"
							>
								What I typically do under Kelvco
							</TextBody>

							<ul className="list-disc pl-6 space-y-2">
								<li>
									<TextBody variant="accent-foreground">
										Build and harden production web/mobile
										apps (Next.js, React, Node, Postgres,
										AWS), with an emphasis on
										maintainability and performance.
									</TextBody>
								</li>
								<li>
									<TextBody variant="accent-foreground">
										Unblock teams by fixing high-friction
										developer experience problems (tooling,
										linting/typing hygiene, build speed,
										reliability).
									</TextBody>
								</li>
								<li>
									<TextBody variant="accent-foreground">
										Lead execution when needed (small team
										leadership, pairing, feedback loops, and
										shipping cadence).
									</TextBody>
								</li>
							</ul>
						</YStack>
					</YStack>
				</CardContent>
			</Card>
		</YStack>
	)
}
