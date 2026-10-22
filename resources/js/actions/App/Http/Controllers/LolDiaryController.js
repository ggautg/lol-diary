import { queryParams, applyUrlDefaults } from "./../../../../wayfinder";
/**
* @see \App\Http\Controllers\LolDiaryController::index
* @see app/Http/Controllers/LolDiaryController.php:19
* @route '/diary'
*/
export const index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/diary"
};
/**
* @see \App\Http\Controllers\LolDiaryController::index
* @see app/Http/Controllers/LolDiaryController.php:19
* @route '/diary'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\LolDiaryController::index
* @see app/Http/Controllers/LolDiaryController.php:19
* @route '/diary'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\LolDiaryController::index
* @see app/Http/Controllers/LolDiaryController.php:19
* @route '/diary'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\LolDiaryController::index
* @see app/Http/Controllers/LolDiaryController.php:19
* @route '/diary'
*/
const indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\LolDiaryController::index
* @see app/Http/Controllers/LolDiaryController.php:19
* @route '/diary'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\LolDiaryController::index
* @see app/Http/Controllers/LolDiaryController.php:19
* @route '/diary'
*/
indexForm.head = (options) => ({
	action: index.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
index.form = indexForm;
/**
* @see \App\Http\Controllers\LolDiaryController::fetch
* @see app/Http/Controllers/LolDiaryController.php:38
* @route '/riot-accounts/{riotAccount}/fetch'
*/
export const fetch = (args, options) => ({
	url: fetch.url(args, options),
	method: "post"
});
fetch.definition = {
	methods: ["post"],
	url: "/riot-accounts/{riotAccount}/fetch"
};
/**
* @see \App\Http\Controllers\LolDiaryController::fetch
* @see app/Http/Controllers/LolDiaryController.php:38
* @route '/riot-accounts/{riotAccount}/fetch'
*/
fetch.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") {
		args = { riotAccount: args };
	}
	if (typeof args === "object" && !Array.isArray(args) && "id" in args) {
		args = { riotAccount: args.id };
	}
	if (Array.isArray(args)) {
		args = { riotAccount: args[0] };
	}
	args = applyUrlDefaults(args);
	const parsedArgs = { riotAccount: typeof args.riotAccount === "object" ? args.riotAccount.id : args.riotAccount };
	return fetch.definition.url.replace("{riotAccount}", parsedArgs.riotAccount.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\LolDiaryController::fetch
* @see app/Http/Controllers/LolDiaryController.php:38
* @route '/riot-accounts/{riotAccount}/fetch'
*/
fetch.post = (args, options) => ({
	url: fetch.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\LolDiaryController::fetch
* @see app/Http/Controllers/LolDiaryController.php:38
* @route '/riot-accounts/{riotAccount}/fetch'
*/
const fetchForm = (args, options) => ({
	action: fetch.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\LolDiaryController::fetch
* @see app/Http/Controllers/LolDiaryController.php:38
* @route '/riot-accounts/{riotAccount}/fetch'
*/
fetchForm.post = (args, options) => ({
	action: fetch.url(args, options),
	method: "post"
});
fetch.form = fetchForm;
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
* @see app/Http/Controllers/LolDiaryController.php:53
* @route '/diary/calendar'
*/
export const calendar = (options) => ({
	url: calendar.url(options),
	method: "get"
});
calendar.definition = {
	methods: ["get", "head"],
	url: "/diary/calendar"
};
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
* @see app/Http/Controllers/LolDiaryController.php:53
* @route '/diary/calendar'
*/
calendar.url = (options) => {
	return calendar.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
* @see app/Http/Controllers/LolDiaryController.php:53
* @route '/diary/calendar'
*/
calendar.get = (options) => ({
	url: calendar.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
* @see app/Http/Controllers/LolDiaryController.php:53
* @route '/diary/calendar'
*/
calendar.head = (options) => ({
	url: calendar.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
* @see app/Http/Controllers/LolDiaryController.php:53
* @route '/diary/calendar'
*/
const calendarForm = (options) => ({
	action: calendar.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
* @see app/Http/Controllers/LolDiaryController.php:53
* @route '/diary/calendar'
*/
calendarForm.get = (options) => ({
	action: calendar.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
* @see app/Http/Controllers/LolDiaryController.php:53
* @route '/diary/calendar'
*/
calendarForm.head = (options) => ({
	action: calendar.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
calendar.form = calendarForm;
const LolDiaryController = {
	index,
	fetch,
	calendar
};
export default LolDiaryController;
