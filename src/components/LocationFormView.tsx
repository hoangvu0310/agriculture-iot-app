import { Alert, Image, Platform, Pressable, Text, View } from 'react-native'
import { WINDOW } from '@/src/constants'
import { Controller, useForm } from 'react-hook-form'
import LocationTextFormField from '@/src/components/textfields/LocationTextFormField'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import useTranslationHelper from '@/src/hooks/useTranslationHelper'
import { LocationModel } from '@/src/data/model/LocationModel'
import CustomButton from '@/src/components/buttons/CustomButton'
import { launchImageLibraryAsync, requestCameraPermissionsAsync } from 'expo-image-picker'
import Icons from '@/src/constants/icons'
import { useAppDispatch } from '@/src/hooks/useAppDispatch'
import { PostLocationRequest } from '@/src/data/request/LocationRequest'
import { createLocation, updateLocation } from '../redux/locationSlice'

export enum FormType {
	update = 'update',
	create = 'create',
}

type LocationFormViewProps = {
	location?: LocationModel
	title: string
	isOpenSheet: boolean
	onCancelForm: () => void
	formType: FormType
}

export default function LocationFormView({
	location,
	title,
	isOpenSheet,
	onCancelForm,
	formType,
}: LocationFormViewProps) {
	const { isDarkMode } = useAppTheme()
	const t = useTranslationHelper()
	const dispatch = useAppDispatch()
	const [imageUri, setImageUri] = useState<string | null>(location?.image || null)

	const locationFormSchema = z.object({
		name: z.string().min(1, { message: t('location.requiredLocationName') }),
		address: z.string().min(1, { message: t('location.requiredLocationAddress') }),
		capacity: z.number(),
		area: z.number(),
		disPerRow: z.number(),
		disPerHole: z.number(),
		fertilizeLevel: z.number(),
		totalHoles: z.number(),
		dripRatePerHoles: z.number(),
		wateringMode: z.boolean(),
	})

	const {
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
		control,
	} = useForm<z.infer<typeof locationFormSchema>>({
		resolver: zodResolver(locationFormSchema),
		defaultValues: {
			name: location?.name || '',
			address: location?.address || '',
			capacity: location?.setting.capacity || 0,
			area: location?.setting.area || 0,
			disPerRow: location?.setting.disPerRow || 0,
			disPerHole: location?.setting.disPerHole || 0,
			fertilizeLevel: location?.setting.fertilizerLevel || 0,
			totalHoles: location?.setting.totalHole || 0,
			dripRatePerHoles: location?.setting.dripRatePerHole || 0,
			wateringMode: location?.setting.wateringMode || false,
		},
	})

	const [wateringMode, setWateringMode] = useState(location?.setting.wateringMode || false)
	const indicatorPositionX = useSharedValue(0)
	const animatedIndicatorStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: indicatorPositionX.value,
				},
			],
		}
	})

	useEffect(() => {
		if (location) {
			reset({
				name: location.name,
				address: location.address,
				capacity: location.setting?.capacity,
				area: location.setting?.area,
				disPerRow: location.setting?.disPerRow,
				disPerHole: location.setting?.disPerHole,
				fertilizeLevel: location.setting?.fertilizerLevel,
				totalHoles: location.setting?.totalHole,
				dripRatePerHoles: location.setting?.dripRatePerHole,
				wateringMode: location.setting?.wateringMode,
			})

			setImageUri(location.image)
			setWateringMode(location.setting?.wateringMode)
		}
	}, [location])

	useEffect(() => {
		if (wateringMode) {
			indicatorPositionX.value = withTiming(45, { duration: 200 })
		} else {
			indicatorPositionX.value = withTiming(0, { duration: 200 })
		}
	}, [wateringMode])

	useEffect(() => {
		if (!isOpenSheet) {
			reset()
			setImageUri(null)
			setWateringMode(false)
		}
	}, [isOpenSheet])

	const pickLocationImage = async () => {
		const permissionResult = await requestCameraPermissionsAsync()
		if (!permissionResult.granted) {
			Alert.alert('Bạn cần cấp quyền truy cập ảnh!')
			return
		}

		const result = await launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled) {
			const uri = result.assets[0].uri
			setImageUri(uri)
		}
	}

	const onSubmitForm = async () => {
		const formValue = getValues()
		const request: PostLocationRequest = {
			name: formValue.name,
			address: formValue.address,
			setting: {
				capacity: formValue.capacity,
				area: formValue.area,
				disPerRow: formValue.disPerRow,
				disPerHole: formValue.disPerHole,
				fertilizerLevel: formValue.fertilizeLevel,
				totalHole: formValue.totalHoles,
				dripRatePerHole: formValue.dripRatePerHoles,
				wateringMode: formValue.wateringMode,
			},
		}
		if (imageUri) {
			const uriParts = imageUri.split('/')
			const fileName = uriParts[uriParts.length - 1]

			const fileType = fileName.split('.').pop()

			const imageObject = {
				uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
				name: fileName,
				type: `image/${fileType}`,
			}

			request.image = imageObject as any
		}
		if (formType === 'create') {
			dispatch(createLocation(request))
		} else if (location && formType === 'update') {
			dispatch(updateLocation({ request: request, locationId: location?.id }))
		}
	}

	const numericFields = [
		{ name: 'capacity', label: t('location.locationCapacity') },
		{ name: 'area', label: t('location.locationArea') },
		{ name: 'disPerRow', label: t('location.locationDisPerRow') },
		{ name: 'disPerHole', label: t('location.locationDisPerHole') },
		{ name: 'fertilizeLevel', label: t('location.locationFertilizeLevel') },
		{ name: 'totalHoles', label: t('location.locationTotalHoles') },
		{ name: 'dripRatePerHoles', label: t('location.locationDripRatePerHoles') },
	]

	return (
		<View>
			<View className={`flex-1 justify-center items-center mb-[30px] mx-[20px]`}>
				<Text className={`font-ptsans-bold text-[28px] mb-[15px] text-primary`}>{title}</Text>
				<View className={`w-full h-[1px] ${isDarkMode ? 'bg-white' : 'bg-light-grey2'}`} />
			</View>
			<View className={'flex-1 mx-[20px]'}>
				<View className={`flex ${WINDOW.WIDTH > 800 ? 'flex-row' : ''} `}>
					<Controller
						control={control}
						name={'name'}
						render={({ field: { value, onChange } }) => (
							<LocationTextFormField
								value={value}
								onChange={onChange}
								inputLabel={t('location.locationName') + ':'}
								placeholder={t('location.locationNamePlaceholder')}
								otherContainerStyle={`${WINDOW.WIDTH > 800 ? 'pr-[20px]' : ''} ${errors.name ? 'mb-[0px]' : ''}`}
							/>
						)}
					/>
					{errors.name && (
						<Text className={'font-ptsans text-error text-[14px] mt-[5px] ml-[10px] mb-[20px]'}>
							{errors.name.message}
						</Text>
					)}
					<Controller
						control={control}
						name={'address'}
						render={({ field: { value, onChange } }) => (
							<LocationTextFormField
								value={value}
								onChange={onChange}
								inputLabel={t('location.locationAddress') + ':'}
								placeholder={t('location.locationAddressPlaceholder')}
								otherContainerStyle={`${WINDOW.WIDTH > 800 ? 'pl-[20px]' : ''} ${errors.address ? 'mb-[0px]' : ''}`}
							/>
						)}
					/>
					{errors.address && (
						<Text className={'font-ptsans text-error text-[14px] mt-[5px] ml-[10px] mb-[20px]'}>
							{errors.address.message}
						</Text>
					)}
				</View>

				<Text className={'font-ptsans-bold text-[24px] text-primary mb-[20px]'}>
					{t('location.locationSettings')}
				</Text>
				<View className={'flex-1 flex-row flex-wrap justify-between'}>
					{numericFields.map(({ name, label }) => (
						<Controller
							key={name}
							control={control}
							name={name}
							render={({ field: { value, onChange } }) => (
								<LocationTextFormField
									value={String(value)}
									onChange={(text) => {
										const numValue = text === '' ? 0 : Number(text)
										if (!isNaN(numValue)) {
											onChange(numValue)
										}
									}}
									inputLabel={label + ':'}
									keyboardType={'numeric'}
									otherContainerStyle={'flex-none w-[48%]'}
									otherInputStyle={'flex-1'}
								/>
							)}
						/>
					))}
					<View className={'w-[48%] items-center justify-center'}>
						<Text
							className={`font-ptsans-bold text-[18px] mb-[20px] ${isDarkMode ? 'text-white' : ''}`}
						>
							{t('location.locationWateringMode')}
						</Text>
						<Controller
							control={control}
							name={'wateringMode'}
							render={({ field: { value, onChange } }) => (
								<Pressable
									onPress={() => {
										setWateringMode(!value)
										onChange(!value)
									}}
									className={`w-[80px] h-[35px] justify-center border rounded-[25px] ${value ? 'bg-primary' : 'bg-light-grey6'} ${isDarkMode ? 'border-dark-grey1' : 'border-light-grey1'}`}
								>
									<Animated.View
										style={[animatedIndicatorStyle]}
										className={'bg-light-grey7 w-[30px] h-[30px] rounded-[35px]'}
									/>
								</Pressable>
							)}
						/>
					</View>
				</View>
				{imageUri ? (
					<View>
						<Image
							src={imageUri}
							resizeMode={'contain'}
							className={'w-full aspect-[4/3] mb-[10px]'}
						/>
						<Pressable
							className={'absolute right-[10px] top-[10px] bg-light-grey7 rounded-[20px]'}
							onPress={() => setImageUri(null)}
						>
							<Image source={Icons.Cancel} className={'w-[20px] h-[20px]'} />
						</Pressable>
					</View>
				) : (
					<CustomButton
						title={t('location.addLocationImage')}
						otherButtonStyle={'mb-[25px] px-[10px] self-center'}
						onPress={pickLocationImage}
					/>
				)}
				<View className={'flex-1 flex-row mb-[20px] justify-around'}>
					<CustomButton
						title={t('cancel')}
						otherButtonStyle={'flex-1 max-w-[600px] bg-error'}
						onPress={() => {
							onCancelForm()
							reset()
						}}
					/>
					<View className={'w-[40px]'} />
					<CustomButton
						title={t('accept')}
						otherButtonStyle={'flex-1 max-w-[600px]'}
						onPress={handleSubmit(onSubmitForm)}
					/>
				</View>
			</View>
		</View>
	)
}
