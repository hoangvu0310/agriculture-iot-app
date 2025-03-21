import { Modal, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '@/src/hooks/useAppTheme'

type DialogProps = {
	children: React.ReactNode
	visible: boolean
	onClose?: () => void
}

export default function Dialog({ children, visible, onClose }: DialogProps) {
	const { isDarkMode } = useAppTheme()

	return (
		<Modal visible={visible} transparent={true} animationType={'fade'} onRequestClose={onClose}>
			<TouchableWithoutFeedback onPress={onClose}>
				<View
					className={`flex-1 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'}  justify-center items-center`}
				>
					<TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}
