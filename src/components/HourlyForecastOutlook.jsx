/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import InterpretWeather from "./InterpretWeather";

export default function HourlyForecastOutlook({ data, model, units }) {
	const [times, setTimes] = useState([]);
	const [startingIndex, setStartingIndex] = useState(0);
	const [weathercode, setWeathercode] = useState(0);
	const [temperature, setTemperature] = useState(0);
	const [isDay, setIsDay] = useState(false);
	const [precipChance, setPrecipChance] = useState(0);
	useEffect(() => {
		//need to subtract 1 from the hour because the weathercode array starts at 0
		//need to account for possible negative number
		setStartingIndex(new Date(data.current_weather.time).getHours().valueOf());
		console.log(startingIndex);
		setIsDay(data.current_weather.is_day);
		if (model === "gfs_global") {
			setWeathercode(data.hourly.weathercode_gfs_global);
			setTemperature(data.hourly.temperature_2m_gfs_global);
			// setPrecipChance(data.hourly.precipitation_probability_gfs_global);
		} else if (model === "gfs_hrrr") {
			setWeathercode(data.hourly.weathercode_gfs_hrrr);
			setTemperature(data.hourly.temperature_2m_gfs_hrrr);
			// setPrecipChance(data.hourly.precipitation_probability_gfs_hrrr);
		} else if (model === "gfs_seamless") {
			setWeathercode(data.hourly.weathercode_gfs_seamless);
			setTemperature(data.hourly.temperature_2m_gfs_seamless);
			// setPrecipChance(data.hourly.precipitation_probability_gfs_seamless);
		} else if (model === "ecmwf_ifs04") {
			setWeathercode(data.hourly.weathercode_ecmwf_ifs04);
			setTemperature(data.hourly.temperature_2m_ecmwf_ifs04);
			// setPrecipChance(data.hourly.precipitation_probability_ecmwf_ifs04);
		} else if (model === "best_match") {
			setWeathercode(data.hourly.weathercode_best_match);
			setTemperature(data.hourly.temperature_2m_best_match);
			// setPrecipChance(data.hourly.precipitation_probability_best_match);
		} else {
			console.log("Hourly Forecast Outlook: Model not found");
		}

		const getNextFiveRoundedHours = () => {
			// const currentTime = new Date();
			const currentTime = new Date(data.current_weather.time);
			console.log(currentTime);
			const roundedTimes = [];

			for (let i = 0; i < 5; i++) {
				const nextTime = new Date(
					currentTime.getTime() + (i + 1) * 60 * 60 * 1000
				);
				roundedTimes.push(
					nextTime.toLocaleTimeString([], {
						hour: "numeric",
					})
				);
			}
			return roundedTimes;
		};
		setTimes(getNextFiveRoundedHours());
	}, [data, model, startingIndex, units]);
	return (
		<div className="mx-2">
			<div className=" text-left mb-4 ">
				<h1 className="text-2xl">Hourly</h1>
			</div>
			{times.map((time, index) => (
				<div
					key={time}
					className="flex items-center flex-nowrap whitespace-nowrap w-full py-2"
				>
					<h1
						key={index}
						className="flex items-center order-1 lg:text-lg sm:text-md flex-nowrap w-1/4"
					>
						{time}
					</h1>
					<div className="flex  items-center mx-5 order-2 ">
						<InterpretWeather
							code={weathercode[startingIndex + index]}
							isDay={isDay}
							size={25}
							includeDescription={false}
							key={time + " " + weathercode[startingIndex + index]}
						/>
						{/* <>{precipChance[startingIndex + index]}%</> */}
						{/* <InterpretWeather
							code={weathercode[startingIndex + index]}
							isDay={isDay}
							size={20}
							includeDescription={true}
							key={time + " " + weathercode[startingIndex + index]}
						/> */}
						<div className="flex  items-center mx-4 order-3">
							<InterpretWeather
								code={weathercode[startingIndex + index]}
								isDay={isDay}
								size={20}
								includeDescription={"only"}
								key={time + " " + weathercode[startingIndex + index]}
							/>
						</div>
					</div>
					<h2
						key={time + " " + index}
						className="flex items-center flex-auto order-4 text-md justify-end "
					>
						{Math.round(temperature[startingIndex + index]) + "°"}
					</h2>
				</div>
			))}
		</div>
	);
}
