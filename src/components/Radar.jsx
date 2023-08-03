/* eslint-disable react/prop-types */
import { LocationCitySharp, Pause, PlayArrow } from "@mui/icons-material";
import { Slider } from "@mui/material";
import L, { Map, map } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { Circle, FeatureGroup, LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import RadarFrame from "./RadarFrame";
function getIcon() {
	return L.icon({
		iconUrl: "public/place_black_48dp.svg",
		iconSize: [30, 60],
	});
}

const Radar = ({ coordinates }) => {
	const [frame, setFrame] = useState(13);
	const [play, setPlay] = useState(false);
	const [times, setTimes] = useState(null);
	const [coordinatesChanged, setCoordinatesChanged] = useState(false);

	const handleButton = () => {
		if (play === false) {
			setPlay(true);
		} else {
			setPlay(false);
		}
	};
	const incrementFrame = useCallback(() => {
		setFrame((prevFrame) => prevFrame + 1);
	}, []);
	// plays 1 second interval over 15 precipitation frames
	useEffect(() => {
		if (play) {
			if (frame > 15) {
				setFrame(0);
				return;
			}
			const timeoutFunction = setInterval(incrementFrame, 1000);
			console.log(frame);
			return () => clearInterval(timeoutFunction);
		}
	}, [incrementFrame, frame, play]);
	const handleSlider = (e) => {
		setFrame(e.target.value);
	};
	const getTimes = (times) => {
		let arr = [];
		const labels = () => {
			for (let i = 0; i < times.length; i++) {
				const timeLabels = {
					value: i,
					label: times[i],
				};
				arr.push(timeLabels);
			}
			return arr;
		};
		setTimes(labels);
	};
	const getSliderLabels = () => {
		// if (times.length >= frame) {
		// 	return;
		// }
		if ((times[frame] !== undefined && times !== null) || times.length <= frame) {
			return times[frame].label;
		}
	};
	const isEvenNumber = (n, index) => {
		return index % 2 === 0;
	};
	// const handleLabels = (n) => {
	// 	let arr = [];
	// 	for (let i = 0; i < n.length; i++) {
	// 		if (i % 2 === 0) {
	// 			arr.push(n[i]);
	// 		} else {
	// 			arr.push(n[i]);
	// 		}
	// 	}
	// 	return arr;
	// };
	useEffect(() => {
		setCoordinatesChanged(true);
	}, [coordinates]);
	useEffect(() => {
		setCoordinatesChanged(false);
	}, [coordinatesChanged]);
	function ChangeMapView({ coords, coordinatesChanged }) {
		const map = useMap();
		if (coordinatesChanged) {
			map.setView(coords, map.getZoom());
		}
		return null;
	}
	return (
		<div className=" shadow-md">
			<nav className="flex mt-1 justify-center">
				<div className="ml-2 mt-4">
					<button onClick={handleButton}>{(play && <Pause color="primary" />) || (!play && <PlayArrow color="primary" />)}</button>
				</div>
				<div className="w-full px-4 text-xs">
					<label className="flex justify-end mr-11 mt-1 text-zinc-900">Now</label>
					{times && (
						<Slider
							className="pt-3 mb-6 pb-2"
							aria-label="Temperature"
							value={frame}
							valueLabelFormat={getSliderLabels}
							valueLabelDisplay="auto"
							step={1}
							marks={times.filter(isEvenNumber)}
							min={0}
							max={15}
							onChange={handleSlider}
							sx={{
								"span": { fontSize: ".65rem" },
								"&& .MuiSlider-rail": {
									color: "white",
								},
							}}
						/>
					)}
				</div>
			</nav>
			{coordinates && (
				<MapContainer
					center={coordinates}
					zoom={8}
					scrollWheelZoom={true}
					className="flex rounded-b-lg w-full h-[325px]"
					zoomControl={false}
					attributionControl={false}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<Marker position={coordinates} icon={getIcon()}>
						<Popup>
							{"latitude: " + coordinates.lat}
							<br />
							{"longitude: " + coordinates.lon}
						</Popup>
					</Marker>
					<RadarFrame index={frame} getTimes={getTimes} />
					<ChangeMapView coords={coordinates} coordinatesChanged={coordinatesChanged} />
				</MapContainer>
			)}
		</div>
	);
};
export default Radar;
// <LayersControl.Overlay name="Marker with popup">
// 	<Marker position={coordinates}>
// 		<Popup>
// 			A pretty CSS3 popup. <br /> Easily customizable.
// 		</Popup>
// 	</Marker>
// 		<LayersControl.Overlay name="Feature group">
// 			<FeatureGroup pathOptions={{ color: "purple" }}>
// 				<Popup>Popup in FeatureGroup</Popup>
// 				<Circle center={coordinates} radius={200} />
// 				{/* <Rectangle bounds={rectangle} /> */}
// 			</FeatureGroup>
// 		</LayersControl.Overlay>
// </LayersControl.Overlay>
