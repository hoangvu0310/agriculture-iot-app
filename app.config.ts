import { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
	const isDevelopment = process.env.APP_ENV !== 'production'

	return {
		...config,
		name: isDevelopment ? 'Agriculture IoT (Dev)' : 'Agriculture IoT', // change app name
		slug: 'agriculture-iot-app',
		version: '1.0.0',
		orientation: 'portrait',
		scheme: 'agriculture-iot-app',
		userInterfaceStyle: 'automatic',
		newArchEnabled: true,

		splash: {
			image: './assets/splash-icon.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},

		ios: {
			supportsTablet: true,
			bundleIdentifier: isDevelopment ? 'com.yourcompany.iotapp.dev' : 'com.yourcompany.iotapp', // config later
			config: {
				usesNonExemptEncryption: false,
			},
		},

		android: {
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#ffffff',
			},
			package: isDevelopment ? 'com.yourcompany.iotapp.dev' : 'com.yourcompany.iotapp',
		},

		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './assets/favicon.png',
		},

		plugins: [
			'expo-router',
			'expo-font',
			'expo-secure-store',
			[
				'@sentry/react-native/expo',
				{
					organization: process.env.EXPO_PUBLIC_SENTRY_ORG,
					project: process.env.EXPO_PUBLIC_SENTRY_PROJECT,
					url: 'https://sentry.io/',
				},
			],
		],

		experiments: {
			typedRoutes: true,
		},
	}
}
