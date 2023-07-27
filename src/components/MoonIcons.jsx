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

function MoonIcons({ decimal, size, className }) {
	if (decimal === null || decimal === undefined) {
		return null;
	}

	// Define an array of moon decimal icons
	if (decimal <= 0.03 || decimal > 0.95) {
		return <WiMoonNew size={size} className={className} />;
	} else if (decimal <= 0.09) {
		return <WiMoonWaxingCrescent1 size={size} className={className} />;
	} else if (decimal <= 0.15) {
		return <WiMoonWaxingCrescent3 size={size} className={className} />;
	} else if (decimal <= 0.21) {
		return <WiMoonWaxingCrescent5 size={size} className={className} />;
	} else if (decimal <= 0.28) {
		return <WiMoonFirstQuarter size={size} className={className} />;
	} else if (decimal <= 0.36) {
		return <WiMoonWaxingGibbous4 size={size} className={className} />;
	} else if (decimal <= 0.45) {
		return <WiMoonWaxingGibbous6 size={size} className={className} />;
	} else if (decimal <= 0.55) {
		//half way
		return <WiMoonFull size={size} className={className} />;
	} else if (decimal <= 0.6) {
		return <WiMoonWaningGibbous1 size={size} className={className} />;
	} else if (decimal <= 0.64) {
		return <WiMoonWaningGibbous3 size={size} className={className} />;
	} else if (decimal <= 0.68) {
		return <WiMoonWaningGibbous5 size={size} className={className} />;
	} else if (decimal <= 0.73) {
		return <WiMoonThirdQuarter size={size} className={className} />;
	} else if (decimal <= 0.77) {
		return <WiMoonWaningCrescent1 size={size} className={className} />;
	} else if (decimal <= 0.83) {
		return <WiMoonWaningCrescent3 size={size} className={className} />;
	} else if (decimal <= 0.89) {
		return <WiMoonWaningCrescent5 size={size} className={className} />;
	} else if (decimal <= 0.95) {
		return <WiMoonWaningCrescent6 size={size} className={className} />;
	}
}
export default MoonIcons;
