import type { TCarouselSlide } from "@kelvan-design/ui/library/carousel"
import type { IMountainEntryProps } from "../mountaineering"

const NORTH_TWIN_SLIDES: TCarouselSlide[] = [
	{
		type: "image",
		src: "/assets/about/mountains/2025-north-twin/north-twin-1.jpg",
		alt: "North Twin Sister View 1",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-north-twin/north-twin-2.jpg",
		alt: "North Twin Sister View 2",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-north-twin/north-twin-3.jpg",
		alt: "North Twin Sister View 3",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-north-twin/north-twin-4.jpg",
		alt: "North Twin Sister View 4",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-north-twin/north-twin-5.jpg",
		alt: "North Twin Sister View 5",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-north-twin/north-twin-6.jpg",
		alt: "North Twin Sister View 6",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-north-twin/north-twin-7.jpg",
		alt: "North Twin Sister View 7",
		width: 800,
		height: 600,
	},
]

export const NORTH_TWIN_DATA: IMountainEntryProps = {
	name: "The North Twin Sister - South Ridge",
	startDate: { month: "August", day: 18, year: 2025 },
	endDate: null,
	stats: { physical: 3, exposure: 8, skill: 7 },
	dayEntries: [
		`Brutal bike ride in, absolutely in the middle of nowhere. Difficult to find
		the trail, but once found it was easy navigation. Start of ascent is similar to
		the majority of hikes. In the trees, humid, desolate. Upon reaching the alpine
		zone the terrain becomes rocky and exposed. My friend Lukas and I followed the
		southern ridge to the summit. The start is class 1 to 2 scrambling, nearing the summit
		it becomes a consistent class 3 with some class 4 sections. Views were foggy for the
		most part, but we got some views. There were a bunch of frogs at the summit, which was
		rather odd. I have coined the sisters "The Angry Mountains," they felt like they did
		not want company. You better be comfortable with exposure if you are going to attempt
		this one.`,
	],
	slides: NORTH_TWIN_SLIDES,
}
