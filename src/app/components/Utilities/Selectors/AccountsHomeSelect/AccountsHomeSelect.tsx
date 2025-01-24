import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Button, Chip, Typography } from "@mui/material";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import AccountsHomeSelectorStyles from "./AccountsHomeSelect.module.scss";
import { useDispatch, useSelector } from "react-redux";

import DataCalendarsAccounts from "../../Calendars/DataCalendarsAccounts/DataCalendarsAccounts";
import NativeSelector from "../NativeSelect/NativeSelector";
import {
  closeModal,
  openModal,
  resetCalendaryRanger,
} from "@/app/store/clientify/clientifySlice";
import { RootState } from "@/app/store/store";
import ArrowIconBottom from "@/app/icons/ArrowIconBottom";

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

const names = [
  "Todos",
  "Business Growth",
  "Business start",
  "Business Go",
  "Business Premium",
  "Business Junior",
  "Business Teacher",
  "Business OldStar",
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function AccountsHomeSelect() {
  const theme = useTheme();

  const [personName, setPersonName] = React.useState<string[]>([]);

  const isModalOpen = useSelector(
    (state: RootState) => state.clienty.modal.isModalOpen
  );

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.clienty.calendaryRanger
  );

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openModal());
  };
  const handleClose = () => dispatch(closeModal());

  const handleDelete = () => {
    console.info("Fechas borradas.");
    dispatch(resetCalendaryRanger()); // Resetea el rango de fechas en Redux
  };

  // Texto condicional para el botón
  const buttonText =
    startDate && endDate
      ? `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`
      : "";

  return (
    <Box
      className={AccountsHomeSelectorStyles["Box-father-AccountsHomeSelect"]}
    >
      <Box className={AccountsHomeSelectorStyles["children-one-accounts"]}>
        <Button className={AccountsHomeSelectorStyles["Buttons-children-one"]}>
          Anual
        </Button>
        <Button className={AccountsHomeSelectorStyles["Buttons-children-one"]}>
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
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          className={AccountsHomeSelectorStyles["select-box"]}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
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
          {startDate && endDate ? (
            <Chip
              label={`${startDate.format("DD/MM/YYYY")} - ${endDate.format(
                "DD/MM/YYYY"
              )}`}
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
