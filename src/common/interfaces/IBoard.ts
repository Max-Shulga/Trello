import { Color } from '../types/Color.ts';
import { IList } from './IList.ts';

export interface IBoard {
  id?:number
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
