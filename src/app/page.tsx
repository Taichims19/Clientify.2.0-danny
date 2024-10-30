// import Image from "next/image";

import { Grid, Box } from "@mui/material";
import SubscriptionPanel from "./components/SubscriptionPanel/SubscriptionPanel";
import SummaryPanel from "./components/SummaryPanel/SummaryPanel";
import InvoicesTable from "./components/InvoicesTable/InvoicesTable";
import MRRPartner from "./components/MrrPartner/MrrPartner";

import ResourcesHome from "./components/ResourcesHome/ResourcesHome";
import RecurrenceChart from "./components/RecurrenceChart/RecurrenceChart";
import styles from "./styles/home.module.css";
import AccountsHome from "./components/AccountsHome/AccountsHome";
import variables from "./styles/variables.module.scss";

export default function Home() {
  return (
    <Grid className={styles["body"]} container sx={{ padding: "20px" }}>
      {/* paneles y factura 2 cajones  */}
      <Grid item xs={12} md={9}>
        {/* cajon 427320182 */}
        <Grid
          // className={variables["background-patatas"]}
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            width: "100%",
            height: "251px",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Panel izquierdo (Suscripciones) */}
          <Grid item>
            {/* Panel principal */}
            <SubscriptionPanel />
          </Grid>

          <Grid item>
            {/* Panel de resumen */}

            <SummaryPanel />
          </Grid>

          <Grid item>
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

      {/* Cajon vertical MRR Partner */}

      {/* MRR fila  */}
      <Grid item xs={12} md={3} sx={{ background: "blue", widows: "100%" }}>
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
