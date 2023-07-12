import {
	BsCloudDrizzle,
	BsCloudFog2,
	BsCloudLightningRain,
	BsCloudRain,
	BsCloudSleet,
	BsCloudSnow,
	BsCloudSun,
	BsClouds,
	BsWind,
} from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import { RiWindyLine } from "react-icons/ri";

export const icons = {
	"rain": {
		icon: <BsCloudRain size={25} />,
	},
	"snow": {
		icon: <BsCloudSnow size={25} />,
	},
	"sun": {
		icon: <BsCloudSun size={25} />,
	},
	"cloudy": {
		icon: <BsClouds size={25} />,
	},
	"fog": {
		icon: <BsCloudFog2 size={25} />,
	},
	"drizzle": {
		icon: <BsCloudDrizzle size={25} />,
	},
	"thunderstorm": {
		icon: <BsCloudLightningRain size={25} />,
	},
	"wind": {
		icon: <RiWindyLine size={25} />,
	},
	"partly-cloudy-night": {
		icon: <IoCloudyNightOutline size={25} />,
	},
};

export const snow = <BsCloudSnow size={25} />;
export const sun = <BsCloudSun size={25} />;
export const cloudy = <BsClouds size={25} />;
export const fog = <BsCloudFog2 size={25} />;
export const drizzle = <BsCloudDrizzle size={25} />;
export const thunderstorm = <BsCloudLightningRain size={25} />;
export const sleet = <BsCloudSleet size={25} />;
export const wind = <BsWind size={25} />;
