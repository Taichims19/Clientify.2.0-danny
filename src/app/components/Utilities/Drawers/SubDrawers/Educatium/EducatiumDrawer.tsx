import { Box, Button, Typography } from "@mui/material";
import React from "react";
import EducatiumDrawerStyles from "./EducatiumDrawer.module.scss";
import styles from "../../../../../styles/home.module.css";
import { poppins } from "../../../../../fonts/fonts";
import AntSwitches from "../../../Switches/AntSwitch/AntSwitches";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export const EducatiumDrawer = () => {
  const { blocks } = useSelector(
    (state: RootState) => state.clienty.infoBlocks
  );

  return (
    <Box
      className={EducatiumDrawerStyles["Box-EducationDrawer-father"]}
      role="presentation"
    >
      <Box className={EducatiumDrawerStyles["box-children1-info"]}>
        {/* <Typography
          component="span"
          className={`${styles["H1-bold"]} ${poppins.className}`}
        >
          Patatas
        </Typography> */}
        <Button className={EducatiumDrawerStyles["Buttons-children-one"]}>
          Información
        </Button>
        <Button className={EducatiumDrawerStyles["Buttons-children-one"]}>
          Transacciones
        </Button>
      </Box>

      <Box className={EducatiumDrawerStyles["box-children1-info"]}>
        <Box className={EducatiumDrawerStyles["box-data-info-childrens"]}>
          {/* Seccion del Box del titulo */}
          <Box className={EducatiumDrawerStyles["box-title-info"]}>
            <Typography>Info de InfoBlockTitle //</Typography>
          </Box>

          {/* Seccion del Box del contenido */}
          {/* nivel 1 */}
          <Box className={EducatiumDrawerStyles["box-content-info"]}>
            {/* nivel 2 */}
            <Box className={EducatiumDrawerStyles["box-content-info-children"]}>
              {/* nivel 3 */}
              <Box className={EducatiumDrawerStyles["info-box"]}>
                {/* nivel 4 */}
                <Box className={EducatiumDrawerStyles["info-box-children"]}>
                  {/* Label  */}
                  <Typography>Contenido label</Typography>
                  {/* value  */}
                  <Typography>Contenido value</Typography>
                </Box>
              </Box>
              I
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
