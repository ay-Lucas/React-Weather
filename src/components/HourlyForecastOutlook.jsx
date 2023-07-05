/* eslint-disable react/prop-types */
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
// import { BsFillCloudLightningRainFill } from "react-icons/bs";
import { IoPartlySunnyOutline } from "react-icons/io5";
import InterpretWeather from "./InterpretWeather";

export default function HourlyForecastOutlook({ data }) {
	const [times, setTimes] = useState([]);
	const [startingIndex, setStartingIndex] = useState(0);
	useEffect(() => {
		const getNextFiveRoundedHours = () => {
			const currentTime = new Date();
			const roundedTimes = [];

			for (let i = 0; i < 5; i++) {
				const nextTime = new Date(
					currentTime.getTime() + (i + 1) * 60 * 60 * 1000
				); // Add (i+1) hours to the current time
				nextTime.setMinutes(0, 0, 0); // Reset minutes, seconds, and milliseconds to 0
				roundedTimes.push(
					nextTime.toLocaleTimeString([], {
						hour: "numeric",
					})
				);
			}

			return roundedTimes;
		};
		startingIndex;
		setStartingIndex(new Date(Date.now()).getHours());
		setTimes(getNextFiveRoundedHours());
	}, []);
	console.log(times[0]);
	console.log(new Date(Date.now()).getHours());
	console.log(data.current_weather.weathercode);

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
							code={data.hourly.weathercode[startingIndex + index]}
							isDay={data.current_weather.is_day}
							size={20}
						/>
					</div>
					<h2 className="flex items-center flex-auto order-3 text-md justify-end w-1/3">
						{Math.round(data.hourly.temperature_2m[startingIndex + index]) +
							"°"}
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
