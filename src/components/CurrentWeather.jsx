/* eslint-disable react/prop-types */
import { colors } from "@mui/material";
import { green, orange, red, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";
import { uvIndexToColor, uvIndexToPercent, uvIndexToRisk } from "../utility";
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
		};
		try {
			if (aqi !== undefined && aqi.length > 0) {
				let num = 0;
				for (let i = 0; i < aqi.length; i++) {
					if (aqi[i].AQI > num) {
						num = aqi[i].AQI;
					}
				}
				setAQI(num);
				whatColor(num);
			} else {
				const aqius = data.days[0].hours[getStartingIndex()].aqius;
				setAQI(aqius);
				whatColor(aqius);
			}
		} catch (e) {
			console.log("AirNow API aqi error" + e);
			setAQI(null);
			whatColor(null);
		}
	}, [data, color, aqi, AQI, timezone]);

	return (
		<div className="flex flex-col items-center h-full justify-between">
			<div className="flex flex-row items-baseline justify-start w-full">
				<div className="text-2xl text-left inline-flex mr-2">Current Weather</div>
				<div className="tracking-wide inline-flex dark:text-gray-400">As of {locationHourFormatter.format(data.currentConditions.datetimeEpoch * 1000)}</div>
			</div>
			<div className="flex flex-col w-full justify-start mt-8">
				<div className="flex flex-row w-full h-full items-center ">
					<div className="flex flex-col">
						<div className="inline-flex">
							<div className="">{getIcon(data.currentConditions.icon, 60)}</div>
							<div className="text-6xl font-light ml-3">{`${Math.round(data.currentConditions.temp)}`}</div>
							<span className="text-3xl font-light pb-5">{units.tempSign}</span>
						</div>
					</div>

					<div className="flex flex-col ml-3 justify-evenly h-full">
						<label className="flex mix-blend-overlay">{data.currentConditions.conditions}</label>
						<div className="flex">
							<label className="mr-1.5">Feels like </label>
							{Math.round(data.currentConditions.feelslike)}°
						</div>
						{data.currentConditions.precipprob > 0 && (
							<div className="inline-flex items-center">
								<GiWaterDrop size={17} className="text-sky-500 -ml-1 mr-1" />
								<div className="">{Math.round(data.currentConditions.precipprob)}%</div>
							</div>
						)}
					</div>
				</div>
				{data.days[0].description !== undefined && <div className="flex flex-row flex-auto w-full justify-start mt-3">{data.days[0].description}</div>}
				<div className="flex flex-row font-light text-cyan-200 whitespace-nowrap">
					<div className="mr-1">Day {Math.round(data.days[0].tempmax)}° •</div> <div> Night {Math.round(data.days[0].tempmin)}°</div>
				</div>
			</div>

			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-col"></div>
			</div>
			{alert.length > 0 && <div className="my-5"></div>}
			<div className="flex flex-wrap text-base items-center w-full  justify-around md:justify-between mt-5 md:mt-0 ">
				{AQI !== null && (
					<div className="inline-flex flex-col">
						<div className="text-md text-cyan-200">Air Quality</div>
						<div className="flex items-center">
							<div style={{ backgroundColor: color }} className={"mr-1 ml-1 h-3 w-3 inline-flex items-center rounded-full"}></div>

							<div className="">{AQI}</div>
						</div>
					</div>
				)}
				<div className="inline-flex flex-col">
					<div className="text-md text-cyan-200">Humidity</div>
					<div>{Math.round(data.currentConditions.humidity)}%</div>
				</div>
				<div className="inline-flex flex-col">
					<div className="text-md text-cyan-200">Wind</div>
					<div>
						{Math.round(data.currentConditions.windspeed)} {units.wind}
					</div>
				</div>
				<div className="inline-flex flex-col">
					<div className="text-md text-cyan-200">Pressure</div>
					<div>
						{Math.round(data.currentConditions.pressure)} {units.pressure}
					</div>
				</div>
				<div className="inline-flex flex-col items-center mt-3">
					<div className="text-cyan-200">UV Index</div>
					<div className="inline-flex ">
						{data.currentConditions.uvindex}
						{" - "}
						{uvIndexToRisk(data.currentConditions.uvindex)}
					</div>
					<div className="text-left min-w-[5rem]">
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
	);
};
export default CurrentWeather;
