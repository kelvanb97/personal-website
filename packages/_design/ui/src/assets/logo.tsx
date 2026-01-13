import Image from "next/image"
import Link from "next/link"
import LockupHorizontal from "./files/lockup-horizontal.png"

interface ILogoProps {
	href?: string
	width?: number
}

export function Logo({ href, width = 100 }: ILogoProps) {
	if (!href)
		return (
			<Image
				src={LockupHorizontal}
				alt="Kelvan Brandt Logo"
				width={width}
				loading="eager"
			/>
		)

	return (
		<Link href={href}>
			<Image
				src={LockupHorizontal}
				alt="Kelvan Brandt Logo"
				width={width}
			/>
		</Link>
	)
}
