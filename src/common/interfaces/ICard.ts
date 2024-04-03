import { Color } from '../types/Color.ts'

export interface ICard {
  id: number
  list_id:number,
  title: string
  position: number,
  description: string
  color: Color
  custom: {
    [key: string]: string
  }
  users: number[]
  created_at: number
}
