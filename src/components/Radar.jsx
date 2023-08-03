import { ArrowLeft, ArrowRight, Pause, PlayArrow } from "@mui/icons-material";
import { Slider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Circle, FeatureGroup, LayerGroup, LayersControl, MapContainer, Marker, Popup, Rectangle, TileLayer, useMap } from "react-leaflet";
import RadarFrame from "./RadarFrame";
// eslint-disable-next-line react/prop-types
const Radar = ({ coordinates }) => {
	const [frame, setFrame] = useState(13);
	const [play, setPlay] = useState(false);
	const [times, setTimes] = useState(null);
	const handleButton = () => {
		if (play === false) {
			setPlay(true);
		} else {
			setPlay(false);
		}
		console.log(frame);
	};
	const incrementFrame = useCallback(() => {
		setFrame((prevFrame) => prevFrame + 1);
	}, []);
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
				console.log(timeLabels);
			}
			return arr;
		};
		setTimes(labels);
		console.log(labels);
	};
	const func = () => {
		return times[frame].label;
	};
	return (
		<div>
			<nav className="flex mt-2">
				<div className="ml-2">
					<button onClick={handleButton}>{(play && <Pause />) || (!play && <PlayArrow />)}</button>
				</div>
				<div className="w-full px-4 text-xs">
					{times && (
						<Slider
							aria-label="Temperature"
							value={frame}
							valueLabelFormat={func}
							valueLabelDisplay="auto"
							step={1}
							marks={times.filter((times, index) => index % 2 === 0)}
							min={0}
							max={15}
							onChange={handleSlider}
							sx={{ span: { fontSize: ".65rem" } }}
						/>
					)}
				</div>
			</nav>
			<MapContainer center={coordinates} zoom={8} scrollWheelZoom={true} className="flex rounded-lg w-full h-[400px]">
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<RadarFrame index={frame} getTimes={getTimes} />
			</MapContainer>
		</div>
	);
};
export default Radar;
// <LayersControl position="topright">
// 	<LayersControl.Overlay name="Marker with popup">
// 		<Marker position={coordinates}>
// 			<Popup>
// 				A pretty CSS3 popup. <br /> Easily customizable.
// 			</Popup>
// 		</Marker>
// 	</LayersControl.Overlay>
// 	<LayersControl.Overlay checked name="Layer group with circles">
// 		<LayerGroup>
// 			<Circle center={coordinates} pathOptions={{ fillColor: "blue" }} radius={200} />
// 			<Circle center={coordinates} pathOptions={{ fillColor: "red" }} radius={100} stroke={false} />
// 			<LayerGroup>
// 				<Circle center={coordinates} pathOptions={{ color: "green", fillColor: "green" }} radius={100} />
// 			</LayerGroup>
// 		</LayerGroup>
// 	</LayersControl.Overlay>
// 	<LayersControl.Overlay name="Feature group">
// 		<FeatureGroup pathOptions={{ color: "purple" }}>
// 			<Popup>Popup in FeatureGroup</Popup>
// 			<Circle center={coordinates} radius={200} />
// 			{/* <Rectangle bounds={rectangle} /> */}
// 		</FeatureGroup>
// 	</LayersControl.Overlay>
// </LayersControl>
