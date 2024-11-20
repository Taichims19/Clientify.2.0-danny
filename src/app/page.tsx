// import Image from "next/image";

import { Grid, Box } from "@mui/material";
import SubscriptionPanel from "./components/SubscriptionPanel/SubscriptionPanel";
import SummaryPanel from "./components/SummaryPanel/SummaryPanel";
import InvoicesTable from "./components/InvoicesTable/InvoicesTable";
import MRRPartner from "./components/MrrPartner/MrrPartner";
import AccountsHome from "./components/AccountsHome/AccountsHome";
import ResourcesHome from "./components/ResourcesHome/ResourcesHome";

import RecurrenceChart from "./components/RecurrenceChart/RecurrenceChart";
import styles from "./styles/home.module.css";
import { RowPrincipalMrr } from "./components/RowPrincipalMrr/RowPrincipalMrr";
// import variables from "./styles/variables.module.scss";

export default function Home() {
  return (
    <Grid className={styles["body"]} container sx={{ padding: "20px" }}>
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
        <Box
        // className={styles["Box-Facturas-father"]}
        >
          {/* Tabla de facturas */}

          <InvoicesTable />
        </Box>
      </Grid>

      {/* Cajon vertical MRR Partner */}

      {/* MRR fila  */}
      <Grid item xs={12} md={3} className={styles["BoxRowPrincipalMrr-father"]}>
        <Grid item>
          <MRRPartner />
        </Grid>
        <Grid item>
          <AccountsHome />
        </Grid>
        <Grid item>
          <ResourcesHome />
        </Grid>
      </Grid>
    </Grid>
  );
}
