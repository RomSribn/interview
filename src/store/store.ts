import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { episodeSlice, characterSlice, locationSlice, searchSlice } from './slices';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      [episodeSlice.name]: episodeSlice.reducer,
      [characterSlice.name]: characterSlice.reducer,
      [locationSlice.name]: locationSlice.reducer,
      [searchSlice.name]: searchSlice.reducer
    },
    devTools: true
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
