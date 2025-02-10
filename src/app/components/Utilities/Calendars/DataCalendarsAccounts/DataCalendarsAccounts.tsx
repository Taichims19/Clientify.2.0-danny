import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import DataCalendarsAccountStyles from "./DataCalendarsAccounts.module.scss";
import AntSwitches from "../../Switches/AntSwitch/AntSwitches";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import {
  setDateRange,
  toggleMessage,
} from "@/app/store/clientify/clientifySlice";
import InfoIconAccounts from "@/app/icons/InfoIconAccounts";
import { useState } from "react";

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      sx={{
        "& .MuiPickersCalendarHeader-labelContainer ": {
          // background: "red",
          zIndex: 300,
          position: "absolute",
          left: "37%",
          bottom: "90%",
        },
        "& .MuiPickersCalendarHeader-label ": {
          fontSize: "14px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "19px",
          color: "#262626",
          textAlign: "right",
        },
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
        "& .MuiPickersCalendarHeader-root": {
          // background: "yellow",
          maxHeight: 0,
          minHeight: 0,
          // marginTop: "0px",
        },
        "& .MuiDayCalendar-weekContainer": {
          // background: "yellow",
          display: "flex",

          // gap: "12px",
        },
        "& .MuiDateRangePickerDay-root": {
          // background: "red",
          height: "24px",
          gap: "12px",
        },
        "& .MuiDayCalendar-header": {
          // background: "red",
          height: "14px",
          marginTop: "32px",
        },
        "& .MuiDayCalendar-slideTransition": {
          // background: "blue",
          display: "flex",
          flexDirection: "column",
          // justifyContent:
          minHeight: "194px",
          maxHeight: "194px",
          gap: "12px",
        },
        "& .MuiDayCalendar-monthContainer": {
          // background: "blue",
          display: "flex",
          flexDirection: "column",
          minHeight: "194px",
          maxHeight: "194px",
          gap: "12px",
        },
        "& .MuiDateRangePickerDay-day.Mui-selected": {
          // background: "yellow",
          height: "24px",
          width: "24px",
          marginTop: "6px",
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
                    onClick={() => dispatch(toggleMessage())}
                  >
                    <AntSwitches />
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
              Aplicar
            </Button>
            <Button
              className={DataCalendarsAccountStyles["button-two"]}
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </Modal>
  );
}
