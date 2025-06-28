import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@src/i18n/locales/en.json'
import vi from '@src/i18n/locales/vi.json'
import { setLanguage } from '@/src/config/storage/SettingStorage'

enum LanguageOptions {
	en = 'en',
	vi = 'vi',
}

i18next.use(initReactI18next).init({
	compatibilityJSON: 'v4',
	fallbackLng: 'en',
	resources: {
		en: { translation: en },
		vi: { translation: vi },
	},
	interpolation: {
		escapeValue: false,
	},
	react: {
		useSuspense: false,
	},
})

export const changeAppLanguage = async (lang: LanguageOptions) => {
	await i18next.changeLanguage(lang)
	await setLanguage(lang)
}

export default i18next
