import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";
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

// Nueva interfaz para el estado del drawer
interface ResourcesDrawerState {
  sections: DrawerSection[];
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
  accountsHome: {
    totalAccounts: number;
    accounts: Account[];
  };
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
  calendaryRanger: DateRangeState;
  loading: boolean;
  error: string | null;
  currentPartnerId: number; // Para rastrear el partner actual
  partner: PartnerState; // Nuevo grupo
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
      { name: "EDUCATIUM", isActive: true },
      { name: "INTEGRITYLEGAL", isActive: false },
      { name: "Jooyly", isActive: true },
    ], // Asociado a subaccounts
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
        title: "¿Qué hay de nuevo?",
        items: [
          { name: "Nueva funcionalidad", new: true },
          { name: "Última actualización", new: false },
        ],
      },
      {
        title: "Inf. y enlaces de interés",
        items: [
          { name: "Actualización (mejoras)", new: true },
          { name: "Programa de afiliados", new: true },
        ],
      },
      {
        title: "¿Quién es quién en el equipo?",
        items: [
          { name: "¿Quién es quién?", new: false },
          { name: "Tienes alguna otra duda?", new: true },
        ],
      },
    ],
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
  loading: false,
  error: null,
  currentPartnerId: 6653, // ID inicial
  partner: {
    nameCompany: "Capacitravel S.L.", // Valor por defecto
    nameUser: "Alice Kuvalis", // Valor por defecto
    photoUrl: "/imgLayout/Rectangle7-png.png", // URL por defecto
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
    toggleAccountsSelect(state) {
      state.selectAccount.isAccountsSelectOpen =
        !state.selectAccount.isAccountsSelectOpen;
      console.log("evento disparado");
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
  toggleAccountsSelect,
  toggleMessage,
  openSubDrawerWithAccount,
  toggleFeatureOne,
  toggleFeatureTwo,
  setDateRange,
  resetCalendaryRanger,
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
} = clientifySlice.actions;

export default clientifySlice.reducer;
