import { KeyboardTypeOptions, Text, View } from 'react-native'
import React from 'react'
import AppTextField from '@/src/components/textfields/AppTextField'
import { useAppTheme } from '@/src/hooks/useAppTheme'

type LocationTextFormFieldProps = {
	value: string
	onChange: (value: string) => void
	placeholder?: string
	inputLabel: string
	keyboardType?: KeyboardTypeOptions
	otherContainerStyle?: string
	otherInputStyle?: string
}

export default function LocationTextFormField({
	value,
	onChange,
	placeholder,
	inputLabel,
	keyboardType,
	otherContainerStyle,
	otherInputStyle,
}: LocationTextFormFieldProps) {
	const { isDarkMode } = useAppTheme()

	return (
		<View className={`flex-1 mb-[20px] ${otherContainerStyle}`}>
			<Text className={`font-ptsans-bold text-[18px] mb-[10px] ${isDarkMode ? 'text-white' : ''}`}>
				{inputLabel}
			</Text>
			<AppTextField
				otherTextFieldStyle={`py-[10px] border-2`}
				otherInputStyle={'text-[16px]' + ' ' + otherInputStyle}
				value={value}
				onChangeText={onChange}
				placeholder={placeholder ? placeholder : ''}
				keyboardType={keyboardType}
			/>
		</View>
	)
}
