import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { IEpisode, TType, TInfo } from 'interfaces/index';
import httpClient from 'services/http';

type TGetSearchItems = {
  page?: number;
  type: TType;
  name: string;
};

export const getSearchItems = createAsyncThunk(
  'search/getSearchItems',
  async ({ page = 1, type, name }: TGetSearchItems) => {
    const response = await httpClient(`/${type}`, { params: { page, name } });
    return response.data;
  }
);

// Type for our state
export interface ITypeSearchState {
  type: 'character' | 'location' | 'episode';
  name: string;
  page: number;
  data: IEpisode[];
  isActive: boolean;
  info: TInfo | null;
  status: string | null;
}

interface ISearchState {
  character: ITypeSearchState;
  location: ITypeSearchState;
  episode: ITypeSearchState;
}

// Initial state
const initialState: ISearchState = {
  character: {
    type: 'character',
    name: '',
    page: 1,
    data: [],
    isActive: false,
    info: null,
    status: null
  },
  location: {
    type: 'location',
    name: '',
    page: 1,
    data: [],
    isActive: false,
    info: null,
    status: null
  },
  episode: {
    type: 'episode',
    name: '',
    page: 1,
    data: [],
    isActive: false,
    info: null,
    status: null
  }
};

// Actual Slice
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCharacterType(state, action) {
      state.character.type = action.payload;
    },
    setCharacterName(state, action) {
      state.character.name = action.payload;
    },
    setLocationType(state, action) {
      state.location.type = action.payload;
    },
    setLocationName(state, action) {
      state.location.name = action.payload;
    },
    setEpisodeType(state, action) {
      state.episode.type = action.payload;
    },
    setEpisodeName(state, action) {
      state.episode.name = action.payload;
    }
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    // @ts-ignore
    builder.addCase(HYDRATE, (state: any, action: { payload: { app: any } }) => ({
      ...state,
      ...action.payload.app
    }));
    builder.addCase(getSearchItems.fulfilled, (state, action) => {
      state.character.data = action.payload.results;
      state.character.info = action.payload.info;
      state.character.status = null;
    });
    builder.addCase(getSearchItems.pending, (state) => {
      state.character.status = `Fetching ${state.character.type}s. Please wait a moment...`;
    });
    builder.addCase(getSearchItems.rejected, (state) => {
      state.character.status = 'Failed to fetch data...';
    });
  }
});

export const { setCharacterType, setCharacterName, setLocationType, setLocationName, setEpisodeType, setEpisodeName } =
  searchSlice.actions;

export const selectSearchState = (state: AppState) => state.search;

export default searchSlice.reducer;
