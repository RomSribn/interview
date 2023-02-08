import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { episodesSlice, charactersSlice, locationsSlice, searchSlice } from './slices';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      [episodesSlice.name]: episodesSlice.reducer,
      [charactersSlice.name]: charactersSlice.reducer,
      [locationsSlice.name]: locationsSlice.reducer,
      [searchSlice.name]: searchSlice.reducer
    },
    devTools: true
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
