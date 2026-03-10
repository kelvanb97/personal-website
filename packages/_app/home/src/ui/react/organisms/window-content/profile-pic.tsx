import { Flex } from "@kelvan-design/ui/primitives/flex"
import { useDesktopItem } from "#store/desktop-store"
import Image from "next/image"
import { useMemo } from "react"

export function ProfilePic() {
	const { window } = useDesktopItem("profile-pic.jpg")

	const size = useMemo(
		() =>
			(window.width > window.height ? window.height : window.width) * 0.8,
		[window.width, window.height],
	)

	return (
		<Flex className="w-full h-full justify-center items-center p-3">
			<Image
				src="/assets/desktop-shortcut/profile-pic.jpg"
				alt="Profile Picture"
				width={size}
				height={size}
			/>
		</Flex>
	)
}
