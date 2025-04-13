import { ImageSourcePropType, Pressable } from 'react-native'
import { COLORS } from '@/src/constants'
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

type TabBarButtonProps = {
	isFocused: boolean
	onPress: () => void
	iconSource: ImageSourcePropType
	label: string
	isDarkMode: boolean
}

export default function TabBarButton({
	isFocused,
	onPress,
	iconSource,
	label,
	isDarkMode,
}: TabBarButtonProps) {
	const scale = useSharedValue(0)

	const animatedIconStyle = useAnimatedStyle(() => {
		const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
		const top = interpolate(scale.value, [0, 1], [1, 12])
		return {
			transform: [
				{
					scale: scaleValue,
				},
			],
			top: top,
		}
	})

	const animatedTextStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scale.value, [0, 1], [1, 0])

		return {
			opacity: opacity,
		}
	})

	useEffect(() => {
		scale.value = withTiming(isFocused ? 1 : 0, { duration: 500 })
	}, [scale, isFocused])

	return (
		<Pressable onPress={onPress} className={`flex-1 justify-center items-center`}>
			<Animated.View className={`py-2 w-[60px] justify-center items-center`}>
				<Animated.Image
					source={iconSource}
					tintColor={`${isFocused ? COLORS.primary : isDarkMode ? COLORS.white : COLORS.black}`}
					className={`w-[20px] h-[20px]`}
					style={[animatedIconStyle]}
				/>
				<Animated.Text
					className={`text-[14px] font-ptsans pt-1 ${isFocused ? 'text-primary' : isDarkMode ? 'text-white' : 'text-black'}`}
					style={[animatedTextStyle]}
				>
					{label}
				</Animated.Text>
			</Animated.View>
		</Pressable>
	)
}
