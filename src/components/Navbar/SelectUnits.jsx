import {
  FormControl,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const Units = ({ onUnitsChange }) => {
  const [units, setUnits] = useState("imperial");
  const theme = createTheme({
    palette: {
      background: {
        paper: "#000000",
        primary: "#555555",
        secondary: "#9c27b0",
      },
      text: {
        primary: "#d1d5db",
        secondary: "#9c27b0",
      },
      action: {
        active: "#d1d5db",
        primary: "#555555",
      },
    },
  });
  const handleOnChange = (unitValue) => {
    setUnits(unitValue.target.value);
    onUnitsChange(unitValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="standard" className="pt-1">
        <Select
          id="demo-simple-select"
          value={units}
          label="Units"
          variant="standard"
          onChange={handleOnChange}
          sx={{
            mx: 3,
            width: 90,
            maxWidth: 150,
            maxHeight: 30,
            p: 0,
            m: 0,
            ":before": { border: "none" },
            ":after": { borderColor: "#7cd1fa" },
          }}
        >
          <MenuItem value={"imperial"}>Imperial</MenuItem>
          <MenuItem value={"metric"}>Metric</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};
export default Units;
