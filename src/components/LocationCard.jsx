/* eslint-disable react/prop-types */
import { useEffect } from "react";

// import Location from "./IpLocation.jsx";
export default function LocationCard({ location }) {
	return (
		<div className="flex-auto text-center text-white text-xl font-medium inline-flex justify-center">
			{location}
		</div>
	);
}
