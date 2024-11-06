// Añade "use client" al inicio del archivo para que Next.js lo renderice solo en el cliente
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import invoicesTableStyles from "./InvoicesTable.module.scss";
import { Typography } from "@mui/material";
import FilterSvgIcom from "@/app/icons/FilterSvgIcon";
import SearchIcon from "@mui/icons-material/Search";

// Filas de datos con la información para cada columna
const rows = [
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
    liquidaciones: 216,
  },
];

// Definición de las columnas del DataGrid
const columns: GridColDef[] = [
  { field: "codigo", headerName: "CÓDIGO", width: 150 },
  { field: "cuenta", headerName: "CUENTA", width: 150 },
  { field: "importe", headerName: "IMPORTE", width: 100, type: "number" },
  { field: "moneda", headerName: "MONEDA", width: 100 },
  { field: "producto", headerName: "PRODUCTO", width: 300 },
  { field: "fechaCreacion", headerName: "F. DE CREACIÓN", width: 150 },
  { field: "fechaPago", headerName: "F. DE PAGO", width: 150 },
  {
    field: "liquidaciones",
    headerName: "LIQUIDACIONES",
    width: 150,
    renderCell: (params) => (
      <a href="#">{params.value}</a> // Enlace estilo para LIQUIDACIONES
    ),
  },
];

export default function InvoicesTable() {
  return (
    <Box
      // sx={{ height: 400, width: "100%" }}
      className={invoicesTableStyles["DataGrid-clientify"]}
    >
      <Box className={invoicesTableStyles["DataGrid-clientify_BoxFilter"]}>
        <Typography>FACTURAS</Typography>
        <Box className={invoicesTableStyles["BoxFilter-Children1"]}>
          <FilterSvgIcom />
          <SearchIcon />
        </Box>
      </Box>
      <DataGrid
        className={invoicesTableStyles["DataGrid-clientify-box1"]}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
        }}
        pageSizeOptions={[4, 10, 20]}
        components={{
          Toolbar: GridToolbar, // Para mostrar el filtro de búsqueda y otras opciones de herramienta
        }}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-main": {
            width: "100%",
            background: "red", // Color de fondo para la barra de herramientas
          },
          "& .MuiDataGrid-virtualScroller ": {
            width: "100%",
            boxSizing: "content-box",

            background: "green", // Color de fondo para la barra de herramientas
          },
          "& .MuiDataGrid-footerContainer": {
            display: "flex",
            width: "100%",
            padding: "16px 24px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "blueviolet", // Color de fondo para el paginador
          },
        }}
      />
    </Box>
  );
}
