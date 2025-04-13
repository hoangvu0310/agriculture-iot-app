import { Tabs } from 'expo-router'
import { TabBar } from '@/src/components/tabBar/TabBar'
import useTranslationHelper from '@/src/hooks/useTranslationHelper'

export default function MainLayout() {
	const t = useTranslationHelper()

	return (
		<Tabs initialRouteName={'home'} tabBar={(props) => <TabBar {...props} />}>
			<Tabs.Screen
				name={'home'}
				options={{ headerShown: false, tabBarLabel: t('tabLabel.home') }}
			/>
			<Tabs.Screen
				name={'location'}
				options={{ headerShown: false, tabBarLabel: t('tabLabel.location') }}
			/>
			<Tabs.Screen
				name={'settings'}
				options={{ headerShown: false, tabBarLabel: t('tabLabel.settings') }}
			/>
		</Tabs>
	)
}
