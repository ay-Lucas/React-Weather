/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import InterpretWeather from "./InterpretWeather";

// eslint-disable-next-line react/prop-types
const CurrentWeather = ({ data, aqi, model, units, weathercodes }) => {
	const [time, setTime] = useState(new Date());
	const [index, setStartingIndex] = useState(0);
	const [isDay, setIsDay] = useState(false);
	const [weathercode, setWeathercode] = useState(0);
	const [AQI, setAQI] = useState(null);
	const [color, setColor] = useState("white");
	console.log("current weather rendered");
	useEffect(() => {
		if (model === "gfs_global") {
			setWeathercode(weathercodes.hourly.weathercode_gfs_global);
		} else if (model === "gfs_hrrr") {
			//weathercode not available
			setWeathercode(weathercodes.hourly.weathercode_gfs_global);
		} else if (model === "gfs_seamless") {
			setWeathercode(weathercodes.hourly.weathercode_gfs_seamless);
		} else if (model === "ecmwf_ifs04") {
			setWeathercode(weathercodes.hourly.weathercode_ecmwf_ifs04);
		} else if (model === "best_match") {
			setWeathercode(weathercodes.hourly.weathercode_best_match);
		} else {
			console.log("Current Weather: Model not found");
		}
		setStartingIndex(new Date(Date.now()).getHours());
		setIsDay(weathercodes.current_weather.is_day);
		setTime(new Date());
		try {
			setAQI(aqi[1].AQI);
		} catch (e) {
			console.log("AirNow API aqi error" + e);
			setAQI(null);
		}
		// if(model === "gfs_global"){
		// 	setDescription(data.current_weather.weather_descriptions_gfs_global);
		// 	setTemperature(data.current_weather.temperature_2m_gfs_global);
	}, [data, aqi, model, units, weathercodes]);
	let description = `${data.weather[0].description}`;
	let aqiColor;
	useEffect(() => {
		if (aqi.length > 0 && aqi[1]) {
			if (aqi[1].Category.Name === "Good") {
				aqiColor =
					// eslint-disable-next-line react-hooks/exhaustive-deps
					"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-green-500";
			} else if (aqi[1].Category.Name === "Moderate") {
				aqiColor =
					"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-yellow-500";
			} else if (aqi[1].Category.Name === "Unhealthy for Sensitive Groups") {
				aqiColor =
					"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-yellow-600";
			} else if (aqi[1].Category.Name === "Unhealthy") {
				aqiColor =
					"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-red-500";
			} else if (aqi[1].Category.Name === "Very Unhealthy") {
				aqiColor =
					"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-red-600";
			} else if (aqi[1].Category.Name === "Hazardous") {
				aqiColor =
					"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-purple-500";
			} else {
				aqiColor =
					"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-gray-500";
			}
			setColor(aqiColor);
		}
	}, [aqi]);

	// console.log(description);
	// if (description.includes(" ")) {
	// 	description.split(" ").map((word) => {
	// 		console.log(description);
	// 		description = word[0].toUpperCase() + word.slice(1);
	// 		if (word.length > 1) {
	// 			description = description + " " + word[1].toUpperCase + word.slice(1);
	// 			console.log(description);
	// 		}
	// 	});
	// }
	return (
		<div className="flex flex-col text-center items-center justify-between">
			<div className="text-2xl flex mb-4">Current Weather</div>
			<div className="text-center items-center flex flex-col ">
				<div className="flex flex-row">
					<div className="flex flex-col">
						<div className="tracking-wide text-gray-300 dark:text-gray-400">
							As of{" "}
							{time.toLocaleTimeString([], {
								hour: "2-digit",
								hour12: true,
								minute: "2-digit",
							})}
						</div>
						<div className="mt-1">{description}</div>
					</div>
					<div className="ml-5">
						<InterpretWeather
							code={weathercode[index]}
							isDay={isDay}
							size={60}
							includeDescription={false}
						/>
						{/* <BsCloudLightningRain size={50} /> */}
					</div>
				</div>
				{/* <div className="mt-3">
				Expect thunderstorms to continue for the next hour.
			</div> */}
				{/* <>
					{data && (
						<div className="text-6xl font-light my-4">{data.temperature}°F</div>
					)}
				</> */}
				<div className="text-6xl font-light my-4">
					{`${Math.round(data.main.temp)}`}°
				</div>
			</div>

			<div className="flex justify-between text-base items-center">
				<div className="inline-flex flex-col px-2">
					<div className="flex">Feels like</div>
					<div>{Math.round(data.main.feels_like)}°</div>
				</div>
				{AQI && (
					<div className="inline-flex flex-col items-center px-2">
						<div>Air Quality</div>
						<div className="inline-flex  flex-row items-center justify-center ">
							<div className={color}></div>
							<div>{AQI}</div>
						</div>
					</div>
				)}
				<div className="inline-flex flex-col px-2">
					<div>Humidity</div>
					<div>{data.main.humidity}%</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Wind</div>
					<div>
						{Math.round(data.wind.speed)} {units.wind}
					</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Pressure</div>
					<div>
						{data.main.pressure} {units.pressure}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CurrentWeather;
