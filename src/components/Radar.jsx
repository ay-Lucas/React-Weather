import { Circle, FeatureGroup, LayerGroup, LayersControl, MapContainer, Marker, Popup, Rectangle, TileLayer, useMap } from "react-leaflet";

// eslint-disable-next-line react/prop-types
function Radar({ coordinates }) {
	const center = [51.505, -0.09];
	const rectangle = [
		[51.49, -0.08],
		[51.5, -0.06],
	];
	return (
		<MapContainer center={coordinates} zoom={8} scrollWheelZoom={true} className="flex rounded-lg w-full h-[400px]">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</MapContainer>
	);
}
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
