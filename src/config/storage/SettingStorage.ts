import AsyncStorage from '@react-native-async-storage/async-storage'

const THEME = 'theme'
const LANGUAGE = 'language'
const IS_FIRST_TIME = 'isFirstTime'

enum ThemeOptions {
	light = 'light',
	dark = 'dark',
	system = 'system',
}
enum LanguageOptions {
	en = 'en',
	vi = 'vi',
}

export async function setTheme(value: string) {
	await AsyncStorage.setItem(THEME, value)
}

export async function getTheme() {
	return (await AsyncStorage.getItem(THEME)) as ThemeOptions
}

export async function setLanguage(value: string) {
	return await AsyncStorage.setItem(LANGUAGE, value)
}

export async function getLanguage() {
	return (await AsyncStorage.getItem(LANGUAGE)) as LanguageOptions
}

export async function clearSetting() {
	await AsyncStorage.clear()
}

export async function setIsFirstTime(value: string) {
	return await AsyncStorage.setItem(IS_FIRST_TIME, value)
}

export async function getIsFirstTime() {
	return await AsyncStorage.getItem(IS_FIRST_TIME)
}

export { ThemeOptions, LanguageOptions }
