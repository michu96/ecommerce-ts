import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
} from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import userReducer from '../features/user/userSlice'
import { Reducer } from 'react'

export const history = createBrowserHistory()

export const store = configureStore({
  reducer: {
    user: userReducer,
    router: connectRouter(history) as Reducer<unknown, AnyAction>,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
