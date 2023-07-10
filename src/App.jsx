// import { useState } from "react";
import { useEffect, useState } from "react";
import {
	AQI_KEY,
	AQI_URL,
	CUREENT_WEATHER_URL,
	CURRENT_WEATHER_KEY,
	FIVE_DAY_FORECAST_URL,
	FORECAST_API_URL,
	VISUAL_API_URL,
	VISUAL_KEY,
} from "./Api";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather.jsx";
import DailyForecastOutlook from "./components/DailyForecastOutlook";
import Header from "./components/Header.jsx";
import HourlyForecastOutlook from "./components/HourlyForecastOutlook";
import LocationCard from "./components/LocationCard";
import Today from "./components/Today";
import "./index.css";
/*
	//TODO: ***** Switch to Visual Crossing API *****
	* Will use it for all weather data and remove all other API calls
	* Open Meteo API will be used for comparing weather models
	*/
function App() {
	const defaultLocation = {
		lat: 42.901279,
		lon: -73.562714,
	};
	console.log("app.jsx rendered");
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [visualForecast, setVisualForecast] = useState(null);
	const [location, setLocation] = useState("Valley Falls, NY");
	const [coordinates, setCoordinates] = useState(defaultLocation);
	// const [fiveday, setFiveDay] = useState(null);
	// const [hourly, setHourly] = useState(null);
	const [daily, setDaily] = useState(null);
	const [currentAqi, setAqi] = useState(null);
	const imperialUnits = {
		name: "us",
		temperature: "fahrenheit",
		wind: "mph",
		precipitation: "inch",
		pressure: "hPa",
	};
	const metricUnits = {
		name: "metric",
		temperature: "celsius",
		wind: "km/h",
		precipitation: "mm",
		pressure: "hPa",
	};
	const [units, setUnits] = useState(imperialUnits);
	// const forecastParams =
	// 	"&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,winddirection_10m," +
	// 	"showers,snowfall,weathercode,uv_index,uv_index_clear_sky,geopotential_height_1000hPa,cloudcover,visibility,windspeed_10m,windgusts_10m" +
	// 	",&daily=weathercode,apparent_temperature_max,apparent_temperature_min,uv_index_max,uv_index_clear_sky_max,windspeed_10m_max," +
	// 	"windspeed_10m_min,winddirection_10m_dominant,shortwave_radiation_sum,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum," +
	// 	"rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max" +
	// 	",windgusts_10m_max" +
	// 	"&current_weather=true&temperature_unit=" +
	// 	units.temperature +
	// 	"&windspeed_unit=" +
	// 	units.wind +
	// 	"&precipitation_unit=" +
	// 	units.precipitation +
	// 	"&timezone=" +
	// 	"auto" +
	// 	"&models=best_match,ecmwf_ifs04,gfs_seamless,gfs_global,gfs_hrrr";
	const model = "gfs_global";
	// const forecastUrl =
	// 	FORECAST_API_URL +
	// 	"latitude=" +
	// 	coordinates.lat +
	// 	"&" +
	// 	"longitude=" +
	// 	coordinates.lon +
	// 	forecastParams;
	// const currentWeatherUrl =
	// 	CUREENT_WEATHER_URL +
	// 	"lat=" +
	// 	coordinates.lat +
	// 	"&lon=" +
	// 	coordinates.lon +
	// 	"&appid=" +
	// 	CURRENT_WEATHER_KEY +
	// 	"&units=imperial";
	const currentAQIUrl =
		AQI_URL +
		"latitude=" +
		coordinates.lat +
		"&longitude=" +
		coordinates.lon +
		"&distance=25&API_KEY=" +
		AQI_KEY;
	const visualForecastUrl =
		VISUAL_API_URL +
		coordinates.lat +
		"," +
		coordinates.lon +
		"?unitGroup=" +
		units.name +
		"&contentType=json" +
		"&key=" +
		VISUAL_KEY;
	const fetchData = () => {
		console.log("fetchData function called");
		// const forecastFetch = fetch(forecastUrl);
		// const currentWeatherFetch = fetch(currentWeatherUrl);
		const visualForecastFetch = fetch(visualForecastUrl);
		const currentAQIFetch = fetch(currentAQIUrl);
		Promise.all([
			// forecastFetch,
			// currentWeatherFetch,
			visualForecastFetch,
			currentAQIFetch,
		])
			.then(async (response) => {
				// const forecastResponse = await response[0].json();
				// const currentWeatherResponse = await response[1].json();
				const visualForecastResponse = await response[0].json();
				const currentAQIFetch = await response[1].json();
				// const fiveDayForecastResponse = await response[3].json();
				// setFiveDay(fiveDayForecastResponse);
				// setHourly(forecastResponse.hourly);
				// setForecast(forecastResponse);
				// setCurrentWeather(currentWeatherResponse);
				setVisualForecast(visualForecastResponse);
				setAqi(currentAQIFetch);
				// setDaily(forecastResponse.daily);
				// console.log(currentWeatherResponse);
				// console.log(forecastResponse);
				console.log(visualForecastResponse);
				console.log(currentAQIFetch);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleOnUnitsChange = (event) => {
		if (event.target.value === "metric") {
			setUnits(metricUnits);
			console.log("app is now in metric units");
		} else {
			setUnits(imperialUnits);
			console.log("app is now in imperial units");
		}
		fetchData();
	};

	const handleOnSearchChange = (searchData) => {
		setLocation(searchData.label);
		const [lat, lon] = searchData.value.split(" ");
		setCoordinates({ lat, lon });
		// console.log(forecastUrl);
		// console.log(currentWeatherUrl);
		console.log(currentAQIUrl);
	};
	useEffect(() => {
		console.log("useEffect called");
		// fetchData();
	}, [coordinates]);

	return (
		<div className="h-screen overflow-x-hidden selection:bg-[#9c27b0]">
			<Header
				onSearchChange={handleOnSearchChange}
				onUnitsChange={handleOnUnitsChange}
			/>
			<div className="flex text-white">
				<div className="flex mx-auto my-10">
					<div className="box-content w-screen max-w-screen-lg ">
						<div className="flex x-auto m-1 mt-2 p-2 bg-[#0a1929]/30  rounded-xl">
							<LocationCard location={location} />
						</div>
						<div className="lg:flex sm:inline-flex w-full ">
							<div className="mx-1 my-1 bg-[#0a1929]/30 bg-blend-overlay rounded-2xl bg-center p-7 lg:w-1/2 sm:w-full">
								{currentWeather && (
									<CurrentWeather
										data={currentWeather}
										aqi={currentAqi}
										model={model}
										units={units}
										weathercodes={forecast}
									/>
								)}
							</div>
							<div className="mx-1 my-1 bg-[#0a1929]/30 rounded-2xl p-7 lg:w-1/2 sm:w-full">
								{daily && <Today data={daily} model={model} units={units} />}
							</div>
						</div>
						<div className="lg:flex sm:inline-flex w-full">
							<div className="mx-1 my-1 bg-[#0a1929]/30 rounded-2xl p-7 lg:w-1/2 sm:w-full">
								{forecast && (
									<HourlyForecastOutlook
										data={forecast}
										model={model}
										units={units}
									/>
								)}
							</div>
							<div className="mx-1 my-1 bg-[#0a1929]/30 rounded-2xl p-7 lg:w-1/2 sm:w-full">
								{forecast && (
									<DailyForecastOutlook
										data={forecast}
										model={model}
										units={units}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
