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
  liquidaciones: number;
}

// Define el estado inicial del slice
interface DataGridState {
  rows: InvoiceRow[];
  columns: GridColDef[];
}

const initialState: DataGridState = {
  rows: [
    {
      id: 1,
      codigo: "PROFORMA-15301",
      cuenta: "Jooyly",
      importe: 708.0,
      moneda: "EURO",
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
      moneda: "Patatas",
      producto: "1 × Business Growth (at $708.00 / year)",
      fechaCreacion: "Oct. 17, 2023",
      fechaPago: "--",
      liquidaciones: 216,
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
  },
});

export const { addRow, updateRow, deleteRow } = invoicesTableSlice.actions;

export default invoicesTableSlice.reducer;
