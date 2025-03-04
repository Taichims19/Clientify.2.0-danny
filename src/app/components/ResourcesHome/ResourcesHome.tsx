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
  const { allowedResourcesCount, recentResources } = useSelector(
    (state: RootState) => state.clienty.resourcesHome
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

  const MAX_RESOURCES_DISPLAYED = 4;
  const visibleResources = recentResources.slice(0, MAX_RESOURCES_DISPLAYED);

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
          {allowedResourcesCount}
        </Typography>
      </Box>

      {/* CHILD 2 */}
      <Box className={ResourcesHomeStyles["Box-ResourcesHome-child2"]}>
        {/* CHILD 1 */}
        {visibleResources[0] && (
          <Box
            key={visibleResources[0].name}
            className={
              ResourcesHomeStyles["Box-ResourcesHome-child2-childrens"]
            }
          >
            <Box
              className={
                ResourcesHomeStyles["Box-ResourcesHome-childrens-child"]
              }
            >
              <Typography
                className={`${styles["Title-semibold"]} ${poppins.className}`}
              >
                {visibleResources[0].name}
              </Typography>
              {visibleResources[0].new && (
                <Box className={ResourcesHomeStyles["child-box-new"]}>
                  <Typography
                    className={`${styles["Caption-Medium"]} ${poppins.className}`}
                  >
                    New
                  </Typography>
                </Box>
              )}
            </Box>
            <IconArrowRight />
          </Box>
        )}

        <IconVector />

        {/* CHILD 2 */}
        {visibleResources[1] && (
          <Box
            key={visibleResources[1].name}
            className={
              ResourcesHomeStyles["Box-ResourcesHome-child2-childrens"]
            }
          >
            <Box
              className={
                ResourcesHomeStyles["Box-ResourcesHome-childrens-child"]
              }
            >
              <Typography
                className={`${styles["Title-semibold"]} ${poppins.className}`}
              >
                {visibleResources[1].name}
              </Typography>
              {visibleResources[1].new && (
                <Box className={ResourcesHomeStyles["child-box-new"]}>
                  <Typography
                    className={`${styles["Caption-Medium"]} ${poppins.className}`}
                  >
                    New
                  </Typography>
                </Box>
              )}
            </Box>
            <IconArrowRight />
          </Box>
        )}

        <IconVector />

        {/* CHILD 3 */}
        {visibleResources[2] && (
          <Box
            key={visibleResources[2].name}
            className={
              ResourcesHomeStyles["Box-ResourcesHome-child2-childrens"]
            }
          >
            <Box
              className={
                ResourcesHomeStyles["Box-ResourcesHome-childrens-child"]
              }
            >
              <Typography
                className={`${styles["Title-semibold"]} ${poppins.className}`}
              >
                {visibleResources[2].name}
              </Typography>
              {visibleResources[2].new && (
                <Box className={ResourcesHomeStyles["child-box-new"]}>
                  <Typography
                    className={`${styles["Caption-Medium"]} ${poppins.className}`}
                  >
                    New
                  </Typography>
                </Box>
              )}
            </Box>
            <IconArrowRight />
          </Box>
        )}

        <IconVector />

        {/* CHILD 4 */}
        {visibleResources[3] && (
          <Box
            key={visibleResources[3].name}
            className={
              ResourcesHomeStyles["Box-ResourcesHome-child2-childrens"]
            }
          >
            <Box
              className={
                ResourcesHomeStyles["Box-ResourcesHome-childrens-child"]
              }
            >
              <Typography
                className={`${styles["Title-semibold"]} ${poppins.className}`}
              >
                {visibleResources[3].name}
              </Typography>
              {visibleResources[3].new && (
                <Box className={ResourcesHomeStyles["child-box-new"]}>
                  <Typography
                    className={`${styles["Caption-Medium"]} ${poppins.className}`}
                  >
                    New
                  </Typography>
                </Box>
              )}
            </Box>
            <IconArrowRight />
          </Box>
        )}
      </Box>
    </Box>
  );
}
