import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
import refreshBoardMiddleware from './refreshBoardMiddleware.ts';
import refreshBoardsMiddleware from './refreshBoardsMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(refreshBoardsMiddleware)
    .concat(refreshBoardMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export default store;
