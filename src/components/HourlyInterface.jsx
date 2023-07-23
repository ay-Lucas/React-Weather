/* eslint-disable react/prop-types */
import { useState } from "react";
import { HorizontalScroll } from "./HorizontalScroll";
// eslint-disable-next-line react/prop-types
export const HourlyInterface = ({ children, hours, numOfDays, data, startingIndex }) => {
	const getDateFromHours = () => {
		return new Date(data.days[0].datetimeEpoch * 1000).toLocaleDateString([], {
			day: "numeric",
			weekday: "short",
			month: "numeric",
		});
	};
	const [date, setDate] = useState(getDateFromHours());
	const pixelsInOneScroll = 1000;
	const scrollsInDay = 3.43;
	const pixelsInDay = pixelsInOneScroll * scrollsInDay;
	const tilesInView = 7;
	const getDateString = (dt) => {
		const date = new Date(dt * 1000);
		const time = date.toLocaleDateString([], {
			day: "numeric",
			weekday: "long",
			month: "numeric",
		});
		setDate(time);
	};
	const getDay = (scrollAmount) => {
		let index;
		const firstDayRemainingHours = 24 - startingIndex;
		const pixelDayOffset = hoursToPixels(firstDayRemainingHours);
		console.log(pixelDayOffset);
		console.log(scrollAmount);
		if (pixelDayOffset > scrollAmount) {
			index = 0;
		} else {
			index = Math.floor(Math.abs(scrollAmount - pixelDayOffset) / pixelsInDay) + 1;
		}
		getDateString(data.days[index].datetimeEpoch);
	};
	function hoursToPixels(hours) {
		return (hours * 1000) / tilesInView;
	}

	return (
		<>
			<div className="select-none">
				<div className="inline-flex items-baseline">
					<div className="text-2xl mb-3 ml-4 ">Hourly</div>
					<div className="ml-2  text-white">{date}</div>
				</div>
				<HorizontalScroll dailyDate={getDay}>{children}</HorizontalScroll>
			</div>
		</>
	);
};
