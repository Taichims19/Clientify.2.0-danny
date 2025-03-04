// Añade "use client" al inicio del archivo para que Next.js lo renderice solo en el cliente
"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridColumnHeaderParams,
} from "@mui/x-data-grid";

import { Typography, Box, Button, Popover, Badge } from "@mui/material";
import invoicesTableStyles from "./InvoicesTable.module.scss";
import { esES } from "@mui/x-data-grid/locales";

import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import IconArrowLeft from "@/app/icons/IconArrowLeft";
import IconArrowBottom from "@/app/icons/IconArrowBottom";
import IconArrowRight from "@/app/icons/IconArrowRight";
import IconDoubleArrow from "@/app/icons/IconDoubleArrow";
import IconVector from "@/app/icons/IconVector";
import IconFilterFactures from "@/app/icons/IconFilterFactures";
import IconSearchFacture from "@/app/icons/IconSearchFacture";
import NativeSelector from "../Utilities/Selectors/NativeSelect/NativeSelector";
import { PopoverInvoice } from "../Utilities/Popover/PopoverInvoice";
import { RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DrawerView,
  selectPlan,
  setDrawer,
} from "@/app/store/clientify/clientifySlice";
import {
  InvoiceRow,
  setSelectedAllInvoices,
  setSelectedInvoice,
} from "@/app/store/clientify/invoicesTableSlice";

