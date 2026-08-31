import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, Post } from "../services/api";

// Slice state interface
export interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPosts();
      return response.data;
    } catch {
      return rejectWithValue("Failed to fetch posts");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch posts";
      });
  },
});

export default postsSlice.reducer;
