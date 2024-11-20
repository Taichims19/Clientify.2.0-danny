import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import ResourcesHomeStyles from "./ResourcesHome.module.scss";
import IconVector from "@/app/icons/IconVector";
import IconArrowRight from "@/app/icons/IconArrowRight";
export default function ResourcesHome() {
  return (
    <Box className={ResourcesHomeStyles["Box-ResourcesHome-father"]}>
      {/* CHILD 1 */}
      <Box className={ResourcesHomeStyles["Box-ResourcesHome-child1"]}>
        {/* Grandson 1 */}
        <Box
          className={ResourcesHomeStyles["Box-ResourcesHome-child1-grandson1"]}
        >
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Recursos
          </Typography>
          <Typography
            className={`${styles["Title-medium-blue2"]} ${poppins.className}`}
          >
            Ver todo
          </Typography>
        </Box>
        <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
          13
        </Typography>
      </Box>

      {/* CHILD 2 */}
      <Box className={ResourcesHomeStyles["Box-ResourcesHome-child2"]}>
        {/* CHILD 1 */}
        <Box
          className={ResourcesHomeStyles["Box-ResourcesHome-child2-childrens"]}
        >
          <Box
            className={ResourcesHomeStyles["Box-ResourcesHome-childrens-child"]}
          >
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              Actualización (mejoras)
            </Typography>
            <Box className={ResourcesHomeStyles["child-box-new"]}>
              <Typography
                className={`${styles["Caption-Medium"]} ${poppins.className}`}
              >
                New
              </Typography>
            </Box>
          </Box>
          <IconArrowRight />
        </Box>

        <IconVector />

        {/* CHILD 2 */}
        <Box
          className={ResourcesHomeStyles["Box-ResourcesHome-child2-childrens"]}
        >
          <Box
            className={ResourcesHomeStyles["Box-ResourcesHome-childrens-child"]}
          >
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              Centro del conocimiento (ay...)
            </Typography>
            <Box className={ResourcesHomeStyles["child-box-new"]}>
              <Typography
                className={`${styles["Caption-Medium"]} ${poppins.className}`}
              >
                New
              </Typography>
            </Box>
          </Box>
          <IconArrowRight />
        </Box>

        <IconVector />

        {/* CHILD 3 */}
        <Box
          className={ResourcesHomeStyles["Box-ResourcesHome-child2-childrens"]}
        >
          <Box
            className={ResourcesHomeStyles["Box-ResourcesHome-childrens-child"]}
          >
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              Programa de afiliados
            </Typography>
            <Box className={ResourcesHomeStyles["child-box-new"]}>
              <Typography
                className={`${styles["Caption-Medium"]} ${poppins.className}`}
              >
                New
              </Typography>
            </Box>
          </Box>
          <IconArrowRight />
        </Box>

        <IconVector />

        {/* CHILD 4 */}

        <Box
          className={ResourcesHomeStyles["Box-ResourcesHome-child2-childrens"]}
        >
          <Box
            className={ResourcesHomeStyles["Box-ResourcesHome-childrens-child"]}
          >
            <Typography
              className={`${styles["Title-semibold"]} ${poppins.className}`}
            >
              Contrato Partner
            </Typography>
            <Box className={ResourcesHomeStyles["child-box-new"]}>
              <Typography
                className={`${styles["Caption-Medium"]} ${poppins.className}`}
              >
                New
              </Typography>
            </Box>
          </Box>
          <IconArrowRight />
        </Box>
      </Box>
    </Box>
  );
}
