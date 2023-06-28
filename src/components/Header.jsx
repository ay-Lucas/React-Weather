import Search from "./Search.jsx";
export default function Header() {
	return (
		<div className="inline-flex justify-between w-full py-2">
			<h1 className="text-xl text-center text-white mx-auto">
				WeatherPal
				{/* <Search /> */}
			</h1>
			<Search />
		</div>
	);
}
