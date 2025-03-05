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

import AntSwitches from "../../Switches/AntSwitch/AntSwitches";
import IconVectorClear from "@/app/icons/IconVectorClear";
import AccountArrowRight from "@/app/icons/AccountArrowRight";
import AccountFilterIcon from "@/app/icons/AccountFilterIcon";
import AccountsHomeSelect from "../../Selectors/AccountsHomeSelect/AccountsHomeSelect";
import {
  DrawerView,
  openSubDrawerWithAccount,
  selectPlan,
  setDrawer,
  SubDrawerView,
  toggleAccountsSelect,
} from "@/app/store/clientify/clientifySlice";
import IconVector from "@/app/icons/IconVector";
import AnchorTemporarySubDrawer from "../AnchorSubDrawer/AnchorTemporarySubDrawer";
import { EducatiumDrawer } from "../SubDrawers/Educatium/EducatiumDrawer";
import { IntegrityDrawer } from "../SubDrawers/IntegrityDrawer/IntegrityDrawer";

function AccountsHomeDrawer() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { accounts, totalAccounts } = useSelector(
    (state: RootState) => state.clienty.accountsHome
  );
  const { selectAccount } = useSelector((state: RootState) => state.clienty);
  const subdrawer = useSelector((state: RootState) => state.clienty.subDrawer);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleAccountClick = (accountName: string) => {
    dispatch(openSubDrawerWithAccount(accountName));
  };

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
        <Box
          // sx={{ background: "red" }}
          className={AnchorTemporaryDrawerStyles["box-total-plans"]}
        >
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
              onClick={() => dispatch(toggleAccountsSelect())}
            >
              <AccountFilterIcon />
            </Box>
          </Box>
        </Box>

        {/* Renderizar condicionalmente AccountsHomeSelect */}
        {selectAccount.isAccountsSelectOpen && <AccountsHomeSelect />}

        <IconVector />

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
                  onClick={() => handleAccountClick(account.name)} // Evento onClick aquí
                >
                  <AccountArrowRight />
                </Typography>
              </ListItem>
              <IconVectorClear style={{ width: "100%", height: "2px" }} />
            </React.Fragment>
          ))}
        </List>
        <AnchorTemporarySubDrawer title={subdrawer.subDrawerTitle}>
          {subdrawer.subDrawerSelected === SubDrawerView.EDUCATIUM && (
            <EducatiumDrawer />
          )}
          {subdrawer.subDrawerSelected === SubDrawerView.INTEGRITYLEGAL && (
            <IntegrityDrawer />
          )}
        </AnchorTemporarySubDrawer>
      </Box>
    );
  };

  return <>{loading ? renderLoading() : renderAccountsHome()}</>;
}

export default AccountsHomeDrawer;
