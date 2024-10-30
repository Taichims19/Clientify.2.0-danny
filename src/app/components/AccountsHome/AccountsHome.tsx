import { Card, CardContent, Typography, Box } from "@mui/material";

export default function AccountsHome() {
  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Cuentas
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#2196f3", cursor: "pointer" }}
          >
            Ver todo
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
          03
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          EDUCATIUM
        </Typography>
        <Typography variant="body2">INTEGRITYLEGAL</Typography>
      </CardContent>
    </Card>
  );
}
