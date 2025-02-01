import React from "react";
import { Box, Typography } from "@mui/material";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

const InvoicesTableLiquidationsDrawer: React.FC = () => {
  const selectedInvoice = useSelector(
    (state: RootState) => state.invoiceTable.selectedInvoice
  );

  // Simulación de facturas relacionadas con la liquidación
  const invoices = [
    {
      codigo: "PROFORMA-18414",
      cuenta: "Jooyly",
      comision: "USD 150,00",
      producto: "1 × Business Growth (at $780.00 / year)",
    },
    {
      codigo: "PROFORMA-18414",
      cuenta: "EDUCATIUM",
      comision: "USD 150,00",
      producto: "1 × Business Growth (at $780.00 / year)",
    },
    {
      codigo: "PROFORMA-18414",
      cuenta: "INTEGRITYLEGAL",
      comision: "USD 150,00",
      producto: "1 × Business Growth (at $780.00 / year)",
    },
  ];

  if (!selectedInvoice) {
    return (
      <Box p={3} width="350px">
        <Typography variant="h6">No hay factura seleccionada</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} width="350px">
      {/* Información principal de la liquidación */}
      <Box
        display="flex"
        flexDirection="column"
        mb={3}
        p={2}
        bgcolor="#f5f5f5"
        borderRadius={2}
      >
        <Typography variant="h6">
          Código: {selectedInvoice.liquidaciones}
        </Typography>
        <Typography>Comisión: {selectedInvoice.moneda} 472,80</Typography>
        <Typography>Fecha: 22, Dic, 2023 - 5:45pm</Typography>
      </Box>

      {/* Sección de Facturas */}
      <Typography variant="h6" mb={2}>
        Facturas
      </Typography>

      {invoices.map((invoice, index) => (
        <Box key={index} p={2} mb={2} bgcolor="#f0f0f0" borderRadius={2}>
          <Typography fontWeight="bold">{invoice.codigo}</Typography>
          <Typography>Cuenta: {invoice.cuenta}</Typography>
          <Typography>Comisión: {invoice.comision}</Typography>
          <Typography>Producto: {invoice.producto}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default InvoicesTableLiquidationsDrawer;
