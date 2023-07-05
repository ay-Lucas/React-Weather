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
const WeatherCode = (code, isNight) => {
	if (typeof code !== "number") {
		console.log("code is not a number");
		return null;
	}
	if (isNight === 1) {
		isNight = false;
	} else if (isNight === 0) {
		isNight = true;
	}
	let description, icon;
	if (code == 0 && !isNight) {
		description = "Clear Sky";
		icon = BsSun;
	} else if (code == 0 && isNight) {
		description = "Clear Sky";
		icon = BsMoonStars;
	} else if (code == 1 && !isNight) {
		description = "Mainly Clear";
		icon = BsSun;
	} else if (code == 1 && isNight) {
		description = "Mainly Clear";
		icon = BsMoonStars;
	} else if (code == 2 && !isNight) {
		description = "Partly Cloudy";
		icon = BsCloudSun;
	} else if (code == 2 && isNight) {
		description = "Partly Cloudy";
		icon = BsCloudMoonFill;
	} else if (code == 3 && !isNight) {
		description = "Overcast";
		icon = BsClouds;
	} else if (code == 3 && isNight) {
		description = "Overcast";
		icon = BsCloudsFill;
	} else if (code == 45 && !isNight) {
		description = "Fog";
		icon = BsCloudFog2;
	} else if (code == 45 && isNight) {
		description = "Fog";
		icon = BsCloudFog2Fill;
	} else if (code == 48 && !isNight) {
		description = "Freezing Fog";
		icon = BsCloudFog2;
	} else if (code == 48 && isNight) {
		description = "Freezing Fog";
		icon = BsCloudFog2Fill;
	} else if (code == 51 && !isNight) {
		description = "Light Drizzle";
		icon = BsCloudDrizzle;
	} else if (code == 51 && isNight) {
		description = "Light Drizzle";
		icon = BsCloudDrizzleFill;
	} else if (code == 53 && !isNight) {
		description = "Moderate Drizzle";
		icon = BsCloudDrizzle;
	} else if (code == 53 && isNight) {
		description = "Moderate Drizzle";
		icon = BsFillCloudDrizzleFill;
	} else if (code == 55 && !isNight) {
		description = "Heavy Drizzle";
		icon = BsCloudDrizzle;
	} else if (code == 55 && isNight) {
		description = "Heavy Drizzle";
		icon = BsCloudDrizzleFill;
	} else if (code == 56 && !isNight) {
		description = "Light Freezing Drizzle";
		icon = BsCloudDrizzle;
	} else if (code == 56 && isNight) {
		description = "Light Freezing Drizzle";
		icon = BsCloudDrizzleFill;
	} else if (code == 57 && !isNight) {
		description = "Freezing Drizzle";
		icon = BsCloudDrizzle;
	} else if (code == 57 && isNight) {
		description = "Freezing Drizzle";
		icon = BsCloudDrizzleFill;
	} else if (code == 61 && !isNight) {
		description = "Light Rain";
		icon = BsCloudRain;
	} else if (code == 61 && isNight) {
		description = "Light Rain";
		icon = BsCloudRainFill;
	} else if (code == 63 && !isNight) {
		description = "Rain";
		icon = BsCloudRain;
	} else if (code == 63 && isNight) {
		description = "Rain";
		icon = BsCloudRainFill;
	} else if (code == 65 && !isNight) {
		description = "Heavy Rain";
		icon = BsCloudRainHeavy;
	} else if (code == 65 && isNight) {
		description = "Heavy Rain";
		icon = BsCloudRainHeavyFill;
	} else if (code == 66 && !isNight) {
		description = "Light Freezing Rain";
		icon = BsCloudSleet;
	} else if (code == 66 && isNight) {
		description = "Light Freezing Rain";
		icon = BsCloudSleetFill;
	} else if (code == 67 && !isNight) {
		description = "Freezing Rain";
		icon = BsCloudSleet;
	} else if (code == 67 && isNight) {
		description = "Freezing Rain";
		icon = BsCloudSleetFill;
	} else if (code == 71 && !isNight) {
		description = "Light Snow";
		icon = BsCloudSnow;
	} else if (code == 71 && isNight) {
		description = "Light Snow";
		icon = BsCloudSnowFill;
	} else if (code == 73 && !isNight) {
		description = "Snow";
		icon = BsCloudSnow;
	} else if (code == 73 && isNight) {
		description = "Snow";
		icon = BsCloudSnowFill;
	} else if (code == 75 && !isNight) {
		description = "Heavy Snow";
		icon = BsCloudSnow;
	} else if (code == 75 && isNight) {
		description = "Heavy Snow";
		icon = BsCloudSnowFill;
	} else if (code == 77 && !isNight) {
		description = "Snow Grains";
		icon = BsCloudSnow;
	} else if (code == 77 && isNight) {
		description = "Snow Grains";
		icon = BsCloudSnowFill;
	} else if (code == 80 && !isNight) {
		description = "Light Rain Showers";
		icon = BsCloudRain;
	} else if (code == 80 && isNight) {
		description = "Light Rain Showers";
		icon = BsCloudRainFill;
	} else if (code == 81 && !isNight) {
		description = "Rain Showers";
		icon = BsCloudRain;
	} else if (code == 81 && isNight) {
		description = "Rain Showers";
		icon = BsCloudRainFill;
	} else if (code == 82 && !isNight) {
		description = "Heavy Rain Showers";
		icon = BsCloudRainHeavy;
	} else if (code == 82 && isNight) {
		description = "Heavy Rain Showers";
		icon = BsCloudRainHeavyFill;
	} else if (code == 85 && !isNight) {
		description = "Light Snow Showers";
		icon = BsCloudSnow;
	} else if (code == 85 && isNight) {
		description = "Light Snow Showers";
		icon = BsCloudSnowFill;
	} else if (code == 86 && !isNight) {
		description = "Heavy Snow Showers";
		icon = BsCloudSnow;
	} else if (code == 86 && isNight) {
		description = "Heavy Snow Showers";
		icon = BsCloudSnowFill;
	} else if (code == 95 && !isNight) {
		description = "Thunderstorm";
		icon = BsFillCloudLightningRainFill;
	} else if (code == 95 && isNight) {
		description = "Thunderstorm";
		icon = BsFillCloudLightningRainFill;
	} else if (code == 96 && !isNight) {
		description = "Thunderstorm";
		icon = BsFillCloudLightningRainFill;
	} else if (code == 96 && isNight) {
		description = "Thunderstorm";
		icon = BsFillCloudLightningRainFill;
	} else if (code == 99 && !isNight) {
		description = "Thunderstorm";
		icon = BsFillCloudLightningRainFill;
	} else if (code == 99 && isNight) {
		description = "Thunderstorm";
		icon = BsFillCloudLightningRainFill;
	}
	console.log(description, icon);
	return [description, icon];
};

export default WeatherCode;
