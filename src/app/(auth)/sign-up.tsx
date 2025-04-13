import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
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
import BackButton from '@/src/components/buttons/BackButton'
import useTranslationHelper from '@/src/hooks/useTranslationHelper'
import '../../i18n/i18n.config'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/src/hooks/useAppDispatch'
import { useAppSelector } from '@/src/hooks/useAppSelector'
import { RootState } from '@/src/redux/store'
import { resetState, signUp } from '@/src/redux/authSlice'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { closeDialog } from '@/src/redux/dialogSlice'
import Loading from '@/src/components/Loading'
import Dialog from '@/src/components/dialogs/Dialog'
import SafeAreaLayout from '@/src/components/layouts/SafeAreaLayout'

export default function SignUp() {
	const router = useRouter()
	const t = useTranslationHelper()
	const { isDarkMode } = useAppTheme()
	const dispatch = useAppDispatch()
	const { isLoading, error, success } = useAppSelector((state: RootState) => state.auth)
	const { isDialogOpen } = useAppSelector((state: RootState) => state.dialog)

	const signUpSchema = z
		.object({
			username: z.string().min(4, t('auth.usernameMin')).max(48, t('auth.usernameMax')),
			password: z.string().min(6, t('auth.passwordMin')).max(32, t('auth.passwordMax')),
			confirmPassword: z.string().min(1, t('auth.requiredConfirmPassword')),
		})
		.refine((data) => data.confirmPassword === data.password, {
			message: t('auth.confirmPasswordWrong'),
			path: ['confirmPassword'],
		})

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema) })

	const onSubmitSignUp = () => {
		const values = getValues()
		dispatch(signUp({ username: values.username, password: values.password }))
	}

	useEffect(() => {
		if (error) {
			Toast.show({
				type: 'errorToast',
				text1: t(error),
			})
		} else if (success) {
			// Toast.show({
			// 	type: 'successToast',
			// 	text1: t(success),
			// })
			// router.replace('/(main)/home')
			// dispatch(resetState())

			const timer = setTimeout(() => {
				dispatch(closeDialog())
				router.replace('/(main)/home')
				dispatch(resetState())
			}, 2000)

			return () => clearTimeout(timer)
		}
	}, [error, success, dispatch])

	return (
		<SafeAreaLayout>
			<TouchableWithoutFeedback className={'flex-1'} onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					className={'flex-1'}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				>
					<ScrollView className={'flex-'} keyboardShouldPersistTaps={'handled'}>
						<BackButton
							otherStyles={`absolute pl-[35px]`}
							isDarkMode={isDarkMode}
							onPress={() => router.back()}
						/>
						{/*<View className={'pb-[30px]'}>*/}
						{/*	*/}
						{/*</View>*/}
						<View className={'items-center mt-[50px] mb-[30px]'}>
							<Image source={IMAGES.Auth} />
						</View>
						<View className={'px-[35px]'}>
							<Text
								className={`font-ptsans-bold text-[32px] mb-[20px] ${isDarkMode ? 'text-primary' : 'text-black'}`}
							>
								{t('auth.signUp')}
							</Text>
							<Text
								className={`font-ptsans text-[16px] ${isDarkMode ? 'text-white' : 'text-light-grey1'}`}
							>
								{t('auth.signUpMessage')}
							</Text>

							<Controller
								control={control}
								name={'username'}
								defaultValue={''}
								render={({ field: { value, onChange } }) => (
									<AuthTextFormField
										otherContainerStyle={'mt-[40px]'}
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
										otherContainerStyle={'mt-[40px]'}
										otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
										isDarkMode={isDarkMode}
										isPassword={true}
										placeholder={t('auth.password')}
										leadingIcon={ICONS.Lock}
										value={value}
										setValue={(value) => onChange(value)}
									/>
								)}
							/>
							{errors.password && (
								<Text className={'text-error mt-[5px]'}>{errors.password.message}</Text>
							)}

							<Controller
								control={control}
								name={'confirmPassword'}
								defaultValue={''}
								render={({ field: { value, onChange } }) => (
									<AuthTextFormField
										otherContainerStyle={'mt-[40px]'}
										otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
										isDarkMode={isDarkMode}
										isPassword={true}
										placeholder={t('auth.confirmPassword')}
										leadingIcon={ICONS.Lock}
										value={value}
										setValue={(value) => onChange(value)}
									/>
								)}
							/>
							{errors.confirmPassword && (
								<Text className={'text-error mt-[5px]'}>{errors.confirmPassword.message}</Text>
							)}

							<CustomButton
								title={t('auth.signUp')}
								otherButtonStyle={'mt-[40px]'}
								onPress={handleSubmit(onSubmitSignUp)}
							/>

							<View className={'flex-row gap-1 justify-center mt-[20px]'}>
								<Text
									className={`font-ptsans text-[16px] ${isDarkMode ? 'text-white' : 'text-light-grey5'}`}
								>
									{t('auth.alreadyHaveAnAccount')}
								</Text>
								<TouchableOpacity
									activeOpacity={0.9}
									onPress={() => {
										reset()
										dispatch(resetState())
										router.back()
									}}
								>
									<Text className={'font-ptsans-bold text-[16px] text-primary'}>
										{t('auth.signInOption')}
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
