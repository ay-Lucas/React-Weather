import { blue, lightBlue, orange, yellow } from "@mui/material/colors";
import { BsEye, BsMoonStars, BsSun, BsSunrise, BsSunset, BsThermometerHalf, BsThermometerHigh, BsUmbrella } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";
import { PiWindFill } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { decimalToMoonPhase, degreesToWindDirection } from "../utility";
import MoonIcons from "./MoonIcons";

/* eslint-disable react/prop-types */
const Today = ({ data, units, timezone }) => {
	const hourFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour: "numeric",
		minute: "numeric",
		// minute: "numeric",
	});
	const dateFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		day: "numeric",
		month: "numeric",
		weekday: "long",
	});
	return (
		<div>
			<div className="w-full items-center flex flex-row justify-between">
				<div className="text-2xl inline-flex mr-3">Today</div>
				<div className="text-md text-gray-300 ">{dateFormatter.format(new Date())}</div>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<BsThermometerHalf size={20} />
					</div>
					<div className="text-cyan-200">Temperature</div>
				</div>
				<label className="whitespace-nowrap">
					{Math.round(data.days[0].tempmax)}° / {Math.round(data.days[0].tempmin)}°
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<BsThermometerHigh size={20} />
					</div>
					<div className="text-cyan-200">Feels Like</div>
				</div>
				<label>
					{Math.round(data.days[0].feelslikemax)}° / {Math.round(data.days[0].feelslikemin)}°
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<GiWaterDrop size={17} className="text-sky-500" />
					</div>
					<div className="text-cyan-200">Precipitation Probability</div>
				</div>

				<label>{data.days[0].precipprob}%</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<PiWindFill size={20} />
					</div>
					<div className="text-cyan-200">Wind</div>
				</div>
				<label>
					{Math.round(data.days[0].windspeed)} {units.wind}
					<div className="text-gray-300 ml-1 inline items-center">{degreesToWindDirection(data.days[0].winddir)} </div>
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1 h-[20px]">
						<WiHumidity size={24} />
					</div>
					<div className="text-sky-300">Humidity</div>
				</div>
				<div>{Math.round(data.days[0].humidity)}%</div>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px]">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<BsSunrise size={20} color={yellow[500]} />
					</div>
					<div className="text-cyan-200">Sunrise</div>
				</div>
				<div>{`${hourFormatter.format(new Date(data.days[0].sunriseEpoch * 1000))}`} </div>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px]">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<BsSunset size={20} color={orange[300]} />
					</div>
					<div className="text-cyan-200">Sunset</div>
				</div>
				<div>{`${hourFormatter.format(new Date(data.days[0].sunsetEpoch * 1000))}`} </div>
			</div>
			{/* <div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px]">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<BsSun size={20} />
					</div>
					<div className="text-cyan-200">Day Length</div>
				</div>
				<div>{getDayLength(data.days[index].sunriseEpoch, data.days[index].sunsetEpoch)[0]}</div>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px]">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<BsMoonStars size={17} />
					</div>
					<div className="text-cyan-200">Night Length</div>
				</div>
				<div>{getDayLength(data.days[index].sunriseEpoch, data.days[index].sunsetEpoch)[1]}</div>
			</div> */}
			<div className="flex flex-row justify-between py-2">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<MoonIcons decimal={data.days[0].moonphase} size={23} className={"-ml-0.5"} />
					</div>
					<div className="text-sky-300">Moon Phase</div>
				</div>
				<div className="inline-flex items-center">{decimalToMoonPhase(data.days[0].moonphase)}</div>
			</div>
		</div>
	);
};
export default Today;
