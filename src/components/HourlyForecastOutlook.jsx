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
			<div className="text-2xl mb-2 ml-4 ">Hourly</div>
			<HorizontalScroll>
				{times.map((time, index) => (
					<div key={uuidv4()} className="flex flex-col justify-center items-center">
						<div key={uuidv4()} className="flex flex-col py-1 justify-evenly bg-slate-950/20 rounded-lg mr-3">
							{(time === "12 AM" || time === "0") && (
								<div className="ml-2 text-center  text-gray-100 text-sm my-2 font-semibold">
									{dateFormatter.format(new Date(hours[index].datetimeEpoch * 1000 + `${index / 24}` * 24 * 60 * 60))}
								</div>
							)}
							<div className="flex justify-center items-center text-sky-300 font-semibold">{time}</div>
							<div className=" my-2 text-2xl inline-flex items-center justify-center">
								<div className="mr-2">{getIcon(hours[index].icon, 25)}</div>
								{Math.round(hours[index].temp) + "°"}
								{/* {hours[index].datetime} */}
							</div>
							<div className="flex flex-row flex-wrap justify-center w-40">{hours[index].conditions}</div>
						</div>
					</div>
				))}
			</HorizontalScroll>
		</div>
	);
}
