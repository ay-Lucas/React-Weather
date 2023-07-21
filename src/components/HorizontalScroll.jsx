/* eslint-disable react/prop-types */
// import { ScrollButton } from "./ScrollButton";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
export const HorizontalScroll = ({ children }) => {
	const elementRef = useRef(null);
	const [arrowDisable, setArrowDisable] = useState(true);
	// const [defaultView, setSetDefaultView] = useState(0);
	// const scrollBack = () => {
	// 	elementRef.current?.scrollIntoView({ behavior: "smooth" });
	// 	console.log("hello");
	// 	scrollTo(elementRef);
	// };
	// const scrollForward = () => {
	// 	elementRef.current?.scrollIntoView({ behavior: "smooth" });
	// 	console.log("hello");
	// 	scrollTo(elementRef);
	// };
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
		}, speed);
	};
	const toDefaultView = () => {
		elementRef.current.scrollLeft = 0;
	};
	useEffect(() => {
		toDefaultView();
	}, []);

	return (
		<div className="w-full items-center">
			<div
				className="flex overflow-x-scroll w-full overflow-hidden scrollbar-hide"
				style={{ msOverflowStyle: "none", WebkitSCrollBar: "none" }}
				ref={elementRef}
			>
				{children}
			</div>
			<div className="inline-flex w-full justify-between my-4 px-1">
				<button
					onClick={() => {
						handleHorizontalScroll(elementRef.current, 3, 1000, -10);
					}}
					disabled={arrowDisable}
					className="flex items-center h-6 w-6 rounded-full  bg-slate-700 hover:bg-slate-800"
				>
					<ChevronLeftRounded />
				</button>
				<button
					onClick={() => {
						handleHorizontalScroll(elementRef.current, 3, 885, 10);
					}}
					className="flex items-center h-6 w-6 rounded-full text-right bg-slate-600 hover:bg-slate-800"
				>
					<ChevronRightRounded />
				</button>
			</div>
		</div>
	);
};
