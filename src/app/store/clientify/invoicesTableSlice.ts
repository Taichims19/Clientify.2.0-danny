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
      codigo: "PROFORMA-15301",
      cuenta: "Jooyly",
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
      cuenta: "Jooyly",
      importe: 708.0,
      moneda: "EURO",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "Mar. 17, 2024",
      liquidaciones: 216,
    },
    {
      id: 4,
      codigo: "PROFORMA-15306",
      cuenta: "Jooyly",
      importe: 708.0,
      moneda: "PATATAS",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "--",
      liquidaciones: "--",
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
};

// Crea el slice
const invoicesTableSlice = createSlice({
  name: "invoicesTable",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<InvoiceRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<InvoiceRow>) => {
      const index = state.rows.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
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
} = invoicesTableSlice.actions;

export default invoicesTableSlice.reducer;
