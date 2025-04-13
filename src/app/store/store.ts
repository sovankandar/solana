import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import notificationReducer from './notificationSlice';
import tokenTrackingReducer from './tokenTrackingSlice';
import tokenActivityReducer from './tokenActivitySlice';
export const store = configureStore({
  reducer: {
    token: tokenReducer,
    notification: notificationReducer,
    tokenTracking: tokenTrackingReducer,
    tokenActivity: tokenActivityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;