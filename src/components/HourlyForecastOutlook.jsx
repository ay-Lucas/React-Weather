/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getIcon } from "./Icons";
import InterpretWeather from "./InterpretWeather";
export default function HourlyForecastOutlook({ data, model, units }) {
	const [times, setTimes] = useState([]);
	const [startingIndex, setStartingIndex] = useState(0);
	const [hours, setHours] = useState([]);
	// const [weathercode, setWeathercode] = useState([]);
	// const [temperature, setTemperature] = useState([]);
	// const [isDay, setIsDay] = useState(1);
	// const [precipChance, setPrecipChance] = useState(0);
	// console.log("HourlyForecastOutlook rendered");
	useEffect(() => {
		// 	//need to subtract 1 from the hour because the weathercode array starts at 0
		// 	//need to account for possible negative number
		// 	console.log(startingIndex);
		// 	setIsDay(data.current_weather.is_day);
		// 	if (model === "gfs_global") {
		// 		setWeathercode(data.hourly.weathercode_gfs_global);
		// 		setTemperature(data.hourly.temperature_2m_gfs_global);
		// 		// setPrecipChance(data.hourly.precipitation_probability_gfs_global);
		// 	} else if (model === "gfs_hrrr") {
		// 		setWeathercode(data.hourly.weathercode_gfs_hrrr);
		// 		setTemperature(data.hourly.temperature_2m_gfs_hrrr);
		// 		// setPrecipChance(data.hourly.precipitation_probability_gfs_hrrr);
		// 	} else if (model === "gfs_seamless") {
		// 		setWeathercode(data.hourly.weathercode_gfs_seamless);
		// 		setTemperature(data.hourly.temperature_2m_gfs_seamless);
		// 		// setPrecipChance(data.hourly.precipitation_probability_gfs_seamless);
		// 	} else if (model === "ecmwf_ifs04") {
		// 		setWeathercode(data.hourly.weathercode_ecmwf_ifs04);
		// 		setTemperature(data.hourly.temperature_2m_ecmwf_ifs04);
		// 		// setPrecipChance(data.hourly.precipitation_probability_ecmwf_ifs04);
		// 	} else if (model === "best_match") {
		// 		setWeathercode(data.hourly.weathercode_best_match);
		// 		setTemperature(data.hourly.temperature_2m_best_match);
		// 		// setPrecipChance(data.hourly.precipitation_probability_best_match);
		// 	} else {
		// 		console.log("Hourly Forecast Outlook: Model not found");
		// 	}

		const getHours = () => {
			// const currentTime = new Date();
			const SEVENTY_HOURS = 70;
			const currentTime = new Date(data.currentConditions.datetimeEpoch * 1000);
			let now = currentTime.getHours() + 1;
			setStartingIndex(now);
			console.log(currentTime);
			console.log(startingIndex);
			console.log(currentTime.getHours() - 1);
			const roundedTimes = [];

			for (let i = 0; i < SEVENTY_HOURS; i++) {
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

		setTimes(getHours());
		iterate();
	}, [data, startingIndex]);
	// const getTemps = () => {
	// 	let hoursArray = [];
	// 	let days = data.days.slice(0, 5);
	// 	days.forEach((day) => {
	// 		day.hours.forEach((hour) => {
	// 			hoursArray.push(hour.temp);
	// 		});
	// 	});
	// 	let hours = hoursArray.slice(startingIndex);
	// 	console.log(hours);
	// 	return hours;
	// };

	//did it this way because I couldn't figure out how to get the index of the array
	const iterate = () => {
		let array = [];
		let days = data.days.slice(0, 5);
		days.forEach((day, i) => {
			day.hours.map((hour, index) => {
				if (!(i === 0 && index < startingIndex)) {
					array.push(hour);
				}
			});
			console.log(array);
		});
		setHours(array);
	};

	return (
		<div className="mx-2">
			<div className=" text-left mb-4 w-full ">
				<h1 className="text-2xl ">Hourly</h1>
			</div>
			{times.map((time, index) => (
				<div
					// key={data}
					className="flex items-center flex-nowrap whitespace-nowrap w-full py-2"
				>
					<h1 className="flex items-center order-1 lg:text-lg sm:text-md flex-nowrap w-1/4">
						{time}
					</h1>
					{/* {data.days.map((day, index) => console.log(index + " " + day.hours))} */}

					<div className="flex items-center mx-5 order-2 ">
						{/* {getIcon(data.days[0].hours[startingIndex + index].icon)} */}
						{getIcon(hours[index].icon)}

						<div className="flex  items-center mx-4 order-3">
							{/* {data.days[0].hours[startingIndex + index].conditions} */}
							{hours[index].conditions}
						</div>
					</div>
					<h2 className="flex items-center flex-auto order-4 text-md justify-end ">
						{/* {Math.round(data.days[0].hours[startingIndex + index].temp) + "°"} */}
						{Math.round(hours[index].temp) + "°"}
						{/* {hours[index].datetime} */}
					</h2>
				</div>
			))}
		</div>
	);
}
