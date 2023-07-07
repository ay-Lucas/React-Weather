import { useState } from "react";
import { BsSlack } from "react-icons/bs";
import { AsyncPaginate } from "react-select-async-paginate";
import { AUTOSUGGEST_URL, geoApiOptions } from "../Api.js";
// eslint-disable-next-line react/prop-types
const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);

	const loadOptions = (inputValue) => {
		// if (inputValue === "") return Promise.resolve({ options: [] });
		return fetch(
			`${AUTOSUGGEST_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
			geoApiOptions
		)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				return {
					options: response.data.map((city) => {
						return {
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name}, ${city.regionCode}, ${city.countryCode}`,
							region: `${city.regionCode}`,
						};
					}),
				};
			});
	};

	const handleOnChange = (searchData) => {
		setSearch(searchData);
		onSearchChange(searchData);
	};
	const customStyles = {
		control: (baseStyles, state) => ({
			...baseStyles,
			border: "",
			display: "inline-flex",
			height: "2.5rem",
			width: "75%",
		}),
		option: (provided, state) => ({
			...provided,
		}),
	};
	return (
		<AsyncPaginate
			styles={customStyles}
			placeholder="Search for city"
			debounceTimeout={600}
			value={search}
			onChange={handleOnChange}
			loadOptions={loadOptions}
		/>
	);
};
export default Search;
{
	/* <div className="flex bg-slate-200 rounded-2xl overflow-hidden text-black">
				<MdOutlineSearch
					size="25"
					color="black"
					className="p-0 lg:ml-4 sm:ml-2 my-auto"
				/>
				<input
					type="text"
					placeholder="Enter a location"
					className="focus:outline-none align-middle lg:mx-2 sm:mx-2 sm:px-1 w-3/4 text-black bg-slate-200"
					value={search}
					onChange={handleOnChange}
					// loadOptions={loadOptions}
				/>
			</div> */
}

// onKeyDown={(e) => {
// 	if (e.key === "Enter") {
// 		console.log(e.target.value);
// 	}
// }}
