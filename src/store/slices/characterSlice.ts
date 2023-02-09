import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { ICharacter } from 'interfaces/index';
import httpClient from 'services/http';

type TGetEpisodesParams = {
  page?: number;
  name?: string;
};

export const getCharacters = createAsyncThunk(
  'character/getCharacters',
  async ({ page = 1, name = '' }: TGetEpisodesParams) => {
    const response = await httpClient('/character', { params: { page, name } });
    return response.data;
  }
);

export const getCharacter = createAsyncThunk('character/getCharacter', async (id: number) => {
  const response = await httpClient(`/character/${id}`);
  return response.data;
});

type Info = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
};

// Type for our state
export interface appState {
  data: ICharacter[];
  currentElement: ICharacter | null;
  info: Info | null;
  page: number;
  status: string | null;
}

// Initial state
const initialState: appState = {
  data: [],
  currentElement: null,
  info: null,
  page: 1,
  status: null
};

// Actual Slice
export const characterSlice = createSlice({
  name: 'character',
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
      state.data = action.payload.results;
      state.info = action.payload.info;
      state.status = null;
    });
    builder.addCase(getCharacters.pending, (state) => {
      state.status = 'Fetching characters. Please wait a moment...';
    });
    builder.addCase(getCharacters.rejected, (state) => {
      state.status = 'Failed to fetch data...';
    });
    builder.addCase(getCharacter.fulfilled, (state, action) => {
      state.currentElement = action.payload;
      state.status = null;
    });
    builder.addCase(getCharacter.pending, (state) => {
      state.status = 'Fetching character. Please wait a moment...';
    });
    builder.addCase(getCharacter.rejected, (state) => {
      state.status = 'Failed to fetch data...';
    });
  }
});

export const { setPage } = characterSlice.actions;
export const selectCharacterState = (state: AppState) => state.character;

export default characterSlice.reducer;
