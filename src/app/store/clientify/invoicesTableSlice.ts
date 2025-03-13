// src/redux/dataGridSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GridColDef } from "@mui/x-data-grid";

// Define la interfaz para las filas y columnas
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
  selectedInvoice: InvoiceRow | null; // Nueva propiedad
  allInvoicesSelected: boolean; // Nueva propiedad para manejar selección totalselección total
  totalCount: number; // Nuevo campo para el total de facturas
  nextPageUrl: string | null; // URL de la siguiente página
  visibleRowsCount: number; // Nueva propiedad para controlar el renderizado
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
  selectedInvoice: null, // Inicialmente ninguna factura seleccionada
  allInvoicesSelected: false, // Inicialmente no todas están seleccionadas
  page: 0, // Página inicial
  pageSize: 100, // Fijamos a 100 por página
  totalCount: 0,
  nextPageUrl: null,
  visibleRowsCount: 25, // Valor por defecto para iniciar con 25
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
    setSelectedInvoice: (state, action: PayloadAction<InvoiceRow | null>) => {
      console.log("1 factura seleccionada");
      state.selectedInvoice = action.payload;
    },
    setSelectedAllInvoices: (state, action: PayloadAction<boolean>) => {
      console.log("Todas las facturas seleccionadas");
      state.allInvoicesSelected = action.payload;
      state.selectedInvoice = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      state.visibleRowsCount = 25; // Reinicia a 25 al cambiar de página
    },
    // setPageSize: (state, action: PayloadAction<number>) => {
    //   state.pageSize = action.payload;
    //   state.page = 0; // Resetea a la primera página
    // },
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
  setSelectedInvoice,
  setSelectedAllInvoices,
  setPage,
  setPageSize,
  setTotalCount,
  setNextPageUrl,
  setVisibleRowsCount, // Exportamos el nuevo reducer
} = invoicesTableSlice.actions;

export default invoicesTableSlice.reducer;
