import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Today = ({ data, model, units }) => {
	const options = Intl.DateTimeFormat().resolvedOptions();
	const hourFormatter = Intl.DateTimeFormat(options.locale, {
		timeZone: options.timeZone,
		hour: "numeric",
		minute: "numeric",
		// minute: "numeric",
	});
	return (
		<div className="mx-2 lg:text-md sm:text-md">
			<div className="w-full text-left items-center">
				<label className="text-2xl mr-3">Today</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<label>High/Low</label>
				<label className="whitespace-nowrap">
					{Math.round(data.days[0].tempmax)}° /{" "}
					{Math.round(data.days[0].tempmin)}°
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<label>Feels like</label>
				<label>
					{Math.round(data.days[0].feelslikemax)}° /{" "}
					{Math.round(data.days[0].feelslikemin)}°
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<label>Wind</label>
				<label>
					{/* {data.windgusts_10m_max_best_match[0]} */}
					{Math.round(data.days[0].windspeed)} {units.wind}
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<label>Sunrise/Sunset</label>
				<label>
					{`${hourFormatter.format(
						new Date(data.currentConditions.sunriseEpoch * 1000)
					)}`}{" "}
					/{" "}
					{`${hourFormatter.format(
						new Date(data.currentConditions.sunsetEpoch * 1000)
					)}`}
				</label>
			</div>
			<div className="flex flex-row justify-between py-2 border-gray-800 border-b-[1px]">
				<label>Visibility</label>
				<label>
					{data.currentConditions.visibility} {units.visibility}
				</label>
			</div>
			<div className="flex flex-row justify-between my-2">
				<label>Precipitation</label>
				<label>{data.days[0].precipprob}%</label>
			</div>
		</div>
	);
};
export default Today;
