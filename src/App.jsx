import { useEffect, useState } from "react";
import { AQI_KEY, AQI_URL, VISUAL_API_URL, VISUAL_KEY } from "./Api";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather.jsx";
import DailyForecastOutlook from "./components/DailyForecastOutlook";
import HourlyForecastOutlook from "./components/HourlyForecastOutlook";
import LocationCard from "./components/LocationCard";
import Header from "./components/Navbar/Header.jsx";
import Today from "./components/Today";
import "./index.css";
//TODO: Visualize Air Quality
//TODO: Horizontal Scroll for Hourly Forecast
function App() {
	console.log("app.jsx rendered");
	const defaultLocation = {
		lat: 34.0007,
		lon: -81.0348,
	};
	const [visualForecast, setVisualForecast] = useState(null);
	const [location, setLocation] = useState("Columbia, SC");
	const [coordinates, setCoordinates] = useState(defaultLocation);
	const [currentAqi, setAqi] = useState(null);
	const [timeZone, setTimeZone] = useState([null]);
	const imperialUnits = {
		name: "us",
		temperature: "fahrenheit",
		wind: "mph",
		precipitation: "in",
		pressure: "hPa",
		visibility: "mi",
		tempSign: "°F",
	};
	const metricUnits = {
		name: "metric",
		temperature: "celsius",
		wind: "km/h",
		precipitation: "mm",
		pressure: "hPa",
		visibility: "km",
		tempSign: "°C",
	};
	const [units, setUnits] = useState(imperialUnits);
	const currentAQIUrl = AQI_URL + "latitude=" + coordinates.lat + "&longitude=" + coordinates.lon + "&distance=25&API_KEY=" + AQI_KEY;
	const visualForecastUrl =
		VISUAL_API_URL +
		coordinates.lat +
		"," +
		coordinates.lon +
		// "/next7days?" +
		"?unitGroup=" +
		units.name +
		"&key=" +
		VISUAL_KEY +
		"&contentType=json" +
		"&iconSet=icons2" +
		"&elements=%2Bpm1,%2Bpm2p5,%2Bpm10,%2Bo3,%2Bno2,%2Bso2,%2Bco,%2Baqius,%2Baqieur";
	const fetchData = () => {
		console.log("fetchData function called");
		const visualForecastFetch = fetch(visualForecastUrl);
		const currentAQIFetch = fetch(currentAQIUrl);
		// const OpenWeatherAQIFetch = fetch(OpenWeatherAQIUrl);
		Promise.all([
			visualForecastFetch,
			currentAQIFetch,
			// OpenWeatherAQIFetch,
		])
			.then(async (response) => {
				const visualForecastResponse = await response[0].json();
				const currentAQIResponse = await response[1].json();
				// const OpenWeatherAQI = await response[2].json();
				setVisualForecast(visualForecastResponse);
				setAqi(currentAQIResponse);
				const timezone = visualForecastResponse.timezone;
				const options = Intl.DateTimeFormat().resolvedOptions();
				setTimeZone({ timezone, options });
				console.log(visualForecastResponse);
				console.log(currentAQIResponse);
				// console.log(OpenWeatherAQI);
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
		// fetchData();
	};

	const handleOnSearchChange = (searchData) => {
		setLocation(searchData.label);
		const [lat, lon] = searchData.value.split(" ");
		setCoordinates({ lat, lon });
		console.log(currentAQIUrl);
	};
	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		console.log("useEffect called");
		fetchData();
	}, [coordinates, units, location]);

	return (
		<div className="h-screen overflow-x-hidden selection:bg-[#9c27b0]">
			<Header onSearchChange={handleOnSearchChange} onUnitsChange={handleOnUnitsChange} />
			<div className="flex text-white">
				<div className="flex mx-auto">
					<div className="box-content w-screen max-w-screen-lg">
						<div className="mx-3 my-3">
							<div className="flex mx-auto p-2 bg-[#0a1929]/30 rounded-lg ">
								<LocationCard location={location} />
							</div>
							<div className="mt-3 lg:flex sm:inline-flex w-full ">
								<div className="mr-0 sm:mr-1.5 bg-[#0a1929]/30 rounded-lg p-7 md:w-1/2 w-full">
									{visualForecast && <CurrentWeather data={visualForecast} aqi={currentAqi} units={units} timezone={timeZone} />}
								</div>
								<div className="ml-0 sm:ml-1.5 mt-3 sm:mt-0 bg-[#0a1929]/30 rounded-lg p-7 md:w-1/2 w-full">
									{visualForecast && <Today data={visualForecast} units={units} timezone={timeZone} />}
								</div>
							</div>
							<div className="my-5 w-full">
								<div className="bg-[#0a1929]/30 rounded-lg p-5 w-full">
									{visualForecast && <HourlyForecastOutlook data={visualForecast} units={units} timezone={timeZone} />}
								</div>
							</div>
							<div className="w-full">
								<div className="w-full pt-5 bg-[#0a1929]/30 rounded-lg shadow-2xl pb-2.5 justify-evenly">
									{visualForecast && <DailyForecastOutlook data={visualForecast} units={units} timezone={timeZone} />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
