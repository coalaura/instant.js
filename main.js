import { useLocales } from "./locales.js";
import { format } from "./symbol.js";
import { ago } from "./ago.js";

function _new(pDate, pForceUTC) {
	this._useUTC = pForceUTC;

	this.format = pFormat => {
		return format(pDate, pFormat, this._useUTC);
	};

	this.utc = pUTC => {
		if (pUTC === undefined) {
			pUTC = true;
		}

		this._useUTC = pUTC;

		return this;
	};

	return this;
}

function _unix(pTimestamp, pForceUTC) {
	return new _new(new Date(pTimestamp * 1000), pForceUTC);
}

function _unixMilli(pTimestamp, pForceUTC) {
	return new _new(new Date(pTimestamp), pForceUTC);
}

export default {
	useLocales,
	ago,

	unix: pTimestamp => _unix(pTimestamp, false),
	unixMilli: pTimestamp => _unixMilli(pTimestamp, false),
	date: pDate => new _new(pDate, false),

	utc: {
		unix: pTimestamp => _unix(pTimestamp, true),
		unixMilli: pTimestamp => _unixMilli(pTimestamp, true),
		date: pDate => new _new(pDate, true)
	}
};
