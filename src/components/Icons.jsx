import {
	BsCloudFogFill,
	BsCloudRainFill,
	BsCloudSnowFill,
	BsCloudsFill,
	BsFillCloudLightningRainFill,
	BsFillCloudRainHeavyFill,
	BsMoonStarsFill,
	BsSunFill,
} from "react-icons/bs";
import { FaCloudMoonRain } from "react-icons/fa";
import { IoCloudyNight, IoPartlySunny } from "react-icons/io5";
import { PiWindFill } from "react-icons/pi";

export const getIcon = (weather, num, className) => {
	if (num === undefined) num = 30;
	switch (weather) {
		case "snow":
			return <BsCloudSnowFill size={num} className={className} />;
		case "snow-showers-day":
			return <BsCloudSnowFill size={num} className={className} />;
		case "snow-showers-night":
			return <BsCloudSnowFill size={num} className={className} />;
		case "thunder-rain":
			return <BsFillCloudLightningRainFill size={num} className={className} />;
		case "thunder-showers-day":
			return <BsFillCloudLightningRainFill size={num} className={className} />;
		case "thunder-showers-night":
			return <BsFillCloudLightningRainFill size={num} className={className} />;
		case "rain":
			return <BsFillCloudRainHeavyFill size={num} className={className} />;
		case "showers-day":
			return <BsCloudRainFill size={num} className={className} />;
		case "showers-night":
			return <FaCloudMoonRain size={num} className={className} />;
		case "fog":
			return <BsCloudFogFill size={num} className={className} />;
		case "wind":
			return <PiWindFill size={num} className={className} />;
		case "cloudy":
			return <BsCloudsFill size={num} className={className} />;
		case "sun":
			return <BsSunFill size={num} className={className} />;
		case "partly-cloudy-day":
			return <IoPartlySunny size={num} className={className} />;
		case "partly-cloudy-night":
			return <IoCloudyNight size={num} className={className} />;
		case "clear-day":
			return <BsSunFill size={num} className={className} />;
		case "clear-night":
			return <BsMoonStarsFill size={num} className={className} />;
		default:
			console.log("icons.jsx: invalid weather condition");
			return null;
	}
};
