"use client";

import { Box, Button, Popover, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store"; // Ajusta la ruta
import Image from "next/image";
import PartnerInfoStyles from "./PartnerInfo.module.scss";

import styles from "../../../styles/home.module.css";
import { poppins } from "../../../fonts/fonts";
import PartnerSearch from "../SearchEngines/PartnerSearch";
import IconNameUserDown from "@/app/icons/IconNameUserDown";
import Iconlogout from "@/app/icons/Iconlogout";
import { useState } from "react";
import PartnerSearchInput from "../SearchEngines/PartnerSearch";
// import { poppins } from "@/app/fonts/fonts";

export default function PartnerInfo() {
  const { nameCompany, nameUser, photoUrl } = useSelector(
    (state: RootState) => state.clienty.partner
  );

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // Manejar la apertura del popover
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Manejar el cierre del popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className={styles["header-layout-box"]}>
        {/* Header Top */}
        <Box className={styles["layout-box-1"]}>
          <Typography
            className={`${styles["Header-bold"]} ${poppins.className}`}
          >
            Clientify
          </Typography>
          <Typography
            className={`${styles["Header-Medium"]} ${poppins.className}`}
          >
            partner
          </Typography>
        </Box>

        {/* Company Info */}
        <Typography
          className={`${styles["SubHeader-Regular"]} ${poppins.className}`}
        >
          {nameCompany || "Capacitravel S.L."}
        </Typography>

        {/* <PartnerSearch /> */}

        {/* User Info */}
        <Box className={styles["layout-box-2"]}>
          <Box className={styles["box-2-childrenBox1"]}>
            <Box className={styles["box-img-user"]}>
              <Box className={styles["box-img-user-children1"]}>
                <Image
                  className={styles["img-user"]}
                  src={photoUrl || "/imgLayout/Rectangle7-png.png"}
                  alt="img user"
                  width={32}
                  height={31}
                  priority
                  layout="fixed"
                />
              </Box>
            </Box>
            <Box className={styles["box-info-user"]}>
              <Typography
                className={`${styles["Body-regular"]} ${poppins.className}`}
              >
                Account Manager
              </Typography>
              <Box className={styles["box-info-user-children1"]}>
                <Typography
                  className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
                >
                  {nameUser || "Alice Kuvalis"}
                </Typography>

                <IconNameUserDown
                  onClick={handleClick}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: 0,
                    // marginLeft: "8px",
                    // backgroundColor: "yellow",
                  }}
                />

                {/* <IconNameUserDown /> */}
              </Box>
            </Box>
          </Box>
          <Iconlogout />
        </Box>

        {/* Popover con el componente de búsqueda */}
        <Popover
          // id={id}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right", // Ajustado para que salga al lado derecho del ícono
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root": {
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            },
          }}
        >
          <PartnerSearchInput />
        </Popover>
      </Box>
    </>
  );
}
