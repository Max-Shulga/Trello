import { IList } from './IList.ts'

export interface IBoard {
  id: number
  title: string
  lists: IList[]
  // cardTitles: string[]
}
