/* eslint-disable react/prop-types */
import { cyan } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { HorizontalScroll } from "./HorizontalScroll";
export const HourlyInterface = ({ children, hours, data, startingIndex, timezone, colors }) => {
	const locationHourFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		day: "numeric",
		weekday: "long",
		month: "numeric",
	});
	const getDateString = (dt) => {
		const date = new Date(dt * 1000);
		const time = locationHourFormatter.format(date);
		return time;
	};
	const [color, setColor] = useState(colors[0]);
	const [date, setDate] = useState(getDateString(data.days[0].datetimeEpoch));
	const scrollDistance = 864;
	const scrollsInDay = 4;
	const pixelsInDay = scrollDistance * scrollsInDay;
	const tilesInView = 7;
	const pixelsPerHour = 144;
	const offset = 4;
	const hourMargin = 12;
	useEffect(() => {
		setDate(getDateString(data.days[0].datetimeEpoch));
	}, [timezone, startingIndex, data, hours]);

	const updateDate = (scrollAmount) => {
		const firstDayPixels = hoursToPixels(startingIndex + 1);
		//correct for first day
		//add 500 to scroll amount to center the day
		const index = Math.floor((scrollAmount + firstDayPixels + 500) / pixelsInDay);
		const day = getDateString(data.days[index].datetimeEpoch);
		// console.log(Math.floor((scrollAmount + firstDayPixels) / pixelsInDay));
		// console.log((scrollAmount + firstDayPixels + 500) / pixelsInDay);
		// console.log(scrollAmount);
		setDate(day);
		setColor(colors[index * 24]);
	};
	function hoursToPixels(hours) {
		return (hours * 1000) / tilesInView;
	}

	return (
		<>
			<div className="select-none">
				<div className="flex items-baseline">
					<div className="text-2xl ml-3 mb-3">Hourly</div>
				</div>
				<div className="text-center justify-center font-medium text-base hidden lg:flex mb-3 -mt-8" style={{ color: color }}>
					{date}
				</div>
				<HorizontalScroll updateDate={updateDate}>{children}</HorizontalScroll>
			</div>
		</>
	);
};
