import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import styles from "../home.module.css";
import { poppins } from "../fonts/fonts";

const SubscriptionPanel = () => {
  return (
    <Card className={styles["father-panels-suscriptions"]}>
      <CardContent className={styles["Subscription-plans"]}>
        <Box className={styles["Subscription-plans-boxes"]}>
          <Box
            sx={{
              display: "flex",
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

            <Button
              href="#text-buttons"
              sx={{
                display: "flex",
                width: "135px",
                height: "27px",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "var(--button-ghost-frame-disable, rgba(255, 255, 255, 0.00))",
              }}
            >
              <Typography
                className={`${styles["Title-medium-blue2"]} ${poppins.className}`}
              >
                Ver todo
              </Typography>
            </Button>
          </Box>
          <Typography className={`${styles["H1-bold"]} ${poppins.className}`}>
            05
          </Typography>
        </Box>
        <Box className={styles["Subscription-plans-boxes"]}>
          <Box className={styles["Subscription-plans-boxes-children1"]}>
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
          <Box className={styles["Subscription-plans-boxes-children1"]}>
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
          <Box className={styles["Subscription-plans-boxes-children1"]}>
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
      </CardContent>
    </Card>
  );
};

export default SubscriptionPanel;
