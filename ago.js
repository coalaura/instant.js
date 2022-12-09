import { t } from "./locales.js";

function _resolveMultiplier(pType) {
	pType = typeof pType === "string" ? pType.toLowerCase() : pType;

	switch (pType) {
		case "century":
		case "centuries":
			return 31536000000;
		case "decade":
		case "decades":
			return 315360000;
		case "year":
		case "years":
			return 31536000;
		case "month":
		case "months":
			return 2592000;
		case "week":
		case "weeks":
			return 604800;
		case "day":
		case "days":
			return 86400;
		case "hour":
		case "hours":
			return 3600;
		case "minute":
		case "minutes":
			return 60;
		case "second":
		case "seconds":
			return 1;
		default:
			return 1;
	}
}

export function ago(pSeconds, pType) {
	const seconds = Math.abs(pSeconds) * _resolveMultiplier(pType),
		isNegative = pSeconds < 0;

	const centuries = Math.floor(seconds / 31536000000);

	if (centuries > 0) {
		return _agoOrSince(centuries, "century", isNegative);
	}

	const decades = Math.floor(seconds / 315360000);

	if (decades > 0) {
		return _agoOrSince(decades, "decade", isNegative);
	}

	const years = Math.floor(seconds / 31536000);

	if (years > 0) {
		return _agoOrSince(years, "year", isNegative);
	}

	const months = Math.floor(seconds / 2592000);

	if (months > 0) {
		return _agoOrSince(months, "month", isNegative);
	}

	const weeks = Math.floor(seconds / 604800);

	if (weeks > 0) {
		return _agoOrSince(weeks, "week", isNegative);
	}

	const days = Math.floor(seconds / 86400);

	if (days > 0) {
		return _agoOrSince(days, "day", isNegative);
	}

	const hours = Math.floor(seconds / 3600);

	if (hours > 0) {
		return _agoOrSince(hours, "hour", isNegative);
	}

	const minutes = Math.floor(seconds / 60);

	if (minutes > 0) {
		return _agoOrSince(minutes, "minute", isNegative);
	}

	return _agoOrSince(seconds, "second", isNegative);
}

function _agoOrSince(pValue, pType, pIsNegative) {
	if (pValue === 0) {
		return t("just_now");
	}

	pType = t(pType + (pValue === 1 ? "" : "s"));

	if (pIsNegative) {
		return `${t("since")} ${pValue} ${pType}`;
	}

	return `${pValue} ${pType} ${t("ago")}`;
}
