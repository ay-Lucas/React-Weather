/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function LocationCard({ location, timezone, data }) {
	const [alert, setAlert] = useState([]);
	const dateFormatter = Intl.DateTimeFormat(timezone.options.locale, {
		timeZone: timezone.timezone,
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
	useEffect(() => {
		if (data.alerts !== undefined) {
			const alertList = data.alerts.map((alert) => {
				return (
					<div key={alert.id} className="flex-row bg-red-500/30 rounded-lg p-1 mt-2">
						<a href={alert.link} rel="noreferrer noopener" target="_blank" className="flex-col">
							{alert.headline}
						</a>
						<div className="text-gray-300">
							{dateFormatter.format(new Date(alert.onset))} - {dateFormatter.format(new Date(alert.ends))}
						</div>
					</div>
				);
			});
			setAlert(alertList);
		}
	}, [data, timezone]);
	return (
		<div className="flex flex-col">
			<div
				className="flex
		justify-center bg-slate-950/20 py-1 shadow-slate-950/10 shadow-md rounded-lg"
			>
				<div className="text-white text-xl font-medium">{location}</div>
			</div>
			{alert.length > 0 && (
				<>
					<div className="text-md flex-row text-center shadow-slate-950/10 shadow-md rounded-lg">{alert}</div>
				</>
			)}
		</div>
	);
}
