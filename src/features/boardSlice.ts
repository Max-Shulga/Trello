import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ICard} from "./cardSlice.ts";

export interface IBoard {
    id: number
    title: string
    cards: ICard[],
    // cardTitles: string[]
}

const initialState: IBoard = {
    id: 0,
    title: '',
    cards: [],
    // cardTitles: []
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<ICard>) => {
            state.cards.push(action.payload)
        },
        removeCard: (state, action: PayloadAction<{ id: number }>) => {
            state.cards = state.cards.filter((card) => card.id !== action.payload.id)
        },
        changeTitle: (state, action: PayloadAction<ICard>) => {
            const {id, title} = action.payload
            state.cards = state.cards.map(card => {
                return card.id === id ? {...card, title: title} : card
            })
        },
        // changeCaseStatus: (state: IBoard, action: PayloadAction<{ cardId: number, caseId: number, newStatus: BoardStatuses }>) => {
        //     const {cardId, caseId, newStatus} = action.payload
        //
        //     const currentCard = state.cards.filter(card => card.id === cardId)[0];
        //     if (!currentCard) return state
        //     const currentCase: ICase = currentCard.cases.filter(cases => cases.id === caseId)[0]
        //
        //     currentCard.cases = currentCard.cases.filter(cases => cases.id !== caseId)
        //
        //     const newStatusCard = state.cards.filter(card => card.title === newStatus)[0]
        //     if (!newStatusCard) return state
        //     newStatusCard.cases.push(currentCase)
        // }
    }
})
export const {addCard,
    removeCard,
    changeTitle} = boardSlice.actions
export default boardSlice.reducer

