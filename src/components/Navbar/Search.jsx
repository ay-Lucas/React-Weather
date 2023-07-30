/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AsyncPaginate } from "react-select-async-paginate";
// eslint-disable-next-line react/prop-types
const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);
	let lastInputVal;
	// function checkState(inputValue) {
	// 	try {
	// 		let state = inputValue.split(",").length > 1 ? inputValue.split(",")[1] : null;
	// 		if (state) {
	// 			state = state.trim();
	// 			console.log(state);
	// 		}
	// 		console.log(state);
	// 		return state;
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }
	const geoApiOptions = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": import.meta.env.VITE_GEO_DB_KEY,
			"X-RapidAPI-Host": import.meta.env.VITE_GEO_DB_HOST,
		},
	};
	const loadOptions = (inputValue) => {
		console.log(inputValue);
		if (inputValue === lastInputVal) {
			console.log("input repeat");
			return Promise.resolve({ options: [] });
		} else if (inputValue === "") return Promise.resolve({ options: [] });
		// let state = checkState(inputValue);
		lastInputVal = inputValue;

		return fetch(`${import.meta.env.VITE_AUTOSUGGEST_URL}/cities?&namePrefix=${inputValue}&limit=10&sort=-population`, geoApiOptions)
			.then((response) => {
				// console.log(response);
				if (!response.ok) {
					console.log("geodb response error!");
					throw new Error("geodb response error");
				} else {
					return response.json();
				}
			})
			.then((response) => {
				// console.log(response);
				return {
					options: response.data.map((city) => {
						return {
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name}, ${city.regionCode}, ${city.country}`,

							// region: `${city.regionCode}`,
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
			backgroundColor: "",
			color: "#1976d2",
			display: "flex",
			borderRadius: "0.5rem",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? "#555555" : "#242424",
			color: "white",
		}),
		menu: (provided, state) => ({
			...provided,
			position: "absolute",
			width: "110%",
			right: "0px",
			justifyContent: "center",
			backgroundColor: "#242424",
			color: "white",
		}),
		input: (provided, state) => ({
			...provided,
			color: "white",
			textAlign: "center",
		}),
		singleValue: (provided, state) => ({
			...provided,
			// color: "#1976d2",
			color: "white",
		}),
		indicatorSeparator: (provided, state) => ({
			...provided,
			backgroundColor: "#d1d5db",
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: "#d1d5db",
			fontWeight: "normal",
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			color: "#d1d5db",
		}),
	};
	//bg color bg-[#1b3c5f]
	return (
		<div className="flex items-center rounded-md pl-4 bg-[#555555] border-[1px] border-solid border-[#484848] hover:border-[#66c2ff] md:h-8 h-7 md:text-base text-sm justify-center md:w-[25rem] w-80 mx-3 md:mx-0">
			<div>
				<BsSearch size={17} color={"#d1d5db"} />
			</div>
			<AsyncPaginate
				styles={customStyles}
				placeholder="Search for a city"
				debounceTimeout={700}
				value={search}
				onChange={handleOnChange}
				loadOptions={loadOptions}
				className="w-full overflow"
			/>
		</div>
	);
};
export default Search;
