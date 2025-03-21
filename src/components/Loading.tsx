import { ActivityIndicator, Modal, View } from 'react-native'
import { COLORS } from '@/src/constants'
import { useAppTheme } from '@/src/hooks/useAppTheme'

type LoadingProps = {
	visible: boolean
}

export default function Loading({ visible }: LoadingProps) {
	const { isDarkMode } = useAppTheme()

	return (
		<Modal visible={visible} transparent={true} animationType={'fade'}>
			<View
				className={`flex-1 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'}  justify-center items-center`}
			>
				<ActivityIndicator size={80} color={COLORS.primary} />
			</View>
		</Modal>
	)
}
