"use client";

import React from "react";
import { Box, Drawer, Typography, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { DrawerView, setDrawer } from "@/app/store/clientify/clientifySlice";
import { RootState } from "@/app/store/store";
import AnchorTemporaryDrawerStyles from "./AnchorTemporaryDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import IconRightArrow from "@/app/icons/IconRightArrow";

interface AnchorTemporaryDrawerProps {
  children: any;
  title: string;
}

const AnchorTemporaryDrawer = (props: AnchorTemporaryDrawerProps) => {
  const { children, title = "" } = props;
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(
    (state: RootState) => state.clienty.drawer.isDrawerOpen
  );

  const handleClose = () => {
    dispatch(
      setDrawer({
        isDrawerOpen: false,
        drawerTitle: "",
        drawerSelected: DrawerView.PLANSUSCRIPTION,
        view: "",
      })
    );
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleClose}
      sx={{ width: 500 }}
      slotProps={{
        backdrop: {
          // Estilo para el Backdrop (fondo transparente con opacidad)
          style: {
            backgroundColor: "rgba(0,0,0,0)", // Ajusta la opacidad según tus necesidades
          },
        },
      }}
    >
      <Box
        className={
          AnchorTemporaryDrawerStyles["Box-AnchorTemporaryDrawer-father"]
        }
        role="presentation"
      >
        <Box className={AnchorTemporaryDrawerStyles["Box-header-drawer"]}>
          <Typography
            className={`${styles["Title-semibold"]} ${poppins.className}`}
          >
            {title}
          </Typography>
          <IconButton
            sx={{
              padding: "0px",
              // background: "yellow",
            }}
            onClick={handleClose}
          >
            <IconRightArrow />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
};

export default AnchorTemporaryDrawer;
