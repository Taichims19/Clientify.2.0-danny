import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import styles from "../home.module.css";
import { poppins } from "../fonts/fonts";

export default function RecurrenceChart() {
  return (
    <Box className={styles["Recurrence-plans"]}>
      <Box className={styles["Recurrence-plans-boxes"]}>
        <Typography
          className={`${styles["Title-regular"]} ${poppins.className}`}
        >
          Recurrencia
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Typography variant="body2" sx={{ color: "#2196f3", mr: 1 }}>
            Anual: 80%
          </Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Mensual: 20%
          </Typography>
        </Box>
      </Box>

      {/* Imagen  */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={150}
      >
        <CircularProgress
          variant="determinate"
          value={80}
          size={100}
          thickness={5}
          sx={{ color: "#2196f3" }}
        />
      </Box>
    </Box>
  );
}
