import { Color } from '../types/Color.ts'

export interface ICard {
  id: number
  title: string
  description: string
  color: Color
  custom: {
    [key: string]: string
  }
  users: number[]
  created_at: number
}
