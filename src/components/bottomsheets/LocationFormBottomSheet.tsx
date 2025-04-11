import { Keyboard } from 'react-native'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { LocationModel } from '@/src/data/model/LocationModel'
import { COLORS } from '@/src/constants'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import LocationFormView, { FormType } from '@/src/components/LocationFormView'

type LocationFormBottomSheetProps = {
	openSheet: boolean
	setOpenSheet: (openSheet: boolean) => void
	title: string
	location?: LocationModel
	formType: FormType
}

export default function LocationFormBottomSheet({
	openSheet = false,
	setOpenSheet,
	title,
	location,
	formType,
}: LocationFormBottomSheetProps) {
	const snapPoints = useMemo(() => ['80%'], [])
	const bottomSheetRef = useRef<BottomSheet>(null)
	const { isDarkMode } = useAppTheme()

	const openBottomSheet = () => bottomSheetRef?.current.snapToIndex(0)
	const closeBottomSheet = () => bottomSheetRef?.current?.close()
	const renderBackDrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				onPress={() => {
					Keyboard.dismiss()
					closeBottomSheet()
				}}
			/>
		),
		[],
	)

	useEffect(() => {
		if (openSheet) {
			openBottomSheet()
		} else {
			closeBottomSheet()
		}
	}, [openSheet])

	return (
		<BottomSheet
			backgroundStyle={{
				backgroundColor: isDarkMode ? COLORS.dark.background : COLORS.light.background,
				borderTopRightRadius: 30,
				borderTopLeftRadius: 30,
			}}
			handleIndicatorStyle={{ backgroundColor: COLORS.primary }}
			ref={bottomSheetRef}
			backdropComponent={renderBackDrop}
			index={-1}
			onClose={() => {
				setOpenSheet(false)
			}}
			snapPoints={snapPoints}
			enablePanDownToClose={true}
			enableDynamicSizing={false}
		>
			<LocationFormView
				title={title}
				location={location}
				isOpenSheet={openSheet}
				onCancelForm={() => {
					setOpenSheet(false)
					closeBottomSheet()
				}}
				formType={formType}
			/>
		</BottomSheet>
	)
}
