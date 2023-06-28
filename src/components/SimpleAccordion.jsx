import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { withStyles } from "@mui/material"; // eslint-disable-next-line no-unused-vars
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";

export default function SimpleAccordion() {
	// 	// const useStyles = makeStyles((theme) => ({
	// 	// 	detailRoot: {
	// 	// 		display: "table-row",
	// 	// 	},
	// 	// }));
	// 	// sx={{ color: "primary.main" }}
	// 	const Accordion = withStyles({
	// 		root: {
	// 			"&$expanded": {
	// 				margin: "auto",
	// 			},
	// 		},
	// 		expanded: {},
	// 	})(MuiAccordion);

	return (
		<Accordion
			variant="root"
			sx={{
				backgroundColor: "rgb(23 23 23 / var(--tw-bg-opacity))",
				color: "white",
				boxShadow: "none",
				fontFamily: "Oxygen",
				// marginY: "2rem",
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography variant="root">Friday 6/30</Typography>
			</AccordionSummary>
			<AccordionDetails color="primary">
				<Typography>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
					malesuada lacus ex, sit amet blandit leo lobortis eget.
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
}
