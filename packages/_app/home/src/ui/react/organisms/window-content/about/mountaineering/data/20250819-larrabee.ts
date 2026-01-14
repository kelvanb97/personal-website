import type { TCarouselSlide } from "@kelvan-design/ui/library/carousel"
import type { IMountainEntryProps } from "../mountaineering"

const LARRABEE_SLIDES: TCarouselSlide[] = [
	{ type: "video", src: "/assets/about/personal/hiking.mov" },
	{
		type: "image",
		src: "/assets/about/mountains/2025-larrabee/larrabee-1.jpg",
		alt: "Mount Larrabee View 1",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-larrabee/larrabee-2.jpg",
		alt: "Mount Larrabee View 2",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-larrabee/larrabee-3.jpg",
		alt: "Mount Larrabee View 3",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-larrabee/larrabee-4.jpg",
		alt: "Mount Larrabee View 4",
		width: 800,
		height: 600,
	},
]

export const LARRABEE_DATA: IMountainEntryProps = {
	name: "Mount Larrabee",
	startDate: { month: "August", day: 19, year: 2025 },
	endDate: null,
	stats: { physical: 2, exposure: 5, skill: 4 },
	dayEntries: [
		`Relatively short scramble relative to its location. Nice drive in
		on Twin Lakes Road (voted sketchiest road in the country at one point).
		Conditions of this scramble were absolute bullshit. The entire mountain
		is choss. So while this would be a very easy scramble solo, with a group
		of 3 it felt rather treacherous at times. Also, have to keep in mind that
		their may be groups ahead that we couldn't see. Probably won't do this
		one again, at least not for a while.`,
	],
	slides: LARRABEE_SLIDES,
}
