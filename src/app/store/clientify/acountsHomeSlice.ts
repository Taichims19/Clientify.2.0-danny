// store/accountsHomeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Account {
  name: string;
  isActive: boolean;
}

interface AccountsHomeState {
  totalAccounts: number;
  accounts: Account[];
}

const initialState: AccountsHomeState = {
  totalAccounts: 3,
  accounts: [
    { name: "EDUCATIUM", isActive: true },
    { name: "INTEGRITYLEGAL", isActive: false },
    { name: "Jooyly", isActive: true },
  ],
};

export const accountsHomeSlice = createSlice({
  name: "accountsHome",
  initialState,
  reducers: {
    toggleAccountStatus(state, action: PayloadAction<string>) {
      const account = state.accounts.find((acc) => acc.name === action.payload);
      if (account) {
        account.isActive = !account.isActive;
      }
    },
    addAccount(state, action: PayloadAction<Account>) {
      state.accounts.push(action.payload);
      state.totalAccounts += 1;
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.accounts = state.accounts.filter(
        (acc) => acc.name !== action.payload
      );
      state.totalAccounts -= 1;
    },
  },
});

export const { toggleAccountStatus, addAccount, removeAccount } =
  accountsHomeSlice.actions;

export default accountsHomeSlice.reducer;
