import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import clientySlice from "./clientify/clientifySlice";
import invoicesTableSlice from "./clientify/invoicesTableSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  clienty: clientySlice,
  invoiceTable: invoicesTableSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Tipo que soporta thunks
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
