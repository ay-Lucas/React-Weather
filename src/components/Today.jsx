export default function Today() {
	//bg-slate-400/10
	//Today&apos;s
	return (
		<div className="mx-2 lg:text-md sm:text-md">
			<div className="w-full text-left items-center">
				<h1 className="text-2xl mr-3">Today</h1>
				<h2 className="text-xl"></h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">High/Low</h1>
				<h2 className="whitespace-nowrap">90°F / 80°F</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">Feels like</h1>
				<h2 className="">105°F / 85°F</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">Wind</h1>
				<h2 className="">5 mph</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className=" ">Humidity</h1>
				<h2 className=" ">50%</h2>
			</div>
			<div className="flex flex-row justify-between my-2">
				<h1 className="">Precipitation</h1>
				<h2 className="">0%</h2>
			</div>
		</div>
	);
}
