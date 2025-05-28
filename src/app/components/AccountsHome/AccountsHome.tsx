"use client";
import { Typography, Box, Skeleton } from "@mui/material"; // Añadimos Skeleton
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import AccountsHomeStyles from "./AccountsHome.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";

import IconRightArrow from "@/app/icons/IconRightArrow";
import {
  DrawerView,
  selectPlan,
  setDrawer,
  toggleAccountStatus,
} from "@/app/store/clientify/clientifySlice";
import {
  fetchAccountsHomeList,
  fetchAccountsPlansSelect,
  fetchFilteredAccounts,
} from "@/app/store/clientify/clientifyThunks";
import { useEffect, useRef } from "react";

export default function AccountsHome() {
  const dispatch = useDispatch<AppDispatch>();
  const { totalAccounts, accounts } = useSelector(
    (state: RootState) => state.clienty.accountsHome
  );
  const loading = useSelector((state: RootState) => state.clienty.loading); // Añadimos el estado de carga

  const partnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );

  const MAX_ACCOUNTS_DISPLAYED = 2;

  const visibleAccounts = accounts.slice(0, MAX_ACCOUNTS_DISPLAYED);

  // Refs para evitar múltiples invocaciones
  const hasFetchedRef = useRef(false); //evita que el thunk se ejecute más de una vez por sesión.
  const prevPartnerIdRef = useRef<number | null>(null); //

  const handleToggleStatus = (accountName: string) => {
    dispatch(toggleAccountStatus(accountName));
  };

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

    // Verifica si el partnerId cambió o si no se ha fetchado aún
    if (
      partnerId &&
      (!hasFetchedRef.current || partnerId !== prevPartnerIdRef.current)
    ) {
      dispatch(fetchFilteredAccounts(partnerId, {})); // Sin filtros por ahora
      hasFetchedRef.current = true; // Marca como fetchado
      prevPartnerIdRef.current = partnerId; // Actualiza el partnerId previo
    }
  };

  // Efecto para reiniciar hasFetchedRef si cambia el partnerId (opcional, según tu lógica)
  useEffect(() => {
    if (partnerId !== prevPartnerIdRef.current) {
      hasFetchedRef.current = false; // Reinicia si el partnerId cambia
      prevPartnerIdRef.current = partnerId;
    }
  }, [partnerId]);

  return (
    <Box className={AccountsHomeStyles["Box-AccountsHome-father"]}>
      {/* child 1 */}
      <Box className={AccountsHomeStyles["Box-AccountsHome-child-1"]}>
        <Box
          className={AccountsHomeStyles["Box-AccountsHome-child-1-grandson-1"]}
        >
          {loading ? (
            <>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "80px" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.2rem", width: "60px" }}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </Box>
        {loading ? (
          <Skeleton variant="text" sx={{ fontSize: "2.5rem", width: "50px" }} />
        ) : (
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            {totalAccounts.toString().padStart(2, "0")}
          </Typography>
        )}
      </Box>

      {/* Lista de cuentas */}
      {/* child 2 */}
      <Box className={AccountsHomeStyles["Box-AccountsHome-child-2"]}>
        {loading
          ? [...Array(MAX_ACCOUNTS_DISPLAYED)].map((_, index) => (
              <Box
                key={index}
                className={
                  AccountsHomeStyles["Box-AccountsHome-child-2-grandson-1"]
                }
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", width: "70%" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={24}
                  height={24}
                  sx={{ marginLeft: "8px" }}
                />
              </Box>
            ))
          : visibleAccounts.map((account) => (
              <Box
                key={account.name}
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
