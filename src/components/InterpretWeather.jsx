/* eslint-disable react/prop-types */
import "react-icons/bs";
import {
	BsCloudDrizzle,
	BsCloudDrizzleFill,
	BsCloudFog2,
	BsCloudFog2Fill,
	BsCloudMoonFill,
	BsCloudRain,
	BsCloudRainFill,
	BsCloudRainHeavy,
	BsCloudRainHeavyFill,
	BsCloudSleet,
	BsCloudSleetFill,
	BsCloudSnow,
	BsCloudSnowFill,
	BsCloudSun,
	BsClouds,
	BsCloudsFill,
	BsFillCloudDrizzleFill,
	BsFillCloudLightningRainFill,
	BsMoonStars,
	BsSun,
} from "react-icons/bs";
const WeatherCode = ({ code, isDay, size }) => {
	console.log("interpret rendered");
	if (typeof code !== "number") {
		console.log("code is not a number");
		return null;
	}
	if (isDay === 1) {
		isDay = true;
	} else if (isDay === 0) {
		isDay = false;
	}
	let description, icon;
	if (code == 0 && !isDay) {
		description = "Clear Sky";
		icon = <BsSun size={size} />;
	} else if (code == 0 && isDay) {
		description = "Clear Sky";
		icon = <BsMoonStars size={size} />;
	} else if (code == 1 && !isDay) {
		description = "Mainly Clear";
		icon = <BsSun size={size} />;
	} else if (code == 1 && isDay) {
		description = "Mainly Clear";
		icon = <BsMoonStars size={size} />;
	} else if (code == 2 && !isDay) {
		description = "Partly Cloudy";
		icon = <BsCloudSun size={size} />;
	} else if (code == 2 && isDay) {
		description = "Partly Cloudy";
		icon = <BsCloudMoonFill size={size} />;
	} else if (code == 3 && !isDay) {
		description = "Overcast";
		icon = <BsClouds size={size} />;
	} else if (code == 3 && isDay) {
		description = "Overcast";
		icon = <BsCloudsFill size={size} />;
	} else if (code == 45 && !isDay) {
		description = "Fog";
		icon = <BsCloudFog2 size={size} />;
	} else if (code == 45 && isDay) {
		description = "Fog";
		icon = <BsCloudFog2Fill size={size} />;
	} else if (code == 48 && !isDay) {
		description = "Freezing Fog";
		icon = <BsCloudFog2 size={size} />;
	} else if (code == 48 && isDay) {
		description = "Freezing Fog";
		icon = <BsCloudFog2Fill size={size} />;
	} else if (code == 51 && !isDay) {
		icon = <BsCloudDrizzle size={size} />;
	} else if (code == 51 && isDay) {
		description = "Light Drizzle";
		icon = <BsCloudDrizzleFill size={size} />;
	} else if (code == 53 && !isDay) {
		description = "Moderate Drizzle";
		icon = <BsCloudDrizzle size={size} />;
	} else if (code == 53 && isDay) {
		description = "Moderate Drizzle";
		icon = <BsFillCloudDrizzleFill size={size} />;
	} else if (code == 55 && !isDay) {
		description = "Heavy Drizzle";
		icon = <BsCloudDrizzle size={size} />;
	} else if (code == 55 && isDay) {
		description = "Heavy Drizzle";
		icon = <BsCloudDrizzleFill size={size} />;
	} else if (code == 56 && !isDay) {
		description = "Light Freezing Drizzle";
		icon = <BsCloudDrizzle size={size} />;
	} else if (code == 56 && isDay) {
		description = "Light Freezing Drizzle";
		icon = <BsCloudDrizzleFill size={size} />;
	} else if (code == 57 && !isDay) {
		description = "Freezing Drizzle";
		icon = <BsCloudDrizzle size={size} />;
	} else if (code == 57 && isDay) {
		description = "Freezing Drizzle";
		icon = <BsCloudDrizzleFill size={size} />;
	} else if (code == 61 && !isDay) {
		description = "Light Rain";
		icon = <BsCloudRain size={size} />;
	} else if (code == 61 && isDay) {
		description = "Light Rain";
		icon = <BsCloudRainFill size={size} />;
	} else if (code == 63 && !isDay) {
		description = "Rain";
		icon = <BsCloudRain size={size} />;
	} else if (code == 63 && isDay) {
		description = "Rain";
		icon = <BsCloudRainFill size={size} />;
	} else if (code == 65 && !isDay) {
		description = "Heavy Rain";
		icon = <BsCloudRainHeavy size={size} />;
	} else if (code == 65 && isDay) {
		description = "Heavy Rain";
		icon = <BsCloudRainHeavyFill size={size} />;
	} else if (code == 66 && !isDay) {
		description = "Light Freezing Rain";
		icon = <BsCloudSleet size={size} />;
	} else if (code == 66 && isDay) {
		description = "Light Freezing Rain";
		icon = <BsCloudSleetFill size={size} />;
	} else if (code == 67 && !isDay) {
		description = "Freezing Rain";
		icon = <BsCloudSleet size={size} />;
	} else if (code == 67 && isDay) {
		description = "Freezing Rain";
		icon = <BsCloudSleetFill size={size} />;
	} else if (code == 71 && !isDay) {
		description = "Light Snow";
		icon = <BsCloudSnow size={size} />;
	} else if (code == 71 && isDay) {
		description = "Light Snow";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code == 73 && !isDay) {
		description = "Snow";
		icon = <BsCloudSnow size={size} />;
	} else if (code == 73 && isDay) {
		description = "Snow";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code == 75 && !isDay) {
		description = "Heavy Snow";
		icon = <BsCloudSnow size={size} />;
	} else if (code == 75 && isDay) {
		description = "Heavy Snow";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code == 77 && !isDay) {
		description = "Snow Grains";
		icon = <BsCloudSnow size={size} />;
	} else if (code == 77 && isDay) {
		description = "Snow Grains";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code == 80 && !isDay) {
		description = "Light Rain Showers";
		icon = <BsCloudRain size={size} />;
	} else if (code == 80 && isDay) {
		description = "Light Rain Showers";
		icon = <BsCloudRainFill size={size} />;
	} else if (code == 81 && !isDay) {
		description = "Rain Showers";
		icon = <BsCloudRain size={size} />;
	} else if (code == 81 && isDay) {
		description = "Rain Showers";
		icon = <BsCloudRainFill size={size} />;
	} else if (code == 82 && !isDay) {
		description = "Heavy Rain Showers";
		icon = <BsCloudRainHeavy size={size} />;
	} else if (code == 82 && isDay) {
		description = "Heavy Rain Showers";
		icon = <BsCloudRainHeavyFill size={size} />;
	} else if (code == 85 && !isDay) {
		description = "Light Snow Showers";
		icon = <BsCloudSnow size={size} />;
	} else if (code == 85 && isDay) {
		description = "Light Snow Showers";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code == 86 && !isDay) {
		description = "Heavy Snow Showers";
		icon = <BsCloudSnow size={size} />;
	} else if (code == 86 && isDay) {
		description = "Heavy Snow Showers";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code == 95 && !isDay) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else if (code == 95 && isDay) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else if (code == 96 && !isDay) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else if (code == 96 && isDay) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else if (code == 99 && !isDay) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else if (code == 99 && isDay) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else {
		return -1;
	}
	console.log(description, icon);
	// return [description, icon];
	return <>{icon}</>;
};

// return < size={size}>{description}</ size={size}div>;
export default WeatherCode;
