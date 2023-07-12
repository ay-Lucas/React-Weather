import {
	BsCloudFog,
	BsCloudLightningRain,
	BsCloudLightningRainFill,
	BsCloudRain,
	BsCloudRainHeavy,
	BsCloudSnow,
	BsCloudSnowFill,
	BsClouds,
	BsMoonStarsFill,
	BsSun,
} from "react-icons/bs";
import { FaCloudMoonRain } from "react-icons/fa";
import { IoCloudyNight, IoPartlySunnyOutline } from "react-icons/io5";
import { PiWind } from "react-icons/pi";

export const getIcon = (weather, num) => {
	if (num === undefined) num = 30;
	switch (weather) {
		case "snow":
			return <BsCloudSnow size={num} />;
		case "snow-showers-day":
			return <BsCloudSnow size={num} />;
		case "snow-showers-night":
			return <BsCloudSnowFill size={num} />;
		case "thunder-rain":
			return <BsCloudLightningRain size={num} />;
		case "thunder-showers-day":
			return <BsCloudLightningRain size={num} />;
		case "thunder-showers-night":
			return <BsCloudLightningRainFill size={num} />;
		case "rain":
			return <BsCloudRainHeavy size={num} />;
		case "showers-day":
			return <BsCloudRain size={num} />;
		case "showers-night":
			return <FaCloudMoonRain size={num} />;
		case "fog":
			return <BsCloudFog size={num} />;
		case "wind":
			return <PiWind size={num} />;
		case "cloudy":
			return <BsClouds size={num} />;
		case "sun":
			return <BsSun size={num} />;
		case "partly-cloudy-day":
			return <IoPartlySunnyOutline size={num} />;
		case "partly-cloudy-night":
			return <IoCloudyNight size={num} />;
		case "clear-day":
			return <BsSun size={num} />;
		case "clear-night":
			return <BsMoonStarsFill size={num} />;
		default:
			console.log("icons.jsx: invalid weather condition");
			return null;
	}
};
