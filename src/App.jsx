// import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Location from "./components/Location.jsx";
import LocationCard from "./components/LocationCard";
import Weather from "./components/Weather.jsx";
import WeatherCard from "./components/WeatherCard";
import "./index.css";
function App() {
	return (
		<div className="text-white">
			<div className="row-span-full bg-slate-900 drop-shadow-2xl">
				<div className="box-content lg:w-4/6 sm:w-full m-auto">
					<Header />
					<div className="w-full grid"></div>
				</div>
			</div>
			<div className="w-full bg-[#010409]">
				<div className="flex h-screen">
					<div className="mx-auto text-center md:w-full xl:max-w-6xl 2xl:max-w-5xl bg-[#0d1117]">
						<LocationCard />
						<Weather />
						<WeatherCard />
						<WeatherCard />
						<WeatherCard />
						<WeatherCard />
						<WeatherCard />
						<WeatherCard />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
