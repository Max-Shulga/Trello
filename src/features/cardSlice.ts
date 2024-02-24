import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// export type BoardStatuses = IBoard['cardTitles'][number]

export interface ICase {
    id: number,
    title: string,
}

export interface ICard {
    id: number,
    title: string,
    color: string
    cases: ICase[]
}

const initialState: ICard = {
    id: 0,
    title: '',
    color: 'card-blue',
    cases: [],
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addCase: (state, action: PayloadAction<ICase>) => {
            state.cases.push(action.payload)
        },
        removeCase: (state, action: PayloadAction<{ id: number }>) => {
            state.cases = state.cases.filter(cases => cases.id !== action.payload.id)
        },
        editCase: (state, action: PayloadAction<{ id: number, newTitle: string }>) => {
            state.cases = state.cases.map(cases => {
                return cases.id === action.payload.id ? { ...cases, title: action.payload.newTitle } : cases
            })
        },
        changeCardColor: (state, action: PayloadAction<{ color: string }>) => {
            state.color = action.payload.color
        },
    },
})
export const {
    addCase,
    removeCase,
    editCase,
    changeCardColor,
} = cardSlice.actions
export default cardSlice.reducer
