import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import DataCalendarsAccountStyles from "./DataCalendarsAccounts.module.scss";
import styles from "../../../../styles/home.module.css";
import { poppins } from "../../../../fonts/fonts";
import { toggleMessage } from "@/app/store/clientify/clientifySlice";
import InfoIconAccounts from "@/app/icons/InfoIconAccounts";
import React, { useState, useEffect } from "react";
import AntSwitches from "../../Switches/AntSwitch/AntSwitches";
import {
  resetCalendaryRanger,
  setDateRange,
} from "@/app/store/clientify/invoicesTableSlice";
import { fetchFilteredAccounts } from "@/app/store/clientify/clientifyThunks";

export default function DataCalendarsAccounts({ open, handleClose }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.invoiceTable.calendaryRanger
  );

  const showMessage = useSelector(
    (state: RootState) => state.clienty.message.showMessage
  );

  const activeRecurrence = useSelector(
    (state: RootState) => state.clienty.activeRecurrence
  );
  const currentPartnerId = useSelector(
    (state: RootState) => state.clienty.currentPartnerId
  );

  const [dateRange, setDateRangeState] = useState<[Dayjs | null, Dayjs | null]>(
    [startDate ? dayjs(startDate) : null, endDate ? dayjs(endDate) : null]
  );

  useEffect(() => {
    if (open) {
      setDateRangeState([
        startDate ? dayjs(startDate) : null,
        endDate ? dayjs(endDate) : null,
      ]);
    }
  }, [open, startDate, endDate]);

  const handleApply = () => {
    const [start, end] = dateRange;
    const formattedRange: [string | null, string | null] = [
      start ? start.format("YYYY-MM-DD") : null,
      end ? end.format("YYYY-MM-DD") : null,
    ];
    dispatch(setDateRange(formattedRange));
    if (currentPartnerId) {
      const recurrenceFilter =
        activeRecurrence === null ? undefined : activeRecurrence;
      const startDateFilter = formattedRange[0] || undefined;
      const endDateFilter = formattedRange[1] || undefined;
      dispatch(
        fetchFilteredAccounts(currentPartnerId, {
          recurrence: recurrenceFilter,
          startDate: startDateFilter,
          endDate: endDateFilter,
        })
      );
    }
    handleClose();
  };

  const handleCancel = () => {
    dispatch(resetCalendaryRanger()); // Reinicia el estado global
    if (currentPartnerId) {
      const recurrenceFilter =
        activeRecurrence === null ? undefined : activeRecurrence;
      dispatch(
        fetchFilteredAccounts(currentPartnerId, {
          recurrence: recurrenceFilter,
        })
      );
    }
    handleClose();
  };

  // Manejador para el cambio del switch
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleMessage());
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
          zIndex: 300,
          position: "absolute",
          left: "37%",
          bottom: "90%",
        },
        "& .MuiPickersCalendarHeader-label": {
          fontSize: "14px",
          fontFamily: poppins.style.fontFamily,
          "& *": {
            fontFamily: poppins.style.fontFamily,
          },
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "19px",
          color: "#262626",
        },
        "& .MuiDateRangePickerDay-day:checked": {
          fontSize: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "14px",
          color: "#FFF",
        },
        "& .MuiDateRangePickerDay-day:focus": {
          fontSize: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "14px",
          color: "#FFF",
        },
        "& .MuiPickersArrowSwitcher-root": {
          justifyContent: "space-between",
          position: "absolute",
          right: "7%",
          bottom: "90%",
          width: "300px",
          zIndex: 200,
          maxHeight: 20,
          minHeight: 20,
        },
        "& .MuiDayCalendar-root": {
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          justifyContent: "space-between",
          width: "280px",
          height: "194px",
          position: "relative",
          top: "32px",
        },
        "& .MuiDayCalendar-header": {
          width: "280px",
          display: "flex",
          justifyContent: "space-between",
        },
        "& .MuiDayCalendar-weekDayLabel": {
          height: "14px",
          width: "24px",
          fontSize: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "14px",
          color: "#525252",
        },
        "& .MuiDayCalendar-slideTransition ": {
          minWidth: "280px",
        },
        "& .MuiDayCalendar-weekContainer": {
          width: "280px",
          height: "24px",
          display: "flex",
          justifyContent: "space-between",
          margin: "0px",
        },
        "& .MuiDateRangePickerDay-rangeIntervalPreview": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
          height: "24px",
        },
        "& .MuiDateRangePickerDay-day": {
          fontSize: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "14px",
          color: "#6F6F6F",
          height: "21px",
          width: "24px",
        },
        "& .MuiPickersCalendarHeader-root": {
          maxHeight: 0,
          minHeight: 0,
        },
        "& .MuiDateRangePickerDay-root": {
          height: "28px",
          width: "100%",
          gap: "0px",
        },
        "& .MuiDayCalendar-slideTransition": {
          display: "flex",
          flexDirection: "column",
        },
        "& .MuiDayCalendar-monthContainer": {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          height: "100%",
        },
        "& .MuiDateRangePickerDay-day.Mui-selected": {
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
            onChange={(newValue: DateRange<Dayjs>) => {
              const [start, end] = newValue;
              const adjustedValue: [Dayjs | null, Dayjs | null] =
                start && !end ? [start, start] : newValue;
              setDateRangeState(adjustedValue);
            }}
          />

          <Box className={DataCalendarsAccountStyles["box-Antswitches"]}>
            <Typography
              className={`${styles["Body-regular"]} ${poppins.className}`}
            >
              Seleccionar rango de fecha
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
                  >
                    <AntSwitches
                      checked={showMessage}
                      onChange={handleSwitchChange}
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
              onClick={handleCancel}
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
