"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  ListItem,
  List,
  Skeleton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import ResourcesHomeDrawerStyles from "./ResourcesHomeDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import ArrowBottomResources from "@/app/icons/ArrowBottomResources";
import ArrowTopResources from "@/app/icons/ArrowTopResources";
import VectorIconTransaction from "@/app/icons/VectorIconTransaction";
import ArrowRightResources from "@/app/icons/ArrowRightResources";

function ResourcesHomeDrawer() {
  const [loading, setLoading] = useState(false);
  const { plans, totalPlans } = useSelector(
    (state: RootState) => state.clienty
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const renderLoading = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: "100%", height: "80px" }}
        />

        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: "100%", height: "80px" }}
        />

        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: "100%", height: "80px" }}
        />
      </Box>
    );
  };

  const renderResourcesHome = () => {
    return (
      <Box
        className={ResourcesHomeDrawerStyles["Box-ResourcesHomeDrawer-father"]}
        role="presentation"
      >
        {/* Seccion Uno */}
        <Box
          className={ResourcesHomeDrawerStyles["ResourcesHomeDrawer-childrens"]}
        >
          <Box
            className={
              ResourcesHomeDrawerStyles["ResourcesHome-childrenBoxOne"]
            }
          >
            <Typography
              className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
            >
              ¿Qué hay de nuevo?
            </Typography>
            <Box className={ResourcesHomeDrawerStyles["box-icon-arrow-botton"]}>
              <ArrowBottomResources />
            </Box>
          </Box>
        </Box>

        {/* Seccion Dos */}
        <Box
          className={ResourcesHomeDrawerStyles["ResourcesHomeDrawer-childrens"]}
        >
          <Box
            className={
              ResourcesHomeDrawerStyles["ResourcesHome-childrenBoxTwo1"]
            }
          >
            <Typography
              className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
            >
              Inf. y enlaces de interés
            </Typography>

            <Box className={ResourcesHomeDrawerStyles["box-icon-arrow-top"]}>
              <ArrowTopResources />
            </Box>
          </Box>

          <Box
            className={
              ResourcesHomeDrawerStyles["ResourcesHome-childrenBoxTwo2"]
            }
          >
            <Box className={ResourcesHomeDrawerStyles["box-resources-info"]}>
              <Box
                className={
                  ResourcesHomeDrawerStyles["box-resources-info-children"]
                }
              >
                <Box
                  className={
                    ResourcesHomeDrawerStyles["box-resources-info-grandson"]
                  }
                >
                  <Box
                    className={
                      ResourcesHomeDrawerStyles[
                        "box-resources-info-grandson-child1"
                      ]
                    }
                  >
                    <Typography
                      className={`${styles["Title-semibold2"]} ${poppins.className}`}
                    >
                      Actualización (mejoras)
                    </Typography>
                  </Box>
                  <ArrowRightResources />
                </Box>

                <VectorIconTransaction />

                <Box
                  className={
                    ResourcesHomeDrawerStyles["box-resources-info-grandson"]
                  }
                >
                  <Box
                    className={
                      ResourcesHomeDrawerStyles[
                        "box-resources-info-grandson-child1"
                      ]
                    }
                  >
                    <Typography
                      className={`${styles["Title-semibold2"]} ${poppins.className}`}
                    >
                      Programa de afiliados
                    </Typography>
                  </Box>
                  <ArrowRightResources />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Seccion Tres */}
        <Box
          className={ResourcesHomeDrawerStyles["ResourcesHomeDrawer-childrens"]}
        >
          <Box
            className={
              ResourcesHomeDrawerStyles["ResourcesHome-childrenBoxThree1"]
            }
          >
            <Typography
              className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
            >
              ¿Quién es quién en el equipo?
            </Typography>
            <Box className={ResourcesHomeDrawerStyles["box-icon-arrow-top"]}>
              <ArrowTopResources />
            </Box>
          </Box>

          <Box
            className={
              ResourcesHomeDrawerStyles["ResourcesHome-childrenBoxThree2"]
            }
          >
            <Box
              className={ResourcesHomeDrawerStyles["box-resources-question"]}
            >
              <Box
                className={
                  ResourcesHomeDrawerStyles["box-resources-question-children1"]
                }
              >
                <Box
                  className={
                    ResourcesHomeDrawerStyles[
                      "box-resources-question-grandson1"
                    ]
                  }
                >
                  <Box
                    className={
                      ResourcesHomeDrawerStyles[
                        "box-resources-question-typography"
                      ]
                    }
                  >
                    <Typography
                      className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
                    >
                      ¿Quién es quién?
                    </Typography>
                  </Box>
                  <ArrowRightResources />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return <>{loading ? renderLoading() : renderResourcesHome()}</>;
}

export default ResourcesHomeDrawer;
