import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import AccountsHomeStyles from "./AccountsHome.module.scss";
import IconVector from "@/app/icons/IconVector";
import IconArrowRight from "@/app/icons/IconArrowRight";
export default function AccountsHome() {
  return (
    <Box className={AccountsHomeStyles["Box-AccountsHome-father"]}>
      {/* child 1 */}
      <Box className={AccountsHomeStyles["Box-AccountsHome-child-1"]}>
        <Box
          className={AccountsHomeStyles["Box-AccountsHome-child-1-grandson-1"]}
        >
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Cuentas
          </Typography>
          <Typography
            className={`${styles["Title-medium-blue2"]} ${poppins.className}`}
          >
            Ver todo
          </Typography>
        </Box>
        <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
          03
        </Typography>
      </Box>

      {/* child 2 */}
      <Box className={AccountsHomeStyles["Box-AccountsHome-child-2"]}>
        <Box
          className={AccountsHomeStyles["Box-AccountsHome-child-2-grandson-1"]}
        >
          <Typography
            className={`${styles["Title-semibold"]} ${poppins.className}`}
          >
            EDUCATIUM
          </Typography>
          <IconArrowRight />
        </Box>

        <IconVector />

        <Box
          className={AccountsHomeStyles["Box-AccountsHome-child-2-grandson-2"]}
        >
          <Typography
            className={`${styles["Title-semibold"]} ${poppins.className}`}
          >
            INTEGRITYLEGAL
          </Typography>
          <IconArrowRight />
        </Box>
      </Box>
    </Box>
  );
}
