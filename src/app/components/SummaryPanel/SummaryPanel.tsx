"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
} from "@mui/material"; // Añadimos Skeleton
import Popover from "@mui/material/Popover";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import summaryStyles from "./summaryPanel.module.scss";
import IconQuestionMark from "@/app/icons/IconQuestionMark";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

// Función para formatear números con "k"
const formatNumber = (value: number) => {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  }
  return value.toString();
};

const SummaryPanel = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const { totalContacts, activeSubscriptions, totalCommissionsPaid } =
    useSelector((state: RootState) => state.clienty.summaryPanel);
  const loading = useSelector((state: RootState) => state.clienty.loading); // Estado de carga
  console.log("SummaryPanel - loading:", loading); // Depuración temporal

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box className={summaryStyles["Summary-panels"]}>
      {/* cajon contactos */}
      <Box className={summaryStyles["Summary-panels-boxes"]}>
        <Box className={summaryStyles["Summary-panels-boxes-children1"]}>
          {loading ? (
            <>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "120px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "2.5rem", width: "60px" }}
              />
            </>
          ) : (
            <>
              <Typography
                className={`${styles["Title-regular"]} ${poppins.className}`}
              >
                Contactos totales
              </Typography>
              <Typography
                className={`${styles["H1-bold"]} ${poppins.className}`}
              >
                {totalContacts}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* cajon suscripciones activas */}
      <Box className={summaryStyles["Summary-panels-boxes"]}>
        <Box className={summaryStyles["Summary-panels-boxes-children1"]}>
          {loading ? (
            <>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "140px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "2.5rem", width: "60px" }}
              />
            </>
          ) : (
            <>
              <Typography
                className={`${styles["Title-regular"]} ${poppins.className}`}
              >
                Suscripciones activas
              </Typography>
              <Typography
                className={`${styles["H1-bold"]} ${poppins.className}`}
              >
                {formatNumber(activeSubscriptions)}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      {/* cajon comisiones cobradas */}
      <Box className={summaryStyles["Summary-panels-boxes"]}>
        <Box className={summaryStyles["Summary-panels-boxes-children1"]}>
          {loading ? (
            <>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "140px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "2.5rem", width: "60px" }}
              />
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Typography
                  className={`${styles["Title-regular"]} ${poppins.className}`}
                >
                  Comisiones cobradas
                </Typography>
                <Typography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <IconQuestionMark />
                </Typography>
                <Popover
                  id="mouse-over-popover"
                  sx={{ pointerEvents: "none" }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography
                    className={`${summaryStyles["box-hover-popover"]} ${styles["Caption-Medium"]}`}
                  >
                    Comisiones de los últimos 12 meses
                  </Typography>
                </Popover>
              </Box>
              <Typography
                className={`${styles["H1-bold"]} ${poppins.className}`}
              >
                {totalCommissionsPaid.toString().padStart(2, "0")}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryPanel;
