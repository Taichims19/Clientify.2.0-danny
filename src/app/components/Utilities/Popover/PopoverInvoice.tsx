import React, { useEffect } from "react";
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
  setRemoteSearchRows,
  toggleDateRange,
  togglePendingCommissions,
  togglePendingPayments,
} from "@/app/store/clientify/invoicesTableSlice";
import DataCalendarsAccounts from "../Calendars/DataCalendarsAccounts/DataCalendarsAccounts";
import { closeModal, openModal } from "@/app/store/clientify/clientifySlice";
import {
  fetchInvoicesByDateRange,
  fetchPendingCommissions,
  fetchPendingPayments,
} from "@/app/store/clientify/clientifyThunks";

export const PopoverInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.invoiceTable.calendaryRanger
  );

  const { activeFilters, activeFiltersCount } = useSelector(
    (state: RootState) => state.invoiceTable
  );

  const isModalOpen = useSelector(
    (state: RootState) => state.clienty.modal.isModalOpen
  );

  // Estado local sincronizado con Redux
  const [pendingPaymentsChecked, setPendingPaymentsChecked] = React.useState(
    activeFilters.pendingPayments
  );
  const [pendingCommissionsChecked, setPendingCommissionsChecked] =
    React.useState(activeFilters.pendingCommissions);
  const [dateRangeChecked, setDateRangeChecked] = React.useState(
    activeFilters.dateRange
  );

  // Sincronizar estado local con Redux al montar
  useEffect(() => {
    setPendingPaymentsChecked(activeFilters.pendingPayments);
    setPendingCommissionsChecked(activeFilters.pendingCommissions);
    setDateRangeChecked(activeFilters.dateRange);
  }, [activeFilters]);

  // Handlers para los switches
  const handlePendingPaymentsSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setPendingPaymentsChecked(checked);
    dispatch(togglePendingPayments(checked));

    const partnerId = store.getState().clienty.currentPartnerId;
    if (partnerId && checked) {
      dispatch(fetchPendingPayments(partnerId.toString()));
    } else {
      dispatch(setRemoteSearchRows([]));
    }
  };

  const handlePendingCommissionsSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setPendingCommissionsChecked(checked);
    dispatch(togglePendingCommissions(checked));

    const partnerId = store.getState().clienty.currentPartnerId;
    if (partnerId && checked) {
      dispatch(fetchPendingCommissions(partnerId.toString()));
    } else {
      dispatch(setRemoteSearchRows([]));
    }
  };

  const handleDateRangeSwitch = (checked: boolean) => {
    // Solo despachar si hay un cambio real
    if (checked !== dateRangeChecked) {
      setDateRangeChecked(checked);
      dispatch(toggleDateRange(checked));
    }
  };
  const handleOpen = () => dispatch(openModal());
  const handleClose = () => dispatch(closeModal());

  // const handleClick = () => {
  //   console.info("You clicked the Chip.");
  // };

  const handleDelete = () => {
    console.info("Fechas borradas.");
    dispatch(resetCalendaryRanger()); // Limpia Redux
    dispatch(openModal()); // Forzar sincronización con calendario
  };

  useEffect(() => {
    const partnerId = store.getState().clienty.currentPartnerId;

    if (startDate && !endDate) {
      handleDateRangeSwitch(true);
      if (partnerId) {
        dispatch(fetchInvoicesByDateRange(partnerId.toString(), startDate));
      }
    } else if (startDate && endDate) {
      handleDateRangeSwitch(true);
      if (partnerId) {
        dispatch(
          fetchInvoicesByDateRange(partnerId.toString(), startDate, endDate)
        );
      }
    } else if (!startDate && !endDate && dateRangeChecked) {
      handleDateRangeSwitch(false);
      dispatch(setRemoteSearchRows([])); // Limpiar si se borra todo
    }
  }, [startDate, endDate, dateRangeChecked, dispatch]);

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
                      checked={pendingCommissionsChecked}
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
                      checked={pendingPaymentsChecked}
                      onChange={handlePendingPaymentsSwitch}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <VectorIconPopover />
          {/* Alternar entre Typography y Chip */}
          {startDate && endDate ? (
            <Chip
              label={
                startDate.isSame(endDate, "day")
                  ? startDate.format("DD [de] MMMM YYYY")
                  : `${startDate.format("DD  MMMM YYYY")} - ${endDate.format(
                      "DD  MMMM YYYY"
                    )}`
              }
              onClick={handleOpen} // Abre el modal de selección de fecha
              onDelete={handleDelete} // Borra las fechas seleccionadas
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

          <DataCalendarsAccounts open={isModalOpen} handleClose={handleClose} />
        </Box>
      </Box>
    </>
  );
};
