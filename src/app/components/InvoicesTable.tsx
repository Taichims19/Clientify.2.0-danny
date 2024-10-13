import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";

import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

const InvoicesTable = () => {
  return (
    <Card>
      <CardContent>
        <Box>
          <Typography variant="h6">Facturas</Typography>
        </Box>
        <Box mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Cuenta</TableCell>
                <TableCell>Importe</TableCell>
                <TableCell>Moneda</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>F. de creación</TableCell>
                <TableCell>F. de pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>PROFORMA-15301</TableCell>
                <TableCell>Joogly</TableCell>
                <TableCell>768.00</TableCell>
                <TableCell>USD</TableCell>
                <TableCell>1x Business Growth</TableCell>
                <TableCell>Oct. 17, 2023</TableCell>
                <TableCell>--</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PROFORMA-15302</TableCell>
                <TableCell>Joogly</TableCell>
                <TableCell>768.00</TableCell>
                <TableCell>USD</TableCell>
                <TableCell>1x Business Growth</TableCell>
                <TableCell>Oct. 17, 2023</TableCell>
                <TableCell>--</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InvoicesTable;
