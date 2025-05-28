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
import { AppDispatch, RootState } from "@/app/store/store";
import AnchorTemporaryDrawerStyles from "./PlanSuscription.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import IconRightArrow from "@/app/icons/IconRightArrow";
import AntSwitches from "../../Switches/AntSwitch/AntSwitches";
import IconVectorClear from "@/app/icons/IconVectorClear";
import { toggleMessage } from "@/app/store/clientify/clientifySlice";
import { fetchActiveSubscriptionPlans } from "@/app/store/clientify/clientifyThunks";

function PlanSuscriptionDrawer() {
  const [loading, setLoading] = useState(false);
  const { plans: basePlans, totalPlans: totalBase } = useSelector(
    (state: RootState) => state.clienty.subscriptionPlans
  );
  const { plans: activePlans, totalPlans: totalActive } = useSelector(
    (state: RootState) => state.clienty.activePlans
  );
  const partnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );

  const dispatch = useDispatch<AppDispatch>();

  const showMessage = useSelector(
    (state: RootState) => state.clienty.message.showMessage
  );

  const isDrawerOpen = useSelector(
    (state: RootState) => state.clienty.drawer.isDrawerOpen
  );

  // 🔁 Cada vez que el drawer se cierre, resetear el switch a base
  useEffect(() => {
    if (!isDrawerOpen && showMessage) {
      dispatch(toggleMessage());
    }
  }, [isDrawerOpen, showMessage, dispatch]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Lógica del switch
  const handleSwitchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;

    dispatch(toggleMessage());

    if (partnerId) {
      dispatch(fetchActiveSubscriptionPlans(partnerId.toString(), checked));
    }
  };

  // Decide qué data mostrar
  const plansToRender = showMessage ? activePlans : basePlans;
  const totalToRender = showMessage ? totalActive : totalBase;

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

  // const renderPlanSuscription = () => {
  //   return (
  //     <Box
  //       className={
  //         AnchorTemporaryDrawerStyles["Box-AnchorTemporaryDrawer-father"]
  //       }
  //       role="presentation"
  //     >
  //       <Box className={AnchorTemporaryDrawerStyles["box-total-plans"]}>
  //         <Typography
  //           component="span"
  //           className={`${styles["H1-bold"]} ${poppins.className}`}
  //         >
  //           {totalPlans.toString().padStart(2, "0")}
  //         </Typography>
  //         <Box
  //           className={AnchorTemporaryDrawerStyles["box-children-filter-pay"]}
  //         >
  //           <Typography
  //             className={`${styles["Body-regular"]} ${poppins.className}`}
  //           >
  //             Filtrar por pagos
  //           </Typography>
  //           <Box
  //             className={
  //               AnchorTemporaryDrawerStyles["box-children-father-icon-switch"]
  //             }
  //           >
  //             <Box
  //               className={AnchorTemporaryDrawerStyles["box-icon-children1"]}
  //             >
  //               <Box
  //                 className={
  //                   AnchorTemporaryDrawerStyles["box-children1-grandson1"]
  //                 }
  //               >
  //                 <Box
  //                   className={
  //                     AnchorTemporaryDrawerStyles["grandson1-children4"]
  //                   }
  //                 >
  //                   <AntSwitches
  //                     checked={showMessage} // Conecta el estado de Redux
  //                     onChange={handleSwitchChange} // Maneja el cambio
  //                   />
  //                 </Box>
  //               </Box>
  //             </Box>
  //           </Box>
  //         </Box>
  //       </Box>

  //       <List className={AnchorTemporaryDrawerStyles["box-list-plans"]}>
  //         {plans.map((plan) => (
  //           <React.Fragment key={plan.name}>
  //             <ListItem
  //               sx={{
  //                 padding: "0px",
  //                 position: "relative",
  //               }}
  //               className={
  //                 AnchorTemporaryDrawerStyles["box-list-plans-childrens"]
  //               }
  //             >
  //               <Typography
  //                 className={`${styles["Title-semibold"]} ${poppins.className}`}
  //               >
  //                 {plan.name}
  //               </Typography>
  //               <Typography
  //                 component="span"
  //                 className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
  //               >
  //                 {plan.count.toString().padStart(2, "0")}
  //               </Typography>
  //               {plan.isFree && (
  //                 <Box
  //                   sx={{
  //                     position: "absolute",
  //                     top: "50%",
  //                     left: "50px",
  //                     transform: "translateY(-50%)",
  //                     backgroundColor: "#0067EE",
  //                     color: "#FFF",
  //                     padding: "2px 6px",
  //                     borderRadius: "2px",
  //                     fontSize: "10px",
  //                     fontWeight: "bold",
  //                   }}
  //                 >
  //                   <Typography
  //                     className={`${styles["Caption-Medium"]} ${poppins.className}`}
  //                   >
  //                     Free
  //                   </Typography>
  //                 </Box>
  //               )}
  //             </ListItem>
  //             <IconVectorClear style={{ width: "100%", height: "2px" }} />
  //           </React.Fragment>
  //         ))}
  //       </List>
  //     </Box>
  //   );
  // };

  const renderPlanSuscription = () => {
    return (
      <Box
        className={
          AnchorTemporaryDrawerStyles["Box-AnchorTemporaryDrawer-father"]
        }
        role="presentation"
      >
        <Box className={AnchorTemporaryDrawerStyles["box-total-plans"]}>
          <Typography
            component="span"
            className={`${styles["H1-bold"]} ${poppins.className}`}
          >
            {totalToRender.toString().padStart(2, "0")}
          </Typography>
          <Box
            className={AnchorTemporaryDrawerStyles["box-children-filter-pay"]}
          >
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Filtrar por pagos
            </Typography>
            <Box
              className={
                AnchorTemporaryDrawerStyles["box-children-father-icon-switch"]
              }
            >
              <Box
                className={AnchorTemporaryDrawerStyles["box-icon-children1"]}
              >
                <Box
                  className={
                    AnchorTemporaryDrawerStyles["box-children1-grandson1"]
                  }
                >
                  <Box
                    className={
                      AnchorTemporaryDrawerStyles["grandson1-children4"]
                    }
                  >
                    <AntSwitches
                      checked={showMessage}
                      onChange={handleSwitchChange}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <List className={AnchorTemporaryDrawerStyles["box-list-plans"]}>
          {plansToRender.map((plan) => (
            <React.Fragment key={plan.name}>
              <ListItem
                sx={{
                  padding: "0px",
                  position: "relative",
                }}
                className={
                  AnchorTemporaryDrawerStyles["box-list-plans-childrens"]
                }
              >
                <Typography
                  className={`${styles["Title-semibold"]} ${poppins.className}`}
                >
                  {plan.name}
                </Typography>
                <Typography
                  component="span"
                  className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
                >
                  {plan.value?.toString().padStart(2, "0") ||
                    plan.count?.toString().padStart(2, "0")}
                </Typography>
                {plan.isFree && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50px",
                      transform: "translateY(-50%)",
                      backgroundColor: "#0067EE",
                      color: "#FFF",
                      padding: "2px 6px",
                      borderRadius: "2px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    <Typography
                      className={`${styles["Caption-Medium"]} ${poppins.className}`}
                    >
                      Free
                    </Typography>
                  </Box>
                )}
              </ListItem>
              <IconVectorClear style={{ width: "100%", height: "2px" }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
  };

  return <>{loading ? renderLoading() : renderPlanSuscription()}</>;
}

export default PlanSuscriptionDrawer;
