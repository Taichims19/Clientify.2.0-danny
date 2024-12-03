"use client";

import React from "react";
import { Box, Drawer, Typography, List, ListItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "@/app/store/clientify/clientifySlice";
import { RootState } from "@/app/store/store";
import AnchorTemporaryDrawerStyles from "./AnchorTemporaryDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import IconRightArrow from "@/app/icons/IconRightArrow";
import IconVectorClear from "@/app/icons/IconVectorClear";
import AntSwitches from "../../Switches/AntSwitch/AntSwitches";

const AnchorTemporaryDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.clienty.isOpen);
  const { plans, totalPlans } = useSelector(
    (state: RootState) => state.clienty
  );

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <Box
        className={
          AnchorTemporaryDrawerStyles["Box-AnchorTemporaryDrawer-father"]
        }
        role="presentation"
      >
        {/* Header */}
        <Box className={AnchorTemporaryDrawerStyles["Box-header-drawer"]}>
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Planes de suscripción
          </Typography>
          <IconRightArrow />
        </Box>

        {/* Total de planes */}
        <Box className={AnchorTemporaryDrawerStyles["box-total-plans"]}>
          <Typography
            component="span"
            className={`${styles["H1-bold"]} ${poppins.className}`}
          >
            {totalPlans.toString().padStart(2, "0")}
          </Typography>
          <Box
            className={AnchorTemporaryDrawerStyles["box-children-filter-pay"]}
          >
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Filtrar por pagos
            </Typography>
            {/* Estructura jerárquica con Switch */}
            <Box
              className={
                AnchorTemporaryDrawerStyles["box-children-father-icon-switch"]
              }
            >
              <Box
                className={AnchorTemporaryDrawerStyles["box-icon-children1"]}
              >
                <Box
                  className={
                    AnchorTemporaryDrawerStyles["box-children1-grandson1"]
                  }
                >
                  <Box
                    className={
                      AnchorTemporaryDrawerStyles["grandson1-children4"]
                    }
                  >
                    <AntSwitches />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <List className={AnchorTemporaryDrawerStyles["box-list-plans"]}>
          {plans.map((plan) => (
            <React.Fragment key={plan.name}>
              <ListItem
                sx={{
                  padding: "0px",
                  position: "relative",
                }}
                className={
                  AnchorTemporaryDrawerStyles["box-list-plans-childrens"]
                }
              >
                <Typography
                  className={`${styles["Title-semibold"]} ${poppins.className}`}
                >
                  {plan.name}
                </Typography>
                <Typography
                  component="span"
                  className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
                >
                  {plan.count.toString().padStart(2, "0")}
                </Typography>
                {plan.isFree && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50px",
                      transform: "translateY(-50%)",
                      backgroundColor: "#0067EE",
                      color: "#FFF",
                      padding: "2px 6px",
                      borderRadius: "2px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography
                      className={`${styles["Caption-Medium"]} ${poppins.className}`}
                    >
                      Free
                    </Typography>
                  </Box>
                )}
              </ListItem>
              <IconVectorClear style={{ width: "100%", height: "2px" }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AnchorTemporaryDrawer;
