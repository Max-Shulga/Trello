export interface IHomeBoard {
  title: string
  custom: {
    [key: string]: string
  }
}

export interface IHomeBoardServerResponse extends IHomeBoard {
  id: number
}

export interface IAllBoards {
  boards: IHomeBoardServerResponse[]
}
