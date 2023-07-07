import { withTheme } from "@emotion/react";
import { useState } from "react";
import { BsSlack } from "react-icons/bs";
import { AsyncPaginate } from "react-select-async-paginate";
import { AUTOSUGGEST_URL, geoApiOptions } from "../Api.js";
// eslint-disable-next-line react/prop-types
const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);

	const loadOptions = (inputValue) => {
		if (inputValue === "") return Promise.resolve({ options: [] });
		// if (inputValue === null || inputValue.length < 3) return;

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
			// ...baseStyles,
			color: state.isSelected ? "white" : "white",
			// color: "white",

			backgroundColor: "#0a1929",
			// border: "",
			display: "inline-flex",
			// height: "2.5rem",
			width: "100%",
			borderRadius: "0.5rem",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? "#2193b0" : "#0a1929",
		}),
		menu: (provided, state) => ({
			...provided,
			backgroundColor: "#0a1929",
			color: "white",
		}),
		input: (provided, state) => ({
			...provided,
			color: "white",
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: "white",
		}),
		indicatorSeparator: (provided, state) => ({
			...provided,
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: "white",
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
