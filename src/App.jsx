// import { useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather.jsx";
import DailyForecastOutlook from "./components/DailyForecastOutlook";
import Search from "./components/Search.jsx";
// import Header from "./components/Header.jsx";
import { RepeatOneSharp } from "@mui/icons-material";
import { useState } from "react";
import {
	AQI_KEY,
	AQI_URL,
	CUREENT_WEATHER_URL,
	CURRENT_WEATHER_KEY,
	FORECAST_API_URL,
} from "./Api";
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
//Weather query params
//apparent tem
function App() {
	const imperialUnits = {
		temperature: "fahrenheit",
		wind: "mph",
		precipitation: "inch",
	};
	const [location, setLocation] = useState(null);
	const [coordinates, setCoordinates] = useState("");
	const [units, setUnits] = useState(imperialUnits);
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [hourly, setHourly] = useState(null);
	const [daily, setDaily] = useState(null);
	const [currentAqi, setAqi] = useState(null);
	const forecastParams =
		"&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,winddirection_10m," +
		"showers,snowfall,weathercode,uv_index,uv_index_clear_sky,geopotential_height_1000hPa,cloudcover,visibility,windspeed_10m,windgusts_10m" +
		",&daily=weathercode,apparent_temperature_max,apparent_temperature_min,uv_index_max,uv_index_clear_sky_max,windspeed_10m_max," +
		"windspeed_10m_min,winddirection_10m_dominant,shortwave_radiation_sum,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum," +
		"rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max" +
		",windgusts_10m_max" +
		"&current_weather=true&temperature_unit=" +
		units.temperature +
		"&windspeed_unit=" +
		units.wind +
		"&precipitation_unit=" +
		units.precipitation +
		"&timezone=" +
		"auto";

	const handleOnSearchChange = (searchData) => {
		setLocation(searchData.label);
		const [lat, lon] = searchData.value.split(" ");
		console.log(lat, lon);
		setCoordinates(lat, lon);
		const forecastUrl =
			FORECAST_API_URL +
			"latitude=" +
			lat +
			"&" +
			"longitude=" +
			lon +
			forecastParams;
		const currentWeatherUrl =
			CUREENT_WEATHER_URL +
			"lat=" +
			lat +
			"&lon=" +
			lon +
			"&appid=" +
			CURRENT_WEATHER_KEY +
			"&units=imperial";
		const currentAQI =
			AQI_URL +
			"latitude=" +
			lat +
			"&longitude=" +
			lon +
			"&distance=25&API_KEY=" +
			AQI_KEY;
		const forecastFetch = fetch(forecastUrl);
		const currentWeatherFetch = fetch(currentWeatherUrl);
		const currentAQIFetch = fetch(currentAQI);
		console.log(forecastUrl);
		console.log(currentWeatherUrl);
		console.log(currentAQIFetch);
		Promise.all([forecastFetch, currentWeatherFetch, currentAQIFetch])
			.then(async (response) => {
				const forecastResponse = await response[0].json();
				const currentWeatherResponse = await response[1].json();
				const currentAQIFetch = await response[2].json();
				setCurrentWeather(currentWeatherResponse);
				setHourly(forecastResponse.hourly);
				setDaily(forecastResponse.daily);
				setForecast(forecastResponse);
				setAqi(currentAQIFetch);
				console.log(currentWeatherResponse);
				console.log(forecastResponse);
				console.log(currentAQIFetch);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="text-white">
			<div className="bg-black drop-shadow-2xl">
				<div className="py-1 items-center text-center lg:flex justify-center sm:flex-auto m-auto w-3/4 ">
					<h1 className="text-xl text-white xl:visible justify-center lg:w-1/3 sm:1/2">
						WeatherPal
					</h1>
					<div className="flex-auto lg:w-1/3 sm:1/2">
						<Button variant="primary">Home</Button>
						<Button variant="primary">Hourly</Button>
						<Button variant="primary">Daily</Button>
						<Button variant="primary">Map</Button>
					</div>
					<div className="lg:w-1/3 sm:1/2  text-black justify-center">
						<div className="w-3/4 m-auto">
							<Search onSearchChange={handleOnSearchChange} />
						</div>
					</div>
				</div>
			</div>
			<div className="flex">
				<div className="flex mx-auto">
					<div className="box-content flex-wrap">
						<div className="flex x-auto m-1 mt-2 p-2 bg-[#0a1929]/60 rounded-xl ">
							<LocationCard location={location} />
						</div>
						<div className="lg:flex sm:inline-flex w-full">
							<div className="flex flex-auto mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-4 lg:w-1/2 sm:w-full justify-evenly">
								{currentWeather && (
									<CurrentWeather data={currentWeather} aqi={currentAqi} />
								)}
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
