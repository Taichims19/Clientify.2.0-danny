import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientySlice from "./clientify/clientifySlice";
// import { authSlice } from "./auth/authSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  // auth: authSlice.reducer,
  clienty: clientySlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
