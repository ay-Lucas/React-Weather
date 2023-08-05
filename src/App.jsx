import { useEffect, useState } from "react";
// import { AQI_KEY, AQI_URL, VISUAL_API_URL, VISUAL_KEY } from "./Api";
import "./App.css";
import CurrentWeather from "./components/CurrentWeather.jsx";
import DailyForecastOutlook from "./components/DailyForecastOutlook";
import HourlyForecastOutlook from "./components/HourlyForecastOutlook";
import LocationCard from "./components/LocationCard";
import Header from "./components/Navbar/Header.jsx";
import Radar from "./components/Radar";
import Today from "./components/Today";
import "./index.css";
const VISUAL_API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const AQI_URL = "https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&";
const REVERSE_GEOCODE_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const defaultLocation = {
	lat: 34.0007,
	lon: -81.0348,
};
// const defaultLocation = {
// 	lat: 48.8566,
// 	lon: -2.3522,
// };
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
// const options = Intl.DateTimeFormat().resolvedOptions();
// const date = new Intl.DateTimeFormat("en-us", {
// 	year: "2-digit",
// 	month: "2-digit",
// 	day: "2-digit",
// }).format(new Date());
function App() {
	// console.log("app.jsx rendered");
	const [visualForecast, setVisualForecast] = useState(null);
	const [statData, setStatData] = useState(null);
	const [location, setLocation] = useState("Columbia, SC");
	const [coordinates, setCoordinates] = useState(defaultLocation);
	const [currentAqi, setAqi] = useState(null);
	const [timeZone, setTimeZone] = useState([null]);
	const [units, setUnits] = useState(imperialUnits);
	const currentAQIUrl = AQI_URL + "latitude=" + coordinates.lat + "&longitude=" + coordinates.lon + "&distance=25&API_KEY=" + import.meta.env.VITE_AQI_API_KEY;
	const visualForecastUrl =
		VISUAL_API_URL +
		coordinates.lat +
		"," +
		coordinates.lon +
		"?unitGroup=" +
		units.name +
		"&key=" +
		import.meta.env.VITE_VISUAL_WEATHER_API_KEY +
		"&contentType=json" +
		"&iconSet=icons2" +
		"&elements=%2Bpm1,%2Bpm2p5,%2Bpm10,%2Bo3,%2Bno2,%2Bso2,%2Bco,%2Baqius,%2Baqieur";
	const visualForecastStatUrl =
		VISUAL_API_URL +
		coordinates.lat +
		"," +
		coordinates.lon +
		"/" +
		"today?" +
		"/" +
		"?unitGroup=" +
		units.name +
		"&key=" +
		import.meta.env.VITE_VISUAL_WEATHER_API_KEY +
		"&contentType=json" +
		"&include=stats";

	const fetchData = () => {
		// console.log(		new Date("").toISOString().split("T")[0]);
		const visualForecastFetch = fetch(visualForecastUrl);
		const currentAQIFetch = fetch(currentAQIUrl);
		const visualStatFetch = fetch(visualForecastStatUrl);
		Promise.all([visualForecastFetch, currentAQIFetch, visualStatFetch])
			.then(async (response) => {
				const visualForecastResponse = await response[0].json();
				const currentAQIResponse = await response[1].json();
				const visualStatisticsResponse = await response[2].json();
				setVisualForecast(visualForecastResponse);
				setAqi(currentAQIResponse);
				setStatData(visualStatisticsResponse);
				const timezone = visualForecastResponse.timezone;
				const options = Intl.DateTimeFormat().resolvedOptions();
				setTimeZone({ timezone, options });
				// console.log(visualStatisticsResponse);
				// console.log(visualForecastResponse);
				// console.log(currentAQIResponse);
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
	};
	const handleOnSearchChange = (searchData) => {
		// console.log(searchData);
		// if (searchData.label.endsWith("United States of America")) {
		// 	searchData.label = searchData.label.replace("United States of America", "US");
		// 	console.log(searchData.label);
		// }
		setLocation(searchData.label);
		const [lat, lon] = searchData.value.split(" ");
		setCoordinates({ lat, lon });
		// console.log(currentAQIUrl);
	};
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};
	//checks if default location is the same
	function isSameLocation(lat, lon) {
		return Math.abs(lon - defaultLocation.lon) < 1 || Math.abs(lat - defaultLocation.lat) < 1;
	}
	function success(pos) {
		//mapbox geocoding api longitude and latitude positions are reversed
		const lat = pos.coords.latitude;
		const lon = pos.coords.longitude;
		if (isSameLocation(lat, lon)) {
			// console.log("same location");
			return;
		} else {
			console.log("not same location");
			setCoordinates({ lat, lon });
			reverseGeolocationFetch(lon, lat);
		}
	}
	function errors(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}
	const reverseGeolocationFetch = (lon, lat) => {
		let geoLocationUrl = REVERSE_GEOCODE_API_URL + lon + "," + lat + ".json?types=place&access_token=" + import.meta.env.VITE_MAPBOX_GEOCODE_KEY;
		fetch(geoLocationUrl)
			.then(async (response) => {
				const data = await response.json();
				// console.log(data);
				// console.log(data.features[0].text);
				setLocation(data.features[0].place_name);
			})
			.catch((error) => {
				console.log("reverse geocoding", error);
			});
	};
	//get user location on load
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.permissions.query({ name: "geolocation" }).then(function (result) {
				// console.log(result);
				if (result.state === "granted") {
					console.log("location permission granted");
					navigator.geolocation.getCurrentPosition(success, errors, options);
				} else if (result.state === "prompt") {
					navigator.geolocation.getCurrentPosition(success, errors, options);
					console.log("location permission prompted");
				} else if (result.state === "denied") {
					console.log("location permission denied");
				}
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}, []);
	useEffect(() => {
		fetchData();
	}, [units, location]);

	return (
		<div className="h-screen overflow-x-hidden selection:bg-[#9c27b0]">
			<Header onSearchChange={handleOnSearchChange} onUnitsChange={handleOnUnitsChange} />
			<div className="flex text-white">
				<div className="flex mx-auto">
					<div className="box-content w-screen max-w-screen-lg">
						<div className="mx-3 my-3">
							<div className="mt-0 md:mt-10">{visualForecast && <LocationCard location={location} timezone={timeZone} data={visualForecast} />}</div>
							<div className="w-full h-full flex justify-center">
								{visualForecast && <CurrentWeather data={visualForecast} aqi={currentAqi} units={units} timezone={timeZone} stat={statData} />}
							</div>
							<div className="mt-2 sm:mt-3 lg:flex sm:inline-flex w-full">
								<div className="mr-0 sm:mr-1.5 mt-2 sm:mt-0 bg-slate-950/20 rounded-lg shadow-slate-950/10 shadow-md py-5 sm:px-6 px-3 md:w-1/2 w-full">
									{visualForecast && <Today data={visualForecast} units={units} timezone={timeZone} />}
								</div>
								<div className="ml-0 sm:ml-1.5 mt-2 sm:mt-0 bg-white/20 backdrop-blur-xl rounded-lg md:w-1/2 w-full shadow-slate-950/10 shadow-md">
									{visualForecast && <Radar coordinates={coordinates} timezone={timeZone} />}
								</div>
							</div>
							<div className="mb-3 mt-4 ">{visualForecast && <HourlyForecastOutlook data={visualForecast} units={units} timezone={timeZone} />}</div>

							<div>{visualForecast && <DailyForecastOutlook data={visualForecast} units={units} timezone={timeZone} />}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default App;
