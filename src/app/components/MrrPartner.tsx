import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

export default function MRRPartner() {
  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          MRR Partner
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
          mb={1}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            108
          </Typography>
          <Typography variant="body2" sx={{ color: "#999" }}>
            Bronce
          </Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="body2" sx={{ color: "#999" }}>
            Bronce +100
          </Typography>
          <Typography variant="body2" sx={{ color: "#999" }}>
            Plata +500
          </Typography>
          <Typography variant="body2" sx={{ color: "#999" }}>
            Oro +1000
          </Typography>
          <Typography variant="body2" sx={{ color: "#999" }}>
            Diamante +2000
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
