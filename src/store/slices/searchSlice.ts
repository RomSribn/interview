import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { IEpisode } from 'interfaces/index';

// Type for our state
export interface ISearchState {
  type: 'characters' | 'locations' | 'episodes';
  page: number;
  elements: IEpisode[];
}

// Initial state
const initialState: ISearchState = {
  type: 'characters',
  page: 1,
  elements: []
};

// Actual Slice
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setElements(state, action) {
      state.elements = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    }
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state: any, action: { payload: { app: any } }) => ({
      ...state,
      ...action.payload.app
    })
  }
});

export const { setElements, setType } = searchSlice.actions;

export const selectSearchState = (state: AppState) => state.search;

export default searchSlice.reducer;
