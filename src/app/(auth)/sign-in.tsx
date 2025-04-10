import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { ICONS, IMAGES } from '@/src/constants'
import AuthTextFormField from '@/src/components/textfields/AuthTextFormField'
import CustomButton from '@/src/components/buttons/CustomButton'
import { useRouter } from 'expo-router'
import useTranslationHelper from '@/src/hooks/useTranslationHelper'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/src/hooks/useAppDispatch'
import { useAppSelector } from '@/src/hooks/useAppSelector'
import { RootState } from '../../redux/store'
import { resetState, signIn } from '@/src/redux/authSlice'
import Loading from '@/src/components/Loading'
import Toast from 'react-native-toast-message'
import { useEffect } from 'react'
import Dialog from '@/src/components/dialogs/Dialog'
import { closeDialog, openDialog } from '@/src/redux/dialogSlice'
import SafeAreaLayout from '@/src/components/layouts/SafeAreaLayout'

export default function SignIn() {
	const router = useRouter()
	const t = useTranslationHelper()
	const { isDarkMode } = useAppTheme()
	const dispatch = useAppDispatch()
	const { isLoading, error, success } = useAppSelector((state: RootState) => state.auth)
	const { isDialogOpen } = useAppSelector((state: RootState) => state.dialog)

	const signInSchema = z.object({
		username: z.string().min(1, t('auth.requiredUsername')),
		password: z.string().min(1, t('auth.requiredPassword')),
	})

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<z.infer<typeof signInSchema>>({ resolver: zodResolver(signInSchema) })

	const onSubmitSignIn = () => {
		const values = getValues()
		dispatch(signIn({ username: values.username.trim(), password: values.password.trim() }))
	}

	useEffect(() => {
		if (error) {
			Toast.show({
				type: 'errorToast',
				text1: t(error),
				visibilityTime: 2000,
			})
		} else if (success) {
			dispatch(openDialog())
			// Toast.show({
			// 	type: 'successToast',
			// 	text1: t(success),
			// 	visibilityTime: 2000,
			// })
			// const timer = setTimeout(() => {
			// 	router.replace('/(main)/home')
			// 	dispatch(resetState())
			// }, 2000)

			const timer = setTimeout(() => {
				dispatch(closeDialog())
				router.replace('/(main)/home')
				dispatch(resetState())
			}, 2000)

			return () => clearTimeout(timer)
		}
	}, [error, success, dispatch])

	return (
		<SafeAreaLayout otherStyle={'pt-[40px]'}>
			<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView>
					<ScrollView className={'flex-'} keyboardShouldPersistTaps="handled">
						<View className={'items-center justify-center mt-[10px] mb-[30px]'}>
							<Image source={IMAGES.Auth} />
						</View>
						<View className={'px-[35px] justify-center'}>
							<Text
								className={`font-ptsans-bold text-[32px] mb-[20px] ${isDarkMode ? 'text-primary' : 'text-black'}`}
							>
								{t('auth.signIn')}
							</Text>
							<Text
								className={`font-ptsans text-[16px] ${isDarkMode ? 'text-white' : 'text-light-grey1'}`}
							>
								{t('auth.signInMessage')}
							</Text>

							<Controller
								control={control}
								name={'username'}
								defaultValue={''}
								render={({ field: { value, onChange } }) => (
									<AuthTextFormField
										otherContainerStyle={`mt-[30px]`}
										otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
										isDarkMode={isDarkMode}
										placeholder={t('auth.username')}
										leadingIcon={ICONS.Avatar}
										value={value}
										setValue={(value) => onChange(value)}
									/>
								)}
							/>
							{errors.username && (
								<Text className={'text-error mt-[5px]'}>{errors.username.message}</Text>
							)}

							<Controller
								control={control}
								name={'password'}
								defaultValue={''}
								render={({ field: { value, onChange } }) => (
									<AuthTextFormField
										otherContainerStyle={`mt-[40px]`}
										otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
										isDarkMode={isDarkMode}
										isPassword={true}
										placeholder={t('auth.password')}
										leadingIcon={ICONS.Lock}
										value={value}
										setValue={onChange}
									/>
								)}
							/>
							{errors.password && (
								<Text className={'text-error mt-[5px]'}>{errors.password.message}</Text>
							)}
							<View className={'w-full mt-[20px] items-end'}>
								<TouchableOpacity activeOpacity={0.9}>
									<Text className={'font-ptsans-bold text-[14px] text-primary'}>
										{t('auth.forgotPassword')}
									</Text>
								</TouchableOpacity>
							</View>
							<CustomButton
								title={t('auth.signIn')}
								otherButtonStyle={'mt-[35px]'}
								onPress={
									handleSubmit(onSubmitSignIn)
									// () => router.replace('/(main)/home')
								}
							/>
							<View className={'flex-row gap-1 justify-center mt-[20px]'}>
								<Text
									className={`font-ptsans text-[16px] text-light-grey5 ${isDarkMode ? 'text-white' : 'text-light-grey5'}`}
								>
									{t('auth.dontHaveAnAccount')}
								</Text>
								<TouchableOpacity
									activeOpacity={0.9}
									onPress={() => {
										reset()
										router.push('/sign-up')
										dispatch(resetState())
									}}
								>
									<Text className="font-ptsans-bold text-[16px] text-primary">
										{t('auth.signUpOption')}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>

			<Loading visible={isLoading} size={80} />

			<Dialog visible={isDialogOpen} onClose={() => dispatch(closeDialog())}>
				<View
					className={
						'flex bg-white justify-center items-center rounded-2xl p-[30px] shadow-lg shadow-light-grey5'
					}
				>
					<Image className={'max-w-[120px] max-h-[120px]'} source={ICONS.Success} />
					<View className={'h-[20px]'} />
					<Text className={'font-ptsans-bold text-[22px]'}>{t(success)}</Text>
				</View>
			</Dialog>
		</SafeAreaLayout>
	)
}
