import { Tabs } from 'expo-router'
import { TabBar } from '@/src/components/tabBar/TabBar'

export default function MainLayout() {
	return (
		<Tabs initialRouteName={'home'} tabBar={(props) => <TabBar {...props} />}>
			<Tabs.Screen name={'home'} options={{ headerShown: false, tabBarLabel: 'Home' }} />
			<Tabs.Screen name={'device'} options={{ headerShown: false, tabBarLabel: 'Device' }} />
			<Tabs.Screen name={'location'} options={{ headerShown: false, tabBarLabel: 'Location' }} />
			<Tabs.Screen name={'detection'} options={{ headerShown: false, tabBarLabel: 'Detection' }} />
			<Tabs.Screen name={'settings'} options={{ headerShown: false, tabBarLabel: 'Settings' }} />
		</Tabs>
	)
}
