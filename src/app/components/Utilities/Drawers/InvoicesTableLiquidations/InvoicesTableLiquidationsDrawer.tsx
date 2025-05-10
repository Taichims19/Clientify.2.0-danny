import React from "react";
import { Box, Typography } from "@mui/material";
import { AppDispatch, RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import InvoicesTableLiquidationsDrawerStyles from "./InvoicesTableLiquidationsDrawer.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import { setSettlementDetail } from "@/app/store/clientify/invoicesTableSlice";

const InvoicesTableLiquidationsDrawer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const settlementDetail = useSelector(
    (state: RootState) => state.invoiceTable.settlementDetail
  );
  const fallbackInvoices = useSelector(
    (state: RootState) => state.invoiceTable.baseSettlementInvoices
  );

  const invoices = settlementDetail?.invoices || fallbackInvoices;
  const header = settlementDetail;

  React.useEffect(() => {
    // Limpia el detalle si el componente se desmonta
    return () => {
      dispatch(setSettlementDetail(null));
    };
  }, [dispatch]);

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
            {header ? `Liquidación #${header.id}` : "Base de prueba"}
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
            {header ? `${header.currency} ${header.amount}` : "USD 0.00"}
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
            {header
              ? new Date(header.payment_date).toLocaleString("es-ES")
              : "--"}
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
              {invoice.invoice_number}
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
                  {invoice.account}
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
                  {invoice.subtotal}
                  {/* Aguacate */}
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
                  {invoice.description_product}
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
