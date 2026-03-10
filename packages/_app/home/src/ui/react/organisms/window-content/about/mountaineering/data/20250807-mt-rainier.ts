import type { TCarouselSlide } from "@kelvan-design/ui/library/carousel"
import type { IMountainEntryProps } from "../mountaineering"

const RAINIER_SLIDES: TCarouselSlide[] = [
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-1.jpg",
		alt: "Mt. Rainier View 1",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-2.jpg",
		alt: "Mt. Rainier View 2",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-3.jpg",
		alt: "Mt. Rainier View 3",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-4.jpg",
		alt: "Mt. Rainier View 4",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-5.jpg",
		alt: "Mt. Rainier View 5",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-6.jpg",
		alt: "Mt. Rainier View 6",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-7.jpg",
		alt: "Mt. Rainier View 7",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-8.jpg",
		alt: "Mt. Rainier View 8",
		width: 800,
		height: 600,
	},
	{
		type: "image",
		src: "/assets/about/mountains/2025-rainier/rainier-9.jpg",
		alt: "Mt. Rainier View 9",
		width: 800,
		height: 600,
	},
]

export const MOUNT_RAINIER_DATA: IMountainEntryProps = {
	name: "Mt. Rainier - Ingraham Flats",
	startDate: { month: "August", day: 7, year: 2025 },
	endDate: { month: "August", day: 9, year: 2025 },
	stats: { physical: 5.5, exposure: 4, skill: 4 },
	dayEntries: [
		"Slog through the fog up to camp Muir. Attempted to sleep in the Gombu Hut (altitude was noticeable).",
		`Basic mountaineering training. We covered how to walk in crampons
		and use an ice axe, as well as basic rope work techniques. We then
		made the short journey from Camp Muir to Ingraham Flats (it was insanely
		hot out). Dinner is at 6pm, then you are supposed to magically
		fall asleep immediately after. Didn't happen. Summit wake up time
		is 11pm for a midnight departure.`,
		`Summit day! I had never even hiked in the dark. Now I am tasked with crossing ladders, snow
		plugs/bridges, and navigating crevasses for 6 hours in the dark. Not too terribly difficult but
		a bit unnerving. As the lead rope team we kicked in a new route, much of it over a steep pitch
		of blue ice.  Our third rope team lagged, and turned around due to exhaustion and altitude sickness.
		The elation of reaching the summit at sunrise is indescribable.   After five grueling miles up, we
		had ten brutal miles to down hike all the way back to the van.  It was hot, and very few summited
		that day.  As seen in the photos I was exhausted, after a great Nepalese meal it was lights out in the back of the van.`,
	],
	slides: RAINIER_SLIDES,
}
