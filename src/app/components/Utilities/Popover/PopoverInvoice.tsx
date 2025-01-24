import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import AntSwitches from "../Switches/AntSwitch/AntSwitches";
import PopoverInvoiceStyles from "./PopoverInvoice.module.scss";
import VectorIconTransaction from "@/app/icons/VectorIconTransaction";
import styles from "../../../styles/home.module.css";
import { poppins } from "../../../fonts/fonts";
import VectorIconPopover from "@/app/icons/VectorIconPopover";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  filterPendingCommissions,
  filterPendingPayments,
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

  const isModalOpen = useSelector(
    (state: RootState) => state.clienty.modal.isModalOpen
  );
  // Estados del store
  const filteredPendingPayments = useSelector(
    (state: RootState) => state.invoiceTable.filteredPendingPayments
  );
  const filteredPendingCommissions = useSelector(
    (state: RootState) => state.invoiceTable.filteredPendingCommissions
  );

  // Handlers para los switches
  const handlePendingPaymentsSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      dispatch(filterPendingPayments()); // Activa el filtro.
    } else {
      dispatch({ type: "invoicesTable/resetRows" }); // Restablece las filas.
    }
  };

  const handlePendingCommissionsSwitch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      dispatch(filterPendingCommissions()); // Activa el filtro.
    } else {
      dispatch({ type: "invoicesTable/resetRows" }); // Restablece las filas.
    }
  };

  const handleOpen = () => {
    dispatch(openModal());
  };
  const handleClose = () => dispatch(closeModal());

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("Fechas borradas.");
    dispatch(resetCalendaryRanger()); // Resetea el rango de fechas en Redux
  };

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
                  <Box
                    className={PopoverInvoiceStyles["grandson1-children4"]}
                    onChange={handlePendingCommissionsSwitch}
                  >
                    <AntSwitches />
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
                  <Box
                    className={PopoverInvoiceStyles["grandson1-children4"]}
                    onChange={handlePendingPaymentsSwitch}
                  >
                    <AntSwitches />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <VectorIconPopover />
          {/* Alternar entre Typography y Chip */}
          {startDate && endDate ? (
            <Chip
              label={`${startDate.format("DD,MM,YYYY")} - ${endDate.format(
                "DD/MM/YYYY"
              )}`}
              onClick={handleOpen} // Abre el modal de selección de fecha
              onDelete={handleDelete} // Borra las fechas seleccionadas
            />
          ) : (
            <Typography
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
