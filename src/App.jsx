// import { useState } from "react";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather.jsx";
import DailyForecastOutlook from "./components/DailyForecastOutlook";
import Header from "./components/Header.jsx";
import HourlyForecastOutlook from "./components/HourlyForecastOutlook";
import LocationCard from "./components/LocationCard";
import SimpleAccordion from "./components/SimpleAccordion.jsx";
import Today from "./components/Today";
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
			<div className="flex">
				<div className="flex mx-auto">
					<div className="box-content flex-wrap">
						<div className="flex x-auto m-1 mt-2 p-2 bg-[#0a1929]/60 rounded-xl ">
							<LocationCard />
						</div>
						<div className="lg:flex sm:inline-flex w-full">
							<div className="flex flex-auto mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-4 lg:w-1/2 sm:w-full justify-evenly">
								<CurrentWeather />
							</div>
							<div className="mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-5 lg:w-1/2 sm:w-full">
								<Today />
							</div>
						</div>
						<div className="lg:flex sm:inline-flex w-full">
							<div className="mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-5 lg:w-1/2 sm:w-full">
								<HourlyForecastOutlook />
							</div>
							<div className="mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-5 lg:w-1/2 sm:w-full">
								<DailyForecastOutlook />
							</div>
						</div>
						<div className="mx-1 my-1 bg-[#0a1929]/60 rounded-2xl m-auto">
							<SimpleAccordion />
						</div>
						{/* <SimpleAccordion /> */}
					</div>
				</div>
			</div>
		</div>
	);
	//rgb(23 23 23 / var(--tw-bg-opacity))
	//lg:flex sm:block  sm:w-full lg:w-1/2
}

export default App;
