import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import DataCalendarsAccountStyles from "./DataCalendarsAccounts.module.scss";

import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import {
  setDateRange,
  toggleMessage,
} from "@/app/store/clientify/clientifySlice";
import InfoIconAccounts from "@/app/icons/InfoIconAccounts";
import { useState } from "react";
import AntSwitches from "../../Switches/AntSwitch/AntSwitches";

export default function DataCalendarsAccounts({ open, handleClose }: any) {
  const dispatch = useDispatch();

  const showMessage = useSelector(
    (state: RootState) => state.clienty.message.showMessage
  );

  const [dateRange, setDateRangeState] = useState<[Dayjs | null, Dayjs | null]>(
    [null, null]
  );

  const handleApply = () => {
    dispatch(setDateRange(dateRange));
    handleClose(); // Cierra el modal después de aplicar
  };

  // Manejador para el cambio del switch
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleMessage()); // Cambia el estado en Redux
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      sx={{
        "& .MuiPickersCalendarHeader-labelContainer": {
          // background: "red",
          zIndex: 300,
          position: "absolute",
          left: "37%",
          bottom: "90%",
        },
        //Ajustes de Tipografia
        "& .MuiPickersCalendarHeader-label": {
          // Título del mes (e.g., "Marzo 2025")
          fontSize: "14px",
          fontFamily: poppins.style.fontFamily, // Aplica la fuente poppins
          "& *": {
            // Asegura que todos los elementos dentro de la celda hereden la fuente
            fontFamily: poppins.style.fontFamily,
          },
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "19px",
          color: "#262626",
          // color: "red",
        },

        "& .MuiDateRangePickerDay-day:checked": {
          // Números de los días (1 a 30)
          fontSize: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "14px",
          color: "#FFF",
        },
        "& .MuiDateRangePickerDay-day:focus": {
          // Números de los días (1 a 30)
          fontSize: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "14px",
          color: "#FFF",
          // background: "yellow",
        },

        //Cajon Padre Titulo Mes
        "& .MuiPickersArrowSwitcher-root": {
          // background: "yellow",
          justifyContent: "space-between",
          position: "absolute",
          right: "7%",
          bottom: "90%",
          width: "300px",
          zIndex: 200,
          maxHeight: 20,
          minHeight: 20,
        },
        //Cajon Padre total
        "& .MuiDayCalendar-root": {
          // background: "aqua",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          justifyContent: "space-between",
          width: "280px",
          height: "194px",
          position: "relative",
          top: "32px",
        },
        //Header  Padre Semanas
        "& .MuiDayCalendar-header": {
          // background: "red",
          width: "280px",
          display: "flex",
          justifyContent: "space-between",
        },
        //Cajon Header Semanas
        "& .MuiDayCalendar-weekDayLabel": {
          // Días de la semana (Lunes a Domingo)
          height: "14px",
          width: "24px",
          // background: "brown",
          fontSize: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "14px",
          color: "#525252",
        },
        //Cajon semanal padre
        "& .MuiDayCalendar-slideTransition ": {
          // background: "chocolate",
          minWidth: "280px",
          // height: "24px",
        },
        //Cajon semanal de contenedor de dias
        "& .MuiDayCalendar-weekContainer": {
          // background: "chocolate",
          width: "280px",
          height: "24px",
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "flex-start",
          margin: "0px",
        },
        //Cajon Padre dias
        "& .MuiDateRangePickerDay-rangeIntervalPreview": {
          // background: "violet",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          // width: "24px",
          height: "24px",
        },

        //Cajon individual de los dias
        "& .MuiDateRangePickerDay-day": {
          // Números de los días (1 a 30)
          fontSize: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "14px",
          color: "#6F6F6F",
          // background: "yellow",
          height: "21px",
          width: "24px",
        },
        "& .MuiPickersCalendarHeader-root": {
          // background: "violet",
          maxHeight: 0,
          minHeight: 0,
          // marginTop: "0px",
        },

        "& .MuiDateRangePickerDay-root": {
          // background: "red",
          height: "28px",
          width: "100%",
          gap: "0px",
        },

        "& .MuiDayCalendar-slideTransition": {
          // background: "blue",
          display: "flex",
          flexDirection: "column",
          // justifyContent:
          // minHeight: "194px",
          // maxHeight: "194px",
          // gap: "2px",
        },
        //Cajon Padre secundario total de los dias
        "& .MuiDayCalendar-monthContainer": {
          // background: "blue",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          height: "100%",
        },
        "& .MuiDateRangePickerDay-day.Mui-selected": {
          // background: "yellow",
          height: "24px",
          width: "24px",
          marginTop: "6px",
        },
        '& .MuiDateRangeCalendar-root > div[style*="pointer-events: none"]': {
          display: "none !important",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          className={
            DataCalendarsAccountStyles["Box-father-DataCalendarsAccounts"]
          }
        >
          <DateRangeCalendar
            calendars={1}
            value={dateRange}
            onChange={(newValue) => setDateRangeState(newValue)}
          />

          {/* <IconVectorClear /> */}

          <Box className={DataCalendarsAccountStyles["box-Antswitches"]}>
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Seleccionar rango de fecha{" "}
            </Typography>
            <Box
              className={
                DataCalendarsAccountStyles["box-children-father-icon-switch"]
              }
            >
              <Box className={DataCalendarsAccountStyles["box-icon-children1"]}>
                <Box
                  className={
                    DataCalendarsAccountStyles["box-children1-grandson1"]
                  }
                >
                  <Box
                    className={
                      DataCalendarsAccountStyles["grandson1-children4"]
                    }
                    // onClick={() => dispatch(toggleMessage())}
                  >
                    <AntSwitches
                      checked={showMessage} // Conecta el estado de Redux
                      onChange={handleSwitchChange} // Maneja el cambio
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {showMessage && (
            <Box className={DataCalendarsAccountStyles["box-showMessage"]}>
              <InfoIconAccounts />
              <Typography
                className={`${styles["Body-regular"]} ${poppins.className}`}
              >
                Selecciona un rango de inicio y de cierre.
              </Typography>
            </Box>
          )}

          <Box className={DataCalendarsAccountStyles["box-buttons-father"]}>
            <Button
              className={DataCalendarsAccountStyles["button-one"]}
              onClick={handleApply}
            >
              <Typography
                className={`${styles["Title-medium-white"]} ${poppins.className}`}
              >
                Aplicar
              </Typography>
            </Button>
            <Button
              className={DataCalendarsAccountStyles["button-two"]}
              onClick={handleClose}
            >
              <Typography
                className={`${styles["Title-medium-blue"]} ${poppins.className}`}
              >
                Cancelar
              </Typography>
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </Modal>
  );
}
