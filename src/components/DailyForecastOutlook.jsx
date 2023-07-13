/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getIcon } from "./Icons";
export default function HourlyForecastOutlook({ data, model, units }) {
	const [days, setDays] = useState([]);
	// const [weathercode, setWeathercode] = useState(0);
	// const [tempMax, setTempMax] = useState(0);
	// const [tempMin, setTempMin] = useState(0);
	// const [isDay, setIsDay] = useState(1);
	useEffect(() => {
		// setIsDay(data.current_weather.is_day);
		// if (model === "gfs_global") {
		// 	setWeathercode(data.daily.weathercode_gfs_global);
		// 	setTempMax(data.daily.temperature_2m_max_gfs_global);
		// 	setTempMin(data.daily.temperature_2m_min_gfs_global);
		// } else if (model === "gfs_hrrr") {
		// 	setTempMax(data.daily.temperature_2m_max_gfs_hrrr);
		// 	setTempMin(data.daily.temperature_2m_min_gfs_hrrr);
		// 	//weathercode not available
		// 	setWeathercode(data.daily.weathercode_gfs_global);
		// } else if (model === "gfs_seamless") {
		// 	setWeathercode(data.daily.weathercode_gfs_seamless);
		// 	setTempMax(data.daily.temperature_2m_max_gfs_seamless);
		// 	setTempMin(data.daily.temperature_2m_min_gfs_seamless);
		// } else if (model === "ecmwf_ifs04") {
		// 	setWeathercode(data.daily.weathercode_ecmwf_ifs04);
		// 	setTempMax(data.daily.temperature_2m_max_ecmwf_ifs04);
		// 	setTempMin(data.daily.temperature_2m_min_ecmwf_ifs04);
		// } else if (model === "best_match") {
		// 	setWeathercode(data.daily.weathercode_best_match);
		// 	setTempMin(data.daily.temperature_2m_min_best_match);
		// 	setTempMax(data.daily.temperature_2m_max_best_match);
		// } else {
		// 	console.log("Daily Forecast Outlook: Model not found");
		// }
		const getNextDays = () => {
			const currentDay = new Date(data.currentConditions.datetimeEpoch * 1000);
			const nextFiveDays = [];
			for (let i = 0; i < data.days.length; i++) {
				const nextDay = new Date(
					currentDay.getTime() + i * 60 * 60 * 1000 * 24
				);
				nextFiveDays.push(
					nextDay.toLocaleDateString([], {
						weekday: "short",
					}) +
						" " +
						nextDay.toLocaleString([], {
							day: "2-digit",
						})
				);
			}

			return nextFiveDays;
		};
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
						{/* <InterpretWeather
							code={weathercode[index]}
							isDay={isDay}
							size={25}
							includeDescription={false}
							key={days}
						/> */}
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
