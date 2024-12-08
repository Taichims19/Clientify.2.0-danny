import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Drawer } from "@mui/material";

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

interface ClientifyState {
  selectedPlan: string | null;
  totalPlans: number;
  plans: { name: string; count: number; isFree: boolean }[];
  drawer: DrawerState;
}

const initialState: ClientifyState = {
  selectedPlan: null,
  totalPlans: 5, // Estado inicial para el total de planes
  plans: [
    { name: "Business Growth", count: 1, isFree: false },
    { name: "Demo", count: 1, isFree: true }, // Ahora es "isFree"
    { name: "Enterprise 10K Inbox", count: 2, isFree: false },
    { name: "Special", count: 1, isFree: false },
  ],
  drawer: {
    isDrawerOpen: false,
    drawerTitle: "",
    drawerSelected: DrawerView.PLANSUSCRIPTION,
    view: "",
  },
};

export const clientifySlice = createSlice({
  name: "clientify",
  initialState,
  reducers: {
    selectPlan(state, action: PayloadAction<string>) {
      state.selectedPlan = action.payload;
    },
    setTotalPlans(state, action: PayloadAction<number>) {
      state.totalPlans = action.payload; // Permite actualizar el total de planes
    },
    toggleFreeStatus(state, action: PayloadAction<string>) {
      // Cambiar el estado "isFree" de un plan específico por su nombre
      const plan = state.plans.find((p) => p.name === action.payload);
      if (plan) {
        plan.isFree = !plan.isFree;
      }
    },
    setDrawer(state, action: PayloadAction<DrawerState>) {
      state.drawer = action.payload;
    },
  },
});

export const { selectPlan, setTotalPlans, toggleFreeStatus, setDrawer } =
  clientifySlice.actions;

export default clientifySlice.reducer;
