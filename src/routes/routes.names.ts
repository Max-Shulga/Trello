export enum NotAuthorizedUserRoutes {
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
}

export enum AuthorizedUserRoutes {
  HOME = '/',
  BOARD = 'board/:id',
  CARD_MODAL = 'board/:id/:cardId',
}
