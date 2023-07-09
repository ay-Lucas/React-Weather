import Button from "@mui/material/Button";
import { BsCloudCheckFill, BsGithub } from "react-icons/bs";
import Search from "./Search";
// eslint-disable-next-line react/prop-types
function Header({ onSearchChange }) {
	return (
		<div className="bg-[#0a1929] drop-shadow-2xl w-full">
			<div className="py-1.5 items-center text-center flex md:justify-evenly justify-center flex-wrap">
				{/* <div className="hidden md:flex"> */}
				<div className="flex m-0 p-0 md:flex md:w-fit order-1 items-center">
					<Button
						className="text-xl justify-center "
						id="logo-button"
						style={{
							textTransform: "none",
							fontFamily: "Oxygen",
							fontWeight: "bold",
							fontSize: "1.2rem",
							margin: "0",
							padding: "0",
						}}
						color="secondary"
						variant="text"
						size="large"
						onClick={() => {
							window.location.reload();
						}}
					>
						weatherPal
						<div className="mx-2">
							<BsCloudCheckFill size={25} color={"#9c27b0"} />
						</div>
					</Button>
				</div>
				<div className="flex md:order-2 order-4 ">
					<Search onSearchChange={onSearchChange} />
				</div>
				<div className="md:w-[150.39px] md:flex order-3">
					<Button
						color="secondary"
						style={{ hover: { color: "white" } }}
						className=" transition-colors duration-200 hover:text-[#63c1d9]"
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
