/* eslint-disable react/prop-types */
import { LocationCitySharp, Pause, PlayArrow } from "@mui/icons-material";
import { Slider } from "@mui/material";
import L, { Map, map } from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import { Circle, FeatureGroup, LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import RadarFrame from "./RadarFrame";
function getIcon() {
	return L.icon({
		iconUrl: "place_black_48dp.svg",
		iconSize: [30, 60],
	});
}

const Radar = ({ coordinates }) => {
	const [frame, setFrame] = useState(13);
	const [play, setPlay] = useState(false);
	const [times, setTimes] = useState(null);
	const [labels, setLabels] = useState(null);
	const windowWidth = useRef(window.innerWidth);

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
		const staticLabels = () => {
			let arr = [];
			for (let i = 0; i < times.length; i++) {
				const timeLabels = {
					value: i,
					label: times[i],
				};
				const noLabel = {
					value: i,
				};
				if (i % 2 !== 0) {
					arr.push(noLabel);
				} else {
					arr.push(timeLabels);
				}
			}
			return arr;
		};
		setLabels(staticLabels);
		setTimes(labels);
	};
	const getSliderLabels = () => {
		// if (times.length >= frame) {
		// 	return;
		// }
		if ((times[frame] !== undefined && times[frame] !== null) || times.length + 1 <= frame) {
			return times[frame].label;
		}
	};
	const isEvenNumber = (n, index) => {
		if (windowWidth.current <= 768) {
			return index % 3 === 0 && index !== 15;
		} else {
			return index % 2 === 0 && index !== 15;
		}
	};
	useEffect(() => {
		if (play) {
			if (frame > 15) {
				setFrame(0);
				return;
			}
			const timeoutFunction = setInterval(incrementFrame, 750);
			return () => clearInterval(timeoutFunction);
		}
	}, [incrementFrame, frame, play]);
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
		<div className="shadow-md rounded-lg">
			<nav className="flex mt-1 justify-center">
				<div className="sm:ml-3 ml-2 sm:mt-2 mt-4">
					<button onClick={handleButton}>
						{(play && <Pause color="primary" className="text-3xl" />) || (!play && <PlayArrow color="primary" className="text-3xl" />)}
					</button>
				</div>
				<div className="w-full sm:pl-4 pl-2 pr-5 text-xs">
					{times && (
						<Slider
							className="mb-5 mt-2"
							aria-label="Temperature"
							value={frame}
							valueLabelFormat={getSliderLabels}
							valueLabelDisplay="auto"
							step={1}
							marks={labels}
							min={0}
							max={15}
							onChange={handleSlider}
							sx={{
								"span": { fontSize: ".65rem" },
								"&& .MuiSlider-rail": {
									color: "white",
								},
								"&& .MuiSlider-markLabel": {
									paddingLeft: "0rem",
								},
							}}
						/>
					)}
				</div>
			</nav>
			{coordinates && (
				<MapContainer
					center={coordinates}
					zoom={10}
					scrollWheelZoom={true}
					className="flex rounded-b-lg w-full h-[340px]"
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
