/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getIcon } from "./Icons";
export default function HourlyForecastOutlook({ data, units }) {
	console.log("HourlyForecastOutlook rendered");
	const [times, setTimes] = useState([]);
	const [startingIndex, setStartingIndex] = useState([]);
	const [hours, setHours] = useState([]);
	const numOfDays = 5;
	const date = new Date();
	const options = Intl.DateTimeFormat().resolvedOptions();
	const hourFormatter = Intl.DateTimeFormat(options.locale, {
		timeZone: options.timeZone,
		hour: "numeric",
		// minute: "numeric",
	});
	const dateFormatter = Intl.DateTimeFormat(options.locale, {
		timeZone: options.timeZone,
		month: "numeric",
		day: "numeric",
	});

	const getHours = () => {
		const currentHourStr = dateFormatter.format(date);
		let currentHourNum = new Date(currentHourStr).getHours() + 1;
		setStartingIndex(currentHourNum);
		const formattedTimes = [];
		for (let i = 0; i < numOfDays * 24; i++) {
			const nextTime = new Date(date.getTime() + (i + 1) * 60 * 60 * 1000);
			formattedTimes.push(hourFormatter.format(nextTime));
		}

		return formattedTimes;
	};
	useEffect(() => {
		setTimes(getHours());
		setHours(getFutureData());
	}, [data, startingIndex, units]);

	const getFutureData = () => {
		let array = [];
		data.days.forEach((day, i) => {
			day.hours.map((hour, index) => {
				if (!(i === 0 && index < startingIndex)) {
					array.push(hour);
				}
			});
		});
		// let daysCopy = [...data.days];
		// daysCopy.slice(0, numOfDays);
		// daysCopy[0].hours.splice(0, startingIndex);
		// console.log(days);
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
