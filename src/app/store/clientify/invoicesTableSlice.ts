// src/redux/dataGridSlice.ts
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GridColDef } from "@mui/x-data-grid";
import { RootState } from "../store"; // Ajusta la ruta si es diferente
// Define la interfaz para las filas y columnas
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export interface InvoiceRow {
  id: number;
  codigo: string;
  cuenta: string;
  importe: number;
  moneda: string;
  producto: string;
  fechaCreacion: string;
  fechaPago: string;
  liquidaciones: number | string;
}

interface DateRangeState {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface SettlementInvoiceRow {
  id: number;
  invoice_number: string;
  account: string;
  subtotal: number;
  currency: string;
  description_product: string;
  created: string;
  payment_date: string;
  settlement_id: number;
}

export interface SettlementDetailRow {
  id: number;
  created: string;
  amount: string;
  currency: string;
  payment_date: string;
  invoices: SettlementInvoiceRow[];
}
// Define el estado inicial del slice
interface DataGridState {
  rows: InvoiceRow[];
  columns: GridColDef[];
  filteredPendingPayments: InvoiceRow[]; // Mantenemos por compatibilidad, pero no lo usaremos para conteo
  filteredPendingCommissions: InvoiceRow[]; // Mantenemos por compatibilidad, pero no lo usaremos para conteo
  activeFilters: {
    pendingPayments: boolean;
    pendingCommissions: boolean;
    dateRange: boolean;
  };
  activeFiltersCount: number; // Nuevo contador único
  page: number; // Nueva propiedad para la página actual
  pageSize: number; // Nueva propiedad para el tamaño de página
  selectedInvoices: InvoiceRow[]; // Cambiado de selectedInvoice a un arreglo
  allInvoicesSelected: boolean; // Nueva propiedad para manejar selección totalselección total
  totalCount: number; // Nuevo campo para el total de facturas
  nextPageUrl: string | null; // URL de la siguiente página
  visibleRowsCount: number; // Nueva propiedad para controlar el renderizado
  searchQuery: string; // Nuevo campo para la búsqueda
  remoteSearchRows: InvoiceRow[]; // ✅ Añadido correctamente con tipado
  loading: boolean; // Nuevo estado
  calendaryRanger: DateRangeState;
  settlementDetail: SettlementDetailRow | null;
  baseSettlementInvoices: SettlementInvoiceRow[];
}

const initialState: DataGridState = {
  rows: [
    {
      id: 1,
      codigo: "PROFORMA-15301",
      cuenta: "Jooyly",
      importe: 708.0,
      moneda: "USD",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "--",
      liquidaciones: 216,
    },
    {
      id: 2,
      codigo: "PROFORMA-15303",
      cuenta: "EDUCATIUM",
      importe: 708.0,
      moneda: "USD",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "--",
      liquidaciones: "--",
    },

    {
      id: 3,
      codigo: "PROFORMA-15305",
      cuenta: "INTEGRITYLEGAL",
      importe: 718.0,
      moneda: "EURO",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "Mar. 17, 2024",
      liquidaciones: 217,
    },
    {
      id: 4,
      codigo: "PROFORMA-15306",
      cuenta: "Lorem ipsum",
      importe: 708.0,
      moneda: "PATATAS",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "--",
      liquidaciones: "--",
    },
    {
      id: 5,
      codigo: "PROFORMA-15301",
      cuenta: "Jooyly",
      importe: 708.0,
      moneda: "PATATAS",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "--",
      liquidaciones: "--",
    },
    {
      id: 6,
      codigo: "PROFORMA-15303",
      cuenta: "EDUCATIUM",
      importe: 708.0,
      moneda: "PATATAS",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "--",
      liquidaciones: "219",
    },
    {
      id: 7,
      codigo: "PROFORMA-15305",
      cuenta: "INTEGRITYLEGAL",
      importe: 708.0,
      moneda: "PATATAS",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "--",
      liquidaciones: "219",
    },
  ],
  columns: [
    { field: "codigo", headerName: "CÓDIGO", flex: 1, minWidth: 57 },
    { field: "cuenta", headerName: "CUENTA", flex: 1, minWidth: 57 },
    { field: "importe", headerName: "IMPORTE", flex: 1, minWidth: 57 },
    { field: "moneda", headerName: "MONEDA", flex: 1, minWidth: 57 },
    { field: "producto", headerName: "PRODUCTO", flex: 1, minWidth: 57 },
    {
      field: "fechaCreacion",
      headerName: "F. DE CREACIÓN",
      flex: 1,
      minWidth: 57,
    },
    { field: "fechaPago", headerName: "F. DE PAGO", flex: 1, minWidth: 57 },
    {
      field: "liquidaciones",
      headerName: "LIQUIDACIONES",
      flex: 1,
      minWidth: 30,
    },
  ],
  filteredPendingPayments: [],
  filteredPendingCommissions: [],
  activeFilters: {
    pendingPayments: false,
    pendingCommissions: false,
    dateRange: false,
  },
  activeFiltersCount: 0,
  selectedInvoices: [], // Inicialmente vacío
  allInvoicesSelected: false, // Inicialmente no todas están seleccionadas
  page: 0, // Página inicial
  pageSize: 100, // Fijamos a 100 por página
  totalCount: 0,
  nextPageUrl: null,
  visibleRowsCount: 25, // Valor por defecto para iniciar con 25
  searchQuery: "", // Valor inicial vacío
  remoteSearchRows: [],
  loading: false, // Inicialmente false
  calendaryRanger: {
    startDate: null,
    endDate: null,
  },
  settlementDetail: null,
  baseSettlementInvoices: [
    {
      id: 1,
      invoice_number: "PROFORMA-18414",
      account: "Jooyly",
      subtotal: 1188.0,
      currency: "USD",
      description_product: "1 × Business Growth (at $780.00 / year)",
      created: "2024-01-01T00:00:00Z",
      payment_date: "2024-12-31T23:59:59Z",
      settlement_id: 899,
    },
    {
      id: 2,
      invoice_number: "PROFORMA-18414",
      account: "EDUCATIUM",
      subtotal: 948.0,
      currency: "USD",
      description_product: "1 × Business Growth (at $780.00 / year)",
      created: "2024-01-01T00:00:00Z",
      payment_date: "2024-12-31T23:59:59Z",
      settlement_id: 899,
    },
    {
      id: 3,
      invoice_number: "PROFORMA-18414",
      account: "INTEGRITYLEGAL",
      subtotal: 250.0,
      currency: "USD",
      description_product: "1 × Business Growth (at $780.00 / year)",
      created: "2024-01-01T00:00:00Z",
      payment_date: "2024-12-31T23:59:59Z",
      settlement_id: 899,
    },
  ],
};

// Crea el slice
const invoicesTableSlice = createSlice({
  name: "invoicesTable",
  initialState: {
    ...initialState,
    selectedInvoice: null as InvoiceRow | null, // Nuevo estado
  },
  reducers: {
    addRow: (state, action: PayloadAction<InvoiceRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<InvoiceRow>) => {
      state.rows = state.rows.map((row) =>
        row.id === action.payload.id ? action.payload : row
      );
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    filterPendingPayments: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.filteredPendingPayments = state.rows.filter(
          (row) => row.fechaPago === "--"
        );
      } else {
        state.filteredPendingPayments = [];
      }
    },
    filterPendingCommissions: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.filteredPendingCommissions = state.rows.filter(
          (row) => row.liquidaciones === "--"
        );
      } else {
        state.filteredPendingCommissions = [];
      }
    },
    togglePendingPayments: (state, action: PayloadAction<boolean>) => {
      state.activeFilters.pendingPayments = action.payload;
      state.activeFiltersCount += action.payload ? 1 : -1;
      if (state.activeFiltersCount < 0) state.activeFiltersCount = 0;
      // Recalcular ambos filtros basados en el estado actual de rows
      state.filteredPendingPayments = action.payload
        ? state.rows.filter((row) => row.fechaPago === "--")
        : [];
      if (state.activeFilters.pendingCommissions) {
        state.filteredPendingCommissions = state.rows.filter(
          (row) => row.liquidaciones === "--" && row.fechaPago === "--"
        );
      } else {
        state.filteredPendingCommissions = action.payload
          ? []
          : state.rows.filter((row) => row.liquidaciones === "--");
      }
    },
    togglePendingCommissions: (state, action: PayloadAction<boolean>) => {
      state.activeFilters.pendingCommissions = action.payload;
      state.activeFiltersCount += action.payload ? 1 : -1;
      if (state.activeFiltersCount < 0) state.activeFiltersCount = 0;
      // Recalcular ambos filtros basados en el estado actual de rows
      state.filteredPendingCommissions = action.payload
        ? state.rows.filter((row) => row.liquidaciones === "--")
        : [];
      if (state.activeFilters.pendingPayments) {
        state.filteredPendingPayments = state.rows.filter(
          (row) => row.fechaPago === "--" && row.liquidaciones === "--"
        );
      } else {
        state.filteredPendingPayments = action.payload
          ? []
          : state.rows.filter((row) => row.fechaPago === "--");
      }
    },
    toggleDateRange: (state, action: PayloadAction<boolean>) => {
      state.activeFilters.dateRange = action.payload;
      state.activeFiltersCount += action.payload ? 1 : -1;
      if (state.activeFiltersCount < 0) state.activeFiltersCount = 0;
    },
    resetRows: (state) => {
      state.rows = [];
      state.filteredPendingPayments = [];
      state.filteredPendingCommissions = [];
    },
    setSelectedInvoices: (state, action: PayloadAction<InvoiceRow[]>) => {
      state.selectedInvoices = action.payload;
      state.allInvoicesSelected = action.payload.length === state.rows.length;
    },
    setSelectedAllInvoices: (state, action: PayloadAction<boolean>) => {
      state.allInvoicesSelected = action.payload;
      state.selectedInvoices = action.payload ? [...state.rows] : [];
    },
    toggleSelectedInvoice: (state, action: PayloadAction<InvoiceRow>) => {
      const invoice = action.payload;
      const isSelected = state.selectedInvoices.some(
        (i) => i.id === invoice.id
      );
      if (isSelected) {
        // Si ya está seleccionada, la quitamos
        state.selectedInvoices = state.selectedInvoices.filter(
          (i) => i.id !== invoice.id
        );
      } else {
        // Si no está seleccionada, la añadimos
        state.selectedInvoices.push(invoice);
      }
      state.allInvoicesSelected = false; // Desactivamos "todas" al seleccionar manualmente
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      state.visibleRowsCount = 25; // Reinicia a 25 al cambiar de página
      state.selectedInvoices = []; // Limpiar selección al cambiar de página
      state.allInvoicesSelected = false;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = 100; // Forzamos pageSize a 100 para la API
      state.page = 0; // Resetea a la primera página
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setNextPageUrl: (state, action: PayloadAction<string | null>) => {
      state.nextPageUrl = action.payload;
    },
    setVisibleRowsCount: (state, action: PayloadAction<number>) => {
      state.visibleRowsCount = action.payload; // Controla el renderizado manual
    },
    // Nuevo reducer para la búsqueda
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setRemoteSearchRows: (state, action: PayloadAction<InvoiceRow[]>) => {
      state.remoteSearchRows = action.payload;
    },
    setInvoicesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
    setSettlementDetail: (
      state,
      action: PayloadAction<SettlementDetailRow | null>
    ) => {
      state.settlementDetail = action.payload;
    },
    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
    },
  },
});

