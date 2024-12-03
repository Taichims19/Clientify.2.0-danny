import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientifyState {
  isOpen: boolean;
  selectedPlan: string | null;
  totalPlans: number; // Total de planes
  plans: { name: string; count: number; isFree: boolean }[]; // Cambiado a "isFree"
}

const initialState: ClientifyState = {
  isOpen: false,
  selectedPlan: null,
  totalPlans: 5, // Estado inicial para el total de planes
  plans: [
    { name: "Business Growth", count: 1, isFree: false },
    { name: "Demo", count: 1, isFree: true }, // Ahora es "isFree"
    { name: "Enterprise 10K Inbox", count: 2, isFree: false },
    { name: "Special", count: 1, isFree: false },
  ],
};

export const clientifySlice = createSlice({
  name: "clientify",
  initialState,
  reducers: {
    openDrawer(state) {
      state.isOpen = true;
    },
    closeDrawer(state) {
      state.isOpen = false;
    },
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
  },
});

export const {
  openDrawer,
  closeDrawer,
  selectPlan,
  setTotalPlans,
  toggleFreeStatus,
} = clientifySlice.actions;

export default clientifySlice.reducer;
