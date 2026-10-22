let urlDefaults = () => ({});
const getValue = (value) => {
	if (value === true) {
		return "1";
	}
	if (value === false) {
		return "0";
	}
	return value.toString();
};
const addNestedParams = (obj, prefix, params) => {
	Object.entries(obj).forEach(([subKey, value]) => {
		if (value === undefined) return;
		const paramKey = `${prefix}[${subKey}]`;
		if (Array.isArray(value)) {
			value.forEach((v) => params.append(`${paramKey}[]`, getValue(v)));
		} else if (value !== null && typeof value === "object") {
			addNestedParams(value, paramKey, params);
		} else if ([
			"string",
			"number",
			"boolean"
		].includes(typeof value)) {
			params.set(paramKey, getValue(value));
		}
	});
};
const clearParamFamily = (params, key) => {
	const toDelete = new Set();
	params.forEach((_, paramKey) => {
		if (paramKey === key || paramKey.startsWith(`${key}[`)) {
			toDelete.add(paramKey);
		}
	});
	toDelete.forEach((paramKey) => params.delete(paramKey));
};
export const queryParams = (options) => {
	if (!options || !options.query && !options.mergeQuery) {
		return "";
	}
	const query = options.query ?? options.mergeQuery;
	const includeExisting = options.mergeQuery !== undefined;
	const params = new URLSearchParams(includeExisting && typeof window !== "undefined" ? window.location.search : "");
	for (const key in query) {
		const queryValue = query[key];
		if (includeExisting) {
			clearParamFamily(params, key);
		}
		if (queryValue === undefined || queryValue === null) {
			continue;
		}
		if (Array.isArray(queryValue)) {
			queryValue.forEach((value) => {
				params.append(`${key}[]`, value.toString());
			});
		} else if (typeof queryValue === "object") {
			addNestedParams(queryValue, key, params);
		} else {
			params.set(key, getValue(queryValue));
		}
	}
	const str = params.toString();
	return str.length > 0 ? `?${str}` : "";
};
export const setUrlDefaults = (params) => {
	urlDefaults = typeof params === "function" ? params : () => params;
};
export const addUrlDefault = (key, value) => {
	const previousDefaults = urlDefaults;
	urlDefaults = () => ({
		...previousDefaults(),
		[key]: value
	});
};
export const applyUrlDefaults = (existing) => {
	const existingParams = { ...existing ?? {} };
	const defaultParams = urlDefaults();
	for (const key in defaultParams) {
		if (existingParams[key] === undefined && defaultParams[key] !== undefined) {
			existingParams[key] = defaultParams[key];
		}
	}
	return existingParams;
};
export const validateParameters = (args, optional) => {
	const missing = optional.filter((key) => {
		const value = args?.[key];
		return value === undefined || value === null || value === "" || value === false;
	});
	const expectedMissing = optional.slice(missing.length * -1);
	for (let i = 0; i < missing.length; i++) {
		if (missing[i] !== expectedMissing[i]) {
			throw Error("Unexpected optional parameters missing. Unable to generate a URL.");
		}
	}
};
