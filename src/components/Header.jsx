import Button from "@mui/material/Button";
import Search from "./Search.jsx";
export default function Header() {
	return (
		<div className="py-1 items-center text-center lg:flex justify-center sm:flex-auto m-auto w-3/4">
			<h1 className="text-xl text-white xl:visible justify-center lg:w-1/3 sm:1/2">
				WeatherPal
			</h1>
			<div className="flex-auto lg:w-1/3 sm:1/2">
				<Button variant="primary">Home</Button>
				<Button variant="primary">Hourly</Button>
				<Button variant="primary">Daily</Button>
				<Button variant="primary">Map</Button>
			</div>
			<div className="inline-flex lg:w-1/3 sm:1/2 justify-center">
				<Search />
			</div>
		</div>
	);
}
