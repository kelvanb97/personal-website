import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { Faq } from "#organisms/faq"
import { Footer } from "#organisms/footer"
import { Hero } from "#organisms/hero"
import { HitAWall } from "#organisms/hit-a-wall"
import { HowItWorks } from "#organisms/how-it-works"
import { ImpactOnQualifiedPipeline } from "#organisms/impact-on-qualified-pipeline"
import { Navbar } from "#organisms/navbar"
import { Packages } from "#organisms/packages"
import { SpamMail } from "#organisms/spam-mail"
// import { Team } from "#organisms/team"
import { SectionWrapper } from "./section-wrapper"

export async function HomeTemplate() {
	return (
		<YStack className="bg-background h-screen overflow-y-auto">
			<Navbar />
			<YStack className="w-full mx-auto gap-8 pb-8 -mt-12">
				<SectionWrapper
					id="home"
					className="min-h-[100vh] relative overflow-hidden bg-[linear-gradient(180deg,var(--color-card)_0%,var(--color-background)_100%)]"
				>
					<div
						className="absolute inset-0 z-0
      bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
      bg-[size:136px_136px]
      [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]
      pointer-events-none"
					/>
					<div className="relative z-10 px-3">
						<Hero />
					</div>
				</SectionWrapper>
				<SectionWrapper id="product" className="px-3">
					<ImpactOnQualifiedPipeline />
				</SectionWrapper>
				<SectionWrapper id="spam-mail" className="bg-background px-3">
					<SpamMail />
				</SectionWrapper>
				<SectionWrapper id="why" className="px-3">
					<HitAWall />
				</SectionWrapper>
				<SectionWrapper id="how-it-works" className="px-3">
					<HowItWorks />
				</SectionWrapper>
				<SectionWrapper id="pricing" className="px-3">
					<Packages />
				</SectionWrapper>
				{/* <SectionWrapper id="team">
					<Team />
				</SectionWrapper> */}
				<SectionWrapper id="faq" className="px-3">
					<Faq />
				</SectionWrapper>
			</YStack>
			<Footer />
		</YStack>
	)
}
