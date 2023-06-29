import { MdOutlineSearch } from "react-icons/md";
export default function Search() {
	return (
		<div className="flex bg-slate-200 rounded-2xl overflow-hidden text-black">
			<MdOutlineSearch
				size="25"
				color="black"
				className="p-0 lg:ml-4 sm:ml-2 my-auto"
			/>
			<input
				type="text"
				placeholder="Enter a location"
				className="focus:outline-none align-middle lg:mx-2 sm:mx-2 sm:px-1 w-3/4 text-black bg-slate-200"
			/>
		</div>
	);
}
