"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { Grid } from "@mui/material";
import SubscriptionPanel from "@/app/components/SubscriptionPanel/SubscriptionPanel";
import SummaryPanel from "@/app/components/SummaryPanel/SummaryPanel";
import InvoicesTable from "@/app/components/InvoicesTable/InvoicesTable";
import MRRPartner from "@/app/components/MrrPartner/MrrPartner";
import AccountsHome from "@/app/components/AccountsHome/AccountsHome";
import ResourcesHome from "@/app/components/ResourcesHome/ResourcesHome";
import RecurrenceChart from "@/app/components/RecurrenceChart/RecurrenceChart";
import styles from "@/app/styles/home.module.css";
import AnchorTemporaryDrawer from "@/app/components/Utilities/Drawers/AnchorTemporaryDrawer/AnchorTemporaryDrawer";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import PlanSuscriptionDrawer from "@/app/components/Utilities/Drawers/PlanSuscription/PlanSuscriptionDrawer";
import AccountsHomeDrawer from "@/app/components/Utilities/Drawers/AccountsHome/AccountsHomeDrawer";
import ResourcesHomeDrawer from "@/app/components/Utilities/Drawers/ResourcesHome/ResourcesHomeDrawer";
import InvoicesTableLiquidationsDrawer from "@/app/components/Utilities/Drawers/InvoicesTableLiquidations/InvoicesTableLiquidationsDrawer";
import { DrawerView } from "@/app/store/clientify/clientifySlice";
import { fetchPartnerData } from "../store/clientify/clientifyThunks";

export default function PartnerPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id as string;
  const drawer = useSelector((state: RootState) => state.clienty.drawer); // Corregí "clienty" a "clientify"

  useEffect(() => {
    const partnerId = parseInt(id, 10);
    if (!isNaN(partnerId)) {
      fetchPartnerData(partnerId, dispatch); // Ejecutar directamente, no pasar a dispatch
    } else {
      console.error("ID de partner no válido:", id);
    }
  }, [id, dispatch]); // Se ejecuta solo cuando cambia el id

  return (
    <Grid className={styles["body"]} container sx={{ padding: "20px" }}>
      <Grid item xs={12} md={9} lg={9} xl={9}>
        <Grid item xs={12} md={12} className={styles["Box-Planes-father"]}>
          <Grid item sx={{ flexGrow: 1 }}>
            <SubscriptionPanel />
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <SummaryPanel />
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <RecurrenceChart />
          </Grid>
        </Grid>
        <InvoicesTable />
      </Grid>
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
        {drawer.drawerSelected === DrawerView.INVOICESTABLES && (
          <InvoicesTableLiquidationsDrawer />
        )}
      </AnchorTemporaryDrawer>
    </Grid>
  );
}
