import { Color } from '../types/Color';
import { IList } from './IList';

export interface IBoard {
  boardId:number
  title: string
  custom: {
    color: Color
  }
  lists: IList[]
  users: [
    {
      [key: number]: {
        id: number
        username: string
      }
    },
  ]
}
