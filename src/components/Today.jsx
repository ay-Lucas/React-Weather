import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Today = ({ data, model, units }) => {
	const [temp_max, setTempMax] = useState(0);
	const [temp_min, setTempMin] = useState(0);
	const [apparent_temp_max, setApparentTempMax] = useState(0);
	const [apparent_temp_min, setApparentTempMin] = useState(0);
	const [wind_gust, setWindGust] = useState(0);
	const [sunrise, setSunrise] = useState(0);
	const [sunset, setSunset] = useState(0);
	const [precipitation_probability_max, setPrecipitationProbabilityMax] =
		useState(0);
	useEffect(() => {
		console.log("Today rendered");
		setSunrise(data.sunrise);
		setSunset(data.sunset);
		if (model === "gfs_global") {
			setTempMax(data.temperature_2m_max_gfs_global);
			setTempMin(data.temperature_2m_min_gfs_global);
			setApparentTempMax(data.apparent_temperature_max_gfs_global);
			setApparentTempMin(data.apparent_temperature_min_gfs_global);
			setWindGust(data.windgusts_10m_max_gfs_global);
			setPrecipitationProbabilityMax(
				data.precipitation_probability_max_gfs_global
			);
		} else if (model === "gfs_hrrr") {
			setTempMax(data.temperature_2m_max_gfs_hrrr);
			setTempMin(data.temperature_2m_min_gfs_hrrr);
			setApparentTempMax(data.apparent_temperature_max_gfs_hrrr);
			setApparentTempMin(data.apparent_temperature_min_gfs_hrrr);
			// setWindGust(data.windgusts_10m_max_gfs_hrrr);
			setPrecipitationProbabilityMax(
				data.precipitation_probability_max_gfs_hrrr
			);
			//no max wind gust
		} else if (model === "ecmwf_ifs04") {
			setTempMax(data.temperature_2m_max_ecmwf_ifs04);
			setTempMin(data.temperature_2m_min_ecmwf_ifs04);
			setApparentTempMax(data.apparent_temperature_max_ecmwf_ifs04);
			setApparentTempMin(data.apparent_temperature_min_ecmwf_ifs04);
			// setWindGust(data.windgusts_10m_max_ecmwf_ifs04);
			setPrecipitationProbabilityMax(
				data.precipitation_probability_max_ecmwf_ifs04
			);
			//no max wind gust
		} else if (model === "best_match") {
			setTempMax(data.temperature_2m_max_best_match);
			setTempMin(data.temperature_2m_min_best_match);
			setApparentTempMax(data.apparent_temperature_max_best_match);
			setApparentTempMin(data.apparent_temperature_min_best_match);
			setWindGust(data.windgusts_10m_max_best_match);
			setPrecipitationProbabilityMax(
				data.precipitation_probability_max_best_match
			);
		} else if (model === "gfs_seamless") {
			setTempMax(data.temperature_2m_max_gfs_seamless);
			setTempMin(data.temperature_2m_min_gfs_seamless);
			setApparentTempMax(data.apparent_temperature_max_gfs_seamless);
			setApparentTempMin(data.apparent_temperature_min_gfs_seamless);
			setWindGust(data.windgusts_10m_gfs_seamless);
			setPrecipitationProbabilityMax(
				data.precipitation_probability_max_gfs_seamless
			);
		} else {
			console.log("Error: Model not found");
		}
	}, [data, model]);

	//bg-slate-400/10
	//Today&apos;s
	// let temp_max = WhichModel(data, model);
	return (
		<div className="mx-2 lg:text-md sm:text-md">
			<div className="w-full text-left items-center">
				<h1 className="text-2xl mr-3">Today</h1>
				<h2 className="text-xl"></h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">High/Low</h1>
				<h2 className="whitespace-nowrap">
					{/* {data.temperature_2m_max_ecmwf_ifs04[0]} /{" "}
					{data.temperature_2m_min_ecmwf_ifs04[0]} */}
					{Math.round(temp_max[0])}° / {Math.round(temp_min[0])}°
				</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">Feels like</h1>
				<h2 className="">
					{/* {data.apparent_temperature_max_ecmwf_ifs04[0]} /{" "}
					{data.apparent_temperature_min_ecmwf_ifs04[0]} */}
					{Math.round(apparent_temp_max[0])}° /{" "}
					{Math.round(apparent_temp_min[0])}°
				</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className="">Wind</h1>
				<h2 className="">
					{/* {data.windgusts_10m_max_best_match[0]} */}
					{Math.round(wind_gust[0])} {units.wind}
				</h2>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<h1 className=" ">Sunrise/Sunset</h1>
				<h2 className=" ">
					{/* {`${new Date(data.sunrise[0]).toLocaleTimeString(undefined, {
						hour: "numeric",
						minute: "numeric",
					})}`}{" "}
					/{" "}
					{`${new Date(data.sunset[0]).toLocaleTimeString(undefined, {
						hour: "numeric",
						minute: "numeric",
					})}`} */}
					{`${new Date(sunrise[0]).toLocaleTimeString(undefined, {
						hour: "numeric",
						minute: "numeric",
					})}`}{" "}
					/{" "}
					{`${new Date(sunset[0]).toLocaleTimeString(undefined, {
						hour: "numeric",
						minute: "numeric",
					})}`}
				</h2>
			</div>
			{/* <div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<div>Visibility</div>
				<div>{data.visibility}</div>
			</div> */}
			<div className="flex flex-row justify-between my-2">
				<h1 className="">Precipitation</h1>
				<h2 className="">
					{/* {data.precipitation_probability_max_best_match[0]}% */}
					{precipitation_probability_max[0]}%
				</h2>
			</div>
		</div>
	);
};
export default Today;
