import { Color } from '../types/Color.ts'
import { IListServerResponse } from './IList.ts'

export interface IBoard {
  title: string
  custom: {
    color: Color
  }
  lists: IListServerResponse[]
  users: [
    {
      [key: number]: {
        id: number
        username: string
      }
    },
  ]
}

export interface IBoardWithId extends IBoard{
  id: number
}
