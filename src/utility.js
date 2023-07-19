export const degreesToWindDirection = (degrees) => {
	if (degrees === null || degrees === undefined) {
		return null;
	}
	if (degrees >= 0 && degrees <= 11.25) {
		return "N";
	} else if (degrees >= 348.75 && degrees <= 360) {
		return "N";
	} else if (degrees >= 11.25 && degrees <= 33.75) {
		return "NNE";
	} else if (degrees >= 33.75 && degrees <= 56.25) {
		return "NE";
	} else if (degrees >= 56.25 && degrees <= 78.75) {
		return "ENE";
	} else if (degrees >= 78.75 && degrees <= 101.25) {
		return "E";
	} else if (degrees >= 101.25 && degrees <= 123.75) {
		return "ESE";
	} else if (degrees >= 123.75 && degrees <= 146.25) {
		return "SE";
	} else if (degrees >= 146.25 && degrees <= 168.75) {
		return "SSE";
	} else if (degrees >= 168.75 && degrees <= 191.25) {
		return "S";
	} else if (degrees >= 191.25 && degrees <= 213.75) {
		return "SSW";
	} else if (degrees >= 213.75 && degrees <= 236.25) {
		return "SW";
	} else if (degrees >= 236.25 && degrees <= 258.75) {
		return "WSW";
	} else if (degrees >= 258.75 && degrees <= 281.25) {
		return "W";
	} else if (degrees >= 281.25 && degrees <= 303.75) {
		return "WNW";
	} else if (degrees >= 303.75 && degrees <= 326.25) {
		return "NW";
	} else if (degrees >= 326.25 && degrees <= 348.75) {
		return "NNW";
	} else {
		console.log("utility.js: invalid degrees");
		console.log(typeof degrees);
		console.log(degrees);
	}
};
export const uvIndexToRisk = (uvIndex) => {
	if (uvIndex === null || uvIndex === undefined) {
		return null;
	}
	if (uvIndex <= 2) {
		return "Low";
	} else if (uvIndex <= 5) {
		return "Moderate";
	} else if (uvIndex <= 7) {
		return "High";
	} else if (uvIndex <= 10) {
		return "Very High";
	} else if (uvIndex > 10) {
		return "Extreme";
	} else {
		console.log("uvIndexToRisk: invalid uvIndex");
	}
};
export const uvIndexToColor = (uvIndex) => {
	if (uvIndex === null || uvIndex === undefined) {
		return null;
	}
	if (uvIndex <= 2) {
		return "green";
	} else if (uvIndex <= 5) {
		return "yellow";
	} else if (uvIndex <= 7) {
		return "orange";
	} else if (uvIndex <= 10) {
		return "red";
	} else if (uvIndex > 10) {
		return "purple";
	} else {
		console.log("uvIndexToColor: invalid uvIndex");
	}
};
export const uvIndexToPercent = (uvIndex) => {
	if (uvIndex === null || uvIndex === undefined) {
		return null;
	}
	switch (uvIndex) {
		case 1:
			return "9%";
		case 2:
			return "18%";
		case 3:
			return "27%";
		case 4:
			return "36%";
		case 5:
			return "45%";
		case 6:
			return "55%";
		case 7:
			return "63%";
		case 8:
			return "72%";
		case 9:
			return "81%";
		case 10:
			return "91%";
		case 11:
			return "100%";
		case 12:
			return "100%";
		case 13:
			return "100%";
		case 14:
			return "100%";
		case 15:
			return "100%";
	}
};
export const decimalToMoonPhase = (decimal) => {
	if (decimal === null || decimal === undefined) {
		return null;
	}
	if (decimal >= 0 && decimal < 0.0625) {
		return "New Moon";
	} else if (decimal >= 0.0625 && decimal < 0.1875) {
		return "Waxing Crescent";
	} else if (decimal >= 0.1875 && decimal < 0.3125) {
		return "First Quarter";
	} else if (decimal >= 0.3125 && decimal < 0.4375) {
		return "Waxing Gibbous";
	} else if (decimal >= 0.4375 && decimal < 0.5625) {
		return "Full Moon";
	} else if (decimal >= 0.5625 && decimal < 0.6875) {
		return "Waning Gibbous";
	} else if (decimal >= 0.6875 && decimal < 0.8125) {
		return "Last Quarter";
	} else if (decimal >= 0.8125 && decimal < 0.9375) {
		return "Waning Crescent";
	} else if (decimal >= 0.9375 && decimal <= 1) {
		return "New Moon";
	} else {
		console.log("decimalToMoonPhase: invalid decimal");
	}
};
