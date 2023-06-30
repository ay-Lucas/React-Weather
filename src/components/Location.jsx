import { useEffect, useState } from "react";
const ipGeolocationKey = "d771d4b53a23484bb0ff58d97321c33a";
const url = "https://api.ipgeolocation.io/ipgeo?apiKey=" + ipGeolocationKey;
export default function Location() {
	const [data, setData] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
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
