import { configureStore } from "@reduxjs/toolkit";

// auth
import authReducer from "../slice/authSlice";
import adminReducer from "../slice/adminSlice"

// queries
import { announcementApi } from "./components/pages/Announcement/api/announcementApi";
import { publicationApi } from "./components/pages/Publication/api/publicationApi";
import { activityApi } from "./components/pages/Activities/api/activityApi";
import { userApi } from "./components/pages/Admin/api/userApi";
import { skFileApi } from "./components/pages/SK Files/api/skFileApi";
import { youthProfilingApi } from "./components/pages/AdminFeatures/Profiling/api/profilingApi";
import { apiSlice } from "../slice/apiSlice";
import { userProfile } from "./components/pages/Settings/components/api/userProfileApi";
import { reactionsApi } from "./features/Reaction/api/reactionsApi";
import { notificationApi } from "./features/Notification/api/notificationApi";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [publicationApi.reducerPath]: publicationApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [skFileApi.reducerPath]: skFileApi.reducer,
    [youthProfilingApi.reducerPath]: youthProfilingApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userProfile.reducerPath]: userProfile.reducer,
    [reactionsApi.reducerPath]: reactionsApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      announcementApi.middleware,
      publicationApi.middleware,
      activityApi.middleware,
      userApi.middleware,
      skFileApi.middleware,
      youthProfilingApi.middleware,
      apiSlice.middleware,
      userProfile.middleware,
      reactionsApi.middleware,
      notificationApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
