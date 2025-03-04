"use client";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import mrrPartnerStyles from "./MrrPartner.module.scss";
import IconMrrPartnerDoubt from "@/app/icons/IconMrrPartnerDoubt";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

export default function MRRPartner() {
  // Corrección: asumiendo que el slice se llama "clientify" y no "clienty"
  const totalMrr = useSelector(
    (state: RootState) => state.clienty.mrrPartner.totalMrr
  );

  const calculateProgress = (mrr: number) => {
    let bronze = 0;
    let silver = 0;
    let gold = 0;
    let diamond = 0;

    if (mrr >= 2500) {
      // Si mrr >= 2500, todas las barras al 100%
      bronze = 100;
      silver = 100;
      gold = 100;
      diamond = 100;
    } else if (mrr >= 1500) {
      // Bronce y Plata al 100%, Oro proporcional, Diamante 0%
      bronze = 100;
      silver = 100;
      gold = ((mrr - 1500) / (2500 - 1500)) * 100; // Rango 1500-2500
      diamond = 0;
    } else if (mrr >= 800) {
      // Bronce al 100%, Plata proporcional, Oro y Diamante 0%
      bronze = 100;
      silver = ((mrr - 800) / (1500 - 800)) * 100; // Rango 800-1500
      gold = 0;
      diamond = 0;
    } else if (mrr >= 120) {
      // Bronce proporcional, Plata, Oro y Diamante 0%
      bronze = ((mrr - 120) / (800 - 120)) * 100; // Rango 120-800
      silver = 0;
      gold = 0;
      diamond = 0;
    } else {
      // Si mrr < 120, todas las barras en 0%
      bronze = 0;
      silver = 0;
      gold = 0;
      diamond = 0;
    }

    return [bronze, silver, gold, diamond];
  };

  const [bronzeProgress, silverProgress, goldProgress, diamondProgress] =
    calculateProgress(totalMrr);
  return (
    <Box className={mrrPartnerStyles["Box-MrrPartner-father"]}>
      {/* box child 1 mrr partner */}
      <Box className={mrrPartnerStyles["Box-MrrPartner-child-1"]}>
        <Box className={mrrPartnerStyles["MrrPartner-grandson-1"]}>
          {/* child 1 */}
          <Box className={mrrPartnerStyles["grandson-1-child-1"]}>
            <Typography
              className={`${styles["Title-regular"]} ${poppins.className}`}
            >
              MRR Partner
            </Typography>
            <IconMrrPartnerDoubt />
          </Box>
          {/* child 2 */}
          <Box className={mrrPartnerStyles["grandson-1-child-2"]}>
            <Box className={mrrPartnerStyles["child-2-box1"]}>
              <Typography
                className={`${styles["Title-medium-blue2"]} ${poppins.className}`}
              >
                Bronce
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
          {totalMrr}
        </Typography>
      </Box>
      <Divider />

      {/* box child 2 mrr partner */}
      <Box className={mrrPartnerStyles["Box-MrrPartner-child-2"]}>
        <Box className={mrrPartnerStyles["MrrPartner-child2-grandson-1"]}>
          <Box sx={{ width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={bronzeProgress}
            />
          </Box>
          <Box sx={{ width: "100%", height: "10px", background: "yellow" }}>
            <BorderLinearProgress
              variant="determinate"
              value={silverProgress}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <BorderLinearProgress variant="determinate" value={goldProgress} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <BorderLinearProgress
              variant="determinate"
              value={diamondProgress}
            />
          </Box>
        </Box>

        <Box className={mrrPartnerStyles["MrrPartner-child2-grandson-2"]}>
          {/* child 1 */}
          <Box className={mrrPartnerStyles["grandson-2-box-childrens"]}>
            <Typography
              className={`${styles["Body-regular-2"]} ${poppins.className}`}
            >
              Bronce
            </Typography>
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              +120
            </Typography>
          </Box>

          {/* child 2 */}
          <Box className={mrrPartnerStyles["grandson-2-box-childrens"]}>
            <Typography
              className={`${styles["Body-regular-2"]} ${poppins.className}`}
            >
              Plata
            </Typography>
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              +800
            </Typography>
          </Box>

          {/* child 3 */}
          <Box className={mrrPartnerStyles["grandson-2-box-childrens"]}>
            <Typography
              className={`${styles["Body-regular-2"]} ${poppins.className}`}
            >
              Oro
            </Typography>
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              +1500
            </Typography>
          </Box>

          {/* child 4 */}
          <Box className={mrrPartnerStyles["grandson-2-box-childrens"]}>
            <Typography
              className={`${styles["Body-regular-2"]} ${poppins.className}`}
            >
              Diamante
            </Typography>
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              +2500
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
