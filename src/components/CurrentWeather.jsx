/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import InterpretWeather from "./InterpretWeather";
// eslint-disable-next-line react/prop-types
const CurrentWeather = ({ data, aqi, model, units, weathercodes }) => {
	const [time, setTime] = useState(new Date(weathercodes.current_weather.time));
	// const [index, setIndex] = useState(null);
	const [isDay, setIsDay] = useState(true);
	const [weathercode, setWeathercode] = useState(0);
	const [AQI, setAQI] = useState(null);
	const [color, setColor] = useState(null);
	console.log("current weather rendered");
	let description, aqiColor;
	const circle = "mr-1 h-3 w-3 inline-flex items-center rounded-full";
	// useRef((description = `${data.weather[0].description}`));
	useEffect(() => {
		if (model === "gfs_global") {
			setWeathercode(weathercodes.current_weather.weathercode);
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
		console.log(weathercode);
		setIsDay(weathercodes.current_weather.is_day);
		// setTime(new Date(weathercodes.current_weather.time));
		try {
			let num = 0;
			for (let i = 0; i < aqi.length; i++) {
				if (aqi[i].AQI > num) {
					console.log(aqi[i].AQI);
					num = aqi[i].AQI;
				}
			}
			setAQI(num);
		} catch (e) {
			console.log("AirNow API aqi error" + e);
		}
		// console.log("open weather description" + description);
		console.log("open-meteo weathercode " + weathercode);
		whatColor(aqi);
	}, [data, weathercodes]);

	const whatColor = (aqi) => {
		if (aqi.length > 0 && aqi[1]) {
			if (aqi[1].Category.Name === "Good") {
				aqiColor = " bg-green-500";
			} else if (aqi[1].Category.Name === "Moderate") {
				aqiColor = " bg-yellow-500";
			} else if (aqi[1].Category.Name === "Unhealthy for Sensitive Groups") {
				aqiColor = " bg-yellow-600";
			} else if (aqi[1].Category.Name === "Unhealthy") {
				aqiColor = " bg-red-500";
			} else if (aqi[1].Category.Name === "Very Unhealthy") {
				aqiColor = " bg-red-600";
			} else if (aqi[1].Category.Name === "Hazardous") {
				aqiColor = " bg-purple-500";
			} else {
				aqiColor = " bg-gray-500";
			}
			setColor(circle.concat(aqiColor));
		} else {
			setColor(circle.concat("bg-gray-500"));
		}
	};
	console.log(color);
	return (
		<div className="flex flex-col text-center items-center justify-between ">
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
						<div className="ml-5">
							<InterpretWeather
								code={weathercode}
								isDay={isDay}
								size={0}
								includeDescription={"only"}
							/>
						</div>
					</div>
					<div className="ml-5">
						<InterpretWeather
							code={weathercode}
							isDay={isDay}
							size={60}
							includeDescription={false}
						/>
					</div>
				</div>
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
