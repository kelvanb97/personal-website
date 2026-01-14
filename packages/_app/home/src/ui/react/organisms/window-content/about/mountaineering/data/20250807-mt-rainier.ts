import type { TCarouselSlide } from "@kelvan-design/ui/library/carousel"
import type { IMountainEntryProps } from "../mountaineering"

const RAINIER_SLIDES: TCarouselSlide[] = [
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

export const MOUNT_RAINIER_DATA: IMountainEntryProps = {
	name: "Mt. Rainier - Ingraham Flats",
	startDate: { month: "August", day: 7, year: 2025 },
	endDate: { month: "August", day: 9, year: 2025 },
	stats: { physical: 4, exposure: 4, skill: 4 },
	dayEntries: [
		"Slog through the fog up to camp Muir. Attempted to sleep in the Gombu Hut (altitude was noticeable).",
		`Basic mountaineering training. We covered how to walk in crampons
		and use an ice axe, as well as basic rope work techniques. We then
		made the short journey from Camp Muir to Ingraham Flats (it was
		f****** hot out). Dinner is at 6pm, then you are supposed to magically
		fall asleep immediately after. Didn't happen. Summit wake up time
		is midnight.`,
		`Summit day! I have never even hiked in the dark... now I am tasked with crossing ladders, snow
		plugs/brides, and navigating crevasses. Not too terribly difficult but a bit unnerving. The rest
		is a bit of a blur, sleep deprivation + altitude effects. One rope group had to turn around due to
		altitude sickness. The feeling of elation upon reaching the summit is indescribable. Down climbing
		sucked, it was hot, and there were tens if not hundreds of people. I was also exhausted. As seen in
		in the photos, I fell asleep on the bus. I couldn't stay awake.`,
	],
	slides: RAINIER_SLIDES,
}
