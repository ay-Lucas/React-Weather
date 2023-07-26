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
	const [color, setColor] = useState(cyan[200]);
	const [date, setDate] = useState(getDateString(data.days[0].datetimeEpoch));
	const pixelsInOneScroll = 1000;
	const scrollsInDay = 3.43;
	const pixelsInDay = pixelsInOneScroll * scrollsInDay;
	const tilesInView = 7;

	useEffect(() => {
		setDate(getDateString(data.days[0].datetimeEpoch));
	}, [timezone, startingIndex, data, hours]);

	const getDay = (scrollAmount) => {
		let day;
		const firstDayRemainingHours = 24 - startingIndex;
		const pixelDayOffset = hoursToPixels(firstDayRemainingHours);
		const index = Math.round((scrollAmount + pixelDayOffset) / pixelsInDay);
		day = getDateString(data.days[index].datetimeEpoch);
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
				<HorizontalScroll dailyDate={getDay}>{children}</HorizontalScroll>
			</div>
		</>
	);
};
