import { Lottie, type TLottieProps } from "../lottie"
import stackingCubesAnimation from "./stacking-cubes-animation.json"

export function StackingCubesAnimation({
	...props
}: Omit<TLottieProps, "animationData">) {
	return <Lottie animationData={stackingCubesAnimation} {...props} />
}
