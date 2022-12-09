import { t } from "./locales.js";

export function format(pDate, pFormat, pForceUTC) {
	return pFormat.replace(/([dDjlNSwFmMntLYyaAgGhHisueOPcrU])/g, (pMatch, pSymbol) => {
		return _resolveSymbol(pDate, pSymbol, pForceUTC);
	});
}

function _resolveSymbol(pDate, pSymbol, pForceUTC) {
	const date = pForceUTC ? pDate.getUTCDate() : pDate.getDate(),
		month = pForceUTC ? pDate.getUTCMonth() : pDate.getMonth(),
		year = pForceUTC ? pDate.getUTCFullYear() : pDate.getFullYear(),
		hours = pForceUTC ? pDate.getUTCHours() : pDate.getHours(),
		minutes = pForceUTC ? pDate.getUTCMinutes() : pDate.getMinutes(),
		seconds = pForceUTC ? pDate.getUTCSeconds() : pDate.getSeconds(),
		milliseconds = pForceUTC ? pDate.getUTCMilliseconds() : pDate.getMilliseconds(),
		day = pForceUTC ? pDate.getUTCDay() : pDate.getDay();

	switch (pSymbol) {
		case "d":
			return date.toString().padStart(2, "0");
		case "D":
			return t("day_" + day).substr(0, 3);
		case "j":
			return date.toString();
		case "l":
			return t("day_" + day);
		case "N":
			return day.toString();
		case "S":
			{
				const day = date.toString();

				if (day.endsWith("1")) {
					return "st";
				} else if (day.endsWith("2")) {
					return "nd";
				} else if (day.endsWith("3")) {
					return "rd";
				}

				return "th";
			}
		case "w":
			return (day - 1).toString();
		case "F":
			return t("month_" + month);
		case "m":
			return (month + 1).toString().padStart(2, "0");
		case "M":
			return t("month_" + month).substr(0, 3);
		case "n":
			return (month + 1).toString();
		case "t":
			{
				const date = new Date(year, month + 1, 0);

				return date.getDate().toString();
			}
		case "L":
			return (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? "1" : "0";
		case "Y":
			return year.toString();
		case "y":
			return year.toString().substr(2);
		case "a":
			return t(hours < 12 ? "am" : "pm");
		case "A":
			return t(hours < 12 ? "am" : "pm").toUpperCase();
		case "G":
			return hours.toString();
		case "g":
			return (hours % 12).toString();
		case "h":
			return (hours % 12).toString().padStart(2, "0");
		case "H":
			return hours.toString().padStart(2, "0");
		case "i":
			return minutes.toString().padStart(2, "0");
		case "s":
			return seconds.toString().padStart(2, "0");
		case "u":
			return milliseconds.toString().padStart(3, "0");
		case "e":
			if (pForceUTC) {
				return "UTC";
			}

			return Intl.DateTimeFormat().resolvedOptions().timeZone;
		case "O":
			{
				if (pForceUTC) {
					return "+0000";
				}

				const offset = pDate.getTimezoneOffset();

				return (offset > 0 ? "-" : "+") + Math.floor(Math.abs(offset) / 60).toString().padStart(2, "0") + Math.abs(offset % 60).toString().padStart(2, "0");
			}
		case "P":
			{
				if (pForceUTC) {
					return "+00:00";
				}

				const offset = pDate.getTimezoneOffset();

				return (offset > 0 ? "-" : "+") + Math.floor(Math.abs(offset) / 60).toString().padStart(2, "0") + ":" + Math.abs(offset % 60).toString().padStart(2, "0");
			}
		case "c":
			return pDate.toISOString();
		case "r":
			return pDate.toUTCString();
		case "U":
			return Math.floor(pDate.getTime() / 1000).toString();
	}

	return pSymbol;
}
