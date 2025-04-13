import MainTabLayout from '@/src/components/layouts/MainTabLayout'
import SafeAreaLayout from '@/src/components/layouts/SafeAreaLayout'

export default function Home() {
	return (
		<SafeAreaLayout>
			<MainTabLayout title={'Home'}></MainTabLayout>
		</SafeAreaLayout>
	)
}
