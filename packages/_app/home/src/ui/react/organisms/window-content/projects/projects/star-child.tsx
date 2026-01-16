import { Card, CardContent } from "@kelvan-design/ui/library/card"
import { TextBody } from "@kelvan-design/ui/library/text"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { JobCard } from "../job-card"
import type { TProject } from "../projects"

const IMAGE_SRC = "/assets/projects/star-child.png"

interface IStarChildJobCardProps {
	setActiveProject: (project: TProject | null) => void
}

export function StarChildJobCard({ setActiveProject }: IStarChildJobCardProps) {
	return (
		<JobCard
			name="STAR/CHILD"
			startDate="October 2023"
			endDate="October 2024"
			src={IMAGE_SRC}
			position="Tech Lead"
			badgeText="contract"
			onClick={() => setActiveProject("star-child")}
		/>
	)
}

export function StarChild() {
	return (
		<YStack className="space-y-4 pb-16">
			<Flex className="mx-auto">
				<JobCard
					name="STAR/CHILD"
					startDate="October 2023"
					endDate="October 2024"
					src={IMAGE_SRC}
					position="Technical Lead"
					badgeText="contract"
				/>
			</Flex>

			<Card>
				<CardContent>
					<YStack className="space-y-4">
						<TextBody variant="accent-foreground">
							STAR/CHILD is a cross-platform astrology app built
							specifically for parenting — it breaks down each
							family member's chart and turns it into practical
							insight you can actually use day-to-day.
						</TextBody>

						<TextBody variant="accent-foreground">
							I joined as the Technical Lead before a single line
							of code was written. I was initially tasked with
							creating a web, android, and iOS app, in 4 months.
						</TextBody>

						<YStack className="space-y-2">
							<TextBody
								variant="accent-foreground"
								className="font-semibold"
							>
								What I did at STAR/CHILD
							</TextBody>

							<ul className="list-disc pl-6 space-y-2">
								<li>
									<TextBody variant="accent-foreground">
										Recruited and led a 4-engineer team,
										built a tight feedback loop (pairing +
										regular reviews), and tripled sprint
										velocity — delivering a cross-platform
										MVP (web, iOS, Android) in ~5 months.
									</TextBody>
								</li>

								<li>
									<TextBody variant="accent-foreground">
										Built an ETL pipeline and a bulk GROQ
										query layer to cut API latency from ~6s
										to ~0.75s (which unlocked a much
										snappier “daily content” experience).
									</TextBody>
								</li>

								<li>
									<TextBody variant="accent-foreground">
										Developed a unified Next.js + Expo
										router, boosting app performance ~5x by
										eliminating memory-heavy native screens
										and reducing the amount of expensive
										navigation/state work happening per
										session.
									</TextBody>
								</li>

								<li>
									<TextBody variant="accent-foreground">
										Partnered directly with Product, Design,
										and Marketing so engineering priorities
										mapped cleanly to business goals (what
										we shipped, why we shipped it, and how
										we measured success).
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
