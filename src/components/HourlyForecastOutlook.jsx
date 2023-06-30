import { useEffect, useState } from "react";
import { IoPartlySunnyOutline } from "react-icons/io5";
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
						hour: "numeric",
					})
				);
			}

			return roundedTimes;
		};

		setTimes(getNextFiveRoundedHours());
	}, []);
	//border-gray-800 border-b-[1px]
	return (
		<div className="mx-2 w-full">
			<div className=" text-left mb-4 ">
				<h1 className="text-2xl">Hourly</h1>
			</div>
			{times.map((time, index) => (
				<div key={index} className="flex flex-row justify-between py-2 ">
					<h1
						key={index}
						className="lg:text-lg sm:text-md text-left flex flex-row"
					>
						{time}
					</h1>
					<IoPartlySunnyOutline
						size={20}
						className="justify-center flex flex-row"
					/>
					<h2 className="text-md text-right flex-row flex">90°F</h2>
				</div>
			))}
		</div>
	);
}
