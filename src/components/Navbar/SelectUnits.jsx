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
				paper: "#0a1929",
			},
			text: {
				primary: "#57a4d1",
				secondary: "#9c27b0",
			},
			action: {
				active: "#57a4d1",
			},
		},
	});
	const handleOnChange = (unitValue) => {
		setUnits(unitValue.target.value);
		onUnitsChange(unitValue);
		// console.log(Units);
	};
	//purple #9c27b0
	//dark blue #0a1929
	return (
		<ThemeProvider theme={theme}>
			<FormControl>
				{/* <InputLabel id="demo-simple-select-label">Units</InputLabel> */}
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={units}
					label="Units"
					variant="standard"
					onChange={handleOnChange}
					sx={{ mx: 3, width: 90, maxWidth: 150, maxHeight: 40, p: 0 }}
				>
					{/* sx={{ ":hover": { bgcolor: "#9c27b0" } }} */}
					<MenuItem value={"imperial"}>Imperial</MenuItem>
					<MenuItem value={"metric"}>Metric</MenuItem>
				</Select>
			</FormControl>
		</ThemeProvider>
	);
};
export default Units;