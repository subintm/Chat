import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import photosReducer from "../store/photosSlice";
import postsReducer from "../store/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    photos: photosReducer,
    posts: postsReducer,
  },
});

export default store;