// Añade "use client" al inicio del archivo para que Next.js lo renderice solo en el cliente
"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";

import { Typography, Box } from "@mui/material";
import invoicesTableStyles from "./InvoicesTable.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import FilterSvgIcom from "@/app/icons/FilterSvgIcon";
import { esES } from "@mui/x-data-grid/locales";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import IconArrowLeft from "@/app/icons/IconArrowLeft";
import IconArrowBottom from "@/app/icons/IconArrowBottom";
import IconArrowRight from "@/app/icons/IconArrowRight";
import IconDoubleArrow from "@/app/icons/IconDoubleArrow";
import IconVector from "@/app/icons/IconVector";
import IconFilterFactures from "@/app/icons/IconFilterFactures";
import IconSearchFacture from "@/app/icons/IconSearchFacture";

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
  {
    field: "codigo",
    headerName: "CÓDIGO",
    flex: 1,
    minWidth: 57,
    editable: true,
    disableColumnMenu: false,
    disableReorder: true,
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params;
      return (
        <Box>
          <Typography>{params.value}</Typography>
        </Box>
      );
    },
  },
  {
    field: "cuenta",
    headerName: "CUENTA",
    flex: 1,
    minWidth: 57,
    editable: true,
    disableColumnMenu: false,
    disableReorder: false,
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params;
      return (
        <Box>
          <Typography>{params.value}</Typography>
        </Box>
      );
    },
  },
  {
    field: "importe",
    headerName: "IMPORTE",
    type: "number",
    flex: 1,
    minWidth: 57,
    editable: true,
    disableColumnMenu: false,
    disableReorder: true,
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params;
      return (
        <Box>
          <Typography>{params.value}</Typography>
        </Box>
      );
    },
  },
  {
    field: "moneda",
    headerName: "MONEDA",
    flex: 1,
    minWidth: 57,
    editable: true,
    disableColumnMenu: false,
    disableReorder: true,
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params;
      return (
        <Box>
          <Typography>{params.value}</Typography>
        </Box>
      );
    },
  },
  {
    field: "producto",
    headerName: "PRODUCTO",
    flex: 1,
    minWidth: 57,
    editable: true,
    disableColumnMenu: false,
    disableReorder: true,
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params;
      return (
        <Box>
          <Typography>{params.value}</Typography>
        </Box>
      );
    },
  },
  {
    field: "fechaCreacion",
    headerName: "F. DE CREACIÓN",
    flex: 1,
    minWidth: 57,
    editable: true,
    disableColumnMenu: false,
    disableReorder: true,
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params;
      return (
        <Box>
          <Typography>{params.value}</Typography>
        </Box>
      );
    },
  },
  {
    field: "fechaPago",
    headerName: "F. DE PAGO",
    flex: 1,
    minWidth: 57,
    editable: true,
    disableColumnMenu: false,
    disableReorder: true,
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params;
      return (
        <Box>
          <Typography>{params.value}</Typography>
        </Box>
      );
    },
  },
  {
    field: "liquidaciones",
    headerName: "LIQUIDACIONES",
    flex: 1,
    minWidth: 30,
    editable: true,
    disableColumnMenu: false,
    disableReorder: true,
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params;
      return (
        <Box
          sx={{
            width: 100,
          }}
        >
          <Typography>{params.value}</Typography>
        </Box>
      );
    },
  },
];

const CustomPagination = () => {
  return (
    <>
      <Box className={invoicesTableStyles["Footer-DataGrid-father"]}>
        <Box className={invoicesTableStyles["Footer-DataGrid-child"]}>
          {/* Box 1 footer */}
          <Box className={invoicesTableStyles["Box-row-footer-1"]}>
            <Typography
              className={`${styles["Body-medium"]} ${poppins.className}`}
            >
              Filas por página
            </Typography>
            <Box className={invoicesTableStyles["Box-row-footer-children1"]}>
              <Typography
                className={`${styles["Body-medium"]} ${poppins.className}`}
              >
                04
              </Typography>
              <IconArrowBottom />
            </Box>
          </Box>

          {/* icon of arrow  */}
          <IconArrowLeft />
          {/* text of page */}
          <Typography
            className={`${styles["Body-medium"]} ${poppins.className}`}
          >
            1 de 1
          </Typography>
          {/* Box 2 footer */}
          <Box className={invoicesTableStyles["Box-row-footer-2"]}>
            <IconArrowRight />
            <IconDoubleArrow />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default function InvoicesTable() {
  return (
    <Box
      // sx={{ height: 400, width: "100%" }}
      className={invoicesTableStyles["DataGrid-clientify"]}
    >
      {/* box container factures */}
      <Box className={invoicesTableStyles["DataGrid-clientify_BoxFilter"]}>
        {/* box factures and icons filter */}
        <Box
          className={
            invoicesTableStyles["DataGrid-clientify_BoxFilter-children"]
          }
        >
          {/* box facture */}
          <Box className={invoicesTableStyles["BoxFilter-boxfilter2"]}>
            <Box
              className={invoicesTableStyles["BoxFilter-boxfilter2-children1"]}
            >
              <Typography
                className={`${styles["Header-bold"]} ${poppins.className}`}
              >
                FACTURAS
              </Typography>
            </Box>
            <Box
              className={invoicesTableStyles["BoxFilter-boxfilter2-children2"]}
            >
              <Box className={invoicesTableStyles["boxfilter2-children-icon1"]}>
                <Box className={invoicesTableStyles["box-icon-1"]}>
                  <IconFilterFactures />
                </Box>
              </Box>

              <Box className={invoicesTableStyles["boxfilter2-children-icon2"]}>
                <Box className={invoicesTableStyles["box-icon-2"]}>
                  <Box className={invoicesTableStyles["box-icon-2-children"]}>
                    <Typography
                      className={`${styles["Title-regular"]} ${poppins.className}`}
                    >
                      Buscar por código o comisión
                    </Typography>
                    | <IconSearchFacture />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* icon vector */}
          <IconVector />
        </Box>
        {/* box datagrid */}
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
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          slots={{
            pagination: CustomPagination,
          }}
          sx={{
            width: "100%", // Ocupa todo el ancho disponible
            height: "100%", // Ocupa toda la altura disponible
            overflow: "hidden", // Oculta la barra de desplazamiento
            "& .MuiDataGrid-main": {
              width: "100%",
              boxSizing: "border-box",
              background: "blue", // Color de fondo para la barra de herramientas
            },
            "& .MuiDataGrid-virtualScroller ": {
              width: "100%",
              background: "grey", // Color de fondo para la barra de herramientas
            },
            "& .MuiDataGrid-footerContainer": {
              display: "flex",
              width: "100%",
              padding: "16px 24px",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "8px",
              // backgroundColor: "blueviolet", // Color de fondo para el paginador
            },
          }}
        />
      </Box>
    </Box>
  );
}
