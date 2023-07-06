/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import InterpretWeather from "./InterpretWeather";
export default function HourlyForecastOutlook({ data, model, units }) {
	const [days, setDays] = useState([]);
	const [weathercode, setWeathercode] = useState(0);
	const [tempMax, setTempMax] = useState(0);
	const [tempMin, setTempMin] = useState(0);
	const [isDay, setIsDay] = useState(false);
	useEffect(() => {
		setIsDay(data.current_weather.is_day);
		if (model === "gfs_global") {
			setWeathercode(data.daily.weathercode_gfs_global);
			setTempMax(data.daily.temperature_2m_max_gfs_global);
			setTempMin(data.daily.temperature_2m_min_gfs_global);
		} else if (model === "gfs_hrrr") {
			//weathercode not available
			setTempMax(data.daily.temperature_2m_max_gfs_hrrr);
			setTempMin(data.daily.temperature_2m_min_gfs_hrrr);
		} else if (model === "gfs_seamless") {
			setWeathercode(data.daily.weathercode_gfs_seamless);
			setTempMax(data.daily.temperature_2m_max_gfs_seamless);
			setTempMin(data.daily.temperature_2m_min_gfs_seamless);
		} else if (model === "ecmwf_ifs04") {
			setWeathercode(data.daily.weathercode_ecmwf_ifs04);
			setTempMax(data.daily.temperature_2m_max_ecmwf_ifs04);
			setTempMin(data.daily.temperature_2m_min_ecmwf_ifs04);
		} else if (model === "best_match") {
			setWeathercode(data.daily.weathercode_best_match);
			setTempMin(data.daily.temperature_2m_min_best_match);
			setTempMax(data.daily.temperature_2m_max_best_match);
		} else {
			console.log("Daily Forecast Outlook: Model not found");
		}
		const getNextFiveDays = () => {
			const currentDay = new Date();
			const nextFiveDays = [];
			for (let i = 0; i < 5; i++) {
				const nextDay = new Date(
					currentDay.getTime() + i * 60 * 60 * 1000 * 24
				); // Add (i+1) hours to the current time
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

		setDays(getNextFiveDays());
	}, [data, model, units]);
	//border-gray-800 border-b-[1px]
	return (
		<div className="mx-2">
			<div className="flex text-left mb-4">
				<h1 className="text-2xl">Daily</h1>
			</div>
			{days.map((days, index) => (
				<div key={index} className="flex items-center flex-nowrap w-full py-2 ">
					<h1
						key={index}
						className="flex items-center flex-auto order-1 lg:text-lg sm:text-md flex-nowrap w-1/3"
					>
						{days}
					</h1>
					<div className="flex items-center justify-center order-2 w-1/3">
						<InterpretWeather
							code={weathercode[index]}
							isDay={isDay}
							size={20}
						/>
					</div>
					<h2 className="flex items-center flex-auto order-3 text-md justify-end w-1/3">
						{Math.round(tempMax[index])}° / {Math.round(tempMin[index])}°
					</h2>
				</div>
			))}
		</div>
	);
}
//Grid version -> wraps to next line
// <div key={index} className="grid-cols-3 grid justify-center py-2 ">
// 	<h1 key={index} className="lg:text-lg sm:text-md ">
// 		{days}
// 	</h1>
// 	<div className="m-auto flex">
// 		<IoSunnyOutline size={20} />
// 	</div>
// 	<h2 className="text-md text-right flex">90°F / 80°F</h2>
// </div>;
