/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
		<div className="mx-2">
			<div className=" text-left mb-4 w-full ">
				<h1 className="text-2xl ">Hourly</h1>
			</div>
			{times.map((time, index) => (
				<div key={uuidv4()} className="text-center">
					{(time === "12 AM" || time === "0") && (
						<div className="my-3 text-[#63c1ff] font-semibold  rounded-lg w-full py-4">
							{dateFormatter.format(
								new Date(
									hours[index].datetimeEpoch * 1000 +
										`${index / 24}` * 24 * 60 * 60
								)
							)}
						</div>
					)}
					<div className="flex items-center flex-nowrap whitespace-nowrap w-full py-2">
						<h1 className="flex items-center order-1 lg:text-lg sm:text-md flex-nowrap w-1/4">
							{time}
						</h1>
						<div className="flex items-center mx-5 order-2 ">
							{getIcon(hours[index].icon)}

							<div className="flex  items-center mx-4 order-3">
								{hours[index].conditions}
							</div>
						</div>
						<h2 className="flex items-center flex-auto order-4 text-md justify-end ">
							{Math.round(hours[index].temp) + "°"}
							{/* {hours[index].datetime} */}
						</h2>
					</div>
				</div>
			))}
		</div>
	);
}
