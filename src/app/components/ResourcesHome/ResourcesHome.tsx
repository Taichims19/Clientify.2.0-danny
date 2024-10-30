import { Card, CardContent, Typography, Box } from "@mui/material";

export default function ResourcesHome() {
  return (
    <Card sx={{ boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Recursos
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#2196f3", cursor: "pointer" }}
          >
            Ver todo
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
          13
        </Typography>
        <Box display="flex" flexDirection="column" mt={2}>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "#2196f3" }}
          >
            Actualización (mejoras){" "}
            <span style={{ color: "#2196f3" }}>Nuevo</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "#2196f3" }}
          >
            Centro del conocimiento (ay...){" "}
            <span style={{ color: "#2196f3" }}>Nuevo</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "#2196f3" }}
          >
            Programa de afiliados{" "}
            <span style={{ color: "#2196f3" }}>Nuevo</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "#2196f3" }}
          >
            Contrato Partner <span style={{ color: "#2196f3" }}>Nuevo</span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
