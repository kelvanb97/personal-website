import type { TCarouselSlide } from "@kelvan-design/ui/library/carousel"
import type { IMountainEntryProps } from "../mountaineering"

const BAKER_SLIDES: TCarouselSlide[] = [
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

export const MOUNT_BAKER_DATA: IMountainEntryProps = {
	name: "Mt. Baker - Easton Glacier",
	startDate: { month: "September", day: 2, year: 2025 },
	endDate: { month: "September", day: 4, year: 2025 },
	stats: { physical: 2, exposure: 7, skill: 7 },
	dayEntries: [
		"Got heat stroke on the way to base camp. Took a dip in a tarn. Caught some good rest at 8pm (unheard of for me).",
		"Stayed at camp for the day and practiced crevasse rescue techniques.",
		`Began our ascent to the summit at 3am.
							Reached the summit by 9am. The way up was more or less
							"chill", showing some signs of late season melt off. The
							way down was the furthest thing from "chill". Both
							myself and James poked through. We were playing leap
							frog jumping over crevasses for over an hour straight on
							blue ice. Also a massive bus sized serac broke off a
							mile to our east.`,
	],
	slides: BAKER_SLIDES,
}
