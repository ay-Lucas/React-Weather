/* eslint-disable react/prop-types */
import { colors } from "@mui/material";
import { green, orange, red, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { getIcon } from "./Icons";
const CurrentWeather = ({ data, aqi, units }) => {
	const [time, setTime] = useState(null);
	const [AQI, setAQI] = useState(null);
	const [color, setColor] = useState(green[500]);
	const [alert, setAlert] = useState([]);
	console.log("current weather rendered");
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
			});
			setAlert(alertList);
		}
		const whatColor = (aqi) => {
			if (aqi <= 50) {
				setColor(green[500]);
			} else if (aqi <= 100) {
				setColor(yellow[500]);
			} else if (aqi <= 150) {
				setColor(orange[600]);
			} else if (aqi <= 200) {
				setColor(orange[900]);
			} else if (aqi <= 300) {
				setColor(red[500]);
			} else if (aqi > 300) {
				setColor(red[900]);
			} else {
				setColor("gray");
			}
			console.log(aqi);
			console.log(color);
		};
		let mili = Date.now();
		let time = new Date(mili + data.tzoffset * 1000);
		setTime(time);
		if (aqi !== undefined && aqi.length > 0) {
			try {
				let num = 0;
				for (let i = 0; i < aqi.length; i++) {
					if (aqi[i].AQI > num) {
						console.log(aqi[i].AQI);
						num = aqi[i].AQI;
					}
				}
				setAQI(num);
				whatColor(num);
			} catch (e) {
				console.log("AirNow API aqi error" + e);
				setAQI(null);
				whatColor(null);
			}
		} else {
			console.log("AirNow API aqi error");
		}
	}, [data, color, aqi, AQI]);

	console.log(time);
	return (
		<div className="flex flex-col text-center items-center justify-between ">
			<div className="text-2xl flex mb-4">Current Weather</div>
			{alert && (
				<>
					<div className="text-sm flex-row mb-4 text-left">{alert}</div>
				</>
			)}
			<div className="text-center items-center flex flex-col ">
				<div className="flex flex-row items-center justify-center">
					<div className="flex flex-col">
						<div className="tracking-wide text-gray-300 dark:text-gray-400">
							As of{" "}
							{`${new Date(
								data.currentConditions.datetimeEpoch * 1000
							).toLocaleTimeString(undefined, {
								hour: "numeric",
								minute: "numeric",
							})}`}
						</div>
						<div className="ml-5 mix-blend-overlay">
							{data.currentConditions.conditions}
						</div>
					</div>
					<div className="ml-5">{getIcon(data.currentConditions.icon, 60)}</div>
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
				{aqi.length > 0 && (
					<div className="inline-flex flex-col items-center px-2">
						<div>Air Quality</div>
						<div className="inline-flex  flex-row items-center justify-center ">
							<div
								style={{ backgroundColor: color }}
								className={"mr-1 h-3 w-3 inline-flex items-center rounded-full"}
							></div>

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
