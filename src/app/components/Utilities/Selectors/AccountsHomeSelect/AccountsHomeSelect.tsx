import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Button, Chip, Typography } from "@mui/material";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import AccountsHomeSelectorStyles from "./AccountsHomeSelect.module.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  closeModal,
  openModal,
  resetActiveRecurrence,
  setActiveRecurrence,
  setLastClickTime,
  setLastFilters,
  setSelectedPlans,
} from "@/app/store/clientify/clientifySlice";
import { AppDispatch, RootState } from "@/app/store/store";
import ArrowIconBottom from "@/app/icons/ArrowIconBottom";
import { resetCalendaryRanger } from "@/app/store/clientify/invoicesTableSlice";
import dayjs, { Dayjs } from "dayjs"; // Importamos Dayjs para las conversiones
import DataCalendarsAccounts from "../../Calendars/DataCalendaryAccounts/DataCalendarsAccounts";
import { fetchFilteredAccounts } from "@/app/store/clientify/clientifyThunks";

const ITEM_HEIGHT = 25.113;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      // Height: 21,
      padding: "8px 10px",
      backgroundColor: "#f9f9f9",
      // backgroundColor: "green",
    },
    sx: {
      // Personalización del scrollbar usando CSS-in-JS
      "&::-webkit-scrollbar": {
        width: "6px", // Ancho del scrollbar
        Height: "78.5px",
        // backgroundColor:"red"
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#c6c6c6", // Color de la barra
        borderRadius: "10px", // Bordes redondeados
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555", // Color al pasar el mouse
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1", // Fondo de la pista
        // Height: "20px",
      },
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function AccountsHomeSelect() {
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();

  const isModalOpen = useSelector(
    (state: RootState) => state.clienty.modal.isModalOpen
  );

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.invoiceTable.calendaryRanger
  );

  const activeRecurrence = useSelector(
    (state: RootState) => state.clienty.activeRecurrence
  );

  const { names, selectedPlans, lastClickTime, lastFilters } = useSelector(
    (state: RootState) => state.clienty.selectAccount
  );

  const currentPartnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );

  const startDateDayjs: Dayjs | null = startDate ? dayjs(startDate) : null;
  const endDateDayjs: Dayjs | null = endDate ? dayjs(endDate) : null;

  // Handler para el cambio en el Select (reemplaza setPersonName)
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;
    dispatch(setSelectedPlans(newValue)); // Actualizamos el estado global
  };

  const handleOpen = () => {
    dispatch(openModal());
  };
  const handleClose = () => dispatch(closeModal());

  // Handler para eliminar fechas (reemplaza setLastFilters)
  const handleDelete = () => {
    console.info("Fechas borradas.");
    dispatch(resetCalendaryRanger());
    if (currentPartnerId) {
      const recurrenceFilter =
        activeRecurrence === null ? undefined : activeRecurrence;
      const newFilters = { recurrence: recurrenceFilter };
      if (JSON.stringify(newFilters) !== JSON.stringify(lastFilters)) {
        dispatch(fetchFilteredAccounts(currentPartnerId, newFilters));
        dispatch(setLastFilters(newFilters)); // Actualizamos el estado global
      }
    }
  };

  // Handler para clics en Anual/Mensual (reemplaza setLastClickTime y setLastFilters)
  const handleRecurrenceClick = (recurrence: "monthly" | "yearly") => {
    const currentTime = Date.now();
    const isDoubleClick = lastClickTime && currentTime - lastClickTime < 300;

    dispatch(setLastClickTime(currentTime)); // Actualizamos el estado global

    if (isDoubleClick && activeRecurrence === recurrence) {
      dispatch(resetActiveRecurrence());
      if (currentPartnerId) {
        const startDateFilter = startDate || undefined;
        const endDateFilter = endDate || undefined;
        const newFilters = {
          startDate: startDateFilter,
          endDate: endDateFilter,
        };
        if (JSON.stringify(newFilters) !== JSON.stringify(lastFilters)) {
          dispatch(fetchFilteredAccounts(currentPartnerId, newFilters));
          dispatch(setLastFilters(newFilters)); // Actualizamos el estado global
        }
      }
    } else if (!isDoubleClick) {
      dispatch(setActiveRecurrence(recurrence));
      if (currentPartnerId) {
        const startDateFilter = startDate || undefined;
        const endDateFilter = endDate || undefined;
        const newFilters = {
          recurrence,
          startDate: startDateFilter,
          endDate: endDateFilter,
        };
        if (JSON.stringify(newFilters) !== JSON.stringify(lastFilters)) {
          dispatch(fetchFilteredAccounts(currentPartnerId, newFilters));
          dispatch(setLastFilters(newFilters)); // Actualizamos el estado global
        }
      }
    }
  };
  // // Texto condicional para el botón
  // const buttonText =
  //   startDateDayjs && endDateDayjs
  //     ? `${startDateDayjs.format("DD,MM/.")} - ${endDateDayjs.format(
  //         "DD,MM.YYYY"
  //       )}`
  //     : "";

  return (
    <Box
      className={AccountsHomeSelectorStyles["Box-father-AccountsHomeSelect"]}
    >
      <Box className={AccountsHomeSelectorStyles["children-one-accounts"]}>
        <Button
          className={`${AccountsHomeSelectorStyles["Buttons-children-one"]} ${
            activeRecurrence === "yearly"
              ? AccountsHomeSelectorStyles["active"]
              : ""
          }`}
          onClick={() => handleRecurrenceClick("yearly")}
        >
          Anual
        </Button>
        <Button
          className={`${AccountsHomeSelectorStyles["Buttons-children-one"]} ${
            activeRecurrence === "monthly"
              ? AccountsHomeSelectorStyles["active"]
              : ""
          }`}
          onClick={() => handleRecurrenceClick("monthly")}
        >
          Mensual
        </Button>
      </Box>
      <FormControl className={AccountsHomeSelectorStyles["children-two-box"]}>
        {/* <InputLabel id="demo-multiple-name-label">Patata</InputLabel> */}
        <Box className={AccountsHomeSelectorStyles["box-label-children-two"]}>
          <Typography
            className={`${styles["Caption-semibold"]} ${poppins.className}`}
          >
            PLAN
          </Typography>
        </Box>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedPlans} // Usamos el estado global en lugar de personName
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          className={AccountsHomeSelectorStyles["select-box"]}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedPlans, theme)} // Usamos selectedPlans
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={AccountsHomeSelectorStyles["children-two-box"]}>
        <Box className={AccountsHomeSelectorStyles["box-label-children-two"]}>
          <Typography
            className={`${styles["Caption-semibold"]} ${poppins.className}`}
          >
            FECHA DE RENOVACION
          </Typography>
        </Box>
        <Button
          className={AccountsHomeSelectorStyles["Buttom-Calendary-box"]}
          onClick={handleOpen}
        >
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
              className={AccountsHomeSelectorStyles["chip-box"]}
            />
          ) : (
            <ArrowIconBottom />
          )}
        </Button>
        <DataCalendarsAccounts open={isModalOpen} handleClose={handleClose} />
      </FormControl>
    </Box>
  );
}
