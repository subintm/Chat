import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPhotos, Photo } from "../services/api";

export interface PhotosState {
  items: Photo[];
  loading: boolean;
  error: string | null;
}

const initialState: PhotosState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPhotos = createAsyncThunk<
  Photo[],
  void,
  { rejectValue: string }
>(
  "photos/fetchPhotos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPhotos();
      return response.data;
    } catch {
      return rejectWithValue("Failed to fetch photos");
    }
  }
);

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch photos";
      });
  },
});

export default photosSlice.reducer;
