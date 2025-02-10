import React from "react";
import { Box, Typography } from "@mui/material";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import InvoicesTableLiquidationsDrawerStyles from "./InvoicesTableLiquidationsDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";

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
    <Box
      className={
        InvoicesTableLiquidationsDrawerStyles["Box-InvoicesTableDrawer-father"]
      }
      role="presentation"
    >
      {/* Información principal de la liquidación */}
      <Box
        className={InvoicesTableLiquidationsDrawerStyles["Box-header-drawer"]}
      >
        <Box
          className={
            InvoicesTableLiquidationsDrawerStyles[
              "Box-header-drawer-children-one"
            ]
          }
        >
          <Typography
            className={`${styles["Body-regular-3"]} ${poppins.className}`}
          >
            Código
          </Typography>
          <Typography
            className={`${styles["Body-regular"]} ${poppins.className}`}
          >
            {selectedInvoice.liquidaciones}
          </Typography>
        </Box>

        {/* BOX Two */}
        <Box
          className={
            InvoicesTableLiquidationsDrawerStyles[
              "Box-header-drawer-children-two"
            ]
          }
        >
          <Typography
            className={`${styles["Body-regular-3"]} ${poppins.className}`}
          >
            Comisión
          </Typography>
          <Typography
            className={`${styles["Body-regular"]} ${poppins.className}`}
          >
            {selectedInvoice.moneda} 472,80
          </Typography>
        </Box>
        {/* BOX Three */}
        <Box
          className={
            InvoicesTableLiquidationsDrawerStyles[
              "Box-header-drawer-children-two"
            ]
          }
        >
          <Typography
            className={`${styles["Body-regular-3"]} ${poppins.className}`}
          >
            Fecha
          </Typography>
          <Typography
            className={`${styles["Body-regular"]} ${poppins.className}`}
          >
            22, Dic, 2023 - 5:45pm
          </Typography>
        </Box>
      </Box>

      <Box
        className={InvoicesTableLiquidationsDrawerStyles["Box-content-drawer"]}
      >
        {/* Sección de Facturas */}
        <Typography
          className={`${styles["Caption-semibold"]} ${poppins.className}`}
        >
          Facturas
        </Typography>

        {invoices.map((invoice, index) => (
          <Box
            key={index}
            className={
              InvoicesTableLiquidationsDrawerStyles[
                "Box-content-drawer-childrens"
              ]
            }
          >
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              {invoice.codigo}
            </Typography>
            <Box
              className={
                InvoicesTableLiquidationsDrawerStyles["box-childrens-content"]
              }
            >
              <Box
                className={
                  InvoicesTableLiquidationsDrawerStyles[
                    "box-childrens-content-son-one"
                  ]
                }
              >
                <Typography
                  className={`${styles["Body-regular-3"]} ${poppins.className}`}
                >
                  Cuenta
                </Typography>
                <Typography
                  className={`${styles["Body-regular"]} ${poppins.className}`}
                >
                  {invoice.cuenta}
                </Typography>
              </Box>
              <Box
                className={
                  InvoicesTableLiquidationsDrawerStyles[
                    "box-childrens-content-son-two"
                  ]
                }
              >
                <Typography
                  className={`${styles["Body-regular-3"]} ${poppins.className}`}
                >
                  Comisión
                </Typography>
                <Typography
                  className={`${styles["Body-regular"]} ${poppins.className}`}
                >
                  {invoice.comision}
                </Typography>
              </Box>
              <Box
                className={
                  InvoicesTableLiquidationsDrawerStyles[
                    "box-childrens-content-son-three"
                  ]
                }
              >
                <Typography
                  className={`${styles["Body-regular-3"]} ${poppins.className}`}
                >
                  Producto
                </Typography>
                <Typography
                  className={`${styles["Body-regular"]} ${poppins.className}`}
                >
                  {invoice.producto}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InvoicesTableLiquidationsDrawer;
