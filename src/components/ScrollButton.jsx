import { ChevronRight } from "@mui/icons-material";
// eslint-disable-next-line react/prop-types
import { useRef } from "react";
export const ScrollButton = ({ id }) => {
	const scrollRef = useRef(null);

	const handleClick = () => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
		console.log("hello");
		scrollTo(scrollRef);
	};
	return (
		<button onClick={handleClick} className="flex w-6 rounded-full text-right bg-slate-700 hover:bg-slate-800">
			<ChevronRight />
		</button>
	);
};
