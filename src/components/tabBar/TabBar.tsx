import { LayoutChangeEvent, View } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import Icons from '@/src/constants/icons'
import TabBarButton from '@/src/components/tabBar/TabBarButton'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect, useState } from 'react'

const tabIcons: Record<string, any> = {
	Home: Icons.Home,
	Device: Icons.Device,
	Location: Icons.Location,
	Detection: Icons.Detection,
	Settings: Icons.Settings,
}

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
	const { isDarkMode } = useAppTheme()
	const [dimension, setDimension] = useState({ height: 0, width: 0 })

	const buttonWidth = dimension.width / state.routes.length
	const highlightPositionX = useSharedValue(0)
	const animatedHighlightStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: highlightPositionX.value,
				},
			],
		}
	})

	const onTabBarLayout = (e: LayoutChangeEvent) => {
		setDimension({
			height: e.nativeEvent.layout.height,
			width: e.nativeEvent.layout.width,
		})
	}

	useEffect(() => {
		// Change highlight X position, highlight width is 60px
		highlightPositionX.value = withTiming(buttonWidth * state.index, {
			duration: 500,
		})
	}, [state.index])

	return (
		<View
			onLayout={onTabBarLayout}
			className={`self-center max-w-[700px] justify-between flex-row ${isDarkMode ? 'bg-dark-background shadow-md shadow-light-grey4' : 'bg-light-background shadow-md shadow-light-grey5'}`}
		>
			<Animated.View
				style={[animatedHighlightStyle, { left: (buttonWidth - 50) / 2 }]}
				className={`absolute top-0 h-[2px] w-[50px] bg-primary`}
			/>

			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]
				const label = options.tabBarLabel || options.title || route.name

				const isFocused = state.index === index
				const iconSource = tabIcons[label]

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name)
					}
				}

				return (
					<TabBarButton
						key={label}
						isFocused={isFocused}
						onPress={onPress}
						iconSource={iconSource}
						label={label}
						isDarkMode={isDarkMode}
					/>

					// <TouchableOpacity
					// 	key={index}
					// 	accessibilityRole="button"
					// 	accessibilityState={isFocused ? { selected: true } : {}}
					// 	accessibilityLabel={options.tabBarAccessibilityLabel}
					// 	testID={options.tabBarTestID}
					// 	onPress={onPress}
					// 	className={`flex-1 justify-center items-center`}
					// >
					// 	<View
					// 		className={`py-2 w-[60px] justify-center items-center ${isFocused ? 'border-primary border-t-[2px]' : ''}`}
					// 	>
					// 		<Image
					// 			source={iconSource}
					// 			tintColor={`${isFocused ? COLORS.primary : isDarkMode ? COLORS.white : COLORS.black}`}
					// 			className={`w-[30px] h-[30px]`}
					// 		/>
					// 		<Text
					// 			className={`text-[15px] font-ptsans-bold pt-1 ${isFocused ? 'text-primary' : isDarkMode ? 'text-white' : 'text-black'}`}
					// 		>
					// 			{label}
					// 		</Text>
					// 	</View>
					// </TouchableOpacity>
				)
			})}
		</View>
	)
}
