"use client";

import { Provider } from "react-redux";
import store from "./store/store";
import { Box, Typography } from "@mui/material";
import styles from "../app/styles/home.module.css";
import { poppins } from "../app/fonts/fonts";
import Image from "next/image";
import Iconlogout from "./icons/Iconlogout";
import IconNameUserDown from "./icons/IconNameUserDown";
import PartnerSearch from "./components/Utilities/SearchEngines/PartnerSearch";
import PartnerInfo from "./components/Utilities/PartnerInfo/PartnerInfo";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {/* Header */}
      <PartnerInfo />
      {/* Contenido de la página */}
      {children}
    </Provider>
  );
}
