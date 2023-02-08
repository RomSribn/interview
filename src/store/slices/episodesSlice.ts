import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { IEpisode } from 'interfaces/index';
import httpClient from 'services/http';

export const getEpisodes = createAsyncThunk('episodes/getEpisodes', async () => {
  const response = await httpClient('/episode');
  return response.data;
});

// Type for our state
export interface appState {
  episodes: IEpisode[];
  page: number;
  status: string | null;
}

// Initial state
const initialState: appState = {
  episodes: [],
  page: 1,
  status: null
};

// Actual Slice
export const episodesSlice = createSlice({
  name: 'episodes',
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
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.episodes = action.payload;
      state.status = null;
    });
    builder.addCase(getEpisodes.pending, (state, action) => {
      state.status = 'Fetching episodes. Please wait a moment...';
    });
    builder.addCase(getEpisodes.rejected, (state, action) => {
      state.status = 'Failed to fetch data...';
    });
  }
});

export const { setPage } = episodesSlice.actions;

export const selectEpisodesState = (state: AppState) => state.episodes;

export default episodesSlice.reducer;
