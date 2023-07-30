import { useEffect, useState } from "react";
const ipGeolocationKey = "d771d4b53a23484bb0ff58d97321c33a";
const url = "https://api.ipgeolocation.io/ipgeo?apiKey=" + ipGeolocationKey;

//no longer using

// eslint-disable-next-line react/prop-types
export default function Location({ handleAutoGeolocation }) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((actualData) => {
				setData(actualData);
				console.log(actualData);
				setError(null);
			})
			.catch((err) => {
				setError(err.message);
				setData(null);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	// navigator.geolocation.getCurrentPosition(function (position) {
	// 	console.log("latitude:", position.coords.latitude);
	// 	console.log("longitude:", position.coords.longitude);
	// });
	return (
		// <div className="Location text-lg">
		<>{data && <h1 className="">{data.city + ", " + data.state_prov}</h1>}</>
		// </div>
	);
}

// const [location, setLocation] = useState(null);

// getLocation = ((location) => {
// 	fetch(url)
// 		.then((response) => response.json())
// 		.then((data) => setLocation())
// 		.catch((error) => console.error(error));
// });

// return (
// 	<div>
// 		<p>{location}</p>
// 	</div>
// );
