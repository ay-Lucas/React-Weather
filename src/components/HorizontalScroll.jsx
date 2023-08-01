/* eslint-disable react/prop-types */
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export const HorizontalScroll = ({ children, updateDate }) => {
	const elementRef = useRef(null);
	//drag scroll hook from react-use-draggable-scroll
	//relies on event listeners instead of state for performance
	const [arrowDisable, setArrowDisable] = useState(true);
	const [isDragging, setDragging] = useState(false);
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
				setArrowDisable(true);
			} else {
				setArrowDisable(false);
			}
		}, 5);
		setTimeout(() => {
			updateDate(element.scrollLeft);
		}, [500]);
	};
	const toDefaultView = () => {
		//disable left arrow
		setArrowDisable(true);
		elementRef.current.scrollLeft = 0;
		updateDate(elementRef.current.scrollLeft);
	};
	// resets scroll position after rerender
	useEffect(() => {
		toDefaultView();
	}, [children]);
	// track mouse dragging and button scrolling to update date and color (on desktop)
	const updateScrollAmount = () => {
		if (isDragging) {
			updateDate(elementRef.current.scrollLeft);
		}
	};
	const handleMouseDown = () => {
		setDragging(true);
	};
	const handleMouseUp = () => {
		setDragging(false);
	};
	const buttons = (
		<div className="flex min-w-full mt-2 justify-between">
			<button
				disabled={arrowDisable}
				onClick={() => {
					handleHorizontalScroll(elementRef.current, 3, 864, -8);
				}}
				className="flex items-center h-6 w-6 rounded-full  bg-slate-700 hover:bg-slate-800"
			>
				<ChevronLeftRounded />
			</button>
			<button
				onClick={() => {
					handleHorizontalScroll(elementRef.current, 3, 864, 8);
				}}
				className="flex items-center h-6 w-6 rounded-full text-right bg-slate-600 hover:bg-slate-800"
			>
				<ChevronRightRounded />
			</button>
		</div>
	);

	return (
		<div className="w-full md:mb-8 mb-4 items-center justify-center md:text-base text-sm">
			<div
				className="flex space-x-3 overflow-x-scroll w-full overflow-hidden scrollbar-hide"
				ref={elementRef}
				{...events}
				onMouseDownCapture={handleMouseDown}
				onMouseMove={updateScrollAmount}
				onMouseUp={handleMouseUp}
			>
				{children}
			</div>
			{window.innerWidth > 820 && buttons}
		</div>
	);
};
