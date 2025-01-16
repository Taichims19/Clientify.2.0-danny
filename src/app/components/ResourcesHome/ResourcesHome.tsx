import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "../../styles/home.module.css";
import { poppins } from "../../fonts/fonts";
import ResourcesHomeStyles from "./ResourcesHome.module.scss";
import IconVector from "@/app/icons/IconVector";
import IconArrowRight from "@/app/icons/IconArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  DrawerView,
  selectPlan,
  setDrawer,
} from "@/app/store/clientify/clientifySlice";

export default function ResourcesHome() {
  const dispatch = useDispatch();
  const { totalPlans, plans } = useSelector(
    (state: RootState) => state.clienty
  );

  const handleOpenDrawer = (plan: string) => {
    dispatch(selectPlan(plan));
    dispatch(
      setDrawer({
        isDrawerOpen: true,
        drawerTitle: "Recursos",
        drawerSelected: DrawerView.RESOURCES,
        view: "",
      })
    );
  };

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
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenDrawer("Ver todo")}
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
