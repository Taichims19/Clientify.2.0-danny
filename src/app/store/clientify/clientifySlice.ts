import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchPartnerData } from "./clientifyThunks";

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

// Nueva interfaz para los ítems del drawer
interface DrawerResource {
  name: string;
  new: boolean; // => Esto: Campo para controlar si muestra "New"
}

interface DrawerSection {
  title: string;
  items: DrawerResource[];
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
  url: string;
}

interface SelectState {
  names: string[];
  isAccountsSelectOpen: boolean;
  selectedPlans: string[]; // Para reemplazar personName
  lastClickTime: number | null; // Para reemplazar lastClickTime
  lastFilters: {
    // Para reemplazar lastFilters
    recurrence?: "monthly" | "yearly";
    startDate?: string;
    endDate?: string;
  };
}

interface MessageState {
  showMessage: boolean; // Nuevo estado
}

interface SummaryPanelState {
  totalContacts: number;
  activeSubscriptions: number;
  totalCommissionsPaid: number;
}
interface RecurrencePercentage {
  monthly: number;
  yearly: number;
}

interface RecentResource {
  name: string;
  url: string;
  new: boolean;
}

interface ResourcesState {
  allowedResourcesCount: number;
  recentResources: RecentResource[];
}

interface MrrPartnerState {
  totalMrr: number;
}

// Nueva interfaz para el grupo Partner
interface PartnerState {
  nameCompany: string;
  nameUser: string;
  photoUrl: string; // URL de la foto, por defecto y actualizable desde la API
}

interface DrawerResource {
  id: number;
  name: string;
  url: string;
  new: boolean;
}

interface DrawerSection {
  id: number;
  title: string;
  items: DrawerResource[];
}

// Nueva interfaz para el estado del drawer
interface ResourcesDrawerState {
  sections: DrawerSection[];
  hasFetchedResources: boolean; // Nuevo estado
  resourcesLoading: boolean; // Nuevo estado
}

interface AccountsHomeState {
  totalAccounts: number;
  accounts: Account[];
  accountsHomeLoading: boolean; // Nuevo estado de carga global
}

interface SubscriptionPlansState {
  totalPlans: number;
  plans: Plan[];
}

interface ClientifyState {
  selectedPlan: string | null;
  subscriptionPlans: {
    totalPlans: number;
    plans: Plan[];
  };
  summaryPanel: SummaryPanelState;
  recurrenceChart: RecurrencePercentage;
  mrrPartner: MrrPartnerState;
  accountsHome: AccountsHomeState; // Actualizamos la interfaz
  resourcesHome: ResourcesState;
  resourcesDrawer: ResourcesDrawerState; // => Esto: Nueva propiedad para el drawer
  drawer: DrawerState;
  subDrawer: SubDrawerState; // Nuevo estado del subDrawer
  modal: ModalState;
  selectAccount: SelectState;
  message: MessageState; // Nuevo estado
  infoBlocks: InfoBlocksState;
  transactionBlocks: TransactionBlocksState; // Nuevo estado para transacciones
  featureButtons: FeatureButtonsState;
  loading: boolean;
  error: string | null;
  currentPartnerId: number; // Para rastrear el partner actual
  partner: PartnerState; // Nuevo grupo
  activePlans: {
    totalPlans: number;
    plans: Plan[];
  };
  activeRecurrence: "monthly" | "yearly" | null; // Nueva propiedad para la recurrencia
}

