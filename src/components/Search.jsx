import { MdOutlineSearch } from "react-icons/md";
export default function Search() {
	return (
		<div className="flex bg-white rounded-xl px-0 py-1 mx-auto overflow-hidden">
			<MdOutlineSearch
				size="25"
				color="black"
				className="p-0 lg:ml-4 sm:ml-2 my-auto"
			/>
			<input
				type="text"
				placeholder="Enter a location"
				className="focus:outline-none align-middle lg:mx-3 sm:mx-2 sm:px-1 w-3/4 text-black"
			/>
		</div>
	);
}
