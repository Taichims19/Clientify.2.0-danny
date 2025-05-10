// Nuevo componente AnchorTemporarySubDrawer
"use client";

import React from "react";
import { Box, Drawer, Typography, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  SubDrawerView,
  setSubDrawer,
} from "@/app/store/clientify/clientifySlice";
import { RootState } from "@/app/store/store";
import AnchorTemporarySubDrawerStyles from "./AnchorTemporarySubDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import IconRightArrow from "@/app/icons/IconRightArrow";
import {
  clearSelectedInvoice,
  setSettlementDetail,
} from "@/app/store/clientify/invoicesTableSlice";

interface AnchorTemporarySubDrawerProps {
  children: any;
  title: string;
}

const AnchorTemporarySubDrawer = (props: AnchorTemporarySubDrawerProps) => {
  const { children, title = "" } = props;
  const dispatch = useDispatch();
  const isSubDrawerOpen = useSelector(
    (state: RootState) => state.clienty.subDrawer.isSubDrawerOpen
  );

  const handleClose = () => {
    dispatch(clearSelectedInvoice());
    dispatch(setSettlementDetail(null));
    dispatch(
      setSubDrawer({
        isSubDrawerOpen: false,
        subDrawerTitle: "",
        subDrawerSelected: SubDrawerView.EDUCATIUM,
        subView: "",
      })
    );
  };

  return (
    <Drawer
      anchor="right"
      open={isSubDrawerOpen}
      onClose={handleClose}
      sx={{ width: 500 }}
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(0,0,0,0)",
          },
        },
      }}
    >
      <Box
        className={
          AnchorTemporarySubDrawerStyles["Box-AnchorTemporarySubDrawer-father"]
        }
        role="presentation"
      >
        <Box
          className={AnchorTemporarySubDrawerStyles["Box-header-drawer"]}
          // sx={{
          //   background: "red",
          // }}
        >
          <Typography
            className={`${styles["Title-semibold"]} ${poppins.className}`}
          >
            {title}
          </Typography>
          <IconButton
            sx={{
              padding: "0px",
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

export default AnchorTemporarySubDrawer;
