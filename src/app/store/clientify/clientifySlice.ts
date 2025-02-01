import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

// Enums para diferentes estados y vistas
enum InfoBlockTitle {
  Datos = "Datos",
  Actividad = "Actividad",
  Funcionalidades = "Funcionalidades",
}

export enum DrawerView {
  PLANSUSCRIPTION = "PLANSUSCRIPTION",
  ACCOUNTS = "ACCOUNTS",
  RESOURCES = "RESOURCES",
  ACCOUNTSCHILDREN = "ACCOUNTS-CHILDREN-ONE",
  INVOICESTABLES = "INVOICESTABLES",
}

export enum SubDrawerView {
  EDUCATIUM = "EDUCATIUM",
  INTEGRITYLEGAL = "INTEGRITYLEGAL",
  JOOYLY = "JOOYLY",
}

// Enums para las secciones de transacciones
enum TransactionBlockTitle {
  Transacciones = "Transacciones",
}

// Actualizar la interfaz del estado global
interface FeatureButtonsState {
  featureOne: boolean;
  featureTwo: boolean;
}

// Interfaces para el contenido de bloques e información adicional
interface InfoRow {
  label: string;
  value: string | number;
}

interface InfoBlock {
  title: InfoBlockTitle;
  content: InfoRow[];
}

interface InfoBlocksState {
  blocks: InfoBlock[];
}

interface TransactionRow {
  amount: number;
  icon: string;
  date: string;
  type: string;
}

interface TransactionBlock {
  title: TransactionBlockTitle;
  content: TransactionRow[];
}

interface TransactionBlocksState {
  blocksTransaction: TransactionBlock[];
}

interface DrawerState {
  isDrawerOpen: boolean;
  drawerTitle: string;
  drawerSelected: DrawerView;
  view: string;
}

interface SubDrawerState {
  isSubDrawerOpen: boolean;
  subDrawerTitle: string;
  subDrawerSelected: SubDrawerView;
  subView: string;
}

