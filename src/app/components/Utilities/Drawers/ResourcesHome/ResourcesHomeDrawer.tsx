"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";

import ResourcesHomeDrawerStyles from "./ResourcesHomeDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import ArrowBottomResources from "@/app/icons/ArrowBottomResources";
import ArrowTopResources from "@/app/icons/ArrowTopResources";
import VectorIconTransaction from "@/app/icons/VectorIconTransaction";
import ArrowRightResources from "@/app/icons/ArrowRightResources";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Padding } from "@mui/icons-material";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

function ResourcesHomeDrawer() {
  const [loading, setLoading] = useState(false);
  // const { plans, totalPlans } = useSelector(
  //   (state: RootState) => state.clienty
  // );
  const [expanded, setExpanded] = useState<string | false>(false); // Controla qué acordeón está abierto

  const { sections } = useSelector(
    (state: RootState) => state.clienty.resourcesDrawer
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
        {/* Cajón 1 */}
        <Accordion
          className={
            ResourcesHomeDrawerStyles["ResourcesHomeDrawer-childrens2"]
          }
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{
            "& .MuiAccordionSummary-root.Mui-expanded": {
              width: "100%",
              height: "38px",
              minHeight: "38px",
              paddingTop: "16px",
              marginBottom: "0px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box className={ResourcesHomeDrawerStyles["Accordion-box-Header"]}>
              <Typography
                className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
              >
                {sections[0].title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            className={ResourcesHomeDrawerStyles["Accordion-box-content"]}
          >
            {sections[0].items.map((item, index) => (
              <React.Fragment key={item.name}>
                <Box
                  className={
                    ResourcesHomeDrawerStyles["Accordion-box-content-childrens"]
                  }
                >
                  <Box
                    className={
                      ResourcesHomeDrawerStyles["Accordion-box-content-inner"]
                    }
                  >
                    <Typography
                      className={`${styles["Title-semibold2"]} ${poppins.className}`}
                    >
                      {item.name}
                    </Typography>
                    {item.new && (
                      <Box
                        className={ResourcesHomeDrawerStyles["child-box-new"]}
                      >
                        <Typography
                          className={`${styles["Caption-Medium"]} ${poppins.className}`}
                        >
                          New
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <ArrowRightResources />
                </Box>
                {index < sections[0].items.length - 1 && (
                  <VectorIconTransaction />
                )}
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Cajón 2 */}
        <Accordion
          defaultExpanded
          className={
            ResourcesHomeDrawerStyles["ResourcesHomeDrawer-childrens2"]
          }
          sx={{
            "& .MuiAccordionSummary-root.Mui-expanded": {
              width: "100%",
              height: "38px",
              minHeight: "38px",
              paddingTop: "16px",
              marginBottom: "0px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography
              className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
            >
              {sections[1].title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            className={ResourcesHomeDrawerStyles["Accordion-box-content"]}
          >
            {sections[1].items.map((item, index) => (
              <React.Fragment key={item.name}>
                <Box
                  className={
                    ResourcesHomeDrawerStyles["Accordion-box-content-childrens"]
                  }
                >
                  <Box
                    className={
                      ResourcesHomeDrawerStyles["Accordion-box-content-inner"]
                    }
                  >
                    <Typography
                      className={`${styles["Title-semibold2"]} ${poppins.className}`}
                    >
                      {item.name}
                    </Typography>
                    {item.new && (
                      <Box
                        className={ResourcesHomeDrawerStyles["child-box-new"]}
                      >
                        <Typography
                          className={`${styles["Caption-Medium"]} ${poppins.className}`}
                        >
                          New
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <ArrowRightResources />
                </Box>
                {index < sections[1].items.length - 1 && (
                  <VectorIconTransaction />
                )}
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Cajón 3 */}
        <Accordion
          // defaultExpanded
          className={
            ResourcesHomeDrawerStyles["ResourcesHomeDrawer-childrens2"]
          }
          sx={{
            "& .MuiAccordionSummary-root.Mui-expanded": {
              width: "100%",
              height: "38px",
              minHeight: "38px",
              paddingTop: "16px",
              marginBottom: "0px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography
              className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
            >
              {sections[2].title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            className={ResourcesHomeDrawerStyles["Accordion-box-content"]}
          >
            {sections[2].items.map((item, index) => (
              <React.Fragment key={item.name}>
                <Box
                  className={
                    ResourcesHomeDrawerStyles["Accordion-box-content-childrens"]
                  }
                >
                  <Box
                    className={
                      ResourcesHomeDrawerStyles["Accordion-box-content-inner"]
                    }
                  >
                    <Typography
                      className={`${styles["Title-semibold2"]} ${poppins.className}`}
                    >
                      {item.name}
                    </Typography>
                    {item.new && (
                      <Box
                        className={ResourcesHomeDrawerStyles["child-box-new"]}
                      >
                        <Typography
                          className={`${styles["Caption-Medium"]} ${poppins.className}`}
                        >
                          New
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <ArrowRightResources />
                </Box>
                {index < sections[2].items.length - 1 && (
                  <VectorIconTransaction />
                )}
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };
  return <>{loading ? renderLoading() : renderResourcesHome()}</>;
}

export default ResourcesHomeDrawer;
