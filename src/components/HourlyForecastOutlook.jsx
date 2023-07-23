/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { GiWaterDrop } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";
import { HorizontalScroll } from "./HorizontalScroll";
// import { HourlyHorizontal } from "./HourlyHorizontal";
import { HourlyInterface } from "./HourlyInterface";
import { getIcon } from "./Icons";

export default function HourlyForecastOutlook({ data, units, timezone }) {
	console.log("HourlyForecastOutlook rendered");
	const date = new Date();
	const [times, setTimes] = useState([]);
	const [startingIndex, setStartingIndex] = useState(date.getHours());
	const [hours, setHours] = useState([]);
	const [day, setDay] = useState(null);
	const hourRef = useRef(null);
	const numOfDays = 14;

	const hoursInDay = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour12: false,
		hour: "2-digit",
		// minute: "numeric",
	});
	const dateFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		weekday: "long",
		month: "numeric",
		day: "numeric",
	});
	const shortDateFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		weekday: "short",
		day: "numeric",
	});

	const locationHourFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour: "numeric",
	});
	const getHours = () => {
		const currentHourStr = hoursInDay.format(date);
		let currentHourNum = parseInt(currentHourStr.split("/")[0]);
		console.log(currentHourNum);
		setStartingIndex(currentHourNum);
		const formattedTimes = [];
		for (let i = 0; i < numOfDays * 24; i++) {
			const nextTime = new Date(date.getTime() + (i + 1) * 60 * 60 * 1000);
			formattedTimes.push(locationHourFormatter.format(nextTime));
		}

		return formattedTimes;
	};
	useEffect(() => {
		setTimes(getHours());
		setHours(getFutureData());
	}, [data, startingIndex, units]);

	// const getHours = () => {
	// 	const currentHourStr = hoursInDay.format(date);
	// 	let currentHourNum = parseInt(currentHourStr.split("/")[0]);
	// 	console.log(currentHourNum);
	// 	setStartingIndex(currentHourNum);
	// 	const formattedTimes = [];
	// 	for (let i = 0; i < numOfDays * 24; i++) {
	// 		const nextTime = new Date(date.getTime() + (i + 1) * 60 * 60 * 1000);
	// 		formattedTimes.push(hourFormatter.format(nextTime));
	// 	}

	// 	return formattedTimes;
	// };

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
		// let daysCopy = data.days;
		// daysCopy.slice(0, numOfDays);
		// daysCopy[0].hours.splice(0, startingIndex + 1);
		// console.log(daysCopy);
		// daysCopy.forEach((day) => {
		// 	day.hours.map((hour) => {
		// 		array.push(hour);
		// 	});
		// });
		// console.log(array);

		return array;
	};
	const getDay = (index) => {
		// const day = shortDateFormatter.format(new Date(hours[index].datetimeEpoch * 1000));
		if (index % 24 === 0) {
			const daytime = shortDateFormatter.format(new Date(hours[index].datetimeEpoch * 1000));
			setDay(daytime);
		}
		console.log(index);
		console.log(day);
	};
	const handleDate = (index) => {
		console.log(hourRef.current);
	};
	return (
		<HourlyInterface hours={hours} numOfDays={numOfDays} data={data} startingIndex={startingIndex}>
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
					<div className="inline-flex  text-center items-baseline text-sky-300 cursor-default">{time}</div>
				</div>
			))}
		</HourlyInterface>
	);
}
