enum ActionType {
  GET_BOARDS = 'home/getBoards',
  ADD_BOARD = 'home/addBoard',
  GET_BOARD_BY_ID = 'board/getBoardById',
  CHANGE_BOARD_TITLE = 'board/changeBoardTitle',
  DELETE_BOARD = 'board/deleteBoard',
  ADD_LIST = 'board/addList',
  CHANGE_LIST_DATA = 'board/list/changeListData',
  DELETE_LIST = 'board/list/deleteList',
  ADD_CARD = 'board/list/card/addCard',
  DELETE_CARD = 'board/card/deleteCard',
  CHANGE_CARD_DATA = 'board/list/changeCardData',
}
export default ActionType;
