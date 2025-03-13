"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Skeleton,
} from "@mui/material"; // Añadimos Skeleton
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
  const loading = useSelector((state: RootState) => state.clienty.loading); // Añadimos el estado de carga

  const calculateProgress = (mrr: number) => {
    let bronze = 0;
    let silver = 0;
    let gold = 0;
    let diamond = 0;

    if (mrr >= 2500) {
      bronze = 100;
      silver = 100;
      gold = 100;
      diamond = 100;
    } else if (mrr >= 1500) {
      bronze = 100;
      silver = 100;
      gold = ((mrr - 1500) / (2500 - 1500)) * 100;
      diamond = 0;
    } else if (mrr >= 800) {
      bronze = 100;
      silver = ((mrr - 800) / (1500 - 800)) * 100;
      gold = 0;
      diamond = 0;
    } else if (mrr >= 120) {
      bronze = ((mrr - 120) / (800 - 120)) * 100;
      silver = 0;
      gold = 0;
      diamond = 0;
    } else {
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
            {loading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "100px" }}
              />
            ) : (
              <>
                <Typography
                  className={`${styles["Title-regular"]} ${poppins.className}`}
                >
                  MRR Partner
                </Typography>
                <IconMrrPartnerDoubt />
              </>
            )}
          </Box>
          {/* child 2 */}
          <Box className={mrrPartnerStyles["grandson-1-child-2"]}>
            <Box className={mrrPartnerStyles["child-2-box1"]}>
              {loading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", width: "60px" }}
                />
              ) : (
                <Typography
                  className={`${styles["Title-medium-blue2"]} ${poppins.className}`}
                >
                  Bronce
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        {loading ? (
          <Skeleton variant="text" sx={{ fontSize: "2.5rem", width: "80px" }} />
        ) : (
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            {totalMrr}
          </Typography>
        )}
      </Box>
      <Divider />

      {/* box child 2 mrr partner */}
      <Box className={mrrPartnerStyles["Box-MrrPartner-child-2"]}>
        <Box className={mrrPartnerStyles["MrrPartner-child2-grandson-1"]}>
          {loading ? (
            <>
              <Skeleton
                variant="rectangular"
                height={10}
                sx={{ width: "100%", borderRadius: 5, marginBottom: "8px" }}
              />
              <Skeleton
                variant="rectangular"
                height={10}
                sx={{ width: "100%", borderRadius: 5, marginBottom: "8px" }}
              />
              <Skeleton
                variant="rectangular"
                height={10}
                sx={{ width: "100%", borderRadius: 5, marginBottom: "8px" }}
              />
              <Skeleton
                variant="rectangular"
                height={10}
                sx={{ width: "100%", borderRadius: 5 }}
              />
            </>
          ) : (
            <>
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
                <BorderLinearProgress
                  variant="determinate"
                  value={goldProgress}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <BorderLinearProgress
                  variant="determinate"
                  value={diamondProgress}
                />
              </Box>
            </>
          )}
        </Box>

        <Box className={mrrPartnerStyles["MrrPartner-child2-grandson-2"]}>
          {loading ? (
            <>
              <Box className={mrrPartnerStyles["grandson-2-box-childrens"]}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "60px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", width: "40px" }}
                />
              </Box>
              <Box className={mrrPartnerStyles["grandson-2-box-childrens"]}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "60px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", width: "40px" }}
                />
              </Box>
              <Box className={mrrPartnerStyles["grandson-2-box-childrens"]}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "60px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", width: "40px" }}
                />
              </Box>
              <Box className={mrrPartnerStyles["grandson-2-box-childrens"]}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "60px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.2rem", width: "40px" }}
                />
              </Box>
            </>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
