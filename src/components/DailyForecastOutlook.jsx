/* eslint-disable react/prop-types */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { orange, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import {
	BsClockHistory,
	BsCloudFill,
	BsDropletHalf,
	BsEye,
	BsFillCircleFill,
	BsMoonStars,
	BsSun,
	BsSunFill,
	BsSunrise,
	BsSunset,
	BsThermometerHalf,
	BsThermometerHigh,
	BsUmbrella,
} from "react-icons/bs";
import { GiDew, GiWaterDrop } from "react-icons/gi";
import { IoThunderstormOutline } from "react-icons/io5";
import { PiWindFill } from "react-icons/pi";
import { TbGauge } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { v4 as uuidv4 } from "uuid";
import { decimalToMoonPhase, degreesToWindDirection, usAqiToColor, uvIndexToColor, uvIndexToPercent, uvIndexToRisk } from "../utility";
import { getIcon } from "./Icons";
import MoonIcons from "./MoonIcons";
export default function HourlyForecastOutlook({ data, model, units, timezone }) {
	const [days, setDays] = useState([]);
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
	const numericDayAndMonth = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		month: "numeric",
		day: "numeric",
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
		return [`${dayLengthHours} hrs ${dayLengthMinutes} min`, `${nightLengthHours} hrs ${nightLengthMinutes} min`];
	}

	return (
		<div>
			<div className="bg-slate-950/20 rounded-lg shadow-2xl">
				<div className="text-2xl pt-3 mb-2 ml-4">14 Day</div>
				{days.map((days, index) => (
					<Accordion
						TransitionProps={{ unmountOnExit: true }}
						key={uuidv4()}
						variant="outlined"
						// expanded={index === 0}
						disableGutters
						className="bg-[#3d759a] text-white opacity-100 bg-clip-text hover:opacity-100  hover:bg-[#3d759a] hover:bg-opacity-100 hover:shadow-md hover:text-white"
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
							aria-controls="panel1a-content"
							id="panel1a-header"
							className="text-sm md:text-base bg-[#3d759a] text-white opacity-100 bg-clip-text hover:opacity-100  hover:bg-[#3d759a] hover:bg-opacity-100 hover:shadow-md hover:text-white sm:px-4 px-2"
						>
							<div className="grid sm:grid-cols-6 grid-cols-4 w-full items-center text-left">
								<div className="order-1 sm:text-lg text-sm text-gray-200">{days}</div>
								<div className="order-2 text-md text-sky-200 whitespace-nowrap sm:m-0">
									<span className="font-semibold text-white mr-1">{Math.round(data.days[index].tempmax)}° /</span>{" "}
									{Math.round(data.days[index].tempmin)}°
								</div>
								<div className="inline order-3 sm:col-span-2 col-span-1  sm:justify-self-start ml-7 m-auto sm:m-0 sm:w-auto">
									{getIcon(data.days[index].icon, 30, "sm:p-0 sm:mr-2 p-1 inline items-center  ")}
									<span className="hidden items-center ml-1 sm:inline-block">{data.days[index].conditions}</span>
								</div>
								<div className="inline order-4 sm:m-0 m-auto justify-self-start sm:justify-self-start">
									<GiWaterDrop size={17} className="text-sky-500 md:p-0 p-0.5 inline" />
									{Math.round(data.days[index].precipprob)}%
								</div>

								<div className="order-5 sm:inline hidden">
									<span className="mr-1 inline">
										<PiWindFill size={20} className="text-gray-400 md:p-0 p-0.6 inline" />
									</span>
									<div className="text-gray-300 mx-1 text-sm sm:inline hidden">{degreesToWindDirection(data.days[index].winddir)} </div>
									{Math.round(data.days[index].windspeed)} {units.wind}
								</div>
							</div>
						</AccordionSummary>
						<AccordionDetails color="primary" className="border-t-[1.5px]  bg-gray-100/10 border-slate-950/30 pt-5">
							<div className="flex flex-row justify-start mb-2 ml-4 text-gray-100 ">{data.days[index].description}</div>
							<div className="flex sm:flex-row flex-col w-full p-2 mb-0  border-slate-950/30">
								<div className="flex flex-col sm:mr-3 mr-0 sm:justify-start justify-end flex-auto">
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsThermometerHalf size={20} className="" />
											</div>
											<div className="text-cyan-200">Temperature</div>
										</div>
										<div>
											{Math.round(data.days[index].tempmax)}° / {Math.round(data.days[index].tempmin)}°
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsThermometerHigh size={20} className="" />
											</div>
											<div className="text-cyan-200">Feels Like</div>
										</div>
										<div>
											{Math.round(data.days[index].feelslikemax)}° / {Math.round(data.days[index].feelslikemin)}°
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsUmbrella size={20} className="" />
											</div>
											<div className="text-cyan-200">Precipitation</div>
										</div>
										<div>
											{data.days[index].precip} {units.precipitation}
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<GiWaterDrop size={17} className="text-sky-500 ml-0.5" />
											</div>
											<div className="text-cyan-200">Precipitation Probability</div>
										</div>
										<div>{data.days[index].precipprob}%</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsClockHistory size={17} className="" />
											</div>
											<div className=" text-cyan-200">Precipitation Coverage</div>
										</div>
										<div>{Math.round(data.days[index].precipcover)}%</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<WiHumidity size={23} className="text-sky-400" />
											</div>
											<div className="text-cyan-200">Humidity</div>
										</div>
										<div>{Math.round(data.days[index].humidity)}%</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsCloudFill size={17} className="ml-0.5" />
											</div>
											<div className=" text-cyan-200">Cloud Cover</div>
										</div>
										<div>{Math.round(data.days[index].cloudcover)}%</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<IoThunderstormOutline size={20} className="" />
											</div>
											<div className="text-cyan-200">Severe Risk</div>
										</div>
										<div>{data.days[index].severerisk}</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<GiDew size={17} className="" />
											</div>
											<div className=" text-cyan-200">Dew Point</div>
										</div>
										<div>{Math.round(data.days[index].dew)}°</div>
									</div>
									<div className="flex flex-row justify-between py-1 border-gray-800/50 sm:border-0 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsSunFill size={19} />
											</div>
											<div className="text-cyan-200">Max UV Index</div>
										</div>
										<div className="min-w-[5rem] text-center">
											<div className="inline-flex">{data.days[index].uvindex}</div>
											{" - "}
											{uvIndexToRisk(data.days[index].uvindex)}
											<div
												style={{
													background: "linear-gradient(to right, green, yellow, orange, red, violet )",
												}}
												className="mt-[0.3rem] h-[0.2rem] rounded-sm w-[6rem]"
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
								</div>

								<div className="flex flex-col sm:ml-3 ml-0 justify-start flex-auto">
									{data.days[index].aqius !== null && (
										<div className="flex flex-row justify-between items-center py-2 border-gray-800/50  border-b-[1px] ">
											<div className="flex flex-auto items-center justify-start">
												<div className="basis-7 mt-0">
													<div
														style={{ backgroundColor: usAqiToColor(data.days[index].aqius) }}
														className={"mr-1 ml-1 h-3 w-3 inline-flex items-center rounded-full"}
													></div>{" "}
												</div>
												<div className=" text-cyan-200">Air Quality Index (US)</div>
											</div>

											<div className="">{data.days[index].aqius}</div>
										</div>
									)}
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<PiWindFill size={20} />
											</div>
											<div className="text-cyan-200">Wind Speed</div>
										</div>
										<div>
											{Math.round(data.days[index].windspeed)} {units.wind} {degreesToWindDirection(data.days[index].winddir)}
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<PiWindFill size={20} />
											</div>
											<div className="text-cyan-200">Wind Gusts</div>
										</div>
										<div>
											{Math.round(data.days[index].windgust)} {units.wind}
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<TbGauge size={17} className="" />
											</div>
											<div className=" text-cyan-200">Pressure</div>
										</div>
										<div>
											{Math.round(data.days[index].pressure)} {units.pressure}
										</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsEye size={17} className="" />
											</div>
											<div className=" text-cyan-200">Visibility</div>
										</div>
										<div>
											{Math.round(data.days[index].visibility)} {units.visibility}
										</div>
									</div>

									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px]">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsSunrise size={20} color={yellow[500]} />
											</div>
											<div className="text-cyan-200">Sunrise</div>
										</div>
										<div>{`${hourFormatter.format(new Date(data.days[0].sunriseEpoch * 1000))}`} </div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px]">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsSunset size={20} color={orange[300]} />
											</div>
											<div className="text-cyan-200">Sunset</div>
										</div>
										<div>{`${hourFormatter.format(new Date(data.days[0].sunsetEpoch * 1000))}`} </div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px]">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsSun size={20} />
											</div>
											<div className="text-cyan-200">Day Length</div>
										</div>
										<div>{getDayLength(data.days[index].sunriseEpoch, data.days[index].sunsetEpoch)[0]}</div>
									</div>
									<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px]">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<BsMoonStars size={17} />
											</div>
											<div className="text-cyan-200">Night Length</div>
										</div>
										<div>{getDayLength(data.days[index].sunriseEpoch, data.days[index].sunsetEpoch)[1]}</div>
									</div>
									<div className="flex flex-row justify-between py-2">
										<div className="flex flex-auto items-center justify-start">
											<div className="basis-7 mt-0">
												<MoonIcons decimal={data.days[index].moonphase} size={23} className={"-ml-0.5"} />
											</div>
											<div className="text-cyan-200">Moon Phase</div>
										</div>
										<div className="inline-flex items-center">{decimalToMoonPhase(data.days[index].moonphase)}</div>
									</div>
								</div>
							</div>
						</AccordionDetails>
					</Accordion>
				))}
			</div>
		</div>
	);
}