interface ModalState {
  isModalOpen: boolean;
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

interface SelectState {
  isAccountsSelectOpen: boolean; // Nuevo estado
}

interface MessageState {
  showMessage: boolean; // Nuevo estado
}

interface DateRangeState {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface ClientifyState {
  selectedPlan: string | null;
  totalPlans: number;
  plans: Plan[];
  drawer: DrawerState;
  subDrawer: SubDrawerState; // Nuevo estado del subDrawer
  totalAccounts: number;
  accounts: Account[];
  // Nuevo estado para modales
  modal: ModalState;
  selectAccount: SelectState;
  message: MessageState; // Nuevo estado
  infoBlocks: InfoBlocksState;
  transactionBlocks: TransactionBlocksState; // Nuevo estado para transacciones
  featureButtons: FeatureButtonsState;
  calendaryRanger: DateRangeState;
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
  subDrawer: {
    isSubDrawerOpen: false,
    subDrawerTitle: "",
    subDrawerSelected: SubDrawerView.EDUCATIUM,
    subView: "",
  },
  // Información añadida de accountsHomeSlice
  totalAccounts: 3,
  accounts: [
    { name: "EDUCATIUM", isActive: true },
    { name: "INTEGRITYLEGAL", isActive: false },
    { name: "Jooyly", isActive: true },
  ],
  modal: {
    isModalOpen: false,
  },
  selectAccount: {
    isAccountsSelectOpen: false,
  },
  message: {
    showMessage: false, // Estado inicial del mensaje
  },
  infoBlocks: {
    blocks: [
      {
        title: InfoBlockTitle.Datos,
        content: [
          { label: "MRR", value: 50 },
          { label: "Plan", value: "Partner" },
          { label: "Caducidad", value: "24, Nov 2024" },
          { label: "Tipo", value: "Socio" },
          { label: "País", value: "Colombia" },
        ],
      },
      {
        title: InfoBlockTitle.Actividad,
        content: [
          { label: "Sesiones", value: 4 },
          { label: "Primera sesión", value: "Dic. 22, 2023" },
          { label: "Última sesión", value: "Dic. 28, 2023" },
          { label: "Usuarios", value: 10 },
          { label: "Contactos", value: 150 },
        ],
      },
      {
        title: InfoBlockTitle.Funcionalidades,
        content: [
          { label: "Landings", value: 0 },
          { label: "Formularios", value: 0 },
          { label: "Chatbots", value: 0 },
          { label: "Encuestas", value: 0 },
          { label: "Campañas", value: 0 },
          { label: "Automatizaciones", value: 0 },
          { label: "Oportunidades", value: 0 },
          { label: "Presupuestos", value: 0 },
          { label: "Reuniones", value: 0 },
          { label: "Canales de inbox", value: 0 },
          { label: "Conversaciones de inbox", value: 0 },
        ],
      },
    ],
  },
  transactionBlocks: {
    blocksTransaction: [
      {
        title: TransactionBlockTitle.Transacciones,
        content: [
          {
            amount: 50.25,
            icon: "open",
            date: "26, Dic, 2023",
            type: "factura",
          },
          {
            amount: 45.15,
            icon: "open",
            date: "14, May, 2024",
            type: "factura",
          },
          {
            amount: 45.15,
            icon: "open",
            date: "19, Abr, 2024",
            type: "factura",
          },
        ],
      },
    ],
  },
  featureButtons: {
    featureOne: false,
    featureTwo: false,
  },
  calendaryRanger: {
    startDate: null,
    endDate: null,
  },
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
    // Nuevo reducer para manejar el subDrawer
    setSubDrawer(state, action: PayloadAction<SubDrawerState>) {
      state.subDrawer.isSubDrawerOpen = action.payload.isSubDrawerOpen;
      state.subDrawer.subDrawerTitle = action.payload.subDrawerTitle;
      state.subDrawer.subDrawerSelected = action.payload.subDrawerSelected;
      state.subDrawer.subView = action.payload.subView;
    },
    // Reducers añadidos de accountsHomeSlice
    toggleAccountStatus(state, action: PayloadAction<string>) {
      const account = state.accounts.find((acc) => acc.name === action.payload);
      if (account) {
        account.isActive = !account.isActive;
      }
    },
    addAccount(state, action: PayloadAction<Account>) {
      const exists = state.accounts.some(
        (acc) => acc.name === action.payload.name
      );
      if (!exists) {
        state.accounts.push(action.payload);
        state.totalAccounts += 1;
      } else {
        console.warn(
          `Account with name "${action.payload.name}" already exists.`
        );
      }
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.accounts = state.accounts.filter(
        (acc) => acc.name !== action.payload
      );
      state.totalAccounts -= 1;
    },
    // Reducer para manejar el modal
    openModal(state) {
      state.modal.isModalOpen = true;
    },
    closeModal(state) {
      state.modal.isModalOpen = false;
    },
    toggleAccountsSelect(state) {
      state.selectAccount.isAccountsSelectOpen =
        !state.selectAccount.isAccountsSelectOpen;
      console.log("evento disparado");
    },
    toggleMessage(state) {
      state.message.showMessage = !state.message.showMessage;
    },
    // Nuevo reducer para abrir el drawer con datos de una cuenta
    openSubDrawerWithAccount(state, action: PayloadAction<string>) {
      const account = state.accounts.find((acc) => acc.name === action.payload);
      if (account) {
        state.subDrawer.isSubDrawerOpen = true;
        state.subDrawer.subDrawerTitle = account.name;
        state.subDrawer.subDrawerSelected =
          account.name === "EDUCATIUM"
            ? SubDrawerView.EDUCATIUM
            : account.name === "INTEGRITYLEGAL"
            ? SubDrawerView.INTEGRITYLEGAL
            : SubDrawerView.JOOYLY; // Selección dinámica del `subDrawerSelected`
        state.subDrawer.subView = `Details for ${account.name}`; // Vista personalizada
      } else {
        console.warn(
          `No account found with name "${action.payload}". Ensure the account name is correct.`
        );
      }
    },
    toggleFeatureOne(state) {
      console.log("evento disparado botton 1");
      state.featureButtons.featureOne = true; // Activa featureOne
      state.featureButtons.featureTwo = false; // Desactiva featureTwo
    },
    toggleFeatureTwo(state) {
      console.log("evento disparado botton 2");
      state.featureButtons.featureOne = false; // Activa featureOne
      state.featureButtons.featureTwo = true; // Desactiva featureTwo
    },
    setDateRange: (
      state,
      action: PayloadAction<[Dayjs | null, Dayjs | null]>
    ) => {
      const [startDate, endDate] = action.payload;
      state.calendaryRanger.startDate = startDate;
      state.calendaryRanger.endDate = endDate;
    },
    resetCalendaryRanger: (state) => {
      state.calendaryRanger.startDate = null;
      state.calendaryRanger.endDate = null;
    },
  },
});

export const {
  selectPlan,
  setTotalPlans,
  toggleFreeStatus,
  setDrawer,
  setSubDrawer,
  toggleAccountStatus,
  addAccount,
  removeAccount,
  openModal,
  closeModal,
  toggleAccountsSelect,
  toggleMessage,
  openSubDrawerWithAccount,
  toggleFeatureOne,
  toggleFeatureTwo,
  setDateRange,
  resetCalendaryRanger,
} = clientifySlice.actions;

export default clientifySlice.reducer;
