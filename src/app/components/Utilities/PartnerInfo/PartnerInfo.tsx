"use client";

import { Box, Button, Popover, Typography, Skeleton } from "@mui/material"; // Añadimos Skeleton
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import PartnerInfoStyles from "./PartnerInfo.module.scss";
import styles from "../../../styles/home.module.css";
import { poppins } from "../../../fonts/fonts";
import PartnerSearchInput from "../SearchEngines/PartnerSearch";
import IconNameUserDown from "@/app/icons/IconNameUserDown";
import Iconlogout from "@/app/icons/Iconlogout";
import { useState } from "react";

export default function PartnerInfo() {
  const { nameCompany, nameUser, photoUrl } = useSelector(
    (state: RootState) => state.clienty.partner
  );
  const loading = useSelector((state: RootState) => state.clienty.loading); // Añadimos el estado de carga

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className={styles["header-layout-box"]}>
        {/* Header Top */}
        <Box className={styles["layout-box-1"]}>
          {loading ? (
            <>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "80px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", width: "60px" }}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </Box>

        {/* Company Info */}
        {loading ? (
          <Skeleton
            variant="text"
            sx={{ fontSize: "1.2rem", width: "120px" }}
          />
        ) : (
          <Typography
            className={`${styles["SubHeader-Regular"]} ${poppins.className}`}
          >
            {nameCompany || "Capacitravel S.L."}
          </Typography>
        )}

        {/* User Info */}
        <Box className={styles["layout-box-2"]}>
          {loading ? (
            <Box className={styles["box-2-childrenBox1"]}>
              <Box className={styles["box-img-user"]}>
                <Box className={styles["box-img-user-children1"]}>
                  <Skeleton variant="circular" width={32} height={32} />
                </Box>
              </Box>
              <Box className={styles["box-info-user"]}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "100px" }}
                />
                <Box className={styles["box-info-user-children1"]}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "80px" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={24}
                    height={24}
                    sx={{ marginLeft: "8px" }}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
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
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
          {loading ? (
            <Skeleton variant="rectangular" width={24} height={24} />
          ) : (
            <Iconlogout />
          )}
        </Box>

        {/* Popover con el componente de búsqueda */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
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
