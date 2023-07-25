import Button from "@mui/material/Button";
import { BsCloudCheckFill, BsGithub } from "react-icons/bs";
import Search from "./Search";
import SelectUnits from "./SelectUnits";
// eslint-disable-next-line react/prop-types
function Header({ onSearchChange, onUnitsChange }) {
	return (
		<div className="bg-[#242424] drop-shadow-2xl w-full">
			<div className="py-1.5 items-center text-center flex md:justify-evenly justify-center flex-wrap">
				<div className="flex m-0 p-0 order-1 items-center md:w-1/3 justify-center">
					<Button
						className="text-xl justify-center m-0 p-0 text-gray-300"
						id="logo-button"
						sx={{ textTransform: "none", fontFamily: "Oxygen" }}
						onClick={() => {
							window.location.reload();
						}}
					>
						weatherPal
						<div className="mx-2">
							<BsCloudCheckFill size={25} />
						</div>
					</Button>
				</div>
				<div className="flex md:w-1/3 md:order-2 order-4  justify-center">
					<Search onSearchChange={onSearchChange} />
				</div>
				<div className="md:w-1/3 md:flex order-4 items-center justify-center">
					<SelectUnits onUnitsChange={onUnitsChange} />
					<Button
						onClick={() => {
							window.open("https://github.com/ay-Lucas");
						}}
					>
						<BsGithub size={25} className="text-gray-300 transition-colors duration-200 hover:text-sky-400" />
					</Button>
				</div>
			</div>
		</div>
	);
}
export default Header;
