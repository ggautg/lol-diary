import { queryParams } from "./../../../../wayfinder";
/**
* @see \App\Http\Controllers\StatsController::index
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
export const index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/diary/stats"
};
/**
* @see \App\Http\Controllers\StatsController::index
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\StatsController::index
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\StatsController::index
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\StatsController::index
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
const indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\StatsController::index
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\StatsController::index
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
const StatsController = { index };
export default StatsController;
