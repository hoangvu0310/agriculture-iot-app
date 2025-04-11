import { TextInput, TextInputProps, View } from 'react-native'
import { COLORS } from '@/src/constants'
import { useState } from 'react'
import { useAppTheme } from '@/src/hooks/useAppTheme'

interface AppTextFieldProps extends TextInputProps {
	otherTextFieldStyle?: string
	otherInputStyle?: string
}

export default function AppTextField({
	otherTextFieldStyle,
	otherInputStyle,
	...props
}: AppTextFieldProps) {
	const [isFocused, setFocused] = useState(false)
	const { isDarkMode } = useAppTheme()

	return (
		<View
			className={`px-[10px] rounded-[10px] ${isFocused ? 'border-primary' : 'border-light-grey1'} ${otherTextFieldStyle}`}
		>
			<TextInput
				{...props}
				cursorColor={COLORS.primary}
				placeholderTextColor={isDarkMode ? COLORS.dark.grey2 : COLORS.light.grey2}
				className={`font-ptsans ${isDarkMode ? 'text-white' : 'text-light-grey3'}  ${otherInputStyle}`}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
		</View>
	)
}
