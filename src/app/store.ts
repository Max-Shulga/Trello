import {configureStore} from '@reduxjs/toolkit';
import {rootReducer, initialState} from "./reducers.ts";

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch