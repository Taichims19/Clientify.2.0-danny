"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  ListItem,
  List,
  Skeleton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import AnchorTemporaryDrawerStyles from "./AccountsHomeDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import IconRightArrow from "@/app/icons/IconRightArrow";
import AntSwitches from "../../Switches/AntSwitch/AntSwitches";
import IconVectorClear from "@/app/icons/IconVectorClear";
import AccountArrowRight from "@/app/icons/AccountArrowRight";
import AccountFilterIcon from "@/app/icons/AccountFilterIcon";

function AccountsHomeDrawer() {
  const [loading, setLoading] = useState(false);
  const { accounts, totalAccounts } = useSelector(
    (state: RootState) => state.clienty
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const renderLoading = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: "100%", height: "80px" }}
        />

        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: "100%", height: "80px" }}
        />

        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: "100%", height: "80px" }}
        />
      </Box>
    );
  };

  const renderAccountsHome = () => {
    return (
      <Box
        className={
          AnchorTemporaryDrawerStyles["Box-AnchorTemporaryDrawer-father"]
        }
        role="presentation"
      >
        <Box className={AnchorTemporaryDrawerStyles["box-total-plans"]}>
          <Typography
            component="span"
            className={`${styles["H1-bold"]} ${poppins.className}`}
          >
            {totalAccounts.toString().padStart(2, "0")}
          </Typography>
          <Box
            className={AnchorTemporaryDrawerStyles["box-children-filter-pay"]}
          >
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
                    <AccountFilterIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <List className={AnchorTemporaryDrawerStyles["box-list-plans"]}>
          {accounts.map((account) => (
            <React.Fragment key={account.name}>
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
                  {account.name}
                </Typography>
                <Typography
                  component="span"
                  className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
                >
                  <AccountArrowRight />
                </Typography>
                {/* {plan.isFree && (
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
                )} */}
              </ListItem>
              <IconVectorClear style={{ width: "100%", height: "2px" }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
  };

  return <>{loading ? renderLoading() : renderAccountsHome()}</>;
}

export default AccountsHomeDrawer;
