import { Text } from 'react-native'
import SafeAreaLayout from '@/src/components/layouts/SafeAreaLayout'
import { useLocalSearchParams } from 'expo-router'

export default function LocationDetail() {
	const { id } = useLocalSearchParams()

	return (
		<SafeAreaLayout>
			<Text>{`H E L L O ${id}`}</Text>
		</SafeAreaLayout>
	)
}
