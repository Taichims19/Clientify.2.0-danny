"use client";
import { Grid, Box } from "@mui/material";
import SubscriptionPanel from "./components/SubscriptionPanel/SubscriptionPanel";
import SummaryPanel from "./components/SummaryPanel/SummaryPanel";
import InvoicesTable from "./components/InvoicesTable/InvoicesTable";
import MRRPartner from "./components/MrrPartner/MrrPartner";
import AccountsHome from "./components/AccountsHome/AccountsHome";
import ResourcesHome from "./components/ResourcesHome/ResourcesHome";

import RecurrenceChart from "./components/RecurrenceChart/RecurrenceChart";
import styles from "./styles/home.module.css";
import AnchorTemporaryDrawer from "./components/Utilities/Drawers/AnchorTemporaryDrawer/AnchorTemporaryDrawer";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import PlanSuscription from "./components/Utilities/Drawers/PlanSuscription/PlanSuscriptionDrawer";
import { DrawerView } from "./store/clientify/clientifySlice";
import PlanSuscriptionDrawer from "./components/Utilities/Drawers/PlanSuscription/PlanSuscriptionDrawer";
import AccountsHomeDrawer from "./components/Utilities/Drawers/AccountsHome/AccountsHomeDrawer";
import ResourcesHomeDrawer from "./components/Utilities/Drawers/ResourcesHome/ResourcesHomeDrawer";
// import variables from "./styles/variables.module.scss";

export default function Home() {
  const drawer = useSelector((state: RootState) => state.clienty.drawer);

  return (
    <Grid className={styles["body"]} container sx={{ padding: "20px" }}>
      {/* Siempre montado */}
      {/* paneles y factura 2 cajones  */}
      <Grid item xs={12} md={9} lg={9} xl={9}>
        {/* cajon 427320182 */}
        <Grid item xs={12} md={12} className={styles["Box-Planes-father"]}>
          {/* Panel izquierdo (Suscripciones) */}
          <Grid item sx={{ flexGrow: 1 }}>
            {/* Panel principal */}
            <SubscriptionPanel />
          </Grid>

          <Grid item sx={{ flexGrow: 1 }}>
            {/* Panel de resumen */}

            <SummaryPanel />
          </Grid>

          <Grid item sx={{ flexGrow: 1 }}>
            {/* Panel de resumen */}

            <RecurrenceChart />
          </Grid>
        </Grid>

        {/* Panel derecho (Gráfica de recurrencia y Tabla de facturas) */}
        {/* <Box
        
        > */}
        {/* Tabla de facturas */}

        <InvoicesTable />
        {/* </Box> */}
      </Grid>
      {/* Cajon vertical MRR Partner */}
      {/* MRR fila  */}
      <Grid item xs={12} md={3} className={styles["BoxRowPrincipalMrr-father"]}>
        <Grid item sx={{ flexGrow: 1, width: "96%", margin: "0px 16px" }}>
          <MRRPartner />
        </Grid>
        <Grid item sx={{ flexGrow: 1, width: "96%", margin: "0px 16px" }}>
          <AccountsHome />
        </Grid>
        <Grid item sx={{ flexGrow: 1, width: "96%", margin: "0px 16px" }}>
          <ResourcesHome />
        </Grid>
      </Grid>

      <AnchorTemporaryDrawer title={drawer.drawerTitle}>
        {drawer.drawerSelected === DrawerView.PLANSUSCRIPTION && (
          <PlanSuscriptionDrawer />
        )}
        {drawer.drawerSelected === DrawerView.ACCOUNTS && (
          <AccountsHomeDrawer />
        )}
        {drawer.drawerSelected === DrawerView.RESOURCES && (
          <ResourcesHomeDrawer />
        )}
      </AnchorTemporaryDrawer>
    </Grid>
  );
}
