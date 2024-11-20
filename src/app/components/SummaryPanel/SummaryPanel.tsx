import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import summaryStyles from "./summaryPanel.module.scss";
import SvgComponent from "../../icons/SvgComponent";

const SummaryPanel = () => {
  return (
    <Box className={summaryStyles["Summary-panels"]}>
      {/* cajon contactos */}
      <Box className={summaryStyles["Summary-panels-boxes"]}>
        <Box
          className={summaryStyles["Summary-panels-boxes-children1"]}
          // sx={{ justifyContent: "space-between" }}
        >
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Contactos totales
          </Typography>
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            430
          </Typography>
        </Box>
      </Box>

      {/* cajon suscripciones activas */}
      <Box className={summaryStyles["Summary-panels-boxes"]}>
        <Box className={summaryStyles["Summary-panels-boxes-children1"]}>
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Suscripciones activash
          </Typography>
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            3.4k
          </Typography>
        </Box>
      </Box>

      {/* cajon comisiones cobradas */}
      <Box className={summaryStyles["Summary-panels-boxes"]}>
        <Box className={summaryStyles["Summary-panels-boxes-children1"]}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Typography
              className={`${styles["Title-regular"]} ${poppins.className}`}
            >
              Comisiones cobradas
            </Typography>
            <SvgComponent />
          </Box>
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            01
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SummaryPanel;
