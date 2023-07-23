/* eslint-disable react/prop-types */
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export const HorizontalScroll = ({ children, dailyDate }) => {
	const elementRef = useRef(null);
	//drag scroll hook from react-use-draggable-scroll
	//relies on event listeners instead of state for performance
	const [arrowDisable, setArrowDisable] = useState(true);
	//TODO: fix rubber band effect
	// second render rubbder band effect to work event though it's disabled
	// rubber band effect is laggy with man elements (hours)
	const { events } = useDraggable(elementRef, {
		applyRubberBandEffect: false,
	});
	const handleHorizontalScroll = (element, speed, distance, step) => {
		let scrollAmount = 0;
		const slideTimer = setInterval(() => {
			element.scrollLeft += step;
			scrollAmount += Math.abs(step);
			if (scrollAmount >= distance) {
				clearInterval(slideTimer);
			}
			if (element.scrollLeft === 0) {
				// setArrowDisable(true);
				// drag scroll causes scrollLeft to unsync
				// causing arrowDisable to be true prematurely
			} else {
				setArrowDisable(false);
			}
		}, speed);
		console.log(element.scrollLeft);

		setTimeout(() => {
			console.log(element.scrollLeft);
			dailyDate(element.scrollLeft);
		}, [1000]);
	};
	// resets scroll position after rerender
	const toDefaultView = () => {
		elementRef.current.scrollLeft = 0;
	};
	useEffect(() => {
		toDefaultView();
	}, []);

	return (
		<div className="w-full items-center">
			<div className="flex space-x-3 overflow-x-scroll w-full overflow-hidden scrollbar-hide" ref={elementRef} {...events}>
				{children}
			</div>
			<div className="inline-flex w-full justify-between my-4 px-1">
				<button
					onClick={() => {
						handleHorizontalScroll(elementRef.current, 3, 1040.25, -10);
					}}
					disabled={arrowDisable}
					className="flex items-center h-6 w-6 rounded-full  bg-slate-700 hover:bg-slate-800"
				>
					<ChevronLeftRounded />
				</button>
				<button
					onClick={() => {
						handleHorizontalScroll(elementRef.current, 3, 1040.001, 10);
					}}
					className="flex items-center h-6 w-6 rounded-full text-right bg-slate-600 hover:bg-slate-800"
				>
					<ChevronRightRounded />
				</button>
			</div>
		</div>
	);
};
