import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
import refreshBoardMiddleware from './reducers/board/refreshBoardMiddleware';
import reorderCardsAfterDeleteMiddleware from './reducers/board/reorderCardsAfterDeleteMiddleware';
import reorderListsAfterDeleteMiddleware from './reducers/board/reorderListsAfterDeleteMiddleware';
import refreshBoardsMiddleware from './reducers/home/refreshBoardsMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(refreshBoardsMiddleware)
    .concat(refreshBoardMiddleware)
    .concat(reorderListsAfterDeleteMiddleware)
    .concat(reorderCardsAfterDeleteMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export default store;
