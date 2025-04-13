import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import BackButton from '@/src/components/buttons/BackButton'
import { useRouter } from 'expo-router'

type MainTabLayoutProps = {
	children: React.ReactNode
	title: string
	hasBackButton: boolean
}

export default function MainTabLayout({ children, title, hasBackButton }: MainTabLayoutProps) {
	const { isDarkMode } = useAppTheme()
	const router = useRouter()

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View className={'flex-1 px-[15px]'}>
				<View className={'flex-row w-full justify-center items-center mb-[10px]'}>
					{hasBackButton && (
						<BackButton
							onPress={() => router.back()}
							isDarkMode={isDarkMode}
							otherStyles={'absolute left-[0px]'}
						/>
					)}
					<Text className={`font-ptsans-bold text-[24px] ${isDarkMode ? 'text-white' : ''}`}>
						{title}
					</Text>
				</View>
				<View className={`w-full h-[1px] ${isDarkMode ? 'bg-white' : 'bg-light-grey2'}`} />
				<View className={'flex-1 mt-[20px] mb-[10px]'}>{children}</View>
			</View>
		</TouchableWithoutFeedback>
	)
}
