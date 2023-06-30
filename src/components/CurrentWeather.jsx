// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import { BsCloudLightningRain } from "react-icons/bs";

export default function Weather() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		setInterval(() => setTime(new Date()), 1000);
	}, []);
	return (
		<div className="text-center">
			<div className="text-3xl mb-1">Current Weather</div>
			<div className="tracking-wide text-gray-300 dark:text-gray-400">
				{time.toLocaleTimeString([], {
					hour: "2-digit",
					hour12: true,
					minute: "2-digit",
				})}
			</div>
			<div className="text-5xl mt-3 mb-1">80°F</div>
			<p className="">Thunderstorms</p>
			<div className="inline-flex mt-5">
				<BsCloudLightningRain size={50} />
			</div>
		</div>
	);
}