export const {
  addRow,
  updateRow,
  deleteRow,
  togglePendingPayments,
  togglePendingCommissions,
  toggleDateRange,
  filterPendingPayments,
  filterPendingCommissions,
  resetRows,
  setSelectedInvoices,
  toggleSelectedInvoice,
  setSelectedAllInvoices,
  setPage,
  setPageSize,
  setTotalCount,
  setNextPageUrl,
  setVisibleRowsCount,
  setSearchQuery, // Exportamos el nuevo reducer
  setRemoteSearchRows,
  setInvoicesLoading,
  setDateRange,
  resetCalendaryRanger,
  setSettlementDetail,
  clearSelectedInvoice,
} = invoicesTableSlice.actions;

export default invoicesTableSlice.reducer;

// 🔥 NUEVO selector para cálculo del campo "Pago"
export const calculateTotalPayment = createSelector(
  (state: RootState) => state.invoiceTable.selectedInvoices,
  (selectedInvoices) =>
    selectedInvoices.reduce(
      (total, invoice) => total + invoice.importe * 0.25,
      0
    )
);

// Selector para filtrar facturas en base a searchQuery
export const selectFilteredInvoices = createSelector(
  [
    (state: RootState) => state.invoiceTable.rows,
    (state: RootState) => state.invoiceTable.searchQuery,
  ],
  (rows, searchQuery) => {
    if (!searchQuery || searchQuery.trim() === "") return rows;

    const query = searchQuery.trim().toLowerCase();

    return rows.filter(
      (invoice) =>
        invoice.codigo.toLowerCase().includes(query) ||
        invoice.cuenta.toLowerCase().includes(query) ||
        invoice.producto.toLowerCase().includes(query)
    );
  }
);
