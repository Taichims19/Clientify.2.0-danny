import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientySlice from "./clientify/clientifySlice";
import InvoicesTableSlice from "./clientify/invoicesTableSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  clienty: clientySlice,
  invoiceTable: InvoicesTableSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
