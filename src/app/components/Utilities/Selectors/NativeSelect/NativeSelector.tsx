import * as React from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { CSSProperties } from "react"; // Importamos CSSProperties para tipar los estilos
import nativeSelectorStyles from "../NativeSelect/NativeSelector.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setVisibleRowsCount } from "@/app/store/clientify/invoicesTableSlice";
import { RootState } from "@/app/store/store";
import styles from "../../../../home.module.css";
import { poppins } from "../../../../fonts/fonts";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": { marginTop: theme.spacing(3) },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    height: "25px",
    width: "10px",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    padding: "4px",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "17px",
    color: "#525252",
    fontFamily: poppins.style.fontFamily,
    "& *": {
      fontFamily: poppins.style.fontFamily,
    },
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

// Definimos una interfaz para los estilos del PaperProps con tipos específicos
interface CustomPaperStyle extends CSSProperties {
  height: number;
  width: string;
  padding: string;
  backgroundColor: string;
  border: string;
  display: string;
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse"; // Tipo específico de FlexDirection
  alignItems: string;
  fontSize: string;
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  lineHeight: string;
  color: string;
}

// Definimos CustomMenuProps con Partial<MenuProps> y tipamos correctamente PaperProps
const CustomMenuProps: Partial<SelectProps["MenuProps"]> = {
  PaperProps: {
    style: {
      height: 130,
      width: "47px",
      padding: "8px 10px",
      backgroundColor: "#f9f9f9",
      border: "1px solid #ccc",
      display: "flex",
      flexDirection: "column", // Ahora usa un valor específico de FlexDirection
      alignItems: "center",
      fontSize: "14px",
      fontFamily: poppins.style.fontFamily,
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "19px",
      color: "#525252",
    } as CustomPaperStyle, // Aseguramos que el tipo sea correcto
    sx: {
      "&::-webkit-scrollbar": { width: "6px", height: "78.5px" },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#c6c6c6",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
      "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
      "& .MuiMenuItem-root": {
        backgroundColor: "transparent", // Ajustamos para que no sea rojo por defecto
        position: "relative",
        right: "20%", // Esto puede no funcionar como esperas, revisa el diseño
        display: "flex",
        justifyContent: "center", // Centramos los ítems
      },
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "#e0e0e0", // Color de fondo cuando está seleccionado
      },
      "& .MuiMenuItem-root:hover": {
        backgroundColor: "#f0f0f0", // Color al pasar el mouse
      },
    },
  },
};

interface NativeSelectorProps {
  value: number;
  onChange: (newValue: number) => void;
  maxRows: number;
}

export default function NativeSelector({
  value,
  onChange,
  maxRows,
}: NativeSelectorProps) {
  const dispatch = useDispatch();
  const visibleRowsCount = useSelector(
    (state: RootState) => state.invoiceTable.visibleRowsCount
  );

  const handleChange = (event: { target: { value: string } }) => {
    const newVisibleRowsCount = parseInt(event.target.value, 10);
    onChange(newVisibleRowsCount);
    dispatch(setVisibleRowsCount(newVisibleRowsCount));
  };

  const pageSizeOptions = [25, 50, 75, 100];

  return (
    <FormControl className={nativeSelectorStyles["NativeSelector-box-father"]}>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={visibleRowsCount.toString()}
        onChange={handleChange}
        input={<BootstrapInput />}
        MenuProps={CustomMenuProps} // Ahora es compatible con el tipo esperado
        sx={{ "& .MuiSvgIcon-root": { fontSize: "16px" } }}
      >
        {pageSizeOptions.map((size) => (
          <MenuItem
            key={size}
            value={size}
            style={{
              lineHeight: "19px",
              fontStyle: "normal",
              fontWeight: 400,
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            {size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
