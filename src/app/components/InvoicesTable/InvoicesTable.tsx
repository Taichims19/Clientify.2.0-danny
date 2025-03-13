"use client";

import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridColumnHeaderParams,
  GridPaginationModel,
  GridRowSelectionModel, // Importado para corregir el tipo
  GridCallbackDetails, // Importado para corregir el tipo
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
import { AppDispatch, RootState } from "@/app/store/store";
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
  setPageSize,
  setPage,
  setVisibleRowsCount, // Nueva acción (a definir en el slice)
} from "@/app/store/clientify/invoicesTableSlice";
import { fetchInvoicesData } from "@/app/store/clientify/clientifyThunks";

const CustomPagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rows = useSelector((state: RootState) => state.invoiceTable.rows);
  const pageSize = 100; // Tamaño fijo de la página para la API
  const page = useSelector((state: RootState) => state.invoiceTable.page || 0);
  const totalCount = useSelector(
    (state: RootState) => state.invoiceTable.totalCount || 0
  );
  const partnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );
  const visibleRowsCount = useSelector(
    (state: RootState) => state.invoiceTable.visibleRowsCount || 25
  );
  const loading = useSelector((state: RootState) => state.clienty.loading);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Calcular el rango visible
  const startRow = page * pageSize + 1;
  const endRow = Math.min(startRow + visibleRowsCount - 1, totalCount);

  const handlePageChange = (newPage: number) => {
    if (partnerId && !loading && newPage >= 0 && newPage < totalPages) {
      dispatch(setPage(newPage));
      dispatch(fetchInvoicesData(partnerId, newPage + 1, pageSize)); // API usa paginación basada en 1
    }
  };

  const handlePageSizeChange = (newVisibleRowsCount: number) => {
    if (partnerId && !loading) {
      dispatch(setVisibleRowsCount(newVisibleRowsCount));
    }
  };

  return (
    <>
      <Box className={invoicesTableStyles["Footer-DataGrid-father"]}>
        <Box className={invoicesTableStyles["Footer-DataGrid-child"]}>
          <Box className={invoicesTableStyles["Box-row-footer-1"]}>
            <Typography
              className={`${styles["Body-medium"]} ${poppins.className}`}
            >
              Filas por página
            </Typography>
            <NativeSelector
              value={visibleRowsCount}
              onChange={handlePageSizeChange}
              maxRows={totalCount}
            />
          </Box>
          <IconArrowLeft
            onClick={() => handlePageChange(page > 0 ? page - 1 : 0)}
            style={{
              cursor: page > 0 ? "pointer" : "default",
              opacity: page > 0 ? 1 : 0.5,
            }}
          />
          <Typography
            className={`${styles["Body-medium"]} ${poppins.className}`}
          >
            {/* {startRow}-{visibleEndRow} de {totalCount} */}
            {startRow}-{endRow} de {totalCount}
          </Typography>
          <Box className={invoicesTableStyles["Box-row-footer-2"]}>
            <IconArrowRight
              onClick={() =>
                handlePageChange(page < totalPages - 1 ? page + 1 : page)
              }
              style={{
                cursor: page < totalPages - 1 ? "pointer" : "default",
                opacity: page < totalPages - 1 ? 1 : 0.5,
              }}
            />
            <IconDoubleArrow
              onClick={() => handlePageChange(totalPages - 1)}
              style={{
                cursor: page < totalPages - 1 ? "pointer" : "default",
                opacity: page < totalPages - 1 ? 1 : 0.5,
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default function InvoicesTable() {
  const dispatch = useDispatch<AppDispatch>(); // Usamos AppDispatch

  // Acceder al estado de Redux al inicio
  const rows = useSelector((state: RootState) => state.invoiceTable.rows);

  const columns = useSelector((state: RootState) =>
    state.invoiceTable.columns.slice(0, 8).map((column) => ({
      ...column,
      width: column.minWidth || 57,
      editable: true,
      disableColumnMenu: false,
      disableReorder: true,
      renderHeader: (params: GridColumnHeaderParams) => (
        <Box className={invoicesTableStyles["Box-Data-grid-header"]}>
          <Typography
            className={`${styles["Caption-semibold"]} ${poppins.className}`}
          >
            {params.colDef.headerName}
          </Typography>
        </Box>
      ),
      renderCell: (params: GridRenderCellParams) => {
        const isLiquidacionesColumn = params.field === "liquidaciones";
        return (
          <Box
            className={invoicesTableStyles["Box-Data-grid-celdas"]}
            onClick={
              isLiquidacionesColumn && params.value !== "--"
                ? () => handleOpenDrawer(null, params.row)
                : undefined
            }
            style={{
              cursor:
                isLiquidacionesColumn && params.value !== "--"
                  ? "pointer"
                  : "default",
            }}
          >
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`} // Añadido para estilizar las celdas
            >
              {params.value}
            </Typography>
          </Box>
        );
      },
    }))
  );

  const filteredPendingPayments = useSelector(
    (state: RootState) => state.invoiceTable.filteredPendingPayments
  );
  const filteredPendingCommissions = useSelector(
    (state: RootState) => state.invoiceTable.filteredPendingCommissions
  );
  const activeFilters = useSelector(
    (state: RootState) => state.invoiceTable.activeFilters
  );

  const activeFiltersCount = useSelector(
    (state: RootState) => state.invoiceTable.activeFiltersCount
  );

  // const pageSize = useSelector(
  //   (state: RootState) => state.invoiceTable.pageSize || 25
  // );
  const pageSize = 100; // Fijo para la API
  const page = useSelector((state: RootState) => state.invoiceTable.page || 0);
  const { selectedInvoice, allInvoicesSelected } = useSelector(
    (state: RootState) => state.invoiceTable
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const partnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOpenDrawer = (
    plan: string | null,
    rowData: InvoiceRow | null
  ) => {
    if (plan) dispatch(selectPlan(plan));
    if (rowData) dispatch(setSelectedInvoice(rowData));
    dispatch(
      setDrawer({
        isDrawerOpen: true,
        drawerTitle: "Resumen de liquidación",
        drawerSelected: DrawerView.INVOICESTABLES,
        view: "",
      })
    );
  };

  const handleRowSelection = (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails
  ) => {
    if (rowSelectionModel.length === 0) {
      dispatch(setSelectedInvoice(null));
      return;
    }
    const selectedRowId = rowSelectionModel[0]; // Tomamos el primer ID seleccionado
    const selectedRow = rows.find(
      (row: InvoiceRow) => row.id === selectedRowId
    );
    if (selectedRow) dispatch(setSelectedInvoice(selectedRow));
  };

  const handleSelectAll = () => dispatch(setSelectedAllInvoices(true));

  // Determinar las filas a mostrar según los filtros activos
  let displayedRows = rows;
  if (activeFilters.pendingPayments && activeFilters.pendingCommissions) {
    // Intersección de ambos filtros
    displayedRows = filteredPendingPayments.filter((row: { id: any }) =>
      filteredPendingCommissions.some((comm: { id: any }) => comm.id === row.id)
    );
  } else if (activeFilters.pendingPayments) {
    displayedRows = filteredPendingPayments;
  } else if (activeFilters.pendingCommissions) {
    displayedRows = filteredPendingCommissions;
  }

  const loading = useSelector((state: RootState) => state.clienty.loading);

  const visibleRowsCount = useSelector(
    (state: RootState) => state.invoiceTable.visibleRowsCount || 25 // Usa el nuevo estado
  );

  // Tomar solo las primeras visibleRowsCount filas de la página actual
  const paginatedRows = displayedRows.slice(0, visibleRowsCount);

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
                  // sx={{ background: "red" }}
                >
                  <Typography
                    className={invoicesTableStyles["box-icon-1"]}
                    onClick={handleClick}
                  >
                    <Badge
                      badgeContent={activeFiltersCount} // Usamos activeFiltersCount
                      color="error"
                      className={invoicesTableStyles["box-badge"]}
                      // sx={{ background: "yellow" }}
                    >
                      <IconFilterFactures />
                    </Badge>
                  </Typography>

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
          rows={paginatedRows}
          columns={columns}
          // paginationModel={{ page, pageSize }}
          // onPaginationModelChange={(model: GridPaginationModel) => {
          //   dispatch(setPage(model.page)); // Usamos setPage exportada
          // }}
          pageSizeOptions={[25, 50, 75, 100]} // Limitado a 100 como máximo por tu requerimiento
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelection}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          loading={loading} // Activa el skeleton cuando loading es true
          slotProps={{
            loadingOverlay: {
              variant: "skeleton", // Activa el skeleton estilizado
              noRowsVariant: "skeleton", // Skeleton para cuando no hay filas
            },
          }}
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
            },
            // Estilos para personalizar el skeleton (opcional)
            "& .MuiDataGrid-loadingOverlay": {
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo claro para el skeleton
            },
            "& .MuiDataGrid-skeleton": {
              backgroundColor: "#e0e0e0", // Color del skeleton
              animation: "pulse 1.5s ease-in-out infinite", // Animación tipo Material-UI
            },
            "& .MuiDataGrid-cell": {
              // Añadido para aplicar la fuente a todas las celdas
              fontFamily: poppins.style.fontFamily, // Aplica la fuente poppins
              "& *": {
                // Asegura que todos los elementos dentro de la celda hereden la fuente
                fontFamily: poppins.style.fontFamily,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
