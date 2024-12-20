import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DrawerView {
  PLANSUSCRIPTION = "PLANSUSCRIPTION",
  ACCOUNTS = "ACCOUNTS",
  RESOURCES = "RESOURCES",
}

interface DrawerState {
  isDrawerOpen: boolean;
  drawerTitle: string;
  drawerSelected: DrawerView;
  view: string;
}

interface Plan {
  name: string;
  count: number;
  isFree: boolean;
}

interface Account {
  name: string;
  isActive: boolean;
}

interface ClientifyState {
  selectedPlan: string | null;
  totalPlans: number;
  plans: Plan[];
  drawer: DrawerState;
  totalAccounts: number;
  accounts: Account[];
}

const initialState: ClientifyState = {
  // Información original de clientifySlice
  selectedPlan: null,
  totalPlans: 5,
  plans: [
    { name: "Business Growth", count: 1, isFree: false },
    { name: "Demo", count: 1, isFree: true },
    { name: "Enterprise 10K Inbox", count: 2, isFree: false },
    { name: "Special", count: 1, isFree: false },
  ],
  drawer: {
    isDrawerOpen: false,
    drawerTitle: "",
    drawerSelected: DrawerView.PLANSUSCRIPTION,
    view: "",
  },
  // Información añadida de accountsHomeSlice
  totalAccounts: 3,
  accounts: [
    { name: "EDUCATIUM", isActive: true },
    { name: "INTEGRITYLEGAL", isActive: false },
    { name: "Jooyly", isActive: true },
  ],
};

export const clientifySlice = createSlice({
  name: "clientify",
  initialState,
  reducers: {
    // Reducers originales de clientifySlice
    selectPlan(state, action: PayloadAction<string>) {
      state.selectedPlan = action.payload;
    },
    setTotalPlans(state, action: PayloadAction<number>) {
      state.totalPlans = action.payload;
    },
    toggleFreeStatus(state, action: PayloadAction<string>) {
      const plan = state.plans.find((p) => p.name === action.payload);
      if (plan) {
        plan.isFree = !plan.isFree;
      }
    },
    setDrawer(state, action: PayloadAction<DrawerState>) {
      state.drawer = action.payload;
    },
    // Reducers añadidos de accountsHomeSlice
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

export const {
  selectPlan,
  setTotalPlans,
  toggleFreeStatus,
  setDrawer,
  toggleAccountStatus,
  addAccount,
  removeAccount,
} = clientifySlice.actions;

export default clientifySlice.reducer;
