/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { HorizontalScroll } from "./HorizontalScroll";
// eslint-disable-next-line react/prop-types
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
		console.log(time);
		return time;
	};
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
	};
	function hoursToPixels(hours) {
		return (hours * 1000) / tilesInView;
	}

	return (
		<>
			<div className="select-none">
				<div className="inline-flex items-baseline">
					<div className="text-2xl mb-3 ml-3 ">Hourly</div>
					<div className="text-center ml-2 text-slate-200">{date}</div>
				</div>
				<HorizontalScroll dailyDate={getDay}>{children}</HorizontalScroll>
			</div>
		</>
	);
};
