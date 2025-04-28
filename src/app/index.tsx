import { Text, TouchableOpacity, View } from 'react-native'
import { useAppTheme } from '@src/hooks/useAppTheme'
import { ThemeOptions } from '@src/config/storage/SettingStorage'

export default function App() {
	const { isDarkMode, updateThemeSetting } = useAppTheme()

	return (
		<View className={`flex-1 justify-center items-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
			<TouchableOpacity
				className={'bg-green-500'}
				onPress={() => updateThemeSetting(ThemeOptions.light)}
			>
				<Text className={'text-amber-200'}>Change to light mode</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className={'bg-green-500'}
				onPress={() => updateThemeSetting(ThemeOptions.dark)}
			>
				<Text className={'text-amber-200'}>Change to dark mode</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className={'bg-green-500'}
				onPress={() => updateThemeSetting(ThemeOptions.system)}
			>
				<Text className={'text-amber-200'}>Change to system mode</Text>
			</TouchableOpacity>
		</View>
	)
}
