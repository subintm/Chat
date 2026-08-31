import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPhotos } from "../services/api";


export const fetchPhotos = createAsyncThunk(
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
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default photosSlice.reducer;