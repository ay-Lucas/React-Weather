/* eslint-disable react/prop-types */
import "react-icons/bs";
import {
	BsCloudDrizzle,
	BsCloudDrizzleFill,
	BsCloudFog2,
	BsCloudFog2Fill,
	BsCloudLightningRain,
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
	BsMoonStarsFill,
	BsSun,
} from "react-icons/bs";
const WeatherCode = ({ code, isDay, size, includeDescription }) => {
	console.log("interpret rendered");
	if (typeof code !== "number") {
		console.log("code is not a number");
		return null;
	}
	let description, icon, is_day;
	if (isDay === 1) {
		is_day = true;
	} else if (isDay === 0) {
		is_day = false;
	}
	if (code === 0 && is_day) {
		description = "Clear Sky";
		icon = <BsSun size={size} />;
	} else if (code === 0 && !is_day) {
		description = "Clear Sky";
		icon = <BsMoonStarsFill size={size} />;
	} else if (code === 1 && is_day) {
		description = "Mainly Clear";
		icon = <BsSun size={size} />;
	} else if (code === 1 && !is_day) {
		description = "Mainly Clear";
		icon = <BsMoonStarsFill size={size} />;
	} else if (code === 2 && is_day) {
		description = "Partly Cloudy";
		icon = <BsCloudSun size={size} />;
	} else if (code === 2 && !is_day) {
		description = "Partly Cloudy";
		icon = <BsCloudMoonFill size={size} />;
	} else if (code === 3 && is_day) {
		description = "Overcast";
		icon = <BsClouds size={size} />;
	} else if (code === 3 && !is_day) {
		description = "Overcast";
		icon = <BsCloudsFill size={size} />;
	} else if (code === 45 && is_day) {
		description = "Fog";
		icon = <BsCloudFog2 size={size} />;
	} else if (code === 45 && !is_day) {
		description = "Fog";
		icon = <BsCloudFog2Fill size={size} />;
	} else if (code === 48 && is_day) {
		description = "Freezing Fog";
		icon = <BsCloudFog2 size={size} />;
	} else if (code === 48 && !is_day) {
		description = "Freezing Fog";
		icon = <BsCloudFog2Fill size={size} />;
	} else if (code === 51 && is_day) {
		icon = <BsCloudDrizzle size={size} />;
		description = "Light Drizzle";
	} else if (code === 51 && !is_day) {
		description = "Light Drizzle";
		icon = <BsCloudDrizzleFill size={size} />;
	} else if (code === 53 && is_day) {
		description = "Moderate Drizzle";
		icon = <BsCloudDrizzle size={size} />;
	} else if (code === 53 && !is_day) {
		description = "Moderate Drizzle";
		icon = <BsFillCloudDrizzleFill size={size} />;
	} else if (code === 55 && is_day) {
		description = "Heavy Drizzle";
		icon = <BsCloudDrizzle size={size} />;
	} else if (code === 55 && !is_day) {
		description = "Heavy Drizzle";
		icon = <BsCloudDrizzleFill size={size} />;
	} else if (code === 56 && is_day) {
		description = "Light Freezing Drizzle";
		icon = <BsCloudDrizzle size={size} />;
	} else if (code === 56 && !is_day) {
		description = "Light Freezing Drizzle";
		icon = <BsCloudDrizzleFill size={size} />;
	} else if (code === 57 && is_day) {
		description = "Freezing Drizzle";
		icon = <BsCloudDrizzle size={size} />;
	} else if (code === 57 && !is_day) {
		description = "Freezing Drizzle";
		icon = <BsCloudDrizzleFill size={size} />;
	} else if (code === 61 && is_day) {
		description = "Light Rain";
		icon = <BsCloudRain size={size} />;
	} else if (code === 61 && !is_day) {
		description = "Light Rain";
		icon = <BsCloudRainFill size={size} />;
	} else if (code === 63 && is_day) {
		description = "Rain";
		icon = <BsCloudRain size={size} />;
	} else if (code === 63 && !is_day) {
		description = "Rain";
		icon = <BsCloudRainFill size={size} />;
	} else if (code === 65 && is_day) {
		description = "Heavy Rain";
		icon = <BsCloudRainHeavy size={size} />;
	} else if (code === 65 && !is_day) {
		description = "Heavy Rain";
		icon = <BsCloudRainHeavyFill size={size} />;
	} else if (code === 66 && is_day) {
		description = "Light Freezing Rain";
		icon = <BsCloudSleet size={size} />;
	} else if (code === 66 && !is_day) {
		description = "Light Freezing Rain";
		icon = <BsCloudSleetFill size={size} />;
	} else if (code === 67 && is_day) {
		description = "Freezing Rain";
		icon = <BsCloudSleet size={size} />;
	} else if (code === 67 && !is_day) {
		description = "Freezing Rain";
		icon = <BsCloudSleetFill size={size} />;
	} else if (code === 71 && is_day) {
		description = "Light Snow";
		icon = <BsCloudSnow size={size} />;
	} else if (code === 71 && !is_day) {
		description = "Light Snow";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code === 73 && is_day) {
		description = "Snow";
		icon = <BsCloudSnow size={size} />;
	} else if (code === 73 && !is_day) {
		description = "Snow";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code === 75 && is_day) {
		description = "Heavy Snow";
		icon = <BsCloudSnow size={size} />;
	} else if (code === 75 && !is_day) {
		description = "Heavy Snow";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code === 77 && is_day) {
		description = "Snow Grains";
		icon = <BsCloudSnow size={size} />;
	} else if (code === 77 && !is_day) {
		description = "Snow Grains";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code === 80 && is_day) {
		description = "Light Rain Showers";
		icon = <BsCloudRain size={size} />;
	} else if (code === 80 && !is_day) {
		description = "Light Rain Showers";
		icon = <BsCloudRainFill size={size} />;
	} else if (code === 81 && is_day) {
		description = "Rain Showers";
		icon = <BsCloudRain size={size} />;
	} else if (code === 81 && !is_day) {
		description = "Rain Showers";
		icon = <BsCloudRainFill size={size} />;
	} else if (code === 82 && is_day) {
		description = "Heavy Rain Showers";
		icon = <BsCloudRainHeavy size={size} />;
	} else if (code === 82 && !is_day) {
		description = "Heavy Rain Showers";
		icon = <BsCloudRainHeavyFill size={size} />;
	} else if (code === 85 && is_day) {
		description = "Light Snow Showers";
		icon = <BsCloudSnow size={size} />;
	} else if (code === 85 && !is_day) {
		description = "Light Snow Showers";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code === 86 && is_day) {
		description = "Heavy Snow Showers";
		icon = <BsCloudSnow size={size} />;
	} else if (code === 86 && !is_day) {
		description = "Heavy Snow Showers";
		icon = <BsCloudSnowFill size={size} />;
	} else if (code === 95 && is_day) {
		description = "Thunderstorm";
		icon = <BsCloudLightningRain size={size} />;
	} else if (code === 95 && !is_day) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else if (code === 96 && is_day) {
		description = "Thunderstorm";
		icon = <BsCloudLightningRain size={size} />;
	} else if (code === 96 && !is_day) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else if (code === 99 && is_day) {
		description = "Thunderstorm";
		icon = <BsCloudLightningRain size={size} />;
	} else if (code === 99 && !is_day) {
		description = "Thunderstorm";
		icon = <BsFillCloudLightningRainFill size={size} />;
	} else {
		return -1;
	}
	// return [description, icon];
	if (includeDescription === true) {
		return (
			<>
				<div className="m-auto">{icon}</div>
				<div className="m-auto">{description}</div>
			</>
		);
	} else if (includeDescription === false) {
		return <>{icon}</>;
	} else if (includeDescription === "only") {
		return <>{description}</>;
	}
};
export default WeatherCode;
