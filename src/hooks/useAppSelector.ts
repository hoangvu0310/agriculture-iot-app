import { useSelector } from 'react-redux'
import { AppRootState } from '@/src/redux/store'

export const useAppSelector = useSelector.withTypes<AppRootState>()
