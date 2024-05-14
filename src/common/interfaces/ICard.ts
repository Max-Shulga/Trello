export interface ICard {
  created_at: number
  id: number
  position: number,
  title: string
  list_id:number,
  custom: {
    [key: string]: string
  }
  users: number[]
}
