import { BsEye, BsSunrise, BsSunset, BsThermometerHalf, BsUmbrella } from "react-icons/bs";
import { PiWindFill } from "react-icons/pi";

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
					<div className="text-sky-300">High/Low</div>
				</div>
				<label className="whitespace-nowrap">
					{Math.round(data.days[0].tempmax)}° / {Math.round(data.days[0].tempmin)}°
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<BsThermometerHalf size={20} />
					</div>
					<div className="text-sky-300">Feels Like</div>
				</div>
				<label>
					{Math.round(data.days[0].feelslikemax)}° / {Math.round(data.days[0].feelslikemin)}°
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<BsUmbrella size={20} />
					</div>
					<div className="text-sky-300">Precipitation</div>
				</div>

				<label>{data.days[0].precipprob}%</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-center justify-start">
					<div className="basis-7 mt-1">
						<PiWindFill size={20} />
					</div>
					<div className="text-sky-300">Wind</div>
				</div>
				<label>
					{Math.round(data.days[0].windspeed)} {units.wind}
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800/50 border-b-[1px] ">
				<div className="flex flex-auto items-start justify-start">
					<div className="basis-7 mt-1">
						<BsEye size={17} />
					</div>
					<div className=" text-sky-300">Visibility</div>
				</div>
				<label>
					{data.days[0].visibility} {units.visibility}
				</label>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between py-2 border-gray-800/50">
					<div className="flex flex-auto items-center justify-start">
						<div className="basis-7 mt-1">
							<BsSunrise size={20} color="orange" />
						</div>
						<div className="text-sky-300">Sunrise</div>
					</div>
					<div>{`${hourFormatter.format(new Date(data.days[0].sunriseEpoch * 1000))}`} </div>
				</div>
				<div className="flex flex-row justify-between border-gray-800/50">
					<div className="flex flex-auto items-center justify-start">
						<div className="basis-7 mt-1">
							<BsSunrise size={20} color="orange" />
						</div>
						<div className="text-sky-300">Sunset</div>
					</div>
					<div>{`${hourFormatter.format(new Date(data.days[0].sunsetEpoch * 1000))}`} </div>
				</div>
			</div>
		</div>
	);
};
export default Today;
