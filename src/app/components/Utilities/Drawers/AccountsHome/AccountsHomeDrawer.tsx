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
import { AppDispatch, RootState } from "@/app/store/store";
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
import { fetchAccountsHomeList } from "@/app/store/clientify/clientifyThunks";

function AccountsHomeDrawer() {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, totalAccounts, accountsHomeLoading } = useSelector(
    (state: RootState) => state.clienty.accountsHome
  );
  const { selectAccount } = useSelector((state: RootState) => state.clienty);

  const { activeRecurrence, startDate, endDate } = useSelector(
    (state: RootState) => ({
      activeRecurrence: state.clienty.activeRecurrence,
      startDate: state.invoiceTable.calendaryRanger.startDate,
      endDate: state.invoiceTable.calendaryRanger.endDate,
    })
  );

  const partnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );

  const subdrawer = useSelector((state: RootState) => state.clienty.subDrawer);

  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 8;

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = accounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  const totalPages = Math.ceil(accounts.length / accountsPerPage);

  // Carga inicial de datos solo si no hay filtros activos y accounts está vacío
  useEffect(() => {
    if (
      partnerId &&
      accounts.length === 0 &&
      !activeRecurrence &&
      !startDate &&
      !endDate
    ) {
      dispatch(fetchAccountsHomeList(partnerId));
    }
  }, [
    dispatch,
    partnerId,
    accounts.length,
    activeRecurrence,
    startDate,
    endDate,
  ]);

  const handleAccountClick = (accountName: string) => {
    dispatch(openSubDrawerWithAccount(accountName));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleOpenUrl = (url: string) => {
    console.log("Intentando abrir URL:", url); // Para depuración
    if (url) {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!newWindow) {
        console.error(
          "No se pudo abrir la ventana. ¿Bloqueador de ventanas emergentes?"
        );
      }
    } else {
      console.error("URL no definida para esta cuenta");
    }
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
          {currentAccounts.map((account) => (
            <React.Fragment key={account.name}>
              <ListItem
                sx={{ padding: "0px", position: "relative" }}
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
                  onClick={() => handleOpenUrl(account.url)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccountArrowRight />
                </Typography>
              </ListItem>
              <IconVectorClear style={{ width: "100%", height: "2px" }} />
            </React.Fragment>
          ))}
        </List>

        {totalPages > 1 && accounts.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
          >
            <IconButton onClick={handlePrevPage} disabled={currentPage === 1}>
              ◀
            </IconButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Typography
                className={`${styles["Caption-Regular"]} ${poppins.className}`}
              >
                {/* {`${indexOfFirstAccount + 1}-${Math.min(
                  indexOfLastAccount,
                  accounts.length
                )} de ${accounts.length}`}{" "} */}
                Página {currentPage} de {totalPages}
              </Typography>
            </Box>
            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              ▶
            </IconButton>
          </Box>
        )}

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

  return <>{accountsHomeLoading ? renderLoading() : renderAccountsHome()}</>;
}

export default AccountsHomeDrawer;
