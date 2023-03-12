import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import themeReducer from '../features/themeSlice';
import sideBarReducer from '../features/SideBarSlice';
import boardReducer from '../features/boardSlice';
import taskCardBodyReducer from '../features/taskCardBodySlice';
import modifyBoardReducer from '../features/modifyBoardSlice';
import redirectModalReducer from '../features/redirectModalSlice';
import navLinkIndexReducer from '../features/navLinkIndexSlice';

const reducers = combineReducers({
  theme: themeReducer,
  sideBar: sideBarReducer,
  board: boardReducer,
  taskCardBody: taskCardBodyReducer,
  modifyBoard: modifyBoardReducer,
  redirectModal: redirectModalReducer,
  linkIndex: navLinkIndexReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
