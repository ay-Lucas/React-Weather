/* eslint-disable react/prop-types */
const Today = ({ data }) => {
	//bg-slate-400/10
	//Today&apos;s
	console.log(data);
	return (
		<div className="mx-2 lg:text-md sm:text-md">
			<div className="w-full text-left items-center">
				<h1 className="text-2xl mr-3">Today</h1>
				<h2 className="text-xl"></h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">High/Low</h1>
				<h2 className="whitespace-nowrap">
					{data.temperature_2m_max[0]} / {data.temperature_2m_min[0]}
				</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">Feels like</h1>
				<h2 className="">
					{data.apparent_temperature_max[0]} /{" "}
					{data.apparent_temperature_min[0]}
				</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">Wind Gusts</h1>
				<h2 className="">{data.windgusts_10m_max[0]}</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className=" ">Sunrise/Sunset</h1>
				<h2 className=" ">
					{`${new Date(data.sunrise[0]).toLocaleTimeString(undefined, {
						hour: "numeric",
						minute: "numeric",
					})}`}{" "}
					/{" "}
					{`${new Date(data.sunset[0]).toLocaleTimeString(undefined, {
						hour: "numeric",
						minute: "numeric",
					})}`}
				</h2>
			</div>
			<div className="flex flex-row justify-between my-2">
				<h1 className="">Precipitation</h1>
				<h2 className="">{data.precipitation_probability_max[0]}%</h2>
			</div>
		</div>
	);
};
export default Today;
