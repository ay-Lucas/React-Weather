/* eslint-disable react/prop-types */
import { colors } from "@mui/material";
import { green, orange, red, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { getIcon } from "./Icons";
const CurrentWeather = ({ data, aqi, units, timezone }) => {
	// const [time, setTime] = useState(null);
	const [AQI, setAQI] = useState(null);
	const [color, setColor] = useState(green[500]);
	const [alert, setAlert] = useState([]);
	const locationHourFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour: "numeric",
		minute: "numeric",
		timeZoneName: "shortGeneric",
	});

	// const dateFormatter = Intl.DateTimeFormat(timezone.options.locale, {
	// 	timeZone: timezone.timezone,
	// 	weekday: "long",
	// 	month: "numeric",
	// 	day: "numeric",
	// });

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
		// let time = new Date(date.getTime() * 1000);
		// setTime(dateFormatter.format(time));
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

	return (
		<div className="flex flex-col items-center justify-between">
			<div className="inline-flex items-baseline justify-left w-full">
				<div className="text-2xl text-left inline-flex mb-0 mr-2">
					Current Weather
				</div>
				<div className="tracking-wide inline-flex dark:text-gray-400">
					As of{" "}
					{locationHourFormatter.format(
						data.currentConditions.datetimeEpoch * 1000
					)}
				</div>
			</div>
			{alert.length > 0 && (
				<>
					<div className="text-md flex-row mb-4 text-left">{alert}</div>
				</>
			)}
			<div className="flex flex-row w-full items-center my-16">
				<div className="">{getIcon(data.currentConditions.icon, 60)}</div>
				<div className="text-6xl font-light ml-3">
					{`${Math.round(data.currentConditions.temp)}`}°
				</div>
				<label className="mix-blend-overlay mt-8">
					{data.currentConditions.conditions}
				</label>
			</div>
			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-col"></div>
			</div>
			<div className="justify-between text-base w-full items-center flex flex-wrap">
				<div className="inline-flex flex-col  mx-3 ">
					<div className="flex text-md">Feels like</div>
					<div>{Math.round(data.currentConditions.feelslike)}°</div>
				</div>
				{aqi.length > 0 && (
					<div className="inline-flex flex-col mx-2">
						<div className="text-md">Air Quality</div>
						<div className="flex items-center">
							<div
								style={{ backgroundColor: color }}
								className={
									"mr-1 ml-1 h-3 w-3 inline-flex items-center rounded-full"
								}
							></div>

							<div className="">{AQI}</div>
						</div>
					</div>
				)}
				<div className="inline-flex flex-col mx-2">
					<div className="text-md">Humidity</div>
					<div>{Math.round(data.currentConditions.humidity)}%</div>
				</div>
				<div className="inline-flex flex-col mx-2">
					<div className="text-md">Wind</div>
					<div>
						{Math.round(data.currentConditions.windspeed)} {units.wind}
					</div>
				</div>
				<div className="inline-flex flex-col mx-2">
					<div className="text-md">Pressure</div>
					<div>
						{Math.round(data.currentConditions.pressure)} {units.pressure}
					</div>
				</div>
			</div>
		</div>
	);
};
export default CurrentWeather;
