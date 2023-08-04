/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { TileLayer } from "react-leaflet";
const RADAR_MAPS_URL = "https://api.rainviewer.com/public/weather-maps.json";
const getRadar = async () => {
	try {
		const res = await fetch(RADAR_MAPS_URL);
		const resJson = await res.json();
		return resJson.radar;
	} catch (err) {
		console.log(`rainviewer api error ${err}`);
	}
};

// eslint-disable-next-line react/prop-types
const RadarFrame = ({ index, getTimes, timezone }) => {
	const [radar, setRadar] = useState(null);
	const locationHourFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		hour: "numeric",
		minute: "numeric",
	});
	const getFrames = (radar) => {
		if (radar === null) {
			return;
		}
		let pathArray = [];
		let timeArray = [];
		radar.past.map((element) => {
			pathArray.push(element.path);
			timeArray.push(locationHourFormatter.format(new Date(element.time * 1000)).split(" ")[0]);
		});
		radar.nowcast.map((element) => {
			pathArray.push(element.path);
			timeArray.push(locationHourFormatter.format(new Date(element.time * 1000)).split(" ")[0]);
		});
		// return formatted times to label Radar slider
		getTimes(timeArray);
		setRadar(pathArray);
	};
	useEffect(() => {
		(async () => {
			const radarObj = await getRadar();
			setRadar(radarObj);
			getFrames(radarObj);
		})();
	}, [timezone]);
	if (!radar) {
		return <div>Loading...</div>;
	}
	return <TileLayer attribution="RainViewer.com" url={`https://tilecache.rainviewer.com${radar[index]}/256/{z}/{x}/{y}/4/1_1.png`} opacity={0.6} zIndex={2} />;
};
export default RadarFrame;
