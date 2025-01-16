import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { RootState } from "@/app/store/store";
import {
  toggleFeatureOne,
  toggleFeatureTwo,
} from "@/app/store/clientify/clientifySlice";

import EducatiumDrawerStyles from "./EducatiumDrawer.module.scss";
import styles from "../../../../../styles/home.module.css";
import { poppins } from "../../../../../fonts/fonts";
import OpenEducatium from "@/app/icons/OpenEducatium";
import IconArrowTop from "@/app/icons/IconArrowTop";
import VectorIconTransaction from "@/app/icons/VectorIconTransaction";

export const EducatiumDrawer = () => {
  const dispatch = useDispatch();

  const { blocks } = useSelector(
    (state: RootState) => state.clienty.infoBlocks
  );

  const { blocksTransaction } = useSelector(
    (state: RootState) => state.clienty.transactionBlocks
  );

  const { featureOne, featureTwo } = useSelector(
    (state: RootState) => state.clienty.featureButtons
  );

  return (
    <Box
      className={EducatiumDrawerStyles["Box-EducationDrawer-father"]}
      role="presentation"
    >
      {/* Primera sección: Botones de navegación */}
      <Box className={EducatiumDrawerStyles["box-children1-info"]}>
        <Box className={EducatiumDrawerStyles["box-content-buttons"]}>
          <Button
            className={EducatiumDrawerStyles["Buttons-children-one"]}
            onClick={() => dispatch(toggleFeatureOne())}
          >
            Información
          </Button>
        </Box>
        <Box className={EducatiumDrawerStyles["box-content-buttons"]}>
          <Button
            className={EducatiumDrawerStyles["Buttons-children-one"]}
            onClick={() => dispatch(toggleFeatureTwo())}
          >
            Transacciones
          </Button>
        </Box>
      </Box>

      {/* Segunda sección: Contenido dinámico */}
      {featureOne && (
        <Box className={EducatiumDrawerStyles["box-data-info"]}>
          {blocks.map((block, blockIndex) => (
            <Box
              key={blockIndex}
              className={EducatiumDrawerStyles["box-data-info-childrens"]}
            >
              <React.Fragment>
                {/* Sección del título */}
                <Box className={EducatiumDrawerStyles["box-title-info"]}>
                  <Typography
                    className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
                  >
                    {block.title}
                  </Typography>
                  <Box className={EducatiumDrawerStyles["box-content-icon"]}>
                    <IconArrowTop />
                  </Box>
                </Box>

                {/* Sección del contenido */}
                <Box className={EducatiumDrawerStyles["box-content-info"]}>
                  {block.content.map((item, itemIndex) => (
                    <Box
                      key={itemIndex}
                      className={
                        EducatiumDrawerStyles["box-content-info-children"]
                      }
                    >
                      <Box className={EducatiumDrawerStyles["info-box"]}>
                        <Box
                          className={EducatiumDrawerStyles["info-box-children"]}
                        >
                          {/* Label */}
                          <Typography
                            className={`${styles["Body-Semibold"]} ${poppins.className}`}
                          >
                            {item.label}
                          </Typography>
                          {/* Value */}
                          <Typography
                            className={`${styles["Body-medium"]} ${poppins.className}`}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </React.Fragment>
            </Box>
          ))}
        </Box>
      )}

      {/* Seccion Transacciones */}

      {featureTwo && (
        <Box className={EducatiumDrawerStyles["box-data-transaction"]}>
          {blocksTransaction.map((block, blockIndex) => (
            <React.Fragment key={blockIndex}>
              {block.content.map((item, itemIndex) => (
                <>
                  <Box
                    key={itemIndex}
                    className={
                      EducatiumDrawerStyles["box-data-transaction-childrens"]
                    }
                  >
                    {/* 1ra fila: amount y el ícono */}
                    <Box
                      className={
                        EducatiumDrawerStyles["box-data-transaction-content"]
                      }
                    >
                      <Typography
                        className={`${styles["SubHeader-Medium-Semibold"]} ${poppins.className}`}
                      >
                        {item.amount}
                      </Typography>
                      <OpenEducatium /> {/* Ícono */}
                    </Box>

                    {/* 2da fila: Fecha y valor */}
                    <Box
                      className={
                        EducatiumDrawerStyles["box-data-transaction-content"]
                      }
                    >
                      <Typography
                        className={`${styles["Body-regular-3"]} ${poppins.className}`}
                      >
                        Fecha
                      </Typography>
                      <Typography
                        className={`${styles["Body-regular"]} ${poppins.className}`}
                      >
                        {item.date}
                      </Typography>
                    </Box>

                    {/* 3ra fila: Tipo y valor */}
                    <Box
                      className={
                        EducatiumDrawerStyles["box-data-transaction-content"]
                      }
                    >
                      <Typography
                        className={`${styles["Body-regular-3"]} ${poppins.className}`}
                      >
                        Tipo
                      </Typography>
                      <Typography
                        className={`${styles["Body-regular"]} ${poppins.className}`}
                      >
                        {item.type}
                      </Typography>
                    </Box>
                  </Box>
                  <VectorIconTransaction />
                </>
              ))}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};
