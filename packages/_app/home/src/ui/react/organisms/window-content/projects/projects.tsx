import { Button } from "@kelvan-design/ui/library/button"
import { TextBody } from "@kelvan-design/ui/library/text"
import {
	ArrowUpRightIcon,
	ChevronLeftIcon,
} from "@kelvan-design/ui/lucide-icons"
import { Flex } from "@kelvan-design/ui/primitives/flex"
import { XStack } from "@kelvan-design/ui/primitives/x-stack"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"
import { useCallback, useMemo, useState } from "react"
import { FlipSourcer, FlipSourcerJobCard } from "./projects/flip-sourcer"
import { Kaiber, KaiberJobCard } from "./projects/kaiber"
import { Kelvco, KelvcoJobCard } from "./projects/kelvco"
import { StarChild, StarChildJobCard } from "./projects/star-child"

export type TProject = "kelvco" | "kaiber" | "star-child" | "flip-sourcer"

export function Projects() {
	const [activeProject, setActiveProject] = useState<TProject | null>(null)

	return (
		<Flex className="w-full h-full py-16 overflow-auto">
			{!activeProject ? (
				<ProjectsHome setActiveProject={setActiveProject} />
			) : (
				<ActiveProject
					activeProject={activeProject}
					setActiveProject={setActiveProject}
				/>
			)}
		</Flex>
	)
}

interface IActiveProjectProps {
	activeProject: TProject | null
	setActiveProject: (project: TProject | null) => void
}

function ActiveProject({
	activeProject,
	setActiveProject,
}: IActiveProjectProps) {
	const displayProject = useMemo(() => {
		switch (activeProject) {
			case "kelvco":
				return <Kelvco />
			case "kaiber":
				return <Kaiber />
			case "star-child":
				return <StarChild />
			case "flip-sourcer":
				return <FlipSourcer />
			default:
				return null
		}
	}, [activeProject])

	const link = useMemo(() => {
		switch (activeProject) {
			case "kelvco":
				return null
			case "kaiber":
				return "https://kaiber.ai"
			case "star-child":
				return "https://starchild.com"
			case "flip-sourcer":
				return "https://flipsourcer.com"
			default:
				return null
		}
	}, [activeProject])

	const handleBack = useCallback(
		() => setActiveProject(null),
		[setActiveProject],
	)

	return (
		<YStack className="min-w-5xl max-w-5xl mx-auto space-y-16">
			<XStack className="justify-between">
				{link && (
					<Flex className="items-center">
						<Button
							variant="outline"
							className="rounded-full"
							onClick={() => window.open(link, "_blank")}
						>
							Visit site
							<ArrowUpRightIcon />
						</Button>
					</Flex>
				)}
				<Button
					className="justify-end ml-auto"
					variant="outline"
					onClick={handleBack}
				>
					<ChevronLeftIcon />
					Back
				</Button>
			</XStack>
			{displayProject}
		</YStack>
	)
}

interface IProjectsHomeProps {
	setActiveProject: (project: TProject | null) => void
}

function ProjectsHome({ setActiveProject }: IProjectsHomeProps) {
	return (
		<YStack className="min-w-5xl max-w-5xl mx-auto space-y-16">
			<YStack className="space-y-4 text-center">
				<TextBody size="5xl" variant="accent-foreground">
					Projects
				</TextBody>
				<TextBody
					variant="accent-foreground"
					className="text-center px-24"
				>
					I'm a Senior Full-Stack Engineer (front end focused) with{" "}
					{new Date().getFullYear() - 2019}+ years of professional
					experience building scalable web apps and high-quality
					interfaces. I'm typically brought in to untangle complex
					systems, raise engineering standards, and ship improvements
					that make teams faster — better DX, clearer architecture,
					and fewer sharp edges in production.
				</TextBody>
			</YStack>
			<Flex className="flex-wrap gap-12 justify-center">
				<KelvcoJobCard setActiveProject={setActiveProject} />
				<KaiberJobCard setActiveProject={setActiveProject} />
				<StarChildJobCard setActiveProject={setActiveProject} />
				<FlipSourcerJobCard setActiveProject={setActiveProject} />
			</Flex>
			<TextBody
				variant="muted-foreground"
				size="sm"
				className="text-center px-16"
			>
				*I have worked with many other clients as well as projects of my
				own. If you are curious, feel free to ask!
			</TextBody>
			{/* HACK: space divider */}
			<div>&nbsp;</div>
		</YStack>
	)
}
