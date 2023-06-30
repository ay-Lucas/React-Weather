export default function WeatherCard() {
	//bg-slate-400/10
	//Today&apos;s
	return (
		<div className="mx-2">
			<div className="w-full text-left mb-4">
				<h1 className="text-2xl">Today</h1>
				<h2 className="text-xl">Thurs, 27 Jun 2023</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="lg:text-lg sm:text-md">High/Low</h1>
				<h2 className="text-md text-right whitespace-nowrap">90°F / 80°F</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="text-md">Wind</h1>
				<h2 className="text-md">5 mph</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="text-md ">Humidity</h1>
				<h2 className="text-md ">50%</h2>
			</div>
			<div className="flex flex-row justify-between my-2">
				<h1 className="text-md">Precipitation</h1>
				<h2 className="text-md">0%</h2>
			</div>
		</div>
	);
}
