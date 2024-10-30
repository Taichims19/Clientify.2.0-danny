import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import styles from "../../styles/home.module.css";
import recurrenceStyles from "./recurrenceChart.module.scss";
import { poppins } from "../../fonts/fonts";
import DoughnutGraphic from "@/app/graphics/Doughnut";

export default function RecurrenceChart() {
  return (
    <Box className={recurrenceStyles["Recurrence-plans"]}>
      <Box className={recurrenceStyles["Recurrence-plans-boxes"]}>
        <Typography
          className={`${styles["Title-regular"]} ${poppins.className}`}
        >
          Recurrencia
        </Typography>
        <Box className={recurrenceStyles["box-anual"]}>
          <Box className={recurrenceStyles["box-anual-children"]}>
            <Box className={recurrenceStyles["rectangle-anual-1"]}></Box>
            <Typography
              className={`${styles["Body-medium"]} ${poppins.className}`}
            >
              Anual: 80%
            </Typography>
          </Box>
          <Box className={recurrenceStyles["box-anual-children"]}>
            <Box className={recurrenceStyles["rectangle-anual-2"]}></Box>
            <Typography
              className={`${styles["Body-medium"]} ${poppins.className}`}
            >
              Mensual: 20%
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Imagen  */}

      <DoughnutGraphic />
    </Box>
  );
}
