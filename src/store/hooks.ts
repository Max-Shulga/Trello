import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from './store.ts';
import { RootState } from './types';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
