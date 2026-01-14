import type { TCarouselSlide } from "@kelvan-design/ui/library/carousel"
import type { IMountainEntryProps } from "../mountaineering"

const BAKER_SLIDES: TCarouselSlide[] = [
	{ type: "video", src: "/assets/about/personal/sunrise.mov" },
	{
		type: "image",
		src: "/assets/about/mountains/2025-baker/baker-1.jpg",
		alt: "Mount Baker View 1",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-baker/baker-2.jpg",
		alt: "Mount Baker View 2",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-baker/baker-3.jpg",
		alt: "Mount Baker View 3",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-baker/baker-4.jpg",
		alt: "Mount Baker View 4",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-baker/baker-5.jpg",
		alt: "Mount Baker View 5",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-baker/baker-6.jpg",
		alt: "Mount Baker View 6",
		width: 800,
		height: 600,
	},
]

export const MOUNT_BAKER_DATA: IMountainEntryProps = {
	name: "Mt. Baker - Easton Glacier",
	startDate: { month: "September", day: 2, year: 2025 },
	endDate: { month: "September", day: 4, year: 2025 },
	stats: { physical: 4, exposure: 6.5, skill: 5 },
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
