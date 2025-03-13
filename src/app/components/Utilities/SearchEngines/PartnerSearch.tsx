"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Box, Button, TextField } from "@mui/material";
import { setCurrentPartnerId } from "@/app/store/clientify/clientifySlice";
import { fetchPartnerData } from "@/app/store/clientify/clientifyThunks";

export default function PartnerSearchInput() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [partnerIdInput, setPartnerIdInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPartnerIdInput(event.target.value);
  };

  const handleFetchData = () => {
    const id = parseInt(partnerIdInput, 10);
    if (!isNaN(id)) {
      dispatch(setCurrentPartnerId(id));
      fetchPartnerData(id); // Llama a la función combinada
      router.push(`/${id}`); // Navega a /id para que la URL refleje el partnerId
    } else {
      alert("Por favor, ingresa un ID válido (número entero).");
    }
  };

  return (
    <Box>
      <TextField
        label="Inserte Partner ID"
        variant="outlined"
        value={partnerIdInput}
        onChange={handleInputChange}
        size="small"
        sx={{
          marginRight: "8px",
          "& .MuiInputBase-input": {
            fontFamily: "inherit",
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
