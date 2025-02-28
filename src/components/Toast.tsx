import { ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message'
import { COLORS } from '@/src/constants'
import { Image, View } from 'react-native'
import Icons from '@/src/constants/icons'

export const toastConfig = {
	successToast: (props: any) => (
		<SuccessToast
			{...props}
			contentContainerStyle={{ paddingLeft: 0 }}
			text1NumberOfLines={3}
			text1Style={{ fontFamily: 'PTSans-Regular', fontSize: 15, color: COLORS.success }}
			style={{ borderLeftWidth: 0, borderBottomWidth: 4, borderBottomColor: COLORS.success }}
			renderLeadingIcon={() => (
				<View className={'h-full w-[60px] items-center justify-center'}>
					<Image source={Icons.Success} className={'w-6 h-6'} />
				</View>
			)}
		/>
	),
	errorToast: (props: any) => (
		<ErrorToast
			{...props}
			contentContainerStyle={{ paddingLeft: 0 }}
			text1NumberOfLines={3}
			text1Style={{ fontFamily: 'PTSans-Regular', fontSize: 15, color: COLORS.error }}
			style={{ borderLeftWidth: 0, borderBottomWidth: 4, borderBottomColor: COLORS.error }}
			renderLeadingIcon={() => (
				<View className={'h-full w-[60px] items-center justify-center'}>
					<Image source={Icons.Error} className={'w-6 h-6'} />
				</View>
			)}
		/>
	),
	infoToast: (props: any) => (
		<InfoToast
			{...props}
			contentContainerStyle={{ paddingLeft: 0 }}
			text1NumberOfLines={3}
			text1Style={{ fontFamily: 'PTSans-Regular', fontSize: 14 }}
			style={{ borderLeftWidth: 0, borderBottomWidth: 4, borderBottomColor: COLORS.info }}
			renderLeadingIcon={() => (
				<View className={'h-full w-[60px] items-center justify-center'}>
					<Image source={Icons.Info} className={'w-6 h-6'} />
				</View>
			)}
		/>
	),
}
