// eslint-disable-next-line no-unused-vars
import { Circle, CircleRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

import { BsCloudLightningRain } from "react-icons/bs";

export default function Weather() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		setInterval(() => setTime(new Date()), 1000);
	}, []);
	return (
		<div className="flex flex-col text-center items-center justify-between">
			<div className="text-2xl flex mb-4">Current Weather</div>
			<div className="text-center items-center flex flex-col ">
				<div className="flex flex-row">
					<div className="flex flex-col">
						<div className="tracking-wide text-gray-300 dark:text-gray-400">
							As of{" "}
							{time.toLocaleTimeString([], {
								hour: "2-digit",
								hour12: true,
								minute: "2-digit",
							})}
						</div>
						<div className="mt-1">Thunderstorms</div>
					</div>
					<div className="ml-3">
						<BsCloudLightningRain size={50} />
					</div>
				</div>
				{/* <div className="mt-3">
				Expect thunderstorms to continue for the next hour.
			</div> */}
				<div className="text-6xl font-light my-4">80°F</div>
			</div>
			<div className="flex justify-between text-base">
				<div className="inline-flex flex-col px-2">
					<div className="flex">Feels like</div>
					<div>80°F</div>
				</div>
				<div className="inline-flex flex-col items-center px-2">
					<div>Air Quality</div>
					<div className="inline-flex  flex-row items-center justify-center ">
						<div
							className=" mr-1 h-3 w-3 inline-flex items-center rounded-full
						bg-yellow-600"
						></div>
						<div>78</div>
					</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Humidity</div>
					<div>60%</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Wind</div>
					<div>5mph NE</div>
				</div>
				<div className="inline-flex flex-col px-2">
					<div>Wind</div>
					<div>5mph NE</div>
				</div>
			</div>
		</div>
	);
}
