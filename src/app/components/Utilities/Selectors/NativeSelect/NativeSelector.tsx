import * as React from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import nativeSelectorStyles from "../NativeSelect/NativeSelector.module.scss";
import { useDispatch } from "react-redux";
import { setPageSize } from "@/app/store/clientify/invoicesTableSlice";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": { marginTop: theme.spacing(3) },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    height: "21px",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const CustomMenuProps = {
  PaperProps: {
    style: {
      maxHeight: 210,
      width: "53px",
      padding: "8px 10px",
      backgroundColor: "#f9f9f9",
      border: "1px solid #ccc",
    },
    sx: {
      "&::-webkit-scrollbar": { width: "6px", height: "78.5px" },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#c6c6c6",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
      "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
    },
  },
};

interface NativeSelectorProps {
  value: number;
  onChange: (newValue: number) => void;
  maxRows: number;
}

export default function NativeSelector({
  value,
  onChange,
  maxRows,
}: NativeSelectorProps) {
  const dispatch = useDispatch();

  const handleChange = (event: { target: { value: string } }) => {
    const newPageSize = parseInt(event.target.value, 10);
    onChange(newPageSize);
    dispatch(setPageSize(newPageSize));
  };

  const pageSizeOptions = [25, 50, 75, 100, 125, 150].filter(
    (size) => size <= maxRows || maxRows === 0
  );

  return (
    <FormControl className={nativeSelectorStyles["NativeSelector-box-father"]}>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={value.toString()}
        onChange={handleChange}
        input={<BootstrapInput />}
        MenuProps={CustomMenuProps}
        sx={{ "& .MuiSvgIcon-root": { fontSize: "16px" } }}
      >
        {pageSizeOptions.length > 0 ? (
          pageSizeOptions.map((size) => (
            <MenuItem
              key={size}
              value={size}
              style={{
                lineHeight: "19px",
                fontStyle: "normal",
                fontWeight: 400,
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              {size}
            </MenuItem>
          ))
        ) : (
          <MenuItem
            value={25}
            style={{
              lineHeight: "19px",
              fontStyle: "normal",
              fontWeight: 400,
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            25
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
