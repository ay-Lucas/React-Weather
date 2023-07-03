// TODO refactor component

// import Button from "@mui/material/Button";
// import Search from "./Search.jsx";
// export default function Header() {
// 	const handleOnSearchChange = (searchData) => {
// 		console.log(searchData);
// 		const [lat, lon] = searchData.value.split(" ");
// 		console.log(lat, lon);
// 	};
// 	return (
// 		<div className="py-1 items-center text-center lg:flex justify-center sm:flex-auto m-auto w-3/4 ">
// 			<h1 className="text-xl text-white xl:visible justify-center lg:w-1/3 sm:1/2">
// 				WeatherPal
// 			</h1>
// 			<div className="flex-auto lg:w-1/3 sm:1/2">
// 				<Button variant="primary">Home</Button>
// 				<Button variant="primary">Hourly</Button>
// 				<Button variant="primary">Daily</Button>
// 				<Button variant="primary">Map</Button>
// 			</div>
// 			<div className="lg:w-1/3 sm:1/2  text-black justify-center">
// 				<div className="w-3/4 m-auto">
// 					<Search onSearchChange={handleOnSearchChange} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
