import { Box } from "@mui/material";
import React from "react";
import MRRPartner from "../MrrPartner/MrrPartner";
import AccountsHome from "../AccountsHome/AccountsHome";
import ResourcesHome from "../ResourcesHome/ResourcesHome";
import RowPrincipalMrrStyles from "./RowPrincipalMrr.module.scss";

export const RowPrincipalMrr = () => {
  return (
    <Box className={RowPrincipalMrrStyles["BoxRowPrincipalMrr-father"]}>
      <MRRPartner />

      <AccountsHome />

      <ResourcesHome />
    </Box>
  );
};
