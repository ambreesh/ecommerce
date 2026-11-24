import {useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDsipatch} from './store'

export const useAppDispatch = useDispatch.withTypes<AppDsipatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
