import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import styles from "../home.module.css";
import { poppins } from "../fonts/fonts";
import SvgComponent from "./SvgComponent";

const SummaryPanel = () => {
  return (
    <Box className={styles["Summary-panels"]}>
      <Box className={styles["Summary-panels-boxes"]}>
        <Box className={styles["Summary-panels-boxes-children1"]}>
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

      <Box className={styles["Summary-panels-boxes"]}>
        <Box className={styles["Summary-panels-boxes-children1"]}>
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Suscripciones activas
          </Typography>
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            03
          </Typography>
        </Box>
      </Box>

      <Box className={styles["Summary-panels-boxes"]}>
        <Box className={styles["Summary-panels-boxes-children1"]}>
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
