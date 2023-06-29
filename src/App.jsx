// import { useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Header from "./components/Header.jsx";
import LocationCard from "./components/LocationCard";
import SimpleAccordion from "./components/SimpleAccordion.jsx";
import WeatherCard from "./components/WeatherCard";
import "./index.css";

//nav bar bg color: bg-slate-900
//side bars bg color: bg-[#010409]
//main content bg color: bg-[#0d1117]
//main grey content: bg-neutral-900
//navy blue bg-[#0a1929]/90

/*
Vision: 
1. Home(current weather + outlook), hourly, daily and interactive map toggle [modes]  
TODO Thursday 6/29
1. Daily Weather
2. Hourly Weather
3. API
*/
function App() {
	return (
		<div className="text-white">
			<div className="bg-black drop-shadow-2xl">
				<Header />
			</div>
			<div className="row-span-full drop-shadow-2xl">
				<div className="box-content lg:w-4/6 sm:w-full m-auto "></div>
			</div>
			<div className="flex bg-gradient-to-r from-[#2193b0] to-[#6dd5ed]">
				<div className="flex h-screen mx-auto">
					<div className="text-center items-center  rounded-2xl">
						<div className="mx-2 mt-4 bg-[#0a1929]/60 rounded-2xl m-auto">
							<LocationCard />
						</div>
						<div className="inline-flex w-full">
							<div className="mx-2 my-2 bg-[#0a1929]/60 rounded-2xl m-auto p-5 w-1/2">
								<CurrentWeather />
							</div>
							<div className="mx-2 my-2 bg-[#0a1929]/60 rounded-2xl m-auto p-5 w-1/2">
								<WeatherCard />
							</div>
						</div>
						<div className="mx-2 my-4 bg-[#0a1929]/60 rounded-2xl m-auto">
							<SimpleAccordion />
						</div>
						{/* <SimpleAccordion /> */}
					</div>
				</div>
			</div>
		</div>
	);
	//rgb(23 23 23 / var(--tw-bg-opacity))
}

export default App;