const CustomPagination = () => {
  const rows = useSelector((state: RootState) => state.invoiceTable.rows);
  const columns = useSelector((state: RootState) => state.invoiceTable.columns);
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

            {/* <Typography
                className={`${styles["Body-medium"]} ${poppins.className}`}
              >
                04
              </Typography>
              <IconArrowBottom /> */}
            <NativeSelector />
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
  const dispatch = useDispatch();
  const handleOpenDrawer = (
    plan: string | null,
    rowData: InvoiceRow | null
  ) => {
    if (plan) {
      dispatch(selectPlan(plan));
    }
    if (rowData) {
      dispatch(setSelectedInvoice(rowData));
    }

    dispatch(
      setDrawer({
        isDrawerOpen: true,
        drawerTitle: "Resumen de liquidación",
        drawerSelected: DrawerView.INVOICESTABLES,
        view: "",
      })
    );
  };

  const renderHeader = (params: GridColumnHeaderParams) => (
    <Box className={invoicesTableStyles["Box-Data-grid-header"]}>
      <Typography
        className={`${styles["Caption-semibold"]} ${poppins.className}`}
      >
        {params.colDef.headerName}
      </Typography>
    </Box>
  );

  const renderCell = (params: GridRenderCellParams) => {
    const isLiquidacionesColumn = params.field === "liquidaciones";

    return (
      <Box
        className={invoicesTableStyles["Box-Data-grid-celdas"]}
        onClick={
          isLiquidacionesColumn && params.value !== "--"
            ? () => handleOpenDrawer(null, params.row) // Pasamos null en plan y la fila en rowData
            : undefined
        }
        style={{
          cursor:
            isLiquidacionesColumn && params.value !== "--"
              ? "pointer"
              : "default",
        }}
      >
        <Typography>{params.value}</Typography>
      </Box>
    );
  };

  // const rows = useSelector((state: RootState) => state.invoiceTable.rows);
  // const columns = useSelector((state: RootState) => state.invoiceTable.columns);

  const paymentsCount = useSelector(
    (state: RootState) => state.invoiceTable.pendingCounts.payments
  );
  const commissionsCount = useSelector(
    (state: RootState) => state.invoiceTable.pendingCounts.commissions
  );

  const combinedCount = paymentsCount + commissionsCount;

  const firstTwoRows = useSelector((state: RootState) =>
    state.invoiceTable.rows.slice(0, 4)
  );

  const columns: GridColDef[] = useSelector((state: RootState) =>
    state.invoiceTable.columns.slice(0, 8).map((column) => ({
      ...column,
      width: column.minWidth || 57,
      editable: true,
      disableColumnMenu: false,
      disableReorder: true,
      renderHeader, // Pasamos la referencia, no la ejecutamos
      renderCell, // Pasamos la referencia, no la ejecutamos
    }))
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //Logica de seleccion de filas

  const { rows, selectedInvoice, allInvoicesSelected } = useSelector(
    (state: RootState) => state.invoiceTable
  );

  const handleRowSelection = (selectionModel: any) => {
    if (selectionModel.length === 0) {
      dispatch(setSelectedInvoice(null)); // Si no hay selección, limpiamos
      return;
    }

    const selectedRow = rows.find((row) => row.id === selectionModel[0]); // Tomamos solo la primera selección
    if (selectedRow) {
      dispatch(setSelectedInvoice(selectedRow));
    }
  };

  const handleSelectAll = () => {
    dispatch(setSelectedAllInvoices(true));
  };

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
            {/* Box factures 1*/}
            <Box
              className={invoicesTableStyles["BoxFilter-boxfilter2-children1"]}
            >
              <Typography
                className={`${styles["Header-bold"]} ${poppins.className}`}
              >
                FACTURAS
              </Typography>
            </Box>
            {/* Box filter search 2*/}

            {!selectedInvoice && !allInvoicesSelected ? (
              <Box
                className={
                  invoicesTableStyles["BoxFilter-boxfilter2-children2"]
                }
              >
                {/* box icon 1 */}
                <Box
                  className={invoicesTableStyles["boxfilter2-children-icon1"]}
                >
                  <Typography
                    className={invoicesTableStyles["box-icon-1"]}
                    onClick={handleClick}
                  >
                    <IconFilterFactures />
                  </Typography>
                  <Badge
                    badgeContent={combinedCount}
                    color="error"
                    className={invoicesTableStyles["box-badge"]}
                  >
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      className={invoicesTableStyles["box-popover-invoice"]}
                    >
                      <PopoverInvoice />
                    </Popover>
                  </Badge>
                </Box>

                {/* box filter search */}
                <Box
                  className={invoicesTableStyles["boxfilter2-children-icon2"]}
                >
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
            ) : allInvoicesSelected ? (
              <Typography>Todas las facturas seleccionadas</Typography>
            ) : (
              <Box
                className={
                  invoicesTableStyles["BoxFilter-boxfilter2-children3"]
                }
              >
                <Typography
                  className={`${styles["Body-medium"]} ${poppins.className}`}
                >
                  1 factura seleccionada
                </Typography>
                <Box
                  className={invoicesTableStyles["BoxFilter-children3-content"]}
                >
                  {/* BOX ONE */}
                  <Box
                    className={
                      invoicesTableStyles["BoxFilter-children3-content-boxes"]
                    }
                  >
                    <Typography
                      className={`${styles["Body-regular"]} ${poppins.className}`}
                    >
                      Importe:
                    </Typography>
                    <Typography
                      className={`${styles["Body-regular-4"]} ${poppins.className}`}
                    >
                      {selectedInvoice?.importe}
                      {selectedInvoice?.moneda}
                    </Typography>
                  </Box>

                  {/* BOX TWO */}
                  <Box
                    className={
                      invoicesTableStyles["BoxFilter-children3-content-boxes"]
                    }
                  >
                    <Typography
                      className={`${styles["Body-regular"]} ${poppins.className}`}
                    >
                      Comisión:
                    </Typography>
                    <Typography
                      className={`${styles["Body-regular-4"]} ${poppins.className}`}
                    >
                      25%
                    </Typography>
                  </Box>

                  {/* BOX THREE */}
                  <Box
                    className={
                      invoicesTableStyles["BoxFilter-children3-content-boxes"]
                    }
                  >
                    <Typography
                      className={`${styles["Body-regular"]} ${poppins.className}`}
                    >
                      Pago:
                    </Typography>
                    <Typography
                      className={`${styles["Body-regular-4"]} ${poppins.className}`}
                    >
                      177,00 USD
                    </Typography>
                  </Box>
                  <Button
                    className={
                      invoicesTableStyles["BoxFilter-children3-button"]
                    }
                  >
                    Enviar
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
          {/* icon vector */}
          <IconVector />
        </Box>

        {/* box datagrid */}
        <DataGrid
          className={invoicesTableStyles["DataGrid-clientify-box1"]}
          // rows={rows}
          rows={firstTwoRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 4,
              },
            },
          }}
          pageSizeOptions={[4, 10, 20]}
          // components={{
          //   Toolbar: GridToolbar, // Para mostrar el filtro de búsqueda y otras opciones de herramienta
          // }}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelection}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          slots={{
            pagination: CustomPagination,
          }}
          sx={{
            "& .MuiDataGrid-container--top [role=row]": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
              // backgroundColor: "red",
            },
            "& .MuiDataGrid-main": {
              width: "100%",
            },
            "& .MuiDataGrid-cellCheckbox": {
              // backgroundColor: "white",
              display: "flex",
              width: "50px",
              height: "100%",
              // marginRight: "28px",
              justifyContent: "center",
              alignItems: "center",
            },
            "& .MuiSvgIcon-root": {
              // backgroundColor: "green",
              position: "absolute",
              // right: "30%",
            },
            "& .MuiDataGrid-columnHeader--alignCenter": {
              // backgroundColor: "yellow",
              display: "flex",
              width: "20px",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
            },
            "& .MuiDataGrid-virtualScroller ": {
              width: "100%",
              // background: "yellow",
            },
            "& .MuiDataGrid-virtualScrollerContent .MuiDataGrid-row": {
              // background: "blue",
              marginTop: "8px",
              // background: "red",
              // height: "56px",
            },
            "& .MuiDataGrid-virtualScrollerRenderZone": {
              // background: "blue",
              height: "auto",
              // paddingTop: "6px",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignSelf: "stretch",
              flexBasis: "125px",
              height: "125px",
              // background: "blue",
            },
            "& .MuiDataGrid-footerContainer": {
              display: "flex",
              width: "100%",
              padding: "16px 0px 16px 0px ",
              // borderTop: "0px solid transparent",
              // justifyContent: "flex-end",
              // alignItems: "center",
              // gap: "8px",
              // backgroundColor: "blue", // Color de fondo para el paginador
            },
          }}
        />
      </Box>
    </Box>
  );
}
