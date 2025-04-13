import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '@/src/hooks/useAppTheme'

type AppSafeAreaProps = {
	children: React.ReactNode
	otherStyle?: string
}

export default function SafeAreaLayout({ children, otherStyle }: AppSafeAreaProps) {
	const { isDarkMode } = useAppTheme()

	return (
		<SafeAreaView
			edges={['left', 'top', 'right']}
			className={`flex-1 justify-start ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'} ${otherStyle}`}
		>
			{children}
		</SafeAreaView>
	)
}
