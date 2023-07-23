/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { GiWaterDrop } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";
// import { HourlyHorizontal } from "./HourlyHorizontal";
import { cyan, grey, lightBlue } from "@mui/material/colors";
import { HourlyInterface } from "./HourlyInterface";
import { getIcon } from "./Icons";

export default function HourlyForecastOutlook({ data, units, timezone }) {
	console.log("HourlyForecastOutlook rendered");
	const date = new Date();
	const [times, setTimes] = useState([]);
	const [startingIndex, setStartingIndex] = useState(date.getHours());
	const [hours, setHours] = useState(0);
	const hourRef = useRef(null);
	const numOfDays = 14;
	const [colors, setColor] = useState([]);
	const colorPallete = [
		grey[50],
		cyan[200],
		grey[50],
		lightBlue["A100"],
		grey[50],
		cyan[200],
		grey[50],
		lightBlue["A100"],
		grey[50],
		cyan[200],
		grey[50],
		lightBlue["A100"],
		grey[50],
		cyan[200],
		grey[50],
	];
	const hoursInDay = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour12: false,
		hour: "2-digit",
		// minute: "numeric",
	});
	const locationHourFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour: "numeric",
	});
	// colors represent different days
	const getHours = () => {
		let colors = [];
		const currentHourStr = hoursInDay.format(date);
		let currentHourNum = parseInt(currentHourStr.split("/")[0]);
		console.log(currentHourNum);
		setStartingIndex(currentHourNum);
		const formattedTimes = [];
		for (let i = 0; i < numOfDays * 24; i++) {
			const nextTime = new Date(date.getTime() + (i + 1) * 60 * 60 * 1000);
			if (i % 24 === 0) {
				for (let j = 0; j < 24; j++) {
					colors.push(colorPallete[i / 24]);
				}
			}
			formattedTimes.push(locationHourFormatter.format(nextTime));
		}
		setColor(colors);
		console.log(colors);
		return formattedTimes;
	};

	const getFutureData = () => {
		let array = [];
		data.days.forEach((day, i) => {
			day.hours.map((hour, index) => {
				if (!(i === 0 && index < startingIndex + 1)) {
					array.push(hour);
				}
			});
		});
		console.log(array);

		return array;
	};
	useEffect(() => {
		setTimes(getHours());
		setHours(getFutureData());
	}, [data, startingIndex, units]);

	return (
		<HourlyInterface hours={hours} data={data} startingIndex={startingIndex} timezone={timezone} colors={colors}>
			{times.map((time, index) => (
				<div key={uuidv4()} ref={hourRef} className="flex flex-col justify-evenly items-center">
					{/* {index % 24 === 0  && getDay(index)} */}
					<div className="flex flex-col py-1 pt-3 bg-slate-950/20 rounded-md justify-between shadow-sm">
						<div className="inline-flex text-2xl items-center justify-center">
							<div className="mr-2">{getIcon(hours[index].icon, 25)}</div>
							{Math.round(hours[index].temp) + "°"}
							{/* {hours[index].datetime} */}
						</div>
						<div className="flex flex-wrap items-center text-center min-h-[3rem] justify-center w-[8.25rem]">{hours[index].conditions}</div>
						{hours[index].precipprob > 0 && (
							<div className="inline-flex items-center justify-center pb-1">
								<GiWaterDrop size={17} className="text-sky-500 -ml-1 mr-1" />
								<div className="">{hours[index].precipprob}%</div>
							</div>
						)}
					</div>
					{
						<div className="inline-flex  text-center items-baseline cursor-default" style={{ color: colors[index + startingIndex + 1] }}>
							{time}
						</div>
					}
				</div>
			))}
		</HourlyInterface>
	);
}
