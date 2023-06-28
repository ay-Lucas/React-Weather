import React, { useEffect, useState } from "react";
import { ReactComponent as Cloudy } from "../assets/icons/Weather Icons 1.1 Sexy/cloudy.svg";
// import { ReactComponent as RainCloud } from "../assets/icons/WeatherIcon - 1-42.svg"
export default function Weather() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		setInterval(() => setTime(new Date()), 1000);
	}, []);
	return (
		<div className="flex-auto w-6/12 mb-3 mx-auto bg-neutral-900 rounded/10 rounded-xl p-5">
			<div className="text-2xl">Current Weather</div>
			<div className="my-2 tracking-wide text-gray-300 dark:text-gray-400">
				{time.toLocaleTimeString([], {
					hour: "2-digit",
					hour12: true,
					minute: "2-digit",
				})}
			</div>
			{/* <RainCloud width={50} height={50} className="mx-auto" /> */}
			<Cloudy width={100} height={100} className="mx-auto" />
			<div className="text-4xl m-2">80°F</div>
		</div>
	);
}
