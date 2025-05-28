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
import {
  Typography,
  Box,
  Button,
  Popover,
  Badge,
  TextField,
  InputAdornment,
} from "@mui/material";
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
  setSelectedInvoices,
  setPageSize,
  setPage,
  setVisibleRowsCount,
  setSearchQuery,
  toggleSelectedInvoice, // Nueva acción (a definir en el slice)
  calculateTotalPayment, // 🔥 NUEVO selector
  selectFilteredInvoices,
  setRemoteSearchRows,
  setSettlementDetail,
} from "@/app/store/clientify/invoicesTableSlice";
import {
  fetchInvoicesData,
  fetchInvoicesBySearch,
  fetchSettlementDetailById,
} from "@/app/store/clientify/clientifyThunks";
import CommissionModal from "../Utilities/Modals/InvoicesTableModal/CommissionModal";
import { useDebounce } from "../../hooks/useDebounce/useDebounce";
import dayjs, { Dayjs } from "dayjs"; // Importamos Dayjs para las conversiones

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
  const loading = useSelector((state: RootState) => state.invoiceTable.loading);

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
          <Box>
            <Typography
              className={`${styles["Body-medium"]} ${poppins.className}`}
            >
              {/* {startRow}-{visibleEndRow} de {totalCount} */}
              {startRow}-{endRow} de {totalCount}
            </Typography>
          </Box>
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

  const filteredRows = useSelector(selectFilteredInvoices);

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

  const searchQuery = useSelector(
    (state: RootState) => state.invoiceTable.searchQuery
  );

  const partnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );

  const remoteSearchRows = useSelector(
    (state: RootState) => state.invoiceTable.remoteSearchRows
  );

  const [searchValue, setSearchValue] = React.useState(searchQuery); // Estado local para el input
  const debouncedSearch = useDebounce(searchValue, 500);

  React.useEffect(() => {
    const trimmed = debouncedSearch.trim();

    dispatch(setSearchQuery(trimmed));

    if (trimmed === "") {
      dispatch(setRemoteSearchRows([]));
      return;
    }

    if (trimmed.length >= 3 && partnerId) {
      dispatch(fetchInvoicesBySearch(partnerId.toString(), trimmed));
    } else {
      dispatch(setRemoteSearchRows([]));
    }
  }, [debouncedSearch, dispatch, partnerId]);

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

  const pageSize = 100; // Fijo para la API
  const page = useSelector((state: RootState) => state.invoiceTable.page || 0);

  const { selectedInvoices, allInvoicesSelected } = useSelector(
    (state: RootState) => state.invoiceTable
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState<{
    cuenta: string;
    producto: string;
    importe: number;
    comision: number;
  } | null>(null);
  const totalPayment = useSelector(calculateTotalPayment); // NUEVO

  const loading = useSelector((state: RootState) => state.invoiceTable.loading);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Sin validación: permitimos cualquier entrada
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOpenDrawer = (
    plan: string | null,
    rowData: InvoiceRow | null
  ) => {
    if (plan) dispatch(selectPlan(plan));
    if (rowData) {
      dispatch(toggleSelectedInvoice(rowData)); // Marca factura seleccionada

      // Si tiene liquidación válida, llama al endpoint
      if (rowData.liquidaciones && rowData.liquidaciones !== "--") {
        dispatch(fetchSettlementDetailById(rowData.liquidaciones.toString()));
      } else {
        dispatch(setSettlementDetail(null)); // Limpia si no tiene
      }

      dispatch(
        setDrawer({
          isDrawerOpen: true,
          drawerTitle: "Resumen de liquidación",
          drawerSelected: DrawerView.INVOICESTABLES,
          view: "",
        })
      );
    }
  };

  const handleSendClick = () => {
    if (selectedInvoices.length === 1) {
      const invoice = selectedInvoices[0];
      setModalData({
        cuenta: invoice.cuenta,
        producto: invoice.producto,
        importe: invoice.importe,
        comision: invoice.importe * 0.25,
      });
      setModalOpen(true);
    } else if (selectedInvoices.length > 1) {
      const [first] = selectedInvoices;

      const sameCuenta = selectedInvoices.every(
        (inv) => inv.cuenta === first.cuenta
      );
      const sameProducto = selectedInvoices.every(
        (inv) => inv.producto === first.producto
      );

      const totalImporte = selectedInvoices.reduce(
        (sum, inv) => sum + inv.importe,
        0
      );
      const totalComision = totalImporte * 0.25;

      if (sameCuenta && sameProducto) {
        const cantidad = selectedInvoices.length;
        const productoResumen = `${first.producto} x${cantidad}`;
        setModalData({
          cuenta: first.cuenta,
          producto: productoResumen,
          importe: totalImporte,
          comision: totalComision,
        });
        setModalOpen(true);
      } else if (!sameCuenta || !sameProducto) {
        // 🔵 Nuevo: crear mapa de cuentas y productos
        const cuentasMap = new Map<string, number>();
        const productosMap = new Map<string, number>();

        selectedInvoices.forEach((inv) => {
          cuentasMap.set(inv.cuenta, (cuentasMap.get(inv.cuenta) || 0) + 1);
          productosMap.set(
            inv.producto,
            (productosMap.get(inv.producto) || 0) + 1
          );
        });

        // 🔵 Guardar resumen en localStorage para usarlo en el modal
        localStorage.setItem(
          "cuentasResumen",
          JSON.stringify(Array.from(cuentasMap.entries()))
        );
        localStorage.setItem(
          "productosResumen",
          JSON.stringify(Array.from(productosMap.entries()))
        );

        setModalData({
          cuenta: `Ver +${cuentasMap.size}`,
          producto: `Ver +${productosMap.size}`,
          importe: totalImporte,
          comision: totalComision,
        });
        setModalOpen(true);
      }
    }
  };

  // Manejar la selección de filas
  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    if (rowSelectionModel.length === 0) {
      // Si no hay nada seleccionado, limpiar todo
      dispatch(setSelectedAllInvoices(false));
    } else {
      const selectedRows = rows.filter((row) =>
        rowSelectionModel.includes(row.id)
      );
      // Si todas las filas visibles están seleccionadas, seleccionar todas las del endpoint
      if (
        rowSelectionModel.length === paginatedRows.length &&
        paginatedRows.length > 0
      ) {
        dispatch(setSelectedAllInvoices(true));
      } else {
        // Selección parcial
        dispatch(setSelectedInvoices(selectedRows));
      }
    }
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setSelectedAllInvoices(event.target.checked));
  };

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.invoiceTable.calendaryRanger
  );
  // Convertimos las fechas de strings a Dayjs para usar métodos como .toDate()
  const startDateDayjs: Dayjs | null = startDate ? dayjs(startDate) : null;
  const endDateDayjs: Dayjs | null = endDate ? dayjs(endDate) : null;

  let displayedRows =
    remoteSearchRows.length > 0 ? remoteSearchRows : filteredRows;

  // Filtrar por rango de fechas si el switch está activo y hay fechas válidas
  if (
    activeFilters.dateRange &&
    !remoteSearchRows.length &&
    startDateDayjs &&
    endDateDayjs
  ) {
    const start = startDateDayjs.toDate();
    const end = endDateDayjs.toDate();

    displayedRows = displayedRows.filter((row) => {
      const rowDate = new Date(row.fechaCreacion);
      return rowDate >= start && rowDate <= end;
    });
  }

  // Aplicar filtros de pendingPayments y pendingCommissions
  if (activeFilters.pendingPayments && activeFilters.pendingCommissions) {
    displayedRows = displayedRows.filter(
      (row) => row.fechaPago === "--" && row.liquidaciones === "--"
    );
  } else if (activeFilters.pendingPayments) {
    displayedRows = displayedRows.filter((row) => row.fechaPago === "--");
  } else if (activeFilters.pendingCommissions) {
    displayedRows = displayedRows.filter((row) => row.liquidaciones === "--");
  }

  const visibleRowsCount = useSelector(
    (state: RootState) => state.invoiceTable.visibleRowsCount || 25 // Usa el nuevo estado
  );

  // Tomar solo las primeras visibleRowsCount filas de la página actual
  const paginatedRows = displayedRows.slice(0, visibleRowsCount);

  // Calcular la suma de los importes seleccionados
  const totalImporte = selectedInvoices.reduce(
    (sum, invoice) => sum + invoice.importe,
    0
  );
  const selectedCount = selectedInvoices.length;

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

            {selectedCount === 0 && !allInvoicesSelected ? (
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
                    style={{ cursor: "pointer" }}
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
                      <TextField
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder="Buscar por código o comisión"
                        className={`${styles["Title-regular"]} ${poppins.className}`}
                        variant="filled"
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "auto",
                            width: 215,
                            padding: 0,
                            background: "transparent",
                            border: "none", // Sin borde en el contenedor
                            // background: "blue",
                            "&:before, &:after": {
                              display: "none", // Elimina la línea inferior por defecto
                            },
                            "&:hover, &:focus, &:active": {
                              border: "none", // Sin borde al hacer hover o foco
                              outline: "none", // Sin contorno al hacer foco
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontFamily: poppins.style.fontFamily,
                            padding: 0,
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "19px",
                            color: "#8D8D8D",
                            border: "none",
                            "&:hover, &:focus, &:active": {
                              border: "none", // Sin borde en estados
                              outline: "none", // Sin contorno en estados
                            },
                          },
                        }}
                      />
                      <Typography
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "end",
                        }}
                        // onClick={handleSearch}
                      >
                        <IconSearchFacture />
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                className={
                  invoicesTableStyles["BoxFilter-boxfilter2-children3"]
                }
              >
                <Typography
                  className={`${styles["Body-medium"]} ${poppins.className}`}
                >
                  {allInvoicesSelected
                    ? "Todas las facturas seleccionadas"
                    : `${selectedCount} factura${
                        selectedCount > 1 ? "s" : ""
                      } seleccionada${selectedCount > 1 ? "s" : ""}`}
                </Typography>
                <Box
                  className={invoicesTableStyles["BoxFilter-children3-content"]}
                >
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
                      {totalImporte.toFixed(2)}{" "}
                      {(selectedInvoices[0]?.moneda || "USD").toUpperCase()}
                    </Typography>
                  </Box>
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
                      {/* 177,00 USD */}
                      {totalPayment.toFixed(2)}{" "}
                      {(selectedInvoices[0]?.moneda || "USD").toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  className={invoicesTableStyles["BoxFilter-children3-button"]}
                  onClick={handleSendClick}
                >
                  <Typography
                    className={`${styles["Title-medium-white"]} ${poppins.className}`}
                  >
                    Enviar
                  </Typography>
                </Button>
              </Box>
            )}
          </Box>
          <IconVector />
        </Box>
        {paginatedRows.length === 0 && !loading && (
          <Box
            sx={{
              width: "100%",
              padding: "32px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              className={`${styles["Body-medium"]} ${poppins.className}`}
              sx={{ color: "#8D8D8D" }}
            >
              No se encontraron facturas que coincidan con tu búsqueda.
            </Typography>
          </Box>
        )}
        {/* box datagrid */}
        <DataGrid
          className={invoicesTableStyles["DataGrid-clientify-box1"]}
          rows={paginatedRows}
          columns={columns}
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

      {/* MODAL insertado al final del return */}
      {modalData && (
        <CommissionModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setModalData(null);
          }}
          onSubmit={() => {
            console.log("Enviar comisión");
            setModalOpen(false);
            setModalData(null);
          }}
          data={modalData}
        />
      )}
    </Box>
  );
}
