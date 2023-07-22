import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "../Types";
import { getHomePageVideos } from "./reducers/getHomePageReduce";
import { getSearchPageVideos } from "./reducers/getSearchPageVideos";

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const YoutubeSlice = createSlice({
  name: "youtubeApp",
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = "";
    },
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parseData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parseData;
      state.nextPageToken = action.payload.nextPageToken;
    });
  },
});

export const { clearVideos, changeSearchTerm, clearSearchTerm } =
  YoutubeSlice.actions;

export const store = configureStore({
  reducer: {
    youtubeApp: YoutubeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
