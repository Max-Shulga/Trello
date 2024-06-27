export interface ICard {
  created_at: number
  id: number
  position: number,
  title: string
  description: string
  custom: {
    [key: string]: string
  }
  users: number[]
}
