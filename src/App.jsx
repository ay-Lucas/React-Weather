// import { useState } from "react";
import { useState } from "react";
import {
	AQI_KEY,
	AQI_URL,
	CUREENT_WEATHER_URL,
	CURRENT_WEATHER_KEY,
	FIVE_DAY_FORECAST_URL,
	FORECAST_API_URL,
} from "./Api";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather.jsx";
import DailyForecastOutlook from "./components/DailyForecastOutlook";
import Header from "./components/Header.jsx";
import HourlyForecastOutlook from "./components/HourlyForecastOutlook";
import LocationCard from "./components/LocationCard";
import Today from "./components/Today";
import "./index.css";

function App() {
	console.log("app.jsx rendered");
	const [location, setLocation] = useState(null);
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	// const [fiveday, setFiveDay] = useState(null);
	// const [hourly, setHourly] = useState(null);
	const [daily, setDaily] = useState(null);
	const [currentAqi, setAqi] = useState(null);
	const imperialUnits = {
		temperature: "fahrenheit",
		wind: "mph",
		precipitation: "inch",
		pressure: "hPa",
	};
	const [units, setUnits] = useState(imperialUnits);
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
		"auto" +
		"&models=best_match,ecmwf_ifs04,gfs_seamless,gfs_global,gfs_hrrr";
	const model = "gfs_global";

	const handleOnSearchChange = (searchData) => {
		setUnits(imperialUnits);
		setLocation(searchData.label);
		const [lat, lon] = searchData.value.split(" ");
		// setCoordinates(lat, lon);
		const forecastUrl =
			FORECAST_API_URL +
			"latitude=" +
			lat +
			"&" +
			"longitude=" +
			lon +
			forecastParams;
		const fiveDayForecaseUrl =
			FIVE_DAY_FORECAST_URL +
			"lat=" +
			lat +
			"&lon=" +
			lon +
			"&appid=" +
			CURRENT_WEATHER_KEY;
		+"&units=imperial";

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
		const fiveDayForecastFetch = fetch(fiveDayForecaseUrl);
		const forecastFetch = fetch(forecastUrl);
		const currentWeatherFetch = fetch(currentWeatherUrl);
		const currentAQIFetch = fetch(currentAQI);
		console.log(forecastUrl);
		console.log(currentWeatherUrl);
		Promise.all([
			forecastFetch,
			currentWeatherFetch,
			currentAQIFetch,
			fiveDayForecastFetch,
		])
			.then(async (response) => {
				const forecastResponse = await response[0].json();
				const currentWeatherResponse = await response[1].json();
				const currentAQIFetch = await response[2].json();
				const fiveDayForecastResponse = await response[3].json();
				setCurrentWeather(currentWeatherResponse);
				// setHourly(forecastResponse.hourly);
				setDaily(forecastResponse.daily);
				// setFiveDay(fiveDayForecastResponse);
				setForecast(forecastResponse);
				setAqi(currentAQIFetch);
				console.log(currentWeatherResponse);
				console.log(currentAQIFetch);
				console.log(forecastResponse);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	//TODO: make Valley Falls default location
	return (
		<div className="h-screen overflow-x-hidden">
			<Header onSearchChange={handleOnSearchChange} />
			<div className="flex h-screen text-white">
				<div className="flex mx-auto lg:my-10 sm:my-0">
					<div className="box-content w-screen max-w-screen-lg">
						<div className="flex x-auto m-1 mt-2 p-2 bg-[#0a1929]/60 rounded-xl">
							<LocationCard location={location} />
						</div>
						<div className="lg:flex sm:inline-flex w-full ">
							<div className="mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-7 lg:w-1/2 sm:w-full">
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
							<div className="mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-7 lg:w-1/2 sm:w-full">
								{daily && <Today data={daily} model={model} units={units} />}
							</div>
						</div>
						<div className="lg:flex sm:inline-flex w-full">
							<div className="mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-7 lg:w-1/2 sm:w-full">
								{forecast && (
									<HourlyForecastOutlook
										data={forecast}
										model={model}
										units={units}
									/>
								)}
							</div>
							<div className="mx-1 my-1 bg-[#0a1929]/60 rounded-2xl p-7 lg:w-1/2 sm:w-full">
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
