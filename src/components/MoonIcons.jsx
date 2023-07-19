/* eslint-disable react/prop-types */
import {
	WiMoonFirstQuarter,
	WiMoonFull,
	WiMoonNew,
	WiMoonThirdQuarter,
	WiMoonWaningCrescent1,
	WiMoonWaningCrescent3,
	WiMoonWaningCrescent5,
	WiMoonWaningCrescent6,
	WiMoonWaningGibbous1,
	WiMoonWaningGibbous3,
	WiMoonWaningGibbous5,
	WiMoonWaxingCrescent1,
	WiMoonWaxingCrescent3,
	WiMoonWaxingCrescent5,
	WiMoonWaxingGibbous4,
	WiMoonWaxingGibbous6,
} from "react-icons/wi";

function MoonIcons({ decimal, size }) {
	if (decimal === null || decimal === undefined) {
		return null;
	}

	// Define an array of moon decimal icons
	if (decimal <= 0.03 || decimal > 0.95) {
		return <WiMoonNew size={size} />;
	} else if (decimal <= 0.09) {
		return <WiMoonWaxingCrescent1 size={size} />;
	} else if (decimal <= 0.15) {
		return <WiMoonWaxingCrescent3 size={size} />;
	} else if (decimal <= 0.21) {
		return <WiMoonWaxingCrescent5 size={size} />;
	} else if (decimal <= 0.28) {
		return <WiMoonFirstQuarter size={size} />;
	} else if (decimal <= 0.36) {
		return <WiMoonWaxingGibbous4 size={size} />;
	} else if (decimal <= 0.45) {
		return <WiMoonWaxingGibbous6 size={size} />;
	} else if (decimal <= 0.55) {
		//half way
		return <WiMoonFull size={size} />;
	} else if (decimal <= 0.6) {
		return <WiMoonWaningGibbous1 size={size} />;
	} else if (decimal <= 0.64) {
		return <WiMoonWaningGibbous3 size={size} />;
	} else if (decimal <= 0.68) {
		return <WiMoonWaningGibbous5 size={size} />;
	} else if (decimal <= 0.73) {
		return <WiMoonThirdQuarter size={size} />;
	} else if (decimal <= 0.77) {
		return <WiMoonWaningCrescent1 size={size} />;
	} else if (decimal <= 0.83) {
		return <WiMoonWaningCrescent3 size={size} />;
	} else if (decimal <= 0.89) {
		return <WiMoonWaningCrescent5 size={size} />;
	} else if (decimal <= 0.95) {
		return <WiMoonWaningCrescent6 size={size} />;
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
// 	return <MoonPhaseIconComponent size={size} />;
// }
export default MoonIcons;
