import { useEffect, useState } from "react";
export default function HourlyForecastOutlook() {
	const [times, setTimes] = useState([]);

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
						hour: "2-digit",
						minute: "2-digit",
					})
				);
			}

			return roundedTimes;
		};

		setTimes(getNextFiveRoundedHours());
	}, []);
	//border-gray-800 border-b-[1px]
	return (
		<div className="mx-2">
			<div className="w-full text-left mb-4">
				<h1 className="text-2xl">Daily Forecast</h1>
			</div>
			{times.map((time, index) => (
				<div key={index} className="flex flex-row justify-between py-2 ">
					<h1 key={index} className="lg:text-lg sm:text-md">
						{time}
					</h1>
					<h2 className="text-md text-right">90°F / 80°F</h2>
				</div>
			))}
		</div>
	);
}
