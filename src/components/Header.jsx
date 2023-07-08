// TODO refactor component
import Button from "@mui/material/Button";
import { BsGithub, BsSearch } from "react-icons/bs";
import Search from "./Search";
// eslint-disable-next-line react/prop-types
function Header({ onSearchChange }) {
	// const [search, setSearch] = useState("");
	// const handleOnSearchChange = (e) => {
	//     setSearch(e.target.value);
	return (
		<div className="bg-[#0a1929] drop-shadow-2xl w-full">
			<div className="py-1 items-center text-center flex md:justify-evenly justify-center flex-wrap">
				{/* <div className="hidden md:flex"> */}
				<div className="flex md:flex md:w-fit order-1">
					<Button
						className="text-xl justify-center"
						// sx={{ color: "rgba(255, 0, 128, .8)" }}
						color="secondary"
						variant="text"
						size="large"
						onClick={() => {
							window.location.reload();
						}}
					>
						WeatherPal
					</Button>
				</div>
				<div className="flex md:order-2 order-4 ">
					<Search onSearchChange={onSearchChange} />
				</div>
				<div className="md:w-[114.39px] md:flex order-3">
					<Button
						color="secondary"
						// sx={{ color: "rgba(255, 0, 128, .8)" }}
						onClick={() => {
							window.open("https://github.com/ay-Lucas");
						}}
					>
						<BsGithub size={25} />
					</Button>
				</div>
			</div>
		</div>
	);
}
export default Header;
//replaces this: (on app.jsx)
{
	/* <div className=" bg-[#0a1929] drop-shadow-2xl ">
				<div className="py-1 items-center text-center lg:flex justify-center sm:flex-auto m-auto w-3/4 ">
					<h1 className="text-xl text-white xl:visible justify-center lg:w-1/3 sm:1/2 cursor-pointer select-none">
						WeatherPal
					</h1>
					<Button variant="primary"></Button>
					<div className="lg:w-1/3 sm:1/2 justify-center">
						<div className="w-3/4 m-auto ">
							<Search onSearchChange={handleOnSearchChange} />
						</div>
					</div>
				</div>
			</div> */
}
