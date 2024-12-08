"use client";

import { Box, Typography } from "@mui/material";
import styles from "../../styles/home.module.css";
import subscriptionStyles from "./subscriptionPanel.module.scss";
import { poppins } from "../../fonts/fonts";
import { useDispatch, useSelector } from "react-redux";

import {
  DrawerView,
  selectPlan,
  setDrawer,
} from "@/app/store/clientify/clientifySlice";
import { RootState } from "@/app/store/store";

const SubscriptionPanel = () => {
  const dispatch = useDispatch();
  const { totalPlans, plans } = useSelector(
    (state: RootState) => state.clienty
  );

  const handleOpenDrawer = (plan: string) => {
    dispatch(selectPlan(plan));
    dispatch(
      setDrawer({
        isDrawerOpen: true,
        drawerTitle: "Planes",
        drawerSelected: DrawerView.PLANSUSCRIPTION,
        view: "",
      })
    );
  };

  return (
    <Box className={subscriptionStyles["Subscription-plans"]}>
      {/* Encabezado */}
      <Box className={subscriptionStyles["Subscription-plans-boxes"]}>
        <Box className={subscriptionStyles["box-childrenboxes-grandson1"]}>
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Planes de suscripción
          </Typography>
          <Typography
            className={`${styles["Title-medium-blue2"]} ${poppins.className}`}
            onClick={() => handleOpenDrawer("Ver todo")}
            style={{ cursor: "pointer" }}
          >
            Ver todo
          </Typography>
        </Box>
        <Typography
          component="span"
          className={`${styles["H1-bold"]} ${poppins.className}`}
        >
          {totalPlans.toString().padStart(2, "0")}
        </Typography>
      </Box>

      {/* Lista de planes */}
      <Box className={subscriptionStyles["Subscription-plans-boxes"]}>
        {plans.slice(0, 3).map((plan) => (
          <Box
            key={plan.name}
            className={subscriptionStyles["Subscription-plans-boxes-children1"]}
          >
            <Typography
              component="div" // Cambia el elemento raíz de <Typography> a <div>
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              {plan.name}
              {plan.isFree && (
                <Box
                  sx={{
                    display: "inline-block",
                    backgroundColor: "#0067EE",
                    color: "#fff",
                    padding: "2px 6px",
                    borderRadius: "2px",
                    fontSize: "12px",
                    marginLeft: "8px",
                  }}
                >
                  <Typography
                    component="span" // Usa <span> aquí para mantener el contenido inline
                    className={`${styles["Caption-Medium"]} ${poppins.className}`}
                  >
                    Free
                  </Typography>
                </Box>
              )}
            </Typography>
            <Typography
              component="span"
              className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
            >
              {plan.count.toString().padStart(2, "0")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SubscriptionPanel;
