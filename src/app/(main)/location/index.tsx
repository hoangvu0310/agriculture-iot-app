import MainTabLayout from '@/src/components/layouts/MainTabLayout'
import { FlatList, RefreshControl, View } from 'react-native'
import { useAppDispatch } from '@/src/hooks/useAppDispatch'
import { useAppSelector } from '@/src/hooks/useAppSelector'
import { RootState } from '@/src/redux/store'
import { deleteLocation, getLocation } from '@/src/redux/locationSlice'
import { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import LocationCardView from '@/src/components/LocationCardView'
import { COLORS, WINDOW } from '@/src/constants'
import CustomButton from '@/src/components/buttons/CustomButton'
import LocationFormBottomSheet from '@/src/components/bottomsheets/LocationFormBottomSheet'
import useTranslationHelper from '@/src/hooks/useTranslationHelper'
import AppTextField from '@/src/components/textfields/AppTextField'
import { FormType } from '@/src/components/LocationFormView'
import Toast from 'react-native-toast-message'
import { LocationModel } from '@/src/data/model/LocationModel'
import SafeAreaLayout from '@/src/components/layouts/SafeAreaLayout'

export default function Index() {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const { locationList, isLoading, error, success } = useAppSelector(
		(state: RootState) => state.location,
	)
	const numColumns = Math.floor(WINDOW.WIDTH / 300)
	const [openCreateSheet, setOpenCreateSheet] = useState(false)
	const [openUpdateSheet, setOpenUpdateSheet] = useState(false)
	const [locationToUpdate, setLocationToUpdate] = useState<LocationModel | undefined>(undefined)
	const [refreshing, setRefreshing] = useState(false)
	const t = useTranslationHelper()

	useEffect(() => {
		dispatch(getLocation())
	}, [])

	useEffect(() => {
		if (!isLoading) {
			setRefreshing(false)
		}
	}, [isLoading])

	useEffect(() => {
		if (error) {
			Toast.show({
				type: 'errorToast',
				text1: t(error),
				visibilityTime: 3000,
			})
		}
		if (success) {
			setOpenCreateSheet(false)
			setOpenUpdateSheet(false)
			setLocationToUpdate(undefined)
			Toast.show({
				type: 'successToast',
				text1: t(success),
				visibilityTime: 3000,
			})
		}
	}, [error, success])

	return (
		<SafeAreaLayout>
			<MainTabLayout title={t('tabLabel.location')} hasBackButton={false}>
				<View className={'flex-row justify-between mb-[20px] items-center'}>
					<AppTextField
						placeholder={t('location.searchLocation')}
						otherTextFieldStyle={'w-[200px] border-2'}
						otherInputStyle={'text-[16px]'}
					/>
					<CustomButton
						title={t('location.addLocation')}
						otherButtonStyle={'h-[35px] px-[10px] w-[130px]'}
						onPress={() => {
							setOpenCreateSheet(true)
						}}
					/>
				</View>
				<FlatList
					numColumns={numColumns}
					key={`location-list-${locationList.length}`}
					keyExtractor={(item) => item.id}
					data={locationList}
					renderItem={({ item }) => {
						return (
							<LocationCardView
								location={item}
								imageUrl={item.image}
								onPressCard={() =>
									router.push({ pathname: `/(main)/location/[id]`, params: { id: item.id } })
								}
								onEditOption={() => {
									setLocationToUpdate(item)
									setOpenUpdateSheet(true)
								}}
								onDeleteOption={() => dispatch(deleteLocation(item.id))}
							/>
						)
					}}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							tintColor={COLORS.primary}
							colors={[COLORS.primary]}
							onRefresh={() => {
								dispatch(getLocation())
								setRefreshing(true)
							}}
						/>
					}
				/>
			</MainTabLayout>
			{/*<Loading visible={isLoading} size={50} otherStyles={'bg-transparent'} />*/}

			<LocationFormBottomSheet
				openSheet={openCreateSheet}
				setOpenSheet={setOpenCreateSheet}
				title={t('location.addLocation')}
				formType={FormType.create}
			/>

			<LocationFormBottomSheet
				openSheet={openUpdateSheet}
				setOpenSheet={setOpenUpdateSheet}
				title={t('location.editLocation')}
				formType={FormType.update}
				location={locationToUpdate}
			/>
		</SafeAreaLayout>
	)
}