const initialState: ClientifyState = {
  // Información original de clientifySlice

  // Subscription Plans
  subscriptionPlans: {
    totalPlans: 5, // Asociado a subaccount_plans_count
    plans: [
      { name: "Business Growth", count: 1, isFree: false },
      { name: "Demo", count: 1, isFree: true },
      { name: "Enterprise 10K Inbox", count: 2, isFree: false },
      { name: "Special", count: 1, isFree: false },
    ],
  },
  // Summary Panel
  summaryPanel: {
    totalContacts: 430, // Asociado a current_contacts
    activeSubscriptions: 3400, // Asociado a active_subscriptions (3.4k)
    totalCommissionsPaid: 1, // Asociado a total_invoices_payed
  },
  // Recurrence Chart
  recurrenceChart: {
    monthly: 20, // Asociado a recurrence_percentage.monthly
    yearly: 80, // Asociado a recurrence_percentage.yearly
  },
  // MRR Partner
  mrrPartner: {
    totalMrr: 108, // Asociado a total_mrr
  },
  // Accounts Home
  accountsHome: {
    totalAccounts: 3, // Asociado a subaccounts_count
    accounts: [
      {
        name: "EDUCATIUM",
        isActive: true,
        url: "https://vimeo.com/1011248999?share=copy",
      },
      {
        name: "INTEGRITYLEGAL",
        isActive: false,
        url: "https://vimeo.com/1011248999?share=copy",
      },
      {
        name: "Jooyly",
        isActive: true,
        url: "https://vimeo.com/1011248999?share=copy",
      },
    ], // Asociado a subaccounts
    accountsHomeLoading: false, // Estado inicial de carga
  },

  // Resources Home
  resourcesHome: {
    allowedResourcesCount: 13, // Asociado a allowed_resources_count
    recentResources: [
      {
        name: "Actualización (mejoras)",
        url: "https://vimeo.com/1011248999?share=copy",
        new: true,
      },
      {
        name: "Centro del conocimiento (ay...)",
        url: "https://www.youtube.com/watch?v=A4TEo2yZyiA",
        new: true,
      },
      {
        name: "Programa de afiliados",
        url: "https://clientify.notion.site/Lead-Generation-Agency-I-Certificaci-n-de-Outbound-Marketing-de-Clientify-FindThatLead-d727ea8cec56456bb2d26053e34899a5",
        new: true,
      },
      {
        name: "Contrato Partner",
        url: "https://clientify.notion.site/Lead-Generation-Agency-I-Certificaci-n-de-Outbound-Marketing-de-Clientify-FindThatLead-d727ea8cec56456bb2d26053e34899a5",
        new: true,
      },
    ], // Asociado a recent_resources
  },
  // => Esto: Nueva sección para el drawer con datos estáticos
  resourcesDrawer: {
    sections: [
      {
        id: 1,
        title: "¿Qué hay de nuevo?",
        items: [
          {
            id: 1,
            name: "Nueva funcionalidad",
            url: "https://vimeo.com/1011248999?share=copy",
            new: true,
          },
          {
            id: 2,
            name: "Última actualización",
            url: "https://www.youtube.com/watch?v=A4TEo2yZyiA",
            new: false,
          },
        ],
      },
      {
        id: 2,
        title: "Inf. y enlaces de interés",
        items: [
          {
            id: 3,
            name: "Actualización (mejoras)",
            url: "https://vimeo.com/1011248999?share=copy",
            new: false,
          },
          {
            id: 4,
            name: "Programa de afiliados",
            url: "https://vimeo.com/1011248999?share=copy",
            new: true,
          },
        ],
      },
      {
        id: 3,
        title: "¿Quién es quién en el equipo?",
        items: [
          {
            id: 5,
            name: "¿Quién es quién?",
            url: "https://www.youtube.com/watch?v=A4TEo2yZyiA",
            new: false,
          },
          {
            id: 6,
            name: "Tienes alguna otra duda?",
            url: "https://vimeo.com/1011248999?share=copy",
            new: true,
          },
        ],
      },
    ],
    hasFetchedResources: false, // Inicialmente false
    resourcesLoading: false, // Inicialmente false
  },
  selectedPlan: null,
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
  modal: {
    isModalOpen: false,
  },
  selectAccount: {
    isAccountsSelectOpen: false,
    names: [
      "Enterprise 10K",
      "Enterprise 50K Inbox",
      "Standby",
      "Demo",
      "Enterprise 10K Inbox",
      "Enterprise 15K Inbox",
      "Business Start Inbox",
    ],
    selectedPlans: [], // Inicialmente vacío (reemplaza personName)
    lastClickTime: null, // Inicialmente null (reemplaza lastClickTime)
    lastFilters: {}, // Inicialmente vacío (reemplaza lastFilters)
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
  loading: false,
  error: null,
  currentPartnerId: 1111, // ID inicial
  partner: {
    nameCompany: "Capacitravel S.L.", // Valor por defecto
    nameUser: "Alice Kuvalis", // Valor por defecto
    photoUrl: "/imgLayout/Rectangle7-png.png", // URL por defecto
  },
  activePlans: {
    totalPlans: 0,
    plans: [],
  },
  activeRecurrence: null, // Inicializamos como null
};

export const clientifySlice = createSlice({
  name: "clientify",
  initialState,
  reducers: {
    selectPlan(state, action: PayloadAction<string>) {
      state.selectedPlan = action.payload;
    },
    setTotalPlans(state, action: PayloadAction<number>) {
      state.subscriptionPlans.totalPlans = action.payload;
    },
    toggleFreeStatus(state, action: PayloadAction<string>) {
      const plan = state.subscriptionPlans.plans.find(
        (p) => p.name === action.payload
      );
      if (plan) plan.isFree = !plan.isFree;
    },
    setDrawer(state, action: PayloadAction<DrawerState>) {
      state.drawer = action.payload;
    },
    setSubDrawer(state, action: PayloadAction<SubDrawerState>) {
      state.subDrawer.isSubDrawerOpen = action.payload.isSubDrawerOpen;
      state.subDrawer.subDrawerTitle = action.payload.subDrawerTitle;
      state.subDrawer.subDrawerSelected = action.payload.subDrawerSelected;
      state.subDrawer.subView = action.payload.subView;
    },

    toggleAccountStatus(state, action: PayloadAction<string>) {
      const account = state.accountsHome.accounts.find(
        (acc) => acc.name === action.payload
      );
      if (account) account.isActive = !account.isActive;
    },
    addAccount(state, action: PayloadAction<Account>) {
      const exists = state.accountsHome.accounts.some(
        (acc) => acc.name === action.payload.name
      );
      if (!exists) {
        state.accountsHome.accounts.push(action.payload);
        state.accountsHome.totalAccounts += 1;
      } else {
        console.warn(
          `Account with name "${action.payload.name}" already exists.`
        );
      }
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.accountsHome.accounts = state.accountsHome.accounts.filter(
        (acc) => acc.name !== action.payload
      );
      state.accountsHome.totalAccounts -= 1;
    },
    openModal(state) {
      state.modal.isModalOpen = true;
    },
    closeModal(state) {
      state.modal.isModalOpen = false;
    },
    toggleMessage(state) {
      state.message.showMessage = !state.message.showMessage;
    },
    openSubDrawerWithAccount(state, action: PayloadAction<string>) {
      const account = state.accountsHome.accounts.find(
        (acc) => acc.name === action.payload
      );
      if (account) {
        state.subDrawer.isSubDrawerOpen = true;
        state.subDrawer.subDrawerTitle = account.name;
        state.subDrawer.subDrawerSelected =
          account.name === "EDUCATIUM"
            ? SubDrawerView.EDUCATIUM
            : account.name === "INTEGRITYLEGAL"
            ? SubDrawerView.INTEGRITYLEGAL
            : SubDrawerView.JOOYLY;
        state.subDrawer.subView = `Details for ${account.name}`;
      } else {
        console.warn(`No account found with name "${action.payload}".`);
      }
    },
    toggleFeatureOne(state) {
      console.log("evento disparado botton 1");
      state.featureButtons.featureOne = true;
      state.featureButtons.featureTwo = false;
    },
    toggleFeatureTwo(state) {
      console.log("evento disparado botton 2");
      state.featureButtons.featureOne = false;
      state.featureButtons.featureTwo = true;
    },
    setCurrentPartnerId(state, action: PayloadAction<number>) {
      state.currentPartnerId = action.payload;
    },
    setSummaryPanel(state, action: PayloadAction<SummaryPanelState>) {
      state.summaryPanel = action.payload;
    },
    setRecurrenceChart(state, action: PayloadAction<RecurrencePercentage>) {
      state.recurrenceChart = action.payload;
    },
    setMrrPartner(state, action: PayloadAction<MrrPartnerState>) {
      state.mrrPartner = action.payload;
    },
    setResourcesHome(state, action: PayloadAction<ResourcesState>) {
      state.resourcesHome = action.payload;
    },
    // Nuevas acciones para manejar loading y error
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    // Nueva acción para AccountsHome (falta en el original)
    setAccountsHome(
      state,
      action: PayloadAction<{ totalAccounts: number; accounts: Account[] }>
    ) {
      state.accountsHome = {
        ...state.accountsHome,
        totalAccounts: action.payload.totalAccounts,
        accounts: action.payload.accounts,
      };
    },
    // Nuevo reducer para subscriptionPlans
    setSubscriptionPlans(
      state,
      action: PayloadAction<{ totalPlans: number; plans: Plan[] }>
    ) {
      state.subscriptionPlans = {
        ...state.subscriptionPlans,
        totalPlans: action.payload.totalPlans,
        plans: action.payload.plans,
      };
    },
    // Nuevo reducer para el grupo Partner
    setPartner(
      state,
      action: PayloadAction<{
        nameCompany: string;
        nameUser: string;
        photoUrl: string;
      }>
    ) {
      state.partner = {
        ...state.partner,
        nameCompany: action.payload.nameCompany,
        nameUser: action.payload.nameUser,
        photoUrl: action.payload.photoUrl,
      };
    },
    // => Esto: Nuevo reducer para el drawer
    setResourcesDrawer(state, action: PayloadAction<ResourcesDrawerState>) {
      state.resourcesDrawer = action.payload;
    },
    setResourcesDrawerSections(state, action: PayloadAction<DrawerSection[]>) {
      state.resourcesDrawer.sections = action.payload;
    },
    setHasFetchedResources(state, action: PayloadAction<boolean>) {
      state.resourcesDrawer.hasFetchedResources = action.payload;
    },
    setResourcesLoading(state, action: PayloadAction<boolean>) {
      state.resourcesDrawer.resourcesLoading = action.payload;
    },
    setActivePlans(state, action: PayloadAction<SubscriptionPlansState>) {
      state.activePlans = action.payload;
    },
    setAccountPlansSelect(state, action: PayloadAction<string[]>) {
      state.selectAccount.names = action.payload;
    },
    toggleAccountsSelect(state) {
      state.selectAccount.isAccountsSelectOpen =
        !state.selectAccount.isAccountsSelectOpen;
    },
    setActiveRecurrence: (
      state,
      action: PayloadAction<"monthly" | "yearly" | null>
    ) => {
      state.activeRecurrence = action.payload;
    },
    resetActiveRecurrence: (state) => {
      state.activeRecurrence = null;
    },
    // Nueva acción para manejar la carga de accountsHome
    setAccountsHomeLoading(state, action: PayloadAction<boolean>) {
      state.accountsHome.accountsHomeLoading = action.payload;
    },
    // Nuevos reducers para manejar los estados movidos
    setSelectedPlans(state, action: PayloadAction<string[]>) {
      state.selectAccount.selectedPlans = action.payload;
    },
    setLastClickTime(state, action: PayloadAction<number | null>) {
      state.selectAccount.lastClickTime = action.payload;
    },
    setLastFilters(
      state,
      action: PayloadAction<{
        recurrence?: "monthly" | "yearly";
        startDate?: string;
        endDate?: string;
      }>
    ) {
      state.selectAccount.lastFilters = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Eliminar los addCase ya que usamos una función manual
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
  toggleMessage,
  openSubDrawerWithAccount,
  toggleFeatureOne,
  toggleFeatureTwo,
  setCurrentPartnerId,
  setSummaryPanel,
  setRecurrenceChart,
  setMrrPartner,
  setResourcesHome,
  setLoading,
  setError,
  setAccountsHome,
  setSubscriptionPlans,
  setPartner, // Exportar la nueva acción
  setResourcesDrawer,
  setResourcesDrawerSections,
  setHasFetchedResources,
  setResourcesLoading,
  setActivePlans,
  toggleAccountsSelect,
  setAccountPlansSelect,
  setActiveRecurrence,
  resetActiveRecurrence,
  setAccountsHomeLoading, // Nueva acción exportada
  setSelectedPlans,
  setLastClickTime,
  setLastFilters,
} = clientifySlice.actions;

export default clientifySlice.reducer;
