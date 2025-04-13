import { ActivityIndicator, Modal, View } from 'react-native'
import { COLORS } from '@/src/constants'
import { useAppTheme } from '@/src/hooks/useAppTheme'

type LoadingProps = {
	visible: boolean
	size: number
	otherStyles?: string
}

export default function Loading({ visible, size, otherStyles }: LoadingProps) {
	const { isDarkMode } = useAppTheme()

	return (
		<Modal visible={visible} transparent={true} animationType={'fade'}>
			<View
				className={`flex-1 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'}  justify-center items-center ${otherStyles}`}
			>
				<ActivityIndicator size={size} color={COLORS.primary} />
			</View>
		</Modal>
	)
}
