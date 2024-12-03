"use client";
import * as React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import summaryStyles from "./summaryPanel.module.scss";
import IconQuestionMark from "@/app/icons/IconQuestionMark";

const SummaryPanel = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

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
        <Box
          className={summaryStyles["Summary-panels-boxes-children1"]}
          // sx={{ justifyContent: "space-between" }}
        >
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Contactos totales
          </Typography>
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            430
          </Typography>
        </Box>
      </Box>

      {/* cajon suscripciones activas */}
      <Box className={summaryStyles["Summary-panels-boxes"]}>
        <Box className={summaryStyles["Summary-panels-boxes-children1"]}>
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Suscripciones activas
          </Typography>
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            3.4k
          </Typography>
        </Box>
      </Box>

      {/* cajon comisiones cobradas */}
      <Box className={summaryStyles["Summary-panels-boxes"]}>
        <Box className={summaryStyles["Summary-panels-boxes-children1"]}>
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
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            01
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryPanel;
