import { IBoard } from './IBoard.ts'
import { IBoardIcon } from './IBoardIcon.ts'

export interface IAllBoards {
  id: number
  boards: IBoard[]
  boardsIcons: IBoardIcon[]
}
