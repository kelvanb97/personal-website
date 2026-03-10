import type { TCarouselSlide } from "@kelvan-design/ui/library/carousel"
import type { IMountainEntryProps } from "../mountaineering"

const DANIEL_SLIDES: TCarouselSlide[] = [
	{
		type: "image",
		src: "/assets/about/personal/me-in-lake.jpg",
		alt: "Me in a lake",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-daniel/daniel-1.jpg",
		alt: "Mount Daniel View 1",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-daniel/daniel-2.jpg",
		alt: "Mount Daniel View 2",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-daniel/daniel-3.jpg",
		alt: "Mount Daniel View 3",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-daniel/daniel-4.jpg",
		alt: "Mount Daniel View 4",
		width: 800,
		height: 600,
	},
]

export const MOUNT_DANIEL_DATA: IMountainEntryProps = {
	name: "Mt. Daniel",
	startDate: { month: "September", day: 18, year: 2025 },
	endDate: { month: "September", day: 20, year: 2025 },
	stats: { physical: 3.5, exposure: 4.5, skill: 5 },
	dayEntries: [
		"Took a trip with all my close friends, primarily as a celebration of life for one of our friends. Hiked up to Snow Lake. ~7 mile hike in, much longer than I remembered.",
		"Spent the day at Snow Lake, enjoying the scenery and relaxing with friends. Then late afternoon made the trek up to Mt. Daniel. It is primarily a class 3 scramble, but it is essentially vertical the entire way up.",
		"Down climb, nothing super notable here. Woke up and left.",
	],
	slides: DANIEL_SLIDES,
}
