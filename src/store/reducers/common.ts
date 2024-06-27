enum ActionType {
  GET_BOARDS = 'home/getBoards',
  ADD_BOARD = 'home/addBoard',
  GET_BOARD_BY_ID = 'board/getBoardById',
  GET_OTHER_BOARD_BY_ID = 'board/getOtherBoardById',
  CHANGE_BOARD_TITLE = 'board/changeBoardTitle',
  DELETE_BOARD = 'board/deleteBoard',
  ADD_LIST = 'board/addList',
  CHANGE_LIST_DATA = 'board/list/changeListData',
  CHANGE_LIST_POSITION = 'board/list/changeListPosition',
  DELETE_LIST = 'board/list/deleteList',
  ADD_CARD = 'board/list/card/addCard',
  DELETE_CARD = 'board/card/deleteCard',
  CHANGE_CARD_TITLE = 'board/card/changeCardData',
  CHANGE_CARD_POSITION = 'board/card/changeCardPosition',
  MODIFY_CARD_POSITION = 'board/card/modifyCardPosition',
}
export default ActionType;
