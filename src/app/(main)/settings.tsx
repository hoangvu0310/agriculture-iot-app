import MainTabLayout from '@/src/components/layouts/MainTabLayout'
import SafeAreaLayout from '@/src/components/layouts/SafeAreaLayout'

export default function Settings() {
	return (
		<SafeAreaLayout>
			<MainTabLayout title={'Settings'}></MainTabLayout>
		</SafeAreaLayout>
	)
}
