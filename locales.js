import enUs from "./en_US.js";

let locales = enUs;

export function useLocales(pLocales) {
	locales = pLocales;
}

export function t(pKey) {
	if (pKey in locales) {
		return locales[pKey];
	}

	throw new Error(`Key ${pKey} not found in locales`);
}
