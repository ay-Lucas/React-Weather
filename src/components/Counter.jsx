import { useState } from "react";
export default function Counter() {
	const [num, setNum] = useState(0);
	const changeNum = () => {
		setNum(num + 1);
	};
	return (
		<div>
			<div className="flex-auto">
				<h1 className="flex-auto m-5 hover:bg-slate-700 text-black font-bold py-2 px-4">
					{num}
				</h1>
				<button
					onClick={changeNum}
					className="bg-slate-600 rounded-lg flex-auto m-5 hover:bg-slate-700 text-white font-bold py-2 px-4"
				>
					Increment
				</button>
			</div>
		</div>
	);
}
