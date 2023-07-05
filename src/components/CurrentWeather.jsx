/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BsCloudLightningRain } from "react-icons/bs";
import InterpretWeather from "./InterpretWeather";

// eslint-disable-next-line react/prop-types
const CurrentWeather = ({ data, aqi }) => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		setTime(new Date());
	}, []);
	console.log("current weather render");
	let description = `${data.weather[0].description}`;

	let color;
	if (aqi.length > 0 && aqi[1]) {
		console.log(aqi[1].Category.Name);
		if (aqi[1].Category.Name === "Good") {
			color = "mr-1 h-3 w-3 inline-flex items-center rounded-full bg-green-500";
		} else if (aqi[1].Category.Name === "Moderate") {
			color =
				"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-yellow-500";
		} else if (aqi[1].Category.Name === "Unhealthy for Sensitive Groups") {
			color =
				"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-yellow-600";
		} else if (aqi[1].Category.Name === "Unhealthy") {
			color = "mr-1 h-3 w-3 inline-flex items-center rounded-full bg-red-500";
		} else if (aqi[1].Category.Name === "Very Unhealthy") {
			color = "mr-1 h-3 w-3 inline-flex items-center rounded-full bg-red-600";
		} else if (aqi[1].Category.Name === "Hazardous") {
			color =
				"mr-1 h-3 w-3 inline-flex items-center rounded-full bg-purple-500";
		} else {
			color = "mr-1 h-3 w-3 inline-flex items-center rounded-full bg-gray-500";
		}
	}

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
	const weatherIcon = <BsCloudLightningRain size={50} />;
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
					<div className="ml-3">
						{weatherIcon}
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
				<div className="text-6xl font-light my-4">{`${Math.round(
					data.main.temp
				)}`}</div>
			</div>

			<div className="flex justify-between text-base items-center">
				<div className="inline-flex flex-col px-2">
					<div className="flex">Feels like</div>
					<div>{data.main.feels_like}</div>
				</div>
				{aqi.length > 0 && (
					<div className="inline-flex flex-col items-center px-2">
						<div>Air Quality</div>
						<div className="inline-flex  flex-row items-center justify-center ">
							<div className={color}></div>
							<div>{aqi[1].AQI}</div>
						</div>
					</div>
				)}
				<div className="inline-flex flex-col px-2">
					<div>Humidity</div>
					<div>{data.main.humidity}%</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Wind</div>
					<div>{data.wind.speed}</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Pressure</div>
					<div>{data.main.pressure}</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Visibility</div>
					<div>{data.visibility}</div>
				</div>
			</div>
		</div>
	);
};
export default CurrentWeather;
