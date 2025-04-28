import React, { createContext, useCallback, useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import { getTheme, setTheme, ThemeOptions } from '@/src/config/storage/SettingStorage'

type AppThemeContextProps = {
	isDarkMode: boolean
	updateThemeSetting: (theme: ThemeOptions) => Promise<void>
}

export const AppThemeContext = createContext<AppThemeContextProps>({
	isDarkMode: false,
	updateThemeSetting: async () => {},
})

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(false)

	const updateThemeSetting = useCallback(async (theme: string) => {
		await setTheme(theme)
		if (theme === ThemeOptions.system) {
			const systemColorScheme = Appearance.getColorScheme()
			setIsDarkMode(systemColorScheme === ThemeOptions.dark)
		} else {
			setIsDarkMode(theme === ThemeOptions.dark)
		}
	}, [])

	const loadTheme = useCallback(async () => {
		const savedTheme = await getTheme()
		await updateThemeSetting(savedTheme || ThemeOptions.light)
	}, [updateThemeSetting])

	useEffect(() => {
		loadTheme()
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			getTheme().then((themeSetting) => {
				if (themeSetting === ThemeOptions.system) {
					setIsDarkMode(colorScheme === ThemeOptions.dark)
				}
			})
		})
		return () => subscription.remove()
	}, [loadTheme])

	return (
		<AppThemeContext.Provider value={{ isDarkMode, updateThemeSetting }}>
			{children}
		</AppThemeContext.Provider>
	)
}
