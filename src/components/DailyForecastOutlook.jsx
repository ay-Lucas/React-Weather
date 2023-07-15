/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getIcon } from "./Icons";
export default function HourlyForecastOutlook({
	data,
	model,
	units,
	timezone,
}) {
	const [days, setDays] = useState([]);
	const weekDay = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		weekday: "short",
	});
	const dayFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		day: "numeric",
	});
	useEffect(() => {
		const getNextDays = () => {
			const currentDay = new Date(data.currentConditions.datetimeEpoch * 1000);
			const nextDays = [];
			for (let i = 0; i < data.days.length; i++) {
				const nextDay = new Date(
					currentDay.getTime() + i * 60 * 60 * 1000 * 24
				);
				nextDays.push(
					weekDay.format(nextDay) + " " + dayFormatter.format(nextDay)
				);
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
	return (
		<div className="mx-2">
			<div className="text-left mb-4">
				<h1 className="text-2xl">Daily</h1>
			</div>
			{days.map((days, index) => (
				<div
					key={days + " " + index}
					className="flex items-center flex-nowrap  whitespace-nowrap w-full py-2"
				>
					<h1
						key={index}
						className="flex items-center order-1 lg:text-lg sm:text-md flex-nowrap w-1/4"
					>
						{days}
					</h1>
					<div className="flex  items-center mx-5 order-2">
						{getIcon(data.days[index].icon, 30)}
						<div className="flex  items-center mx-4 order-3">
							{data.days[index].conditions}
						</div>
					</div>
					<h2 className="flex items-center flex-auto order-4 text-md justify-end">
						{Math.round(data.days[index].tempmax)}° /{" "}
						{Math.round(data.days[index].tempmin)}°
					</h2>
				</div>
			))}
		</div>
	);
}
