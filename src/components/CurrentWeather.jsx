/* eslint-disable react/prop-types */
import { colors } from "@mui/material";
import { blue, green, orange, red, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";
import { degreesToWindDirection, usAqiToColor, uvIndexToColor, uvIndexToPercent, uvIndexToRisk } from "../utility";
import { getIcon } from "./Icons";
const CurrentWeather = ({ data, aqi, units, timezone, stat }) => {
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
	const dateFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
	const hoursInDay = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour12: false,
		hour: "2-digit",
		// minute: "numeric",
	});
	const getStartingIndex = () => {
		const date = new Date();
		const currentHourStr = hoursInDay.format(date);
		let currentHourNum = parseInt(currentHourStr.split("/")[0]);
		return currentHourNum - 1;
	};

	// const dateFormatter = Intl.DateTimeFormat(timezone.options.locale, {
	// 	timeZone: timezone.timezone,
	// 	weekday: "long",
	// 	month: "numeric",
	// 	day: "numeric",
	// });

	useEffect(() => {
		if (data.alerts !== undefined) {
			const alertList = data.alerts.map((alert) => {
				return (
					<div key={alert.id} className="flex-row bg-red-500/30 rounded-lg p-1 my-1">
						<a href={alert.link} rel="noreferrer noopener" target="_blank" className="flex-col">
							{alert.headline}
						</a>
						<div className="text-gray-400">
							{dateFormatter.format(new Date(alert.onset))} - {dateFormatter.format(new Date(alert.ends))}
						</div>
					</div>
				);
			});
			setAlert(alertList);
		}
		// setColor(usAqiToColor(aqi));
		try {
			if (aqi !== undefined && aqi.length > 0) {
				let num = 0;
				for (let i = 0; i < aqi.length; i++) {
					if (aqi[i].AQI > num) {
						num = aqi[i].AQI;
					}
				}
				setAQI(num);
				setColor(usAqiToColor(num));
			} else {
				const aqius = data.days[0].hours[getStartingIndex()].aqius;
				setAQI(aqius);
				setColor(usAqiToColor(aqius));
			}
		} catch (e) {
			console.log("AirNow API aqi error" + e);
			setAQI(null);
			setColor(null);
		}
	}, [data, color, aqi, AQI, timezone]);

	return (
		<div className="mt-3 lg:flex sm:inline-flex w-full ">
			<div className="grid sm:grid-cols-4 grid-cols-2 items-center h-full w-full justify-evenly flex-wrap ">
				<div className="grid col-span-2 items-center justify-start mr-0 sm:mr-1.5 mb-3 sm:mb-0 bg-slate-950/20 rounded-lg shadow-sm py-4 px-3 pl-6 ">
					<div className="flex sm:flex-row flex-col sm:items-baseline justify-start">
						<div className="text-2xl mr-0 sm:mr-2">Current Weather</div>
						<div className="tracking-wide dark:text-gray-400">As of {locationHourFormatter.format(data.currentConditions.datetimeEpoch * 1000)}</div>
					</div>
					<div className="flex flex-col w-full justify-start sm:mt-8 mt-5">
						<div className="flex flex-row w-full h-full items-start justify-start">
							<div className="flex sm:flex-col flex-row items-baseline">
								<div className="flex justify-center">
									<div>{getIcon(data.currentConditions.icon, 60, "sm:p-0 sm:h-fit h-12")}</div>
									<div className="sm:text-6xl text-5xl font-light sm:ml-3 ml-0 ">{`${Math.round(data.currentConditions.temp)}`}</div>
									<span className="text-3xl font-light pb-5">{units.tempSign}</span>
								</div>
							</div>

							<div className="flex flex-col sm:w-full ml-3 sm:justify-evenly h-full">
								<label className="mix-blend-overlay">{data.currentConditions.conditions}</label>
								<label className="mr-1.5">Feels like {Math.round(data.currentConditions.feelslike)}°</label>
								{data.currentConditions.precipprob > 0 && (
									<div className="inline-flex items-center">
										<GiWaterDrop size={17} className="text-sky-500 -ml-1 mr-1" />
										<div className="">{Math.round(data.currentConditions.precipprob)}%</div>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="flex flex-col font-light  sm:fit w-full sm:items-start items-start">
						{data.days[0].description !== undefined && <div className="flex flex-row flex-auto mt-3">{data.days[0].description}</div>}
						<div className="flex flex-row mt-1">
							<div className="inline-flex mr-1 text-white font-bold">
								<span className="font-normal mr-1">Day </span> {Math.round(data.days[0].tempmax)}° •
							</div>{" "}
							<div className="inline-flex text-gray-200 font-bold">
								{" "}
								<span className="font-normal mr-1">Night </span> {Math.round(data.days[0].tempmin)}°
							</div>
						</div>
					</div>
				</div>
				<div className="grid h-full ml-0 sm:ml-1.5 sm:mr-0 mr-1 bg-slate-950/20 rounded-lg shadow-sm py-2 pl-3 overflow-hidden">
					<div className="grid-rows-1 h-4">Observations</div>
					<div className="grid grid-cols-2 sm:text-base items-center justify-center sm:justify-between text-sm sm:justify-items-start justify-items-start">
						{AQI !== null && (
							<div>
								<div className=" text-cyan-200">Air Quality</div>
								<div className="flex items-center">
									<div style={{ backgroundColor: color }} className={"mr-1 ml-1 h-3 w-3 inline-flex items-center rounded-full"}></div>

									<div className="">{AQI}</div>
								</div>
							</div>
						)}
						<div>
							<div className="text-cyan-200">Humidity</div>
							<div>{Math.round(data.currentConditions.humidity)}%</div>
						</div>
						<div>
							<div className="text-cyan-200">Wind</div>
							<div>
								{Math.round(data.currentConditions.windspeed)} {units.wind}
								<div className="text-gray-300 ml-1 inline items-center">{degreesToWindDirection(data.days[0].winddir)} </div>
							</div>
						</div>
						<div>
							<div className="text-cyan-200">Pressure</div>
							<div>
								{Math.round(data.currentConditions.pressure)} {units.pressure}
							</div>
						</div>
						<div>
							<div className="text-cyan-200">Cloud Cover</div>
							<div>{Math.round(data.currentConditions.cloudcover)}%</div>
						</div>
						{/* <div>
					<div className="text-cyan-200">Dew Point</div>
					<div>{Math.round(data.currentConditions.dew)}°</div>
				</div> */}
						<div>
							<div className="text-cyan-200">UV Index</div>
							<div className="inline-flex ">
								{data.currentConditions.uvindex}
								{" - "}
								{uvIndexToRisk(data.currentConditions.uvindex)}
							</div>
							<div className="text-left max-w-[4.25rem] max-sm:w-[5rem] sm:min-w-[5rem]">
								<div
									style={{
										marginTop: "0.4rem",
										height: "0.2rem",
										borderRadius: "0.5rem",
										background: "linear-gradient(to right, green, yellow, orange, red, violet )",
									}}
									className=""
								>
									{" "}
								</div>
								<BsFillCircleFill
									size={8}
									className=" border-[1.75px] rounded-full"
									color={`${uvIndexToColor(data.currentConditions.uvindex)}`}
									style={{
										color: `${uvIndexToColor(data.currentConditions.uvindex)}`,
										marginTop: "-.35rem",
										marginLeft: `${uvIndexToPercent(data.currentConditions.uvindex)}`,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
				{stat && (
					<div className="grid  h-full ml-1 sm:ml-1.5 bg-slate-950/20 rounded-lg shadow-sm py-2 pl-3 text-left">
						<div className="h-4">Statistics</div>
						<div className=" text-cyan-200 items-center mt-2">
							Today is{" "}
							<span style={{ color: stat.days[0].normal.tempmax[1] < data.days[0].tempmax ? red[100] : blue["A700"] }} className="font-semibold ">
								{stat.days[0].normal.tempmax[1] < data.days[0].tempmax ? "above" : "below"}
							</span>{" "}
							average
						</div>
						<div className="grid grid-cols-2">
							<div>
								<div>
									<div className="text-cyan-200">Avg Temp</div>
									<div>{Math.round(stat.days[0].temp) + "°"}</div>
								</div>
								<div>
									<div className="text-cyan-200">Avg High</div>
									<div>{Math.round(stat.days[0].normal.tempmax[1]) + "°"}</div>
								</div>
								<div>
									<div className="text-cyan-200">Avg Low</div>
									<div>{Math.round(stat.days[0].normal.tempmin[1]) + "°"}</div>
								</div>
							</div>
							<div>
								<div>
									<div className="text-cyan-200">Record High</div>
									<div>{Math.round(stat.days[0].normal.tempmax[2]) + "°"}</div>
								</div>
								<div>
									<div className="text-cyan-200">Record Low</div>
									<div>{Math.round(stat.days[0].normal.tempmin[0]) + "°"}</div>
								</div>
								<div>
									<div className="text-cyan-200">Avg Precip</div>
									<div>
										{stat.days[0].normal.precip[1]} {units.precipitation}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default CurrentWeather;
