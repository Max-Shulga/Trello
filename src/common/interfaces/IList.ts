import { ICard } from './ICard'

export interface IList {
  title: string
  position: number
}

export interface IListServerResponse extends IList {
  cards: ICard[]
  id: number
}
