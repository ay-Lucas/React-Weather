// import { useState } from "react";
// import Location from "./components/Location.jsx";
// import Counter from "./components/Counter.jsx";
import "./App.css";
import Header from "./components/Header.jsx";
import "./index.css";
function App() {
	return (
		<div className="mx-auto w-full">
			<Header />
			<div className="mx-auto w-5/6 md:w-full xl:max-w-6xl 2xl:max-w-7xl">
				<div className="flex items-center justify-center flex-col text-center pt-20 pb-6"></div>
				{/* <Counter /> */}
			</div>
		</div>
	);
}

export default App;
