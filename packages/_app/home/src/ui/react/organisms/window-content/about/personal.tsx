import {
	Carousel,
	type TCarouselSlide,
} from "@kelvan-design/ui/library/carousel"
import { TextBody } from "@kelvan-design/ui/library/text"
import { YStack } from "@kelvan-design/ui/primitives/y-stack"

export function Personal() {
	return (
		<YStack className="space-y-24 py-16 mb-16 mx-auto">
			<YStack className="max-w-4xl mx-auto space-y-4 text-center">
				<TextBody
					size="5xl"
					variant="accent-foreground"
					className="text-center"
				>
					Personal Life
				</TextBody>
				<TextBody variant="accent-foreground">
					I live in Bellingham, Washington, with my girlfriend, Linzy,
					and our two cats, Louie and Callie. We enjoy hiking, biking,
					and exploring the outdoors together.
				</TextBody>
				<TextBody variant="accent-foreground">
					<i>"Work hard, play hard"</i> are words that I try my best
					to live by. Between work and personal coding I do my best to
					touch as much grass as possible. Here is a tiny glimpse into
					what my world looks like away from the computer.
				</TextBody>
			</YStack>
			<Carousel slides={SLIDES} />
			{/* HACK: space divider */}
			<div>&nbsp;</div>
		</YStack>
	)
}

const SLIDES: TCarouselSlide[] = [
	{
		type: "image",
		src: "/assets/about/personal/me-and-linzy.jpg",
		alt: "Me and Linzy",
		width: 800,
		height: 600,
	},
	{ type: "video", src: "/assets/about/personal/mtb-falling.mov" },
	{
		type: "image",
		src: "/assets/about/personal/bellingham.jpg",
		alt: "Bellingham, Washington",
		width: 800,
		height: 600,
	},
	{ type: "video", src: "/assets/about/personal/hiking.mov" },
	{
		type: "image",
		src: "/assets/about/personal/looking-over-cliff.jpg",
		alt: "Looking over a cliff",
		width: 800,
		height: 600,
	},
	{ type: "video", src: "/assets/about/personal/sunrise.mov" },
	{
		type: "image",
		src: "/assets/about/personal/cats.jpg",
		alt: "Cats",
		width: 800,
		height: 600,
	},
	{ type: "video", src: "/assets/about/personal/jumping-bikes.mov" },
	{
		type: "image",
		src: "/assets/about/personal/me-in-lake.jpg",
		alt: "Me in a lake",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/personal/me-and-jack.jpg",
		alt: "Me and Jack",
		width: 800,
		height: 600,
	},
]
