import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

const AntSwitch = styled((props: any) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        ...theme.applyStyles("dark", {
          backgroundColor: "#177ddc",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#E0E0E0",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255,255,255,.35)",
    }),
  },
}));

interface AntSwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function AntSwitches({
  checked,
  onChange,
  disabled,
}: AntSwitchProps) {
  return (
    <FormGroup>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        {/* <Typography>Off</Typography> */}
        <AntSwitch
          checked={checked} // Ahora es controlado
          onChange={onChange}
          inputProps={{ "aria-label": "ant design" }}
          disabled={disabled}
        />
        {/* <Typography>On</Typography> */}
      </Stack>
    </FormGroup>
  );
}
