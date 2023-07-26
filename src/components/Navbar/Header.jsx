import Button from "@mui/material/Button";
import { BsCloudCheckFill, BsGithub } from "react-icons/bs";
import Search from "./Search";
import SelectUnits from "./SelectUnits";
// eslint-disable-next-line react/prop-types
function Header({ onSearchChange, onUnitsChange }) {
	return (
		<div className="flex bg-[#242424] drop-shadow-2xl w-full py-0.5 items-center text-center md:justify-evenly justify-center flex-wrap">
			<div className="flex m-0 p-0 order-1 items-center md:w-1/3 justify-center">
				<Button
					className="md:text-lg text-base justify-center m-0 p-0 text-gray-300"
					id="logo-button"
					sx={{ textTransform: "none", fontFamily: "Oxygen" }}
					onClick={() => {
						window.location.reload();
					}}
				>
					weatherPal
					<div className="mx-2">
						<BsCloudCheckFill size={22} />
					</div>
				</Button>
			</div>
			<div className="flex md:w-1/3 md:order-2 order-5 justify-center w-full">
				<Search onSearchChange={onSearchChange} />
			</div>
			<div className="md:w-1/3 md:flex order-4 items-center justify-center">
				<Button
					className="text-gray-300 transition-colors duration-200 hover:text-sky-400
					bg-transparent"
					onClick={() => {
						window.open("https://github.com/ay-Lucas");
					}}
				>
					<BsGithub size={22} className="group md:p-0  p-0.5" />
				</Button>
				<SelectUnits onUnitsChange={onUnitsChange} />
			</div>
		</div>
	);
}
export default Header;
