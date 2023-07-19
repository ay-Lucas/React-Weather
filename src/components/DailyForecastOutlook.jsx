/* eslint-disable react/prop-types */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useEffect, useState } from "react";
import { BsCloud, BsCloudFill, BsEye, BsFillCircleFill, BsSunrise, BsSunset, BsThermometerHalf, BsUmbrella } from "react-icons/bs";
import { GiDew, GiWaterDrop } from "react-icons/gi";
import { MdDewPoint } from "react-icons/md";
import { PiWindFill } from "react-icons/pi";
import { TbGauge } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { v4 as uuidv4 } from "uuid";
import { decimalToMoonPhase, degreesToWindDirection, uvIndexToColor, uvIndexToPercent, uvIndexToRisk } from "../utility";
import { getIcon } from "./Icons";
import MoonIcons from "./MoonIcons";
export default function HourlyForecastOutlook({ data, model, units, timezone }) {
	const [days, setDays] = useState([]);
	const [sunrise, setSunrise] = useState(0);
	const [sunset, setSunset] = useState(0);
	const [dayLength, setDayLength] = useState(0);
	const weekDay = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		weekday: "short",
	});
	const dayFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		day: "numeric",
	});
	const hourFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour: "numeric",
		minute: "numeric",
	});
	useEffect(() => {
		const getNextDays = () => {
			const currentDay = new Date(data.currentConditions.datetimeEpoch * 1000);
			const nextDays = [];
			for (let i = 0; i < data.days.length; i++) {
				const nextDay = new Date(currentDay.getTime() + i * 60 * 60 * 1000 * 24);
				nextDays.push(weekDay.format(nextDay) + " " + dayFormatter.format(nextDay));
			}

			return nextDays;
		};
		// const getNextDays = () => {
		// 	const currentDay = new Date(data.currentConditions.datetimeEpoch * 1000);
		// 	const nextFiveDays = [];
		// 	for (let i = 0; i < data.days.length; i++) {
		// 		const nextDay = new Date(
		// 			currentDay.getTime() + i * 60 * 60 * 1000 * 24
		// 		);
		// 		nextFiveDays.push(
		// 			nextDay.toLocaleDateString([], {
		// 				weekday: "short",
		// 			}) +
		// 				" " +
		// 				nextDay.toLocaleString([], {
		// 					day: "2-digit",
		// 				})
		// 		);
		// 	}

		// 	return nextFiveDays;
		// };
		setDays(getNextDays());
	}, [data, model, units]);
	function getDayLength(sunriseEpoch, sunsetEpoch) {
		const sunrise = new Date(sunriseEpoch * 1000);
		const sunset = new Date(sunsetEpoch * 1000);
		const dayLengthMilliseconds = sunset - sunrise;
		const dayLengthHours = Math.floor(dayLengthMilliseconds / (1000 * 60 * 60));
		const dayLengthMinutes = Math.floor((dayLengthMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
		const nightLengthMilliseconds = 24 * 60 * 60 * 1000 - dayLengthMilliseconds;
		const nightLengthHours = Math.floor(nightLengthMilliseconds / (1000 * 60 * 60));
		const nightLengthMinutes = Math.floor((nightLengthMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

		// console.log(dayLengthHours, dayLengthMinutes);
		return `${dayLengthHours} hrs ${dayLengthMinutes} min ${nightLengthHours} hrs ${nightLengthMinutes} min`;
	}
	return (
		<div className="pt-5 bg-[#0a1929]/30 rounded-2xl shadow-2xl pb-2.5 justify-evenly">
			<div className="text-left mb-4">
				<div className="text-2xl text-left ml-4">Daily Forecast</div>
			</div>
			{days.map((days, index) => (
				<Accordion
					key={uuidv4()}
					variant="outlined"
					disableGutters
					expanded={index === 0}
					className="bg-[#3d759a] text-white opacity-100 bg-clip-text hover:opacity-100  hover:bg-[#3d759a] hover:bg-opacity-100 hover:shadow-md hover:text-white "
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: "white" }} />} aria-controls="panel1a-content" id="panel1a-header">
						<div key={days + " " + index} className="flex items-center w-full py-2">
							<div className="flex items-center order-1 lg:text-lg sm:text-md basis-44 flex-wrap">{days}</div>
							<div className="flex items-center basis-44 order-2 text-md">
								<span className="font-semibold">{Math.round(data.days[index].tempmax)}° / </span>
								{Math.round(data.days[index].tempmin)}°
							</div>
							<div className="flex items-center basis-0 md:basis-80 order-3 justify-start">
								{getIcon(data.days[index].icon, 30)}
								<div className="flex  items-center ml-1 md:ml-4 ">{data.days[index].conditions}</div>
							</div>
							<div className="flex order-4 md:basis-36 basis-auto items-center">
								<GiWaterDrop size={17} className="text-sky-500" />
								<div className="">{Math.round(data.days[index].precipprob)}%</div>
							</div>

							<div className="flex order-5 md:basis-36 basis-auto justify-start items-center">
								<span>
									<PiWindFill size={20} className="text-gray-400" />
								</span>
								<div className="text-gray-300 mx-1 text-sm">{degreesToWindDirection(data.days[index].winddir)} </div>
								<div>
									{Math.round(data.days[index].windspeed)} {units.wind}
								</div>
							</div>
						</div>
					</AccordionSummary>
					<AccordionDetails color="primary" className="border-t-[1.5px]  bg-gray-100/10 border-slate-950/30 pt-5">
						<div className="flex flex-row justify-start mb-2 ml-4 text-gray-100 ">{data.days[index].description}</div>
						<div className="flex flex-row flex-wrap items-center border-slate-950/30 rounded-lg">
							<div className="flex sm:flex-row flex-col w-full flex-wrap justify-around p-2 mb-0  border-slate-950/30">
								<div className="flex flex-col sm:mr-3 mr-0 justify-evenly flex-1  ">
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-1">
												<BsThermometerHalf size={20} className="" />
											</div>
											<div className="text-sky-300">Feels Like</div>
										</div>
										<div>
											{Math.round(data.days[index].feelslikemax)}° / {Math.round(data.days[index].feelslikemin)}°
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-1">
												<BsUmbrella size={20} className="" />
											</div>
											<div className="text-sky-300">Precipitation</div>
										</div>
										<div>
											{data.days[index].precip} {units.precipitation}
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-1 justify-start">
												<WiHumidity size={23} className="" />
											</div>
											<div className="text-sky-300">Humidity</div>
										</div>
										<div>{Math.round(data.days[index].humidity)}%</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-1">
												<PiWindFill size={20} />
											</div>
											<div className="text-sky-300">Wind Gusts</div>
										</div>
										<div>
											{Math.round(data.days[index].windgust)} {units.wind}
										</div>
									</div>
								</div>
								<div className="flex flex-col sm:ml-3 ml-0 justify-evenly flex-1">
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-start justify-start">
											<div className="basis-7 mt-1">
												<GiDew size={17} className="" />
											</div>
											<div className=" text-sky-300">Dew Point</div>
										</div>
										<div>{Math.round(data.days[index].dew)}°</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-start justify-start">
											<div className="basis-7 mt-1">
												<BsCloudFill size={17} className="" />
											</div>
											<div className=" text-sky-300">Cloud Cover</div>
										</div>
										<div>{Math.round(data.days[index].cloudcover)}%</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-start justify-start">
											<div className="basis-7 mt-1">
												<TbGauge size={17} className="" />
											</div>
											<div className=" text-sky-300">Pressure</div>
										</div>
										<div>
											{Math.round(data.days[index].pressure)} {units.pressure}
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-start justify-start">
											<div className="basis-7 mt-1">
												<BsEye size={17} className="" />
											</div>
											<div className=" text-sky-300">Visibility</div>
										</div>
										<div>
											{Math.round(data.days[index].visibility)} {units.visibility}
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-row items-center p-2 w-full flex-wrap justify-around ">
								<div className="flex flex-col items-center p-4 bg-slate-800/80 rounded-lg shadow-lg">
									<div className="text-sky-300">Max UV Index</div>
									<div className="text-left">
										<div className="inline-flex">{data.days[index].uvindex}</div>
										{" - "}
										{uvIndexToRisk(data.days[index].uvindex)}
										<div
											style={{
												marginTop: "0.75rem",
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
											color={`${uvIndexToColor(data.days[index].uvindex)}`}
											style={{
												color: `${uvIndexToColor(data.days[index].uvindex)}`,
												marginTop: "-.35rem",
												marginLeft: `${uvIndexToPercent(data.days[index].uvindex)}`,
											}}
										/>
									</div>
								</div>
								<div className="flex flex-col items-center p-3.5 px-4 bg-slate-800/70 rounded-lg shadow-lg">
									<div className="text-sky-300 mb-2">Moon</div>
									<div className="inline-flex items-center mb-2">
										<MoonIcons decimal={data.days[index].moonphase} size={23} />
										<div className="ml-2">{decimalToMoonPhase(data.days[index].moonphase)}</div>
										<div className="text-left text-lg"></div>
									</div>
								</div>
								<div className="flex flex-col items-start p-4 py-5 bg-slate-800/60 rounded-lg shadow-lg">
									<div className="flex flex-row items-center mb-2">
										<BsSunrise size={16} className="mx-1" color="orange" />
										<div className="text-sky-300 flex items-center mr-2">Sunrise</div>
										<div className="flex flex-row">{`${hourFormatter.format(new Date(data.days[index].sunriseEpoch * 1000))}`} </div>
									</div>
									<div className="flex flex-row items-center">
										<BsSunset size={16} className="mx-1" color="orange" />
										<div className="text-sky-300 flex items-center mr-3">Sunset</div>
										<div className="flex flex-row">{`${hourFormatter.format(new Date(data.days[index].sunsetEpoch * 1000))}`}</div>
										{/* <div>
									{getDayLength(
										data.days[index].sunriseEpoch,
										data.days[index].sunsetEpoch
									)}
								</div> */}
									</div>
								</div>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
}
