import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import NativeSelectorStyles from "./NativeSelector.module.scss";

export default function NativeSelector() {
  return (
    <Box sx={{ minWidth: 44 }}>
      <FormControl
        className={NativeSelectorStyles["NativeSelector-box-father"]}
        fullWidth
      >
        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Age
        </InputLabel> */}
        <NativeSelect
          defaultValue={1}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
