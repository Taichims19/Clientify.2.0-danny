import React from "react";
import { Box, Typography } from "@mui/material";
import AntSwitches from "../Switches/AntSwitch/AntSwitches";
import PopoverInvoiceStyles from "./PopoverInvoice.module.scss";
import VectorIconTransaction from "@/app/icons/VectorIconTransaction";
import styles from "../../../styles/home.module.css";
import { poppins } from "../../../fonts/fonts";
import VectorIconPopover from "@/app/icons/VectorIconPopover";

export const PopoverInvoice = () => {
  return (
    <>
      <Box className={PopoverInvoiceStyles["box-father-popover"]}>
        <Box className={PopoverInvoiceStyles["box-children-popover"]}>
          <Box className={PopoverInvoiceStyles["box-popover-content"]}>
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Comisiones pendientes
            </Typography>
            <Box
              className={
                PopoverInvoiceStyles["box-children-father-icon-switch"]
              }
            >
              <Box className={PopoverInvoiceStyles["box-icon-children1"]}>
                <Box
                  className={PopoverInvoiceStyles["box-children1-grandson1"]}
                >
                  <Box className={PopoverInvoiceStyles["grandson1-children4"]}>
                    <AntSwitches />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={PopoverInvoiceStyles["box-popover-content"]}>
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Pagos pendientes
            </Typography>
            <Box
              className={
                PopoverInvoiceStyles["box-children-father-icon-switch"]
              }
            >
              <Box className={PopoverInvoiceStyles["box-icon-children1"]}>
                <Box
                  className={PopoverInvoiceStyles["box-children1-grandson1"]}
                >
                  <Box className={PopoverInvoiceStyles["grandson1-children4"]}>
                    <AntSwitches />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <VectorIconPopover />
          <Typography
            className={`${styles["Body-medium-blue"]} ${poppins.className}`}
          >
            Seleccionar fecha
          </Typography>
        </Box>
      </Box>
    </>
  );
};
