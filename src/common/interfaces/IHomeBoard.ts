export interface IHomeBoard {
  id?:number
  title: string
  custom: {
    [key: string]: string
  }
}

export interface IHomeBoards {
  boards: IHomeBoard[]
}
