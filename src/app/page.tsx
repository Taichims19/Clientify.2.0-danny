// import Image from "next/image";

import { Grid, Box } from "@mui/material";
import SubscriptionPanel from "./components/SubcriptionPanel";
import SummaryPanel from "./components/SummaryPanel";
import InvoicesTable from "./components/InvoicesTable";
import MRRPartner from "./components/MrrPartner";
import AccountsHome from "./components/AccountsHome";
import ResourcesHome from "./components/ResourcesHome";
import RecurrenceChart from "./components/RecurrenceChart";
import styles from "./home.module.css";

export default function Home() {
  return (
    <Grid
      className={styles["body"]}
      container
      sx={{ padding: "20px", minHeight: "100vh" }}
    >
      {/* paneles y factura fila  */}
      <Grid item xs={12} md={9}>
        {/* cajon 427320182 */}
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            width: "100%",
            height: "251px",
            background: "yellow",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Panel izquierdo (Suscripciones) */}
          <Grid item xs={12} md={4}>
            {/* Panel principal */}
            <SubscriptionPanel />
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Panel de resumen */}

            <SummaryPanel />
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Panel de resumen */}

            <RecurrenceChart />
          </Grid>
        </Grid>

        {/* Panel derecho (Gráfica de recurrencia y Tabla de facturas) */}
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            width: "1052px",
            height: "488px",
            padding: "32px 32px 0px 32px",
            flexDirection: "column",
            alignItems: "flex-start",
            flexShrink: 0,
          }}
        >
          {/* Tabla de facturas */}
          <Grid item xs={12}>
            <InvoicesTable />
          </Grid>
        </Grid>
      </Grid>

      {/* MRR fila  */}
      <Grid item xs={12} md={3} sx={{ background: "blue" }}>
        <Box mb={3}>
          <MRRPartner />
        </Box>
        <Box mb={3}>
          <AccountsHome />
        </Box>
        <Box>
          <ResourcesHome />
        </Box>
      </Grid>
    </Grid>
  );
}
