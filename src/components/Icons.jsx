import {
	BsCloudFogFill,
	BsCloudRainFill,
	BsCloudSnowFill,
	BsCloudsFill,
	BsFillCloudLightningRainFill,
	BsFillCloudRainHeavyFill,
	BsMoonStarsFill,
	BsSun,
	BsSunFill,
} from "react-icons/bs";
import { FaCloudMoonRain } from "react-icons/fa";
import { IoCloudyNight, IoPartlySunny } from "react-icons/io5";
import { PiWindFill } from "react-icons/pi";

export const getIcon = (weather, num) => {
	if (num === undefined) num = 30;
	switch (weather) {
		case "snow":
			return <BsCloudSnowFill size={num} />;
		case "snow-showers-day":
			return <BsCloudSnowFill size={num} />;
		case "snow-showers-night":
			return <BsCloudSnowFill size={num} />;
		case "thunder-rain":
			return <BsFillCloudLightningRainFill size={num} />;
		case "thunder-showers-day":
			return <BsFillCloudLightningRainFill size={num} />;
		case "thunder-showers-night":
			return <BsFillCloudLightningRainFill size={num} />;
		case "rain":
			return <BsFillCloudRainHeavyFill size={num} />;
		case "showers-day":
			return <BsCloudRainFill size={num} />;
		case "showers-night":
			return <FaCloudMoonRain size={num} />;
		case "fog":
			return <BsCloudFogFill size={num} />;
		case "wind":
			return <PiWindFill size={num} />;
		case "cloudy":
			return <BsCloudsFill size={num} />;
		case "sun":
			return <BsSunFill size={num} />;
		case "partly-cloudy-day":
			return <IoPartlySunny size={num} />;
		case "partly-cloudy-night":
			return <IoCloudyNight size={num} />;
		case "clear-day":
			return <BsSunFill size={num} />;
		case "clear-night":
			return <BsMoonStarsFill size={num} />;
		default:
			console.log("icons.jsx: invalid weather condition");
			return null;
	}
};
// export const decimalToMoonPhaseIcon = (decimal) => {
// 	if (decimal === null || decimal === undefined) {
// 		return null;
// 	}
// 	  if (decimal <= 0.07) {
// 			return <WiMoonNew />;
// 		} else if (decimal <= 0.14) {
// 			return <WiMoonAltWaxingCrescent1/>
// 		} else if (decimal <= 0.21) {
// 			return <WiMoonAltWaxingCrescent2/>;
// 		} else if (decimal <= 0.29) {
// 			return <WiMoonAltWaxingCrescent3/>;
// 		} else if (decimal <= 0.36) {
// 			return <WiMoonAltWaxingCrescent4/>;
// 		} else if (decimal <= 0.43) {
// 			return <WiMoonAltWaxingCrescent5/>;
// 		} else if (decimal <= 0.5) {
// 			return <WiMoonAltWaxingCrescent6/>;
// 		} else if (decimal <= 0.57) {
// 			return <WiMoonAltSe;
// 		} else if (decimal <= 0.64) {
// 			stage = "Waxing Gibbous";
// 		} else if (decimal <= 0.71) {
// 			stage = "Waxing Gibbous";
// 		} else if (decimal <= 0.79) {
// 			stage = "Full Moon";
// 		} else if (decimal <= 0.86) {
// 			stage = "Waning Gibbous";
// 		} else if (decimal <= 0.93) {
// 			stage = "Third Quarter Waning Gibbous";
// 		} else if (decimal <= 1) {
// 			stage = "Waning Crescent";
// 		} else {
// 			console.log("decimalToMoonPhase: invalid decimal");
// 		}
// };
