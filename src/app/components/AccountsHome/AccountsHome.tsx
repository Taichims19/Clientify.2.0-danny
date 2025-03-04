"use client";
import { Typography, Box } from "@mui/material";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import AccountsHomeStyles from "./AccountsHome.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

import IconRightArrow from "@/app/icons/IconRightArrow";
import {
  DrawerView,
  selectPlan,
  setDrawer,
  toggleAccountStatus,
} from "@/app/store/clientify/clientifySlice";

export default function AccountsHome() {
  const dispatch = useDispatch();
  const { totalAccounts, accounts } = useSelector(
    (state: RootState) => state.clienty.accountsHome
  );

  const handleToggleStatus = (accountName: string) => {
    dispatch(toggleAccountStatus(accountName));
  };

  const MAX_ACCOUNTS_DISPLAYED = 2;

  const visibleAccounts = accounts.slice(0, MAX_ACCOUNTS_DISPLAYED);

  const handleOpenDrawer = (plan: string) => {
    dispatch(selectPlan(plan));
    dispatch(
      setDrawer({
        isDrawerOpen: true,
        drawerTitle: "Cuentas",
        drawerSelected: DrawerView.ACCOUNTS,
        view: "",
      })
    );
  };

  return (
    <Box className={AccountsHomeStyles["Box-AccountsHome-father"]}>
      {/* child 1 */}
      <Box className={AccountsHomeStyles["Box-AccountsHome-child-1"]}>
        <Box
          className={AccountsHomeStyles["Box-AccountsHome-child-1-grandson-1"]}
        >
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Cuentas
          </Typography>

          <Typography
            className={`${styles["Title-medium-blue2"]} ${poppins.className}`}
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenDrawer("Ver todo")}
          >
            Ver todo
          </Typography>
        </Box>
        <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
          {totalAccounts.toString().padStart(2, "0")}
        </Typography>
      </Box>

      {/* Lista de cuentas */}
      {/* child 2 */}
      <Box className={AccountsHomeStyles["Box-AccountsHome-child-2"]}>
        {visibleAccounts.map((account) => (
          <Box
            key={account.name}
            // sx={{ background: "red" }}
            className={
              AccountsHomeStyles["Box-AccountsHome-child-2-grandson-1"]
            }
          >
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
              onClick={() => handleToggleStatus(account.name)}
              style={{ cursor: "pointer" }}
            >
              {account.name}
            </Typography>
            <IconRightArrow />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
