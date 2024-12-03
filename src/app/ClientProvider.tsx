"use client";

import { Provider } from "react-redux";
import store from "./store/store";
import { Box, Typography } from "@mui/material";
import styles from "../app/styles/home.module.css";
import { poppins } from "../app/fonts/fonts";
import Image from "next/image";
import Iconlogout from "./icons/Iconlogout";
import IconNameUserDown from "./icons/IconNameUserDown";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {/* Header */}
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
          Capacitravel S.L.
        </Typography>

        {/* User Info */}
        <Box className={styles["layout-box-2"]}>
          <Box className={styles["box-2-childrenBox1"]}>
            <Box className={styles["box-img-user"]}>
              <Box className={styles["box-img-user-children1"]}>
                <Image
                  className={styles["img-user"]}
                  src="/imgLayout/Rectangle7-png.png"
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
                  Alice Kuvalis
                </Typography>
                <IconNameUserDown />
              </Box>
            </Box>
          </Box>
          <Iconlogout />
        </Box>
      </Box>

      {/* Contenido de la página */}
      {children}
    </Provider>
  );
}
