// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import { BsCloudLightningRain } from "react-icons/bs";

export default function Weather() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		setInterval(() => setTime(new Date()), 1000);
	}, []);
	return (
		<div className="rounded-xl justify-center">
			<div className="text-3xl my-2">Current Weather</div>
			<div className="tracking-wide text-gray-300 dark:text-gray-400">
				{time.toLocaleTimeString([], {
					hour: "2-digit",
					hour12: true,
					minute: "2-digit",
				})}
			</div>
			<div className="text-5xl py-2">80°F</div>
			<p>Thunderstorms</p>
			<div className="inline-flex mt-3">
				<BsCloudLightningRain size={50} />
			</div>
		</div>
	);
}
