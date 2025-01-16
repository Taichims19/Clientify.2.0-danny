import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import styles from "../../styles/home.module.css";
import nativeSelectorStyles from "../NativeSelect/NativeSelector.module.scss";
import { Box } from "@mui/material";
import { Height, Padding } from "@mui/icons-material";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    height: "21px",
    // backgroundColor: "yellow",
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    fontSize: 16,
    // padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      // backgroundColor: "yellow",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const CustomMenuProps = {
  PaperProps: {
    style: {
      maxHeight: 210, // Altura máxima del menú
      width: "53px", // Ancho del menú
      padding: "8px 10px",
      backgroundColor: "#f9f9f9",
      // backgroundColor: "red",
      border: "1px solid #ccc",
    },
    sx: {
      // Personalización del scrollbar usando CSS-in-JS
      "&::-webkit-scrollbar": {
        width: "6px", // Ancho del scrollbar
        Height: "78.5px",
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
      },
    },
  },
};

export default function NativeSelector() {
  const [fila, setFila] = React.useState("");
  const handleChange = (event: { target: { value: string } }) => {
    setFila(event.target.value);
  };
  return (
    <FormControl className={nativeSelectorStyles["NativeSelector-box-father"]}>
      {/* <InputLabel htmlFor="demo-customized-select-native"></InputLabel> */}
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={fila}
        onChange={handleChange}
        input={<BootstrapInput />}
        MenuProps={CustomMenuProps} // Aquí personalizas el menú
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "16px", // Tamaño del ícono
            // color: "blue", // Color del ícono
          },
        }}
      >
        {[...Array(22)].map((_, index) => (
          <MenuItem
            key={index + 1}
            value={index + 1}
            style={{
              // background: "red",
              lineHeight: "19px",
              fontStyle: "normal",
              flexDirection: "column",
              fontWeight: 400,
              justifyContent: "center", // Centra los números horizontalmente
              fontSize: "14px", // Tamaño de fuente
            }}
          >
            {(index + 1).toString().padStart(2, "0")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
