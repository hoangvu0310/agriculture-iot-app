import NetInfo from '@react-native-community/netinfo'

export default async function checkConnection(): Promise<boolean> {
	const state = await NetInfo.fetch()
	return state.isConnected ?? false
}
