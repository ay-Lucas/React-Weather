import { GrSearch } from "react-icons/gr";
export default function Search() {
	return (
		<div className="flex">
			{/* //flex items-center justify-center flex-row text-center p-0 */}
			<div className="inline-flex border-b-2 border-white p-1">
				<GrSearch
					style={{ text: "white" }}
					size="25"
					className="fill-white inline-table"
				/>
				<input
					type="text"
					placeholder="Enter a city"
					className="focus:outline-none rounded-lg ml-4 p-1 pl-4 pr-4"
				/>
			</div>
		</div>
	);
}
