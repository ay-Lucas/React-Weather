import Search from "./Search.jsx";
export default function Header() {
	return (
		<div className="flex h-16 items-center justify-between bg-slate-700">
			<h1 className="text-xl text-white ml-6 mt-6 mr-0 mb-0 md:mb-6 font-semibold flex justify-left">
				WeatherPal
				{/* <Search /> */}
			</h1>
			<Search />
		</div>
	);
}
