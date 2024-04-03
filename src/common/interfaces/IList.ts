import { ICard } from './ICard.ts'

export interface IList {
  cards: ICard[]
  id: number
  position:number
  title: string
}
