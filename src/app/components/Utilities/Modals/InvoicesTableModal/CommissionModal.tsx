import React from "react";
import { Box, Modal, Typography, Button, Popover } from "@mui/material";
import commissionModalStyles from "./CommissionModal.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "./../../../../fonts/fonts";
import IconAlertInvoicesSend from "@/app/icons/IconAlertInvoicesSend";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

interface CommissionModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    cuenta: string;
    producto: string;
    importe: number;
    comision: number;
  };
  onSubmit: () => void;
}

export default function CommissionModal({
  open,
  onClose,
  data,
  onSubmit,
}: CommissionModalProps) {
  const [anchorCuenta, setAnchorCuenta] = React.useState<HTMLElement | null>(
    null
  );
  const [showPopoverCuenta, setShowPopoverCuenta] = React.useState(false);
  const [anchorProducto, setAnchorProducto] =
    React.useState<HTMLElement | null>(null);
  const [showPopoverProducto, setShowPopoverProducto] = React.useState(false);

  const handlePopoverEnterCuenta = (event: React.MouseEvent<HTMLElement>) => {
    if (data.cuenta.startsWith("Ver +")) {
      setAnchorCuenta(event.currentTarget);
      setShowPopoverCuenta(true);
    }
  };
  const handlePopoverLeaveCuenta = () => {
    setShowPopoverCuenta(false);
  };

  const handlePopoverEnterProducto = (event: React.MouseEvent<HTMLElement>) => {
    if (data.producto.startsWith("Ver +")) {
      setAnchorProducto(event.currentTarget);
      setShowPopoverProducto(true);
    }
  };
  const handlePopoverLeaveProducto = () => {
    setShowPopoverProducto(false);
  };

  const productoResumen = React.useMemo(() => {
    if (data.producto.startsWith("Ver +")) return data.producto;
    const productoSinPrefijo = data.producto.replace(/^1 × /, "").trim();
    const palabras = productoSinPrefijo.split(" ");
    const base = palabras.slice(0, 2).join(" ");
    const matchRepetido = data.producto.match(/x\d+$/);
    const extra = matchRepetido ? ` ${matchRepetido[0]}` : "";
    return `${base}${extra}`;
  }, [data.producto]);

  const cuentasPopoverContent = React.useMemo(() => {
    if (!data.cuenta.startsWith("Ver +")) return [];
    const cuentas = JSON.parse(localStorage.getItem("cuentasResumen") || "[]");
    return cuentas.map((c: [string, number]) => `${c[0]} x${c[1]}`);
  }, [data.cuenta]);

  // const productosPopoverContent = React.useMemo(() => {
  //   const productos = JSON.parse(
  //     localStorage.getItem("productosResumen") || "[]"
  //   );
  //   return productos.map((p: [string, number]) => `${p[0]} x${p[1]}`);
  // }, []);

  const productosPopoverContent = React.useMemo(() => {
    if (!data.producto.startsWith("Ver +")) return [];
    const productos = JSON.parse(
      localStorage.getItem("productosResumen") || "[]"
    );
    return productos.map((p: [string, number]) => {
      const productoSinPrefijo = p[0].replace(/^1 × /, "").trim();
      const palabras = productoSinPrefijo.split(" ");
      const base = palabras.slice(0, 2).join(" ");
      return `${base} x${p[1]}`;
    });
  }, [data.producto]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={commissionModalStyles["CommissionModal-Box-father"]}>
        <Box className={commissionModalStyles["Box-comission-content"]}>
          {/* Child 1 */}
          <Box
            className={commissionModalStyles["Box-comission-content-child1"]}
          >
            <Typography
              className={`${styles["Header-Medium-black"]} ${poppins.className}`}
            >
              Liquidación de comisiones
            </Typography>
            <Typography
              className={`${styles["Body-regular-3-center"]} ${poppins.className}`}
            >
              Estás generando una liquidación de comisiones.
            </Typography>
          </Box>

          {/* Child 2 */}
          <Box
            className={commissionModalStyles["Box-comission-content-child2"]}
          >
            {/* Child 1 */}
            <Box className={commissionModalStyles["content-child2-chilndrens"]}>
              <Typography
                className={`${styles["Body-regular-3"]} ${poppins.className}`}
              >
                Cuenta
              </Typography>
              <Typography
                className={`${styles["Body-regular"]} ${poppins.className}`}
                style={{
                  color: data.cuenta.startsWith("Ver +")
                    ? "#0070f3"
                    : undefined,
                  cursor: "pointer",
                }}
                onMouseEnter={handlePopoverEnterCuenta}
                onMouseLeave={handlePopoverLeaveCuenta}
              >
                {data.cuenta}
              </Typography>
              <Popover
                open={showPopoverCuenta}
                anchorEl={anchorCuenta}
                onClose={handlePopoverLeaveCuenta}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                onMouseEnter={() => setShowPopoverCuenta(true)}
                onMouseLeave={handlePopoverLeaveCuenta}
                sx={{
                  "& .MuiPopover-paper": {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    borderRadius: "4px",
                    marginLeft: "2%",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    // background: "rgba(0, 0, 0, 0.75)",
                    borderRadius: "4px",
                  }}
                >
                  {cuentasPopoverContent.map((line: string, index: number) => (
                    <Typography
                      key={index}
                      className={`${styles["Caption-Medium"]} ${poppins.className}`}
                    >
                      {line}
                    </Typography>
                  ))}
                </Box>
              </Popover>
            </Box>
            {/* Child 2  */}
            <Box className={commissionModalStyles["content-child2-chilndrens"]}>
              <Typography
                className={`${styles["Body-regular-3"]} ${poppins.className}`}
              >
                Producto
              </Typography>
              <Typography
                className={`${styles["Body-regular"]} ${poppins.className}`}
                style={{
                  color: data.producto.startsWith("Ver +")
                    ? "#0070f3"
                    : undefined,
                  cursor: "pointer",
                }}
                onMouseEnter={handlePopoverEnterProducto}
                onMouseLeave={handlePopoverLeaveProducto}
              >
                {productoResumen}
              </Typography>
              <Popover
                open={showPopoverProducto}
                anchorEl={anchorProducto}
                onClose={handlePopoverLeaveProducto}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                onMouseEnter={() => setShowPopoverProducto(true)}
                onMouseLeave={handlePopoverLeaveProducto}
                sx={{
                  "& .MuiPopover-paper": {
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    borderRadius: "4px",
                    marginLeft: "2%",
                    width: 200,

                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#555",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              >
                <Box
                  className={commissionModalStyles["Box-popover"]}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "8px",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    // background: "rgba(0, 0, 0, 0.75)",
                    borderRadius: "4px",
                  }}
                >
                  {productosPopoverContent.map(
                    (line: string, index: number) => (
                      <Typography
                        key={index}
                        className={`${styles["Caption-Medium"]} ${poppins.className}`}
                      >
                        {line}
                      </Typography>
                    )
                  )}
                </Box>
              </Popover>
            </Box>
            {/* Child 3 */}
            <Box className={commissionModalStyles["content-child2-chilndrens"]}>
              <Typography
                className={`${styles["Body-regular-3"]} ${poppins.className}`}
              >
                Importe
              </Typography>
              <Typography
                className={`${styles["Body-regular"]} ${poppins.className}`}
              >
                USD {data.importe.toFixed(2)}
              </Typography>
            </Box>
            {/* Child 4 */}
            <Box className={commissionModalStyles["content-child2-chilndrens"]}>
              <Typography
                className={`${styles["Body-regular-3"]} ${poppins.className}`}
              >
                Comisión al 25%
              </Typography>
              <Typography
                className={`${styles["Body-regular"]} ${poppins.className}`}
              >
                USD {data.comision.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/* Child 3 */}
          <Box
            className={commissionModalStyles["Box-comission-content-child3"]}
          >
            <Typography>
              <IconAlertInvoicesSend />
            </Typography>

            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Revisaremos la factura antes de proceder a liquidar la comisión.
            </Typography>
          </Box>
        </Box>

        <Box className={commissionModalStyles["Box-comission-buttom"]}>
          <Button
            className={commissionModalStyles["button-one"]}
            onClick={onSubmit}
          >
            <Typography
              className={`${styles["Title-medium-white"]} ${poppins.className}`}
            >
              Enviar
            </Typography>
          </Button>
          <Button
            className={commissionModalStyles["button-two"]}
            onClick={onClose}
          >
            <Typography
              className={`${styles["Title-medium-blue"]} ${poppins.className}`}
            >
              Cancelar
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
