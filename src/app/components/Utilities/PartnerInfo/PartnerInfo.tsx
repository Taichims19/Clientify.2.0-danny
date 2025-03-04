"use client";

import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store"; // Ajusta la ruta
import Image from "next/image";
import PartnerInfoStyles from "./PartnerInfo.module.scss";

import styles from "../../../styles/home.module.css";
import { poppins } from "../../../fonts/fonts";
import PartnerSearch from "../SearchEngines/PartnerSearch";
import IconNameUserDown from "@/app/icons/IconNameUserDown";
import Iconlogout from "@/app/icons/Iconlogout";
// import { poppins } from "@/app/fonts/fonts";

export default function PartnerInfo() {
  const { nameCompany, nameUser, photoUrl } = useSelector(
    (state: RootState) => state.clienty.partner
  );

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

        <PartnerSearch />

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
                <IconNameUserDown />
              </Box>
            </Box>
          </Box>
          <Iconlogout />
        </Box>
      </Box>
    </>
  );
}
