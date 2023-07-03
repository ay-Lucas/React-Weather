// import { useEffect, useState } from "react";
// import { WEATHER_API_URL } from "./Search.jsx";
// export default function Weather() {
// 	const [data, setData] = useState(null);
// 	// eslint-disable-next-line no-unused-vars
// 	const [loading, setLoading] = useState(true);
// 	// eslint-disable-next-line no-unused-vars
// 	const [error, setError] = useState(null);

//     const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/onecall?
// 	useEffect(() => {
// 		fetch(WEATHER_API_URL)
// 			.then((response) => response.json())
// 			.then((actualData) => {
// 				setData(actualData);
// 				console.log(actualData);
// 				setError(null);
// 			})
// 			.catch((err) => {
// 				setError(err.message);
// 				setData(null);
// 			})
// 			.finally(() => {
// 				setLoading(false);
// 			});
// 	}, []);
// }
