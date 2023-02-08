import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { ICharacter } from 'interfaces/index';
import httpClient from 'services/http';

export const getCharacters = createAsyncThunk('characters/getCharacters', async () => {
  const response = await httpClient('/character');
  return response.data;
});

// Type for our state
export interface appState {
  characters: ICharacter[];
  page: number;
  status: string | null;
}

// Initial state
const initialState: appState = {
  characters: [],
  page: 1,
  status: null
};

// Actual Slice
export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    // @ts-ignore
    builder.addCase(HYDRATE, (state: any, action: { payload: { app: any } }) => ({
      ...state,
      ...action.payload.app
    }));
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
      state.status = null;
    });
    builder.addCase(getCharacters.pending, (state, action) => {
      state.status = 'Fetching characters. Please wait a moment...';
    });
    builder.addCase(getCharacters.rejected, (state, action) => {
      state.status = 'Failed to fetch data...';
    });
  }
});

export const { setPage } = charactersSlice.actions;

export const selectCharactersState = (state: AppState) => state.characters;

export default charactersSlice.reducer;
