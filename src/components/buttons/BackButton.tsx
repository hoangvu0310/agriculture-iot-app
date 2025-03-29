import { Image, TouchableOpacity, View } from 'react-native'
import { ICONS, COLORS } from '@/src/constants'

type BackButtonProps = {
	onPress: () => void
	otherStyles?: string
	isDarkMode: boolean
}

export default function BackButton({ onPress, otherStyles, isDarkMode }: BackButtonProps) {
	return (
		<View className={`${otherStyles}`}>
			<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
				<Image
					className={'h-[24px] w-[16px]'}
					source={ICONS.Back}
					tintColor={isDarkMode ? COLORS.white : COLORS.black}
				/>
			</TouchableOpacity>
		</View>
	)
}
