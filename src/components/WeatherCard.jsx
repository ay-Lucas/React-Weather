export default function WeatherCard() {
	return (
		<div className="flex-auto m-1 py-2 px-4">
			<div className="flex flex-col bg-neutral-900 rounded-xl p-4">
				<div className="flex flex-row justify-between">
					<div className="flex flex-col">
						<h1 className="text-md">Today</h1>
						<h2 className="text-lg">Thurs, 27 Jun 2023</h2>
					</div>
					<div className="flex flex-col mx-10">
						<h1 className="text-md ">23°C</h1>
						<h2 className="text-md ">Cloudy</h2>
					</div>
					<div className="flex flex-col">
						<h1 className="text-md">Wind</h1>
						<h2 className="text-md">5 km/h</h2>
					</div>
					<div className="flex flex-col">
						<h1 className="text-md ">Humidity</h1>
						<h2 className="text-md ">50%</h2>
					</div>
					<div className="flex flex-col">
						<h1 className="text-md">Precipitation</h1>
						<h2 className="text-md">0%</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
