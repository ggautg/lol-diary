import { queryParams } from "./../../../../wayfinder";
/**
* @see \App\Http\Controllers\WeaknessController::index
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
export const index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/diary/weaknesses"
};
/**
* @see \App\Http\Controllers\WeaknessController::index
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\WeaknessController::index
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\WeaknessController::index
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\WeaknessController::index
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
const indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\WeaknessController::index
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\WeaknessController::index
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
const WeaknessController = { index };
export default WeaknessController;
