import { useEffect, useState } from "react";
const ipGeolocationKey = "d771d4b53a23484bb0ff58d97321c33a";
const url = "https://api.ipgeolocation.io/ipgeo?apiKey=" + ipGeolocationKey;
export default function Location() {
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
	return (
		<div className="Location">
			{data && (
				<div className="ml-auto mr-auto text-center">
					{"city: " +
						data.city +
						" lat: " +
						data.latitude +
						" lon: " +
						data.longitude}
				</div>
			)}
		</div>
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
