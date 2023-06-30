import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
export default function HourlyForecastOutlook() {
	const [days, setDays] = useState([]);

	useEffect(() => {
		const getNextFiveDays = () => {
			const currentDay = new Date();
			const nextFiveDays = [];
			for (let i = 0; i < 5; i++) {
				const nextDay = new Date(
					currentDay.getTime() + i * 60 * 60 * 1000 * 24
				); // Add (i+1) hours to the current time
				nextFiveDays.push(
					nextDay.toLocaleDateString([], {
						weekday: "short",
					}) +
						" " +
						nextDay.toLocaleString([], {
							day: "2-digit",
						})
				);
			}

			return nextFiveDays;
		};

		setDays(getNextFiveDays());
	}, []);
	//border-gray-800 border-b-[1px]
	return (
		<div className="mx-2">
			<div className="flex text-left mb-4">
				<h1 className="text-2xl">Daily</h1>
			</div>
			{days.map((days, index) => (
				<div key={index} className="flex items-center flex-nowrap w-full py-2 ">
					<h1
						key={index}
						className="flex items-center flex-auto order-1 lg:text-lg sm:text-md flex-nowrap w-1/3"
					>
						{days}
					</h1>
					<div className="flex items-center justify-center order-2 w-1/3">
						<IoSunnyOutline size={20} />
					</div>
					<h2 className="flex items-center flex-auto order-3 text-md justify-end w-1/3">
						90°F / 80°F
					</h2>
				</div>
			))}
		</div>
	);
}
//Grid version -> wraps to next line
// <div key={index} className="grid-cols-3 grid justify-center py-2 ">
// 	<h1 key={index} className="lg:text-lg sm:text-md ">
// 		{days}
// 	</h1>
// 	<div className="m-auto flex">
// 		<IoSunnyOutline size={20} />
// 	</div>
// 	<h2 className="text-md text-right flex">90°F / 80°F</h2>
// </div>;
