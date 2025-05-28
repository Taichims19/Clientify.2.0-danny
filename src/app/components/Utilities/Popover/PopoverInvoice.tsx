import React, { useEffect, useRef } from "react";
import { Box, Chip, Typography } from "@mui/material";
import AntSwitches from "../Switches/AntSwitch/AntSwitches";
import PopoverInvoiceStyles from "./PopoverInvoice.module.scss";
import styles from "../../../styles/home.module.css";
import { poppins } from "../../../fonts/fonts";
import VectorIconPopover from "@/app/icons/VectorIconPopover";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "@/app/store/store";
import {
  resetCalendaryRanger,
  setPage,
  setRemoteSearchRows,
  toggleDateRange,
  togglePendingCommissions,
  togglePendingPayments,
} from "@/app/store/clientify/invoicesTableSlice";
import { closeModal, openModal } from "@/app/store/clientify/clientifySlice";
import {
  fetchInvoicesData,
  fetchInvoicesWithFilters,
} from "@/app/store/clientify/clientifyThunks";
import DataCalendarsInvoices from "../Calendars/DataCalendarsInvoices/DataCalendarsInvoices";
import dayjs, { Dayjs } from "dayjs"; // Importamos Dayjs para las conversiones

export const PopoverInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();

  const prevFiltersRef = useRef<any>({});
  const hasFetchedRef = useRef(false);

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.invoiceTable.calendaryRanger
  );

  // Convertimos las fechas de strings a Dayjs para usar métodos como .isSame() y .format()
  const startDateDayjs: Dayjs | null = startDate ? dayjs(startDate) : null;
  const endDateDayjs: Dayjs | null = endDate ? dayjs(endDate) : null;

  const { activeFilters, activeFiltersCount } = useSelector(
    (state: RootState) => state.invoiceTable
  );

  const { page, pageSize } = useSelector(
    (state: RootState) => state.invoiceTable
  );

  const isModalOpen = useSelector(
    (state: RootState) => state.clienty.modal.isModalOpen
  );

  // Función para verificar si hay filtros activos
  const hasActiveFilters = () => {
    return (
      activeFilters.pendingPayments ||
      activeFilters.pendingCommissions ||
      startDate ||
      endDate
    );
  };

  // Función para construir y despachar filtros
  const applyFilters = () => {
    const partnerId = store.getState().clienty.currentPartnerId;
    if (!partnerId) return;

    const currentFilters = {
      pending_payment: activeFilters.pendingPayments,
      pending_commission: activeFilters.pendingCommissions,
      date_start: startDate ?? undefined,
      date_end: endDate ?? undefined,
    };

    // Comparar filtros actuales con los anteriores para evitar llamadas innecesarias
    const hasFiltersChanged =
      JSON.stringify(currentFilters) !== JSON.stringify(prevFiltersRef.current);

    // Solo ejecutar si hay filtros activos y los filtros han cambiado
    if (hasFiltersChanged && !hasFetchedRef.current) {
      if (hasActiveFilters()) {
        hasFetchedRef.current = true;
        dispatch(setPage(0));
        dispatch(
          fetchInvoicesWithFilters(partnerId.toString(), currentFilters)
        );
        prevFiltersRef.current = { ...currentFilters };
      } else {
        hasFetchedRef.current = true;
        dispatch(setPage(0));
        dispatch(fetchInvoicesData(partnerId, 1, pageSize));
        prevFiltersRef.current = { ...currentFilters };
      }
    }
  };

  // Handlers para los switches
  const handlePendingPaymentsSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    dispatch(togglePendingPayments(checked));
    if (!checked && !activeFilters.pendingCommissions && !startDate) {
      dispatch(setRemoteSearchRows([]));
    }
  };

  const handlePendingCommissionsSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    dispatch(togglePendingCommissions(checked));
    if (!checked && !activeFilters.pendingPayments && !startDate) {
      dispatch(setRemoteSearchRows([]));
    }
  };

  const handleDateRangeSwitch = (checked: boolean) => {
    if (checked !== activeFilters.dateRange) {
      dispatch(toggleDateRange(checked));
    }
  };

  const handleOpen = () => dispatch(openModal());
  const handleClose = () => dispatch(closeModal());

  const handleDelete = () => {
    console.info("Fechas borradas.");
    dispatch(resetCalendaryRanger());
    dispatch(openModal());
  };

  // Efecto para manejar cambios en los filtros
  useEffect(() => {
    hasFetchedRef.current = false;
    applyFilters();

    if (startDate && !endDate) {
      handleDateRangeSwitch(true);
    } else if (startDate && endDate) {
      handleDateRangeSwitch(true);
    } else if (!startDate && !endDate && activeFilters.dateRange) {
      handleDateRangeSwitch(false);
      if (!activeFilters.pendingPayments && !activeFilters.pendingCommissions) {
        dispatch(setRemoteSearchRows([]));
      }
    }
  }, [
    startDate,
    endDate,
    activeFilters.pendingPayments,
    activeFilters.pendingCommissions,
  ]);

  return (
    <>
      <Box className={PopoverInvoiceStyles["box-father-popover"]}>
        <Box className={PopoverInvoiceStyles["box-children-popover"]}>
          <Box className={PopoverInvoiceStyles["box-popover-content"]}>
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Comisiones pendientes
            </Typography>
            <Box
              className={
                PopoverInvoiceStyles["box-children-father-icon-switch"]
              }
            >
              <Box className={PopoverInvoiceStyles["box-icon-children1"]}>
                <Box
                  className={PopoverInvoiceStyles["box-children1-grandson1"]}
                >
                  <Box className={PopoverInvoiceStyles["grandson1-children4"]}>
                    <AntSwitches
                      checked={activeFilters.pendingCommissions}
                      onChange={handlePendingCommissionsSwitch}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={PopoverInvoiceStyles["box-popover-content"]}>
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Pagos pendientes
            </Typography>
            <Box
              className={
                PopoverInvoiceStyles["box-children-father-icon-switch"]
              }
            >
              <Box className={PopoverInvoiceStyles["box-icon-children1"]}>
                <Box
                  className={PopoverInvoiceStyles["box-children1-grandson1"]}
                >
                  <Box className={PopoverInvoiceStyles["grandson1-children4"]}>
                    <AntSwitches
                      checked={activeFilters.pendingPayments}
                      onChange={handlePendingPaymentsSwitch}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <VectorIconPopover />
          {/* Alternar entre Typography y Chip */}
          {startDateDayjs && endDateDayjs ? (
            <Chip
              label={
                startDateDayjs.isSame(endDateDayjs, "day")
                  ? startDateDayjs.format("DD [de] MMMM YYYY")
                  : `${startDateDayjs.format(
                      "DD MMMM YYYY"
                    )} - ${endDateDayjs.format("DD MMMM YYYY")}`
              }
              onClick={handleOpen}
              onDelete={handleDelete}
            />
          ) : (
            <Typography
              sx={{ cursor: "pointer" }}
              className={`${styles["Body-medium-blue"]} ${poppins.className}`}
              onClick={handleOpen} // Abre el modal de selección de fecha
            >
              Seleccionar fecha
            </Typography>
          )}

          <DataCalendarsInvoices open={isModalOpen} handleClose={handleClose} />
        </Box>
      </Box>
    </>
  );
};
