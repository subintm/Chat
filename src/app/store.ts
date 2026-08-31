import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import photosReducer from "../store/photosSlice";
import postsReducer from "../store/postsSlice"; // imported as TS slice


export const store = configureStore({
  reducer: {
    auth: authReducer,
    photos: photosReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
