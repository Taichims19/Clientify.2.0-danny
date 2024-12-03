// Añade "use client" al inicio del archivo para que Next.js lo renderice solo en el cliente
"use client";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import mrrPartnerStyles from "./MrrPartner.module.scss";
import IconMrrPartnerDoubt from "@/app/icons/IconMrrPartnerDoubt";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import { styled } from "@mui/material/styles";

import React, { useEffect, useState } from "react";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

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
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
          {/* chlid 2 */}
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
          108
        </Typography>
      </Box>
      <Divider />

      {/* box child 2 mrr partner */}
      <Box className={mrrPartnerStyles["Box-MrrPartner-child-2"]}>
        <Box className={mrrPartnerStyles["MrrPartner-child2-grandson-1"]}>
          <Box sx={{ width: "100%" }}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ width: "100%", height: "10px", background: "yellow" }}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <BorderLinearProgress variant="determinate" value={progress} />
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
              +100
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
              +500
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
              +1000
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
              +2000
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
