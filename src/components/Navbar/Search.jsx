/* eslint-disable no-unused-vars */
import { Code } from "@mui/icons-material";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AsyncPaginate } from "react-select-async-paginate";
import countries from "./../../assets/countryobjects.json";
import states from "./../../assets/statesobjects.json";
const GEODB_AUTOSUGGEST_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
let lastInputVal, countryName, regionCode;
const geoApiOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": import.meta.env.VITE_GEO_DB_KEY,
		"X-RapidAPI-Host": import.meta.env.VITE_GEO_DB_HOST,
	},
};
// eslint-disable-next-line react/prop-types
const Search = ({ onSearchChange }) => {
	const [search, setSearch] = useState(null);
	//check for US state code and name
	function searchState(element) {
		// console.log(element);
		let code = null;
		if (element.length === 2) {
			element = element.toUpperCase();
			// console.log(element);
		} else if (element.length > 2) {
			element = element.toLowerCase();
			//check for spaces
			if (element.indexOf(" ") !== -1) {
				let stateWithSpaces = "";
				let arr = [];
				element = element.split(" ");
				console.log(element);
				for (let i = 0; i < element.length; i++) {
					arr.push(element[i].charAt(0).toUpperCase().concat(element[i].substring(1)));
					console.log(arr);
				}
				console.log(arr);
				stateWithSpaces = arr.toString();
				element = stateWithSpaces.replace(",", " ");
				console.log(element);
			} else {
				element = element.charAt(0).toUpperCase().concat(element.substring(1));
			}
			console.log(element);
		}
		states.forEach((state) => {
			if (element === state.name || element === state.code) {
				console.log(state.name);
				console.log(state.code);
				regionCode = state.code;
				code = state.code;
			}
		});
		// console.log(code);
		return code;
	}
	function searchCountry(element) {
		let code = null;
		//check for country abbreviation
		if (element.length === 2) {
			element = element.toUpperCase();
			console.log(element);
		}
		//check for full country name
		else if (element.length > 2) {
			element = element.toLowerCase();
			//check for spaces
			if (element.indexOf(" ") !== -1) {
				let stateWithSpaces;
				element = element.split(" ");
				for (let i = 0; i < element.length; i++) {
					element[i] = element.charAt(0).toUpperCase().concat(element.substring(1));
					stateWithSpaces = element[i].concat(stateWithSpaces);
				}
				let element = stateWithSpaces;
			}
			console.log(element);
			element = element.charAt(0).toUpperCase().concat(element.substring(1));

			console.log(element);
		}
		countries.map((country) => {
			if (element === country.name || element === country.code) {
				code = country.code;
			}
		});
		return code;
	}
	function parseInput(inputValue) {
		let countryCode, stateCode, city;
		let arr = null;
		//check if input has commas
		if (inputValue.indexOf(",") !== -1) {
			arr = inputValue.split(",");
			for (let i = 0; i < arr.length; i++) {
				arr[i] = arr[i].trim();
			}
			// console.log(arr);
			inputValue = arr;
			city = inputValue[0];
		}
		//now check if input is only a city
		if (arr === null) {
			city = inputValue.trim();
			console.log(city);
			const cityState = `${GEODB_AUTOSUGGEST_URL}/cities?&namePrefix=${city}&sort=-population`;
			// console.log(cityState);
			return cityState;
			//check for city, state, and country
		} else if (arr.length === 3) {
			countryCode = searchCountry(inputValue[2]);
			//
			stateCode = countryCode === "US" ? searchState(inputValue[1]) : arr[2];
			// check for null
			console.log(city, stateCode, countryCode);
			if (stateCode && countryCode) {
				console.log(city, stateCode, countryCode);
				const cityStateCountry = `${GEODB_AUTOSUGGEST_URL}/countries/${countryCode}/regions/${stateCode}/cities?namePrefix=${city}&limit=10`;
				console.log(cityStateCountry);
				return cityStateCountry;
			}
			//check for city and state OR
			//city and country
		} else if (arr.length === 2) {
			// console.log(inputValue);
			let state = searchState(inputValue[1]);
			if (state !== null) {
				stateCode = state;
				countryCode = "US";
				const cityStateCountry = `${GEODB_AUTOSUGGEST_URL}/countries/${countryCode}/regions/${stateCode}/cities?namePrefix=${city}&limit=10`;
				// console.log(cityStateCountry);
				return cityStateCountry;
			}
			let country = searchCountry(inputValue[1]);
			if (country !== null) {
				console.log(country);
				countryCode = country;
				const cityCountry = `${GEODB_AUTOSUGGEST_URL}/cities?countryIds=${countryCode}&namePrefix=${city}&limit=10&sort=-population`;
				return cityCountry;
			}
		}
		console.log(`No input match! No url returned! \n ${city}, ${stateCode}, ${countryCode}`);
	}
	function getUrl(inputValue) {
		let geoFetch = parseInput(inputValue);
		console.log(geoFetch);
		if (geoFetch !== null || geoFetch !== undefined) {
			return geoFetch;
		}
	}

	const loadOptions = (inputValue) => {
		// console.log(inputValue);
		if (inputValue === lastInputVal) {
			console.log("input repeat");
			return Promise.resolve({ options: [] });
		} else if (inputValue === "") return Promise.resolve({ options: [] });
		lastInputVal = inputValue;
		let url = getUrl(inputValue);
		try {
			// console.log(url);
			return fetch(url, geoApiOptions)
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
					let regionName;
					return {
						options: response.data.map((city) => {
							return {
								value: `${city.latitude} ${city.longitude}`,
								label: `${city.name}, ${(regionName = city.country === "United States of America" ? city.regionCode || regionCode : " ")} ${
									city.country === "United States of America" ? "" : city.country || regionCode
								}`,
							};
						}),
					};
				});
		} catch (error) {
			console.log("GeoDB Search API ERROR" + error);
		}
		console.log(inputValue);
	};
	const handleOnChange = (searchData) => {
		// console.log(searchData);
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
				debounceTimeout={800}
				value={search}
				onChange={handleOnChange}
				loadOptions={loadOptions}
				className="w-full overflow"
			/>
		</div>
	);
};
export default Search;
