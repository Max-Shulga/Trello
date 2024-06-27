import { IBoard } from '../interfaces/IBoard';

const emptyBoard:IBoard = {
  boardId: 0,
  title: '',
  custom: {
    color: 'transparent',
  },
  lists: [],
  users: [
    {
      0: {
        id: 0,
        username: '',
      },
    },
  ],
};
export default emptyBoard;
