import { useTranslation } from 'react-i18next'

export default function useTranslationHelper() {
	const { t } = useTranslation()
	return t
}
