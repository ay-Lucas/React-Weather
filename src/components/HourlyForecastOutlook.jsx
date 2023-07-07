/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { BsFillCloudLightningRainFill } from "react-icons/bs";
import InterpretWeather from "./InterpretWeather";

export default function HourlyForecastOutlook({ data, model, units }) {
	const [times, setTimes] = useState([]);
	const [startingIndex, setStartingIndex] = useState(0);
	const [weathercode, setWeathercode] = useState(0);
	const [temperature, setTemperature] = useState(0);
	const [isDay, setIsDay] = useState(false);
	useEffect(() => {
		setStartingIndex(new Date(Date.now()).getHours());
		setIsDay(data.current_weather.is_day);
		if (model === "gfs_global") {
			setWeathercode(data.hourly.weathercode_gfs_global);
			setTemperature(data.hourly.temperature_2m_gfs_global);
		} else if (model === "gfs_hrrr") {
			setWeathercode(data.hourly.weathercode_gfs_hrrr);
			setTemperature(data.hourly.temperature_2m_gfs_hrrr);
		} else if (model === "gfs_seamless") {
			setWeathercode(data.hourly.weathercode_gfs_seamless);
			setTemperature(data.hourly.temperature_2m_gfs_seamless);
		} else if (model === "ecmwf_ifs04") {
			setWeathercode(data.hourly.weathercode_ecmwf_ifs04);
			setTemperature(data.hourly.temperature_2m_ecmwf_ifs04);
		} else if (model === "best_match") {
			setWeathercode(data.hourly.weathercode_best_match);
			setTemperature(data.hourly.temperature_2m_best_match);
		} else {
			console.log("Hourly Forecast Outlook: Model not found");
		}

		const getNextFiveRoundedHours = () => {
			const currentTime = new Date();
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
	}, [data, model, units]);
	// {
	// 	data.hourly.weathercode_best_match[startingIndex + index];

	// let starting_hourly_index = new Date(data.current_weather.time)
	// 	.toTimeString()
	// 	.split(":")[0];

	//starting_hourly_index = parseInt(starting_hourly_index);
	//console.log(typeof starting_hourly_index);
	//data.hourly_units.temperature_2m
	return (
		<div className="mx-2">
			<div className=" text-left mb-4 ">
				<h1 className="text-2xl">Hourly</h1>
			</div>
			{times.map((time, index) => (
				<div key={index} className="flex items-center flex-nowrap w-full py-2">
					<h1
						key={index}
						className="flex items-center flex-auto order-1 lg:text-lg sm:text-md flex-nowrap w-1/3"
					>
						{time}
					</h1>
					<div className="flex items-center justify-center order-2 w-1/3">
						<InterpretWeather
							code={weathercode[startingIndex + index]}
							isDay={isDay}
							size={20}
							includeDescription={true}
						/>
					</div>
					<h2 className="flex items-center flex-auto order-3 text-md justify-end w-1/3">
						{Math.round(temperature[startingIndex + index]) + "°"}
					</h2>
				</div>
			))}
		</div>
	);
}
// 	<div className="mx-2 w-full">
// 		<div className=" text-left mb-4 ">
// 			<h1 className="text-2xl">Hourly</h1>
// 		</div>
// 		{times.map((time, index) => (
// 			<div key={index} className="flex flex-row justify-between py-2 ">
// 				<h1
// 					key={index}
// 					className="lg:text-lg sm:text-md text-left flex flex-row"
// 				>
// 					{time}
// 				</h1>
// 				<div className="justify-center">
// 					<InterpretWeather
// 						code={data.hourly.weathercode[startingIndex + index]}
// 						isDay={data.current_weather.is_day}
// 						size={20}
// 					/>
// 				</div>
// 				<h2 className="text-md text-right flex-row flex">
// 					{data.hourly.temperature_2m[startingIndex + index] + "°"}
// 				</h2>
// 			</div>
// 		))}
// 	</div>
// );
