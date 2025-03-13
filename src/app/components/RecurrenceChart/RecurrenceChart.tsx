import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Skeleton, // Añadimos Skeleton
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
  const loading = useSelector((state: RootState) => state.clienty.loading); // Añadimos el estado de carga

  // Redondear los valores a enteros
  const roundedMonthly = Math.round(monthly);
  const roundedYearly = Math.round(yearly);

  return (
    <Box className={recurrenceStyles["Recurrence-plans"]}>
      <Box className={recurrenceStyles["Recurrence-plans-boxes"]}>
        {loading ? (
          <>
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", width: "100px" }}
            />
            <Box className={recurrenceStyles["box-anual"]}>
              <Box className={recurrenceStyles["box-anual-children"]}>
                <Skeleton
                  variant="rectangular"
                  width={16}
                  height={16}
                  sx={{ marginRight: "8px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "80px" }}
                />
              </Box>
              <Box className={recurrenceStyles["box-anual-children"]}>
                <Skeleton
                  variant="rectangular"
                  width={16}
                  height={16}
                  sx={{ marginRight: "8px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "80px" }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <>
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
          </>
        )}
      </Box>
      {/* Imagen */}
      {loading ? (
        <Skeleton
          variant="circular"
          width={150}
          height={150}
          sx={{ margin: "0 auto" }}
        />
      ) : (
        <DoughnutGraphic monthly={monthly} yearly={yearly} />
      )}
    </Box>
  );
}
