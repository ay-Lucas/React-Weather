/* eslint-disable react/prop-types */
import {
	WiMoonAltNew,
	WiMoonFirstQuarter,
	WiMoonFull,
	WiMoonNew,
	WiMoonThirdQuarter,
	WiMoonWaningCrescent1,
	WiMoonWaningCrescent3,
	WiMoonWaningCrescent5,
	WiMoonWaningCrescent6,
	WiMoonWaningGibbous1,
	WiMoonWaningGibbous2,
	WiMoonWaningGibbous3,
	WiMoonWaningGibbous4,
	WiMoonWaningGibbous5,
	WiMoonWaningGibbous6,
	WiMoonWaxingCrescent1,
	WiMoonWaxingCrescent2,
	WiMoonWaxingCrescent3,
	WiMoonWaxingCrescent4,
	WiMoonWaxingCrescent5,
	WiMoonWaxingGibbous1,
	WiMoonWaxingGibbous2,
	WiMoonWaxingGibbous3,
	WiMoonWaxingGibbous4,
	WiMoonWaxingGibbous5,
	WiMoonWaxingGibbous6,
} from "react-icons/wi";

function MoonIcons({ decimal }) {
	if (decimal === null || decimal === undefined) {
		return null;
	}
	console.log(decimal);

	// Define an array of moon decimal icons
	if (decimal <= 0.03 || decimal > 0.95) {
		return <WiMoonNew />;
	} else if (decimal <= 0.09) {
		return <WiMoonWaxingCrescent1 />;
	} else if (decimal <= 0.15) {
		return <WiMoonWaxingCrescent3 />;
	} else if (decimal <= 0.21) {
		return <WiMoonWaxingCrescent5 />;
	} else if (decimal <= 0.28) {
		return <WiMoonFirstQuarter />;
	} else if (decimal <= 0.36) {
		return <WiMoonWaxingGibbous4 />;
	} else if (decimal <= 0.45) {
		return <WiMoonWaxingGibbous6 />;
	} else if (decimal <= 0.55) {
		//half way
		return <WiMoonFull />;
	} else if (decimal <= 0.6) {
		return <WiMoonWaningGibbous1 />;
	} else if (decimal <= 0.64) {
		return <WiMoonWaningGibbous3 />;
	} else if (decimal <= 0.68) {
		return <WiMoonWaningGibbous5 />;
	} else if (decimal <= 0.73) {
		return <WiMoonThirdQuarter />;
	} else if (decimal <= 0.77) {
		return <WiMoonWaningCrescent1 />;
	} else if (decimal <= 0.83) {
		return <WiMoonWaningCrescent3 />;
	} else if (decimal <= 0.89) {
		return <WiMoonWaningCrescent5 />;
	} else if (decimal <= 0.95) {
		return <WiMoonWaningCrescent6 />;
	}
}

// function MoonIcons({ decimal }) {
// 	if (decimal === null || decimal === undefined) {
// 		return null;
// 	}
// 	// Convert the decimal decimal value to an index representing the icon
// 	const index = Math.floor(decimal * 10);

// 	// Define an array of moon decimal icons
// 	const moonPhaseIcons = [
// 		WiMoonNew, // New Moon
// 		WiMoonWaxingCrescent3, // Waxing Crescent
// 		WiMoonWaxingCrescent3, // Waxing Crescent
// 		WiMoonFirstQuarter, // First Quarter
// 		WiMoonWaxingGibbous3, // Waxing Gibbous
// 		WiMoonWaxingGibbous6, // Waxing Gibbous
// 		WiMoonFull, // Full Moon
// 		WiMoonWaningGibbous6, // Waning Gibbous
// 		WiMoonWaningGibbous3, // Waning Gibbous
// 		WiMoonThirdQuarter, // Third Quarter
// 		WiMoonWaningCrescent3, // Waning Crescent
// 		WiMoonWaningCrescent6, // Waning Crescent
// 	];

// 	// Get the corresponding moon decimal icon component
// 	const MoonPhaseIconComponent = moonPhaseIcons[index];
// 	console.log(index);
// 	console.log(decimal);
// 	return <MoonPhaseIconComponent />;
// }
export default MoonIcons;
