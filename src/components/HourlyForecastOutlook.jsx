/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HorizontalScroll } from "./HorizontalScroll";
import { getIcon } from "./Icons";

export default function HourlyForecastOutlook({ data, units, timezone }) {
	console.log("HourlyForecastOutlook rendered");
	const date = new Date();
	const [times, setTimes] = useState([]);
	const [startingIndex, setStartingIndex] = useState(date.getHours());
	const [hours, setHours] = useState([]);
	const numOfDays = 2;
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
		month: "numeric",
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

	return (
		<div>
			<div className="text-2xl mb-3 ml-4 ">Hourly</div>
			<HorizontalScroll>
				{times.map((time, index) => (
					<div key={uuidv4()} className="flex flex-col justify-between items-center">
						<div className="flex flex-col py-1 pt-3 bg-slate-950/20 rounded-md justify-between mr-3 shadow-sm">
							<div className="text-center items-baseline text-sky-300 ">
								{time}
								{(time === "12 AM" || time === "0") && (
									<label className="ml-1  items-baseline">
										| {shortDateFormatter.format(new Date(hours[index].datetimeEpoch * 1000 + `${index / 24}` * 24 * 60 * 60))}
									</label>
								)}
							</div>
							<div className="inline-flex mt-3 text-2xl items-center justify-center">
								<div className="mr-2">{getIcon(hours[index].icon, 25)}</div>
								{Math.round(hours[index].temp) + "°"}
								{/* {hours[index].datetime} */}
							</div>
							<div className="flex flex-wrap items-center text-center min-h-[3rem] justify-center w-[8.25rem]">{hours[index].conditions}</div>
						</div>
					</div>
				))}
			</HorizontalScroll>
		</div>
	);
}
