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
  filteredPendingPayments: InvoiceRow[]; // Filtrado por pagos pendientes
  filteredPendingCommissions: InvoiceRow[]; // Filtrado por comisiones pendientes
  pendingCounts: {
    payments: number;
    commissions: number;
  };
  selectedInvoice: InvoiceRow | null; // Nueva propiedad
  allInvoicesSelected: boolean; // Nueva propiedad para manejar selección totalselección total
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
  pendingCounts: {
    payments: 0,
    commissions: 0,
  },
  selectedInvoice: null, // Inicialmente ninguna factura seleccionada
  allInvoicesSelected: false, // Inicialmente no todas están seleccionadas
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
    filterPendingPayments: (state) => {
      console.log("evento pago");
      state.filteredPendingPayments = state.filteredPendingPayments.length
        ? []
        : state.rows.filter((row) => row.fechaPago === "--");
      state.rows = state.filteredPendingPayments.length
        ? state.filteredPendingPayments
        : initialState.rows;

      // Actualizar el conteo
      state.pendingCounts.payments = state.filteredPendingPayments.length;
    },
    filterPendingCommissions: (state) => {
      console.log("evento comisiones");
      state.filteredPendingCommissions = state.filteredPendingCommissions.length
        ? []
        : state.rows.filter((row) => row.liquidaciones === "--");
      state.rows = state.filteredPendingCommissions.length
        ? state.filteredPendingCommissions
        : initialState.rows;

      // Actualizar el conteo
      state.pendingCounts.commissions = state.filteredPendingCommissions.length;
    },
    calculatePendingCounts: (state) => {
      state.pendingCounts.payments = state.rows.filter(
        (row) => row.fechaPago === "--"
      ).length;
      state.pendingCounts.commissions = state.rows.filter(
        (row) => row.liquidaciones === "--"
      ).length;
    },
    resetRows: (state) => {
      state.rows = initialState.rows; // Restablece filas al estado inicial.
      state.filteredPendingPayments = []; // Limpia filtros aplicados.
      state.filteredPendingCommissions = [];
      // Resetear conteos
      state.pendingCounts.payments = 0;
      state.pendingCounts.commissions = 0;
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
  },
});

export const {
  addRow,
  updateRow,
  deleteRow,
  filterPendingPayments,
  filterPendingCommissions,
  calculatePendingCounts,
  resetRows,
  setSelectedInvoice,
  setSelectedAllInvoices,
} = invoicesTableSlice.actions;

export default invoicesTableSlice.reducer;
