import { useContext } from 'react'
import { AppThemeContext } from '@/src/context/AppThemeContext'

export const useAppTheme = () => {
	return useContext(AppThemeContext)
}
