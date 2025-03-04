"use client";

import { Box, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCurrentPartnerId } from "@/app/store/clientify/clientifySlice"; // Ajusta la ruta
import { fetchPartnerData } from "@/app/store/clientify/clientifyThunks";

export default function PartnerSearch() {
  const dispatch = useDispatch();

  // Estado local para el ID ingresado, vacío por defecto
  const [partnerIdInput, setPartnerIdInput] = useState<string>("");

  // Manejar cambio en el input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartnerIdInput(event.target.value);
  };

  // Despachar la búsqueda con el ID ingresado
  const handleFetchData = () => {
    const id = parseInt(partnerIdInput, 10);
    if (!isNaN(id)) {
      dispatch(setCurrentPartnerId(id));
      fetchPartnerData(id, dispatch);
    } else {
      alert("Por favor, ingresa un ID válido (número entero).");
    }
  };

  return (
    <Box>
      <TextField
        label="Inserte Partner ID" // Cambiado a "Inserte ID Partner"
        variant="outlined"
        value={partnerIdInput}
        onChange={handleInputChange}
        size="small"
        sx={{
          marginRight: "8px",
          "& .MuiInputBase-input": {
            fontFamily: "inherit", // Usamos fontFamily heredado para consistencia
            padding: "4px 8px",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleFetchData}
        size="small"
        sx={{ padding: "4px 8px" }}
      >
        Buscar
      </Button>
    </Box>
  );
}
