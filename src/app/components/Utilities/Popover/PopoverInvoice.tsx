import React, { useEffect } from "react";
import { Box, Chip, Typography } from "@mui/material";
import AntSwitches from "../Switches/AntSwitch/AntSwitches";
import PopoverInvoiceStyles from "./PopoverInvoice.module.scss";
import styles from "../../../styles/home.module.css";
import { poppins } from "../../../fonts/fonts";
import VectorIconPopover from "@/app/icons/VectorIconPopover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  toggleDateRange,
  togglePendingCommissions,
  togglePendingPayments,
} from "@/app/store/clientify/invoicesTableSlice";
import DataCalendarsAccounts from "../Calendars/DataCalendarsAccounts/DataCalendarsAccounts";
import {
  closeModal,
  openModal,
  resetCalendaryRanger,
} from "@/app/store/clientify/clientifySlice";

export const PopoverInvoice = () => {
  const dispatch = useDispatch();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.clienty.calendaryRanger
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
  };

  const handlePendingCommissionsSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setPendingCommissionsChecked(checked);
    dispatch(togglePendingCommissions(checked));
  };

  const handleDateRangeSwitch = (checked: boolean) => {
    setDateRangeChecked(checked);
    dispatch(toggleDateRange(checked));
  };

  const handleOpen = () => dispatch(openModal());
  const handleClose = () => dispatch(closeModal());

  // const handleClick = () => {
  //   console.info("You clicked the Chip.");
  // };

  const handleDelete = () => {
    console.info("Fechas borradas.");
    dispatch(resetCalendaryRanger()); // Resetea el rango de fechas en Redux
  };

  // Solo actualizar dateRangeChecked cuando el usuario interactúe con el calendario
  useEffect(() => {
    if (startDate && endDate && !dateRangeChecked) {
      handleDateRangeSwitch(true); // Activa solo si no estaba activado
    } else if (!startDate && !endDate && dateRangeChecked) {
      handleDateRangeSwitch(false); // Desactiva solo si no hay fechas
    }
  }, [startDate, endDate, dateRangeChecked]);

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
              label={`${startDate.format("DD,MM.YYYY")} - ${endDate.format(
                "DD,MM.YYYY"
              )}`}
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
