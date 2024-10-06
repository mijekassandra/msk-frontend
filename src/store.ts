import { configureStore } from "@reduxjs/toolkit";

// auth
import authReducer from "../slice/authSlice";

// queries
import { announcementApi } from "./components/pages/Announcement/api/announcementApi";
import { publicationApi } from "./components/pages/Publication/api/publicationApi";
import { activityApi } from "./components/pages/Activities/api/activityApi";
import { accountApi } from "./components/pages/Admin/api/accountApi";
import { skFileApi } from "./components/pages/SK Files/api/skFileApi";
import { youthProfilingApi } from "./components/pages/AdminFeatures/Profiling/api/profilingApi";
import { apiSlice } from "../slice/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [publicationApi.reducerPath]: publicationApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [skFileApi.reducerPath]: skFileApi.reducer,
    [youthProfilingApi.reducerPath]: youthProfilingApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      announcementApi.middleware,
      publicationApi.middleware,
      activityApi.middleware,
      accountApi.middleware,
      skFileApi.middleware,
      youthProfilingApi.middleware,
      apiSlice.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
