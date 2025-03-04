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
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export default function RecurrenceChart() {
  const { monthly, yearly } = useSelector(
    (state: RootState) => state.clienty.recurrenceChart
  );

  // Redondear los valores a enteros
  const roundedMonthly = Math.round(monthly);
  const roundedYearly = Math.round(yearly);

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
              Anual: {roundedYearly}%
            </Typography>
          </Box>
          <Box className={recurrenceStyles["box-anual-children"]}>
            <Box className={recurrenceStyles["rectangle-anual-2"]}></Box>
            <Typography
              className={`${styles["Body-medium"]} ${poppins.className}`}
            >
              Mensual: {roundedMonthly}%
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Imagen  */}
      <DoughnutGraphic monthly={monthly} yearly={yearly} />{" "}
      {/* Pasamos los valores como props */}
    </Box>
  );
}
