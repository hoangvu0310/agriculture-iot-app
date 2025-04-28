import { Stack, useNavigationContainerRef } from 'expo-router'
import * as Sentry from '@sentry/react-native'
import { isRunningInExpoGo } from 'expo'
import { useEffect } from 'react'

import '@/global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppThemeProvider from '@src/context/AppThemeContext'
import { Provider } from 'react-redux'
import { store } from '@src/redux/store'

const navigationIntegration = Sentry.reactNavigationIntegration({
	enableTimeToInitialDisplay: !isRunningInExpoGo(),
})

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	debug: true,
	tracesSampleRate: 1.0,
	integrations: [navigationIntegration],
	enableNativeFramesTracking: !isRunningInExpoGo(),
	enableUserInteractionTracing: true,

	// Configure Session Replay
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: __DEV__,
})

// SplashScreen.preventAutoHideAsync()

function RootLayout() {
	const ref = useNavigationContainerRef()

	useEffect(() => {
		if (ref?.current) {
			navigationIntegration.registerNavigationContainer(ref)
		}
	}, [ref])

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView>
				<AppThemeProvider>
					<Provider store={store}>
						<Stack>
							<Stack.Screen name={'index'} options={{ headerShown: false }} />
						</Stack>
					</Provider>
				</AppThemeProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

export default Sentry.wrap(RootLayout)
