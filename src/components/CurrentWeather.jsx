/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { getIcon } from "./Icons";
// eslint-disable-next-line react/prop-types
const CurrentWeather = ({ data, aqi, units }) => {
	// const [index, setIndex] = useState(null);
	// const [weathercode, setWeathercode] = useState(0);
	const [time, setTime] = useState(null);
	const [isDay, setIsDay] = useState(null);
	const [AQI, setAQI] = useState(null);
	const [color, setColor] = useState(null);
	const [alert, setAlert] = useState([]);
	let aqiColor;
	const circle = "mr-1 h-3 w-3 inline-flex items-center rounded-full";
	console.log("current weather rendered");
	// useRef((description = `${data.weather[0].description}`));
	// useEffect(() => {
	// 	if (model === "gfs_global") {
	// 		setWeathercode(weathercodes.current_weather.weathercode);
	// 	} else if (model === "gfs_hrrr") {
	// 		//weathercode not available
	// 		setWeathercode(weathercodes.hourly.weathercode_gfs_global);
	// 	} else if (model === "gfs_seamless") {
	// 		setWeathercode(weathercodes.hourly.weathercode_gfs_seamless);
	// 	} else if (model === "ecmwf_ifs04") {
	// 		setWeathercode(weathercodes.hourly.weathercode_ecmwf_ifs04);
	// 	} else if (model === "best_match") {
	// 		setWeathercode(weathercodes.hourly.weathercode_best_match);
	// 	} else {
	// 		console.log("Current Weather: Model not found");
	// 	}
	// 	console.log(weathercode);
	// 	setIsDay(weathercodes.current_weather.is_day);
	// 	// setTime(new Date(weathercodes.current_weather.time));
	// 	try {
	// 		let num = 0;
	// 		for (let i = 0; i < aqi.length; i++) {
	// 			if (aqi[i].AQI > num) {
	// 				console.log(aqi[i].AQI);
	// 				num = aqi[i].AQI;
	// 			}
	// 		}
	// 		setAQI(num);
	// 	} catch (e) {
	// 		console.log("AirNow API aqi error" + e);
	// 	}
	// 	// console.log("open weather description" + description);
	// 	console.log("open-meteo weathercode " + weathercode);
	// 	whatColor(aqi);
	// }, [data, weathercodes]);
	const setIsDayTime = (time) => {
		//offset is negative
		let offset = data.tzoffset;
		const sunrise = new Date(data.currentConditions.sunriseEpoch + offset);
		const sunset = new Date(data.currentConditions.sunsetEpoch + offset);
		if (time.getTime() > sunrise && time.getTime() < sunset) {
			setIsDay(true);
		} else {
			setIsDay(false);
		}
		console.log(
			"is day: " + time.getTime() > sunrise && time.getTime() < sunset
		);
		console.log(time.getTime(), sunrise, sunset);
		console.log(typeof time.getTime(), typeof sunrise, typeof sunset);
	};

	useEffect(() => {
		if (data.alerts !== undefined) {
			const alertList = data.alerts.map((alert) => {
				return (
					<div
						key={alert.id}
						className="flex-row bg-red-500/30 rounded-lg p-1 my-1"
					>
						<a
							href={alert.link}
							rel="noreferrer noopener"
							target="_blank"
							className="flex-col"
						>
							{alert.headline}
						</a>
					</div>
				);
				// console.log(alert.event);
				// console.log(alert.headline);
				// console.log(alert.link);
			});
			setAlert(alertList);
		}
		// setTime(new Date(data.currentConditions.datetimeEpoch));
		let mili = Date.now();
		let time = new Date(mili + data.tzoffset * 1000);
		setTime(time);

		time && setIsDayTime(time);
		if (aqi !== undefined) {
			try {
				let num = 0;
				for (let i = 0; i < aqi.length; i++) {
					if (aqi[i].AQI > num) {
						console.log(aqi[i].AQI);
						num = aqi[i].AQI;
					}
				}
				setAQI(num);
				whatColor(aqi);
			} catch (e) {
				console.log("AirNow API aqi error" + e);
			}
		} else {
			console.log("AirNow API aqi error");
		}
		// console.log("open weather description" + description);
		// console.log("open-meteo weathercode " + weathercode);
	}, [data]);

	const whatColor = (aqi) => {
		if (aqi !== undefined && aqi !== null) {
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
		}
	};

	console.log(color);
	console.log(time);
	console.log(isDay);
	return (
		<div className="flex flex-col text-center items-center justify-between ">
			<div className="text-2xl flex mb-4">Current Weather</div>
			{alert && (
				<>
					{/* <div className="text-lg flex mb-1 p-1 rounded-lg bg-red-700">
						Alerts
					</div> */}
					<div className="text-sm flex-row mb-4 text-left">{alert}</div>
				</>
			)}
			<div className="text-center items-center flex flex-col ">
				<div className="flex flex-row items-center justify-center">
					<div className="flex flex-col">
						<div className="tracking-wide text-gray-300 dark:text-gray-400">
							As of{" "}
							{time &&
								time.toLocaleTimeString([], {
									hour: "2-digit",
									hour12: true,
									minute: "2-digit",
								})}
						</div>
						<div className="ml-5 mix-blend-overlay">
							{/* <InterpretWeather
								code={weathercode}
								isDay={isDay}
								size={0}
								includeDescription={"only"}
							/> */}
							{data.currentConditions.conditions}
						</div>
					</div>
					<div className="ml-5">
						{getIcon(data.currentConditions.icon, 60)}
						{/* <InterpretWeather
							code={weathercode}
							isDay={isDay}
							size={60}
							includeDescription={false}
						/> */}
					</div>
				</div>
				<div className="text-6xl font-light my-4">
					{`${Math.round(data.currentConditions.temp)}`}°
				</div>
			</div>

			<div className="flex justify-between text-base items-center">
				<div className="inline-flex flex-col px-2">
					<div className="flex">Feels like</div>
					<div>{Math.round(data.currentConditions.feelslike)}°</div>
				</div>
				{aqi !== null && (
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
					<div>{Math.round(data.currentConditions.humidity)}%</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Wind</div>
					<div>
						{Math.round(data.currentConditions.windspeed)} {units.wind}
					</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Pressure</div>
					<div>
						{Math.round(data.currentConditions.pressure)} {units.pressure}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CurrentWeather;
