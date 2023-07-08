import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AsyncPaginate } from "react-select-async-paginate";
import { AUTOSUGGEST_URL, geoApiOptions } from "../Api.js";
// eslint-disable-next-line react/prop-types
const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);
	const loadOptions = (inputValue) => {
		if (inputValue === "") return Promise.resolve({ options: [] });
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
			backgroundColor: "#0a1929",
			color: "#1976d2",
			display: "flex",
			borderRadius: "0.5rem",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? "black" : "#0a1929",
			color: "white",
		}),
		menu: (provided, state) => ({
			...provided,
			backgroundColor: "#0a1929",
			color: "white",
		}),
		input: (provided, state) => ({
			...provided,
			color: "#1976d2",
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: "#1976d2",
		}),
		indicatorSeparator: (provided, state) => ({
			...provided,
			backgroundColor: "#1976d2",
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: "#1976d2",
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			color: "#1976d2",
		}),
	};
	return (
		<div className="flex items-center md:border-0 border-[1px] border-[#1976d2] border-solid rounded-md text-[#1976d2]">
			<AsyncPaginate
				// styles={customStyles}
				styles={customStyles}
				placeholder="Search for city"
				debounceTimeout={600}
				value={"search"}
				onChange={handleOnChange}
				loadOptions={loadOptions}
				className="w-80 "
				// theme={{
				// 	colors: {
				// 		// primary: "#1976d2",
				// 		primary25: "#0a1929",
				// 		// primary50: "#0a1929",
				// 		// primary75: "#0a1929",
				// 		// danger: "#1976d2",
				// 		// dangerLight: "#1976d2",
				// 		// neutral0: "#0a1929",
				// 		neutral5: "#1976d2",
				// 		neutral10: "#1976d2",
				// 		// neutral20: "#1976d2",
				// 		// neutral30: "#1976d2",
				// 		neutral40: "#1976d2",
				// 		// neutral50: "#1976d2",
				// 		// neutral60: "#1976d2",
				// 		neutral70: "#1976d2",
				// 		neutral80: "#1976d2",
				// 		// neutral90: "#1976d2",
				// 	},
				// 	spacing: { baseUnit: 4, controlHeight: 38, menuGutter: 8 },
				// 	borderRadius: 4,
				// 	fontFamily: "Oxygen, sans-serif",
				// }}
			/>
			{/* <span className="absolute right-[47rem]">
				<BsSearch size={17} color={"#1976d2"} />
			</span> */}
		</div>
	);
};
export default Search;
