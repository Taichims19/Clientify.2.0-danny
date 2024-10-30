import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import styles from "../../styles/home.module.css";
import subscriptionStyles from "./subscriptionPanel.module.scss";
import { poppins } from "../../fonts/fonts";
const SubscriptionPanel = () => {
  return (
    <Box className={subscriptionStyles["Subscription-plans"]}>
      {/* hijo 1 */}
      <Box className={subscriptionStyles["Subscription-plans-boxes"]}>
        <Box
          sx={{
            display: "flex",
            height: "19px",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <Typography
            className={`${styles["Title-regular"]} ${poppins.className}`}
          >
            Planes de suscripción{" "}
          </Typography>

          {/* <Button
            href="#text-buttons"
            sx={{
              display: "flex",

              height: "27px",
              justifyContent: "flex-start",
              alignItems: "center",
              background:
                "var(--button-ghost-frame-disable, rgba(255, 255, 255, 0.00))",
            }}
          > */}
          <Typography
            className={`${styles["Title-medium-blue2"]} ${poppins.className}`}
          >
            Ver todo
          </Typography>
          {/* </Button> */}
        </Box>
        <Typography
          className={`${styles["H1-bold"]} ${poppins.className}`}
          sx={{ width: "auto", height: "53px" }}
        >
          05
        </Typography>
      </Box>
      {/* hijo 2 */}
      <Box
        className={subscriptionStyles["Subscription-plans-boxes"]}
        sx={{
          // backgroundColor: "red",
          height: "89px",
          justifyContent: "space-between",
        }}
      >
        <Box
          className={subscriptionStyles["Subscription-plans-boxes-children1"]}
        >
          <Typography
            className={`${styles["Title-semibold"]} ${poppins.className}`}
          >
            Business Growth
          </Typography>
          <Typography
            className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
          >
            01
          </Typography>
        </Box>
        <Box
          className={subscriptionStyles["Subscription-plans-boxes-children1"]}
        >
          <Typography
            className={`${styles["Title-semibold"]} ${poppins.className}`}
          >
            Demo
          </Typography>
          <Typography
            className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
          >
            01
          </Typography>
        </Box>
        <Box
          className={subscriptionStyles["Subscription-plans-boxes-children1"]}
        >
          <Typography
            className={`${styles["Title-semibold"]} ${poppins.className}`}
          >
            Enterprise 10K Inbox
          </Typography>
          <Typography
            className={`${styles["Title-medium-grey1"]} ${poppins.className}`}
          >
            02
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionPanel;
