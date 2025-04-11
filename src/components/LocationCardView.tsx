import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, IMAGES } from '@/src/constants'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import Icons from '@/src/constants/icons'
import { useRef, useState } from 'react'
import useTranslationHelper from '@/src/hooks/useTranslationHelper'
import { LocationModel } from '@/src/data/model/LocationModel'

type CardViewProps = {
	location: LocationModel
	imageUrl: string
	onPressCard: () => void
	onDeleteOption: () => void
	onEditOption: () => void
}

export default function LocationCardView({
	location,
	imageUrl,
	onPressCard,
	onEditOption,
	onDeleteOption,
}: CardViewProps) {
	const { isDarkMode } = useAppTheme()
	const t = useTranslationHelper()
	const [menuVisible, setMenuVisible] = useState<boolean>(false)
	const [buttonHeight, setButtonHeight] = useState<number>(0)
	const moreButtonRef = useRef<TouchableOpacity>(null)

	const showMoreOption = () => {
		moreButtonRef.current?.measure((height) => {
			setButtonHeight(height)
		})
		setMenuVisible(!menuVisible)
	}

	return (
		<View>
			<Pressable
				className={`flex-1 mb-[30px] rounded-[20px] shadow-sm ${isDarkMode ? ' shadow-dark-grey1' : 'shadow-light-grey2'}`}
				onPress={onPressCard}
			>
				<View className={'flex-1 rounded-[20px]'}>
					{imageUrl ? (
						<Image
							src={imageUrl}
							resizeMode={'cover'}
							className={'flex-1 w-full h-[200px] rounded-t-[20px]'}
						/>
					) : (
						<Image
							source={IMAGES.DefaultLocation}
							resizeMode={'cover'}
							className={'flex-1 w-full h-[200px] rounded-t-[20px]'}
						/>
					)}
					<TouchableOpacity
						ref={moreButtonRef}
						onPress={showMoreOption}
						className={`absolute right-[15] top-[15] rounded-[20px] p-[3] ${isDarkMode ? 'bg-dark-grey4' : 'bg-white'}`}
					>
						<Image
							source={Icons.More}
							tintColor={isDarkMode ? COLORS.white : COLORS.black}
							className={'w-[20] h-[20]'}
						/>
					</TouchableOpacity>
					<View
						className={`${isDarkMode ? 'bg-dark-grey4' : 'bg-light-grey7'} p-[10px] rounded-b-[20px]`}
					>
						<Text className={`font-ptsans-bold text-[22px] ${isDarkMode ? 'text-primary' : ''}`}>
							{location.name}
						</Text>
						<Text
							className={`font-ptsans text-[16px] ${isDarkMode ? 'text-dark-grey1' : 'text-light-grey3'}`}
						>
							{location.address}
						</Text>
					</View>
				</View>
			</Pressable>
			{menuVisible && (
				<View
					className={'absolute flex bg-white px-[5px] rounded-[10px] shadow-md shadow-light-grey3'}
					style={{
						right: 15,
						top: 15 + buttonHeight + 32,
					}}
				>
					<TouchableOpacity
						className={'flex-row p-[10px] gap-2'}
						activeOpacity={0.7}
						onPress={() => {
							onEditOption()
							setMenuVisible(false)
						}}
					>
						<Image source={Icons.Edit} tintColor={COLORS.primary} className={'w-[20px] h-[20px]'} />
						<Text className={'font-ptsans text-[16px]'}>{t('location.editLocation')}</Text>
					</TouchableOpacity>
					<View className={'h-[2px] bg-primary'} />
					<TouchableOpacity
						className={'flex-row p-[10px] gap-2'}
						activeOpacity={0.7}
						onPress={onDeleteOption}
					>
						<Image
							source={Icons.Delete}
							tintColor={COLORS.primary}
							className={'w-[20px] h-[20px]'}
						/>
						<Text className={'font-ptsans text-[16px]'}>{t('location.deleteLocation')}</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}
