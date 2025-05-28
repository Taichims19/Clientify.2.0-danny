"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import ResourcesHomeDrawerStyles from "./ResourcesHomeDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import VectorIconTransaction from "@/app/icons/VectorIconTransaction";
import ArrowRightResources from "@/app/icons/ArrowRightResources";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AppDispatch, RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchResourcesDrawerByPartner } from "@/app/store/clientify/clientifyThunks";

function ResourcesHomeDrawer() {
  const dispatch = useDispatch<AppDispatch>();
  const partnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );

  const loading = useSelector(
    (state: RootState) => state.clienty.resourcesDrawer.resourcesLoading
  );
  const hasFetchedResources = useSelector(
    (state: RootState) => state.clienty.resourcesDrawer.hasFetchedResources
  );
  const { sections } = useSelector(
    (state: RootState) => state.clienty.resourcesDrawer
  );

  const [expanded, setExpanded] = useState<string | false>("panel1");

  useEffect(() => {
    let cleanupFunction: (() => void) | undefined;

    if (partnerId && !hasFetchedResources) {
      // Despachamos el thunk y obtenemos la función de limpieza
      dispatch(fetchResourcesDrawerByPartner(partnerId.toString())).then(
        (cleanup) => {
          cleanupFunction = cleanup;
        }
      );
    }

    // Devolvemos la función de limpieza
    return () => {
      if (cleanupFunction) {
        cleanupFunction();
      }
    };
  }, [dispatch, partnerId, hasFetchedResources]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderLoading = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      {[1, 2, 3].map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          sx={{ fontSize: "1rem", width: "100%", height: "80px" }}
        />
      ))}
    </Box>
  );

  const renderResourcesHome = () => (
    <Box
      className={ResourcesHomeDrawerStyles["Box-ResourcesHomeDrawer-father"]}
      role="presentation"
    >
      {sections.map((section, index) => (
        <Accordion
          key={section.id}
          className={
            ResourcesHomeDrawerStyles["ResourcesHomeDrawer-childrens2"]
          }
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          defaultExpanded={index === 1}
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
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography
              className={`${styles["SubHeader-Medium"]} ${poppins.className}`}
            >
              {section.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            className={ResourcesHomeDrawerStyles["Accordion-box-content"]}
          >
            {section.items.map((item, i) => (
              <React.Fragment key={item.id}>
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
                  <Box
                    onClick={() =>
                      window.open(item.url, "_blank", "noopener,noreferrer")
                    }
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowRightResources />
                  </Box>
                </Box>
                {i < section.items.length - 1 && <VectorIconTransaction />}
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  return <>{loading ? renderLoading() : renderResourcesHome()}</>;
}

export default ResourcesHomeDrawer;
