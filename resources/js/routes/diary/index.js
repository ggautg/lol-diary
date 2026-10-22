import { queryParams } from "./../../wayfinder";
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
/**
* @see \App\Http\Controllers\StatsController::stats
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
export const stats = (options) => ({
	url: stats.url(options),
	method: "get"
});
stats.definition = {
	methods: ["get", "head"],
	url: "/diary/stats"
};
/**
* @see \App\Http\Controllers\StatsController::stats
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
stats.url = (options) => {
	return stats.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\StatsController::stats
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
stats.get = (options) => ({
	url: stats.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\StatsController::stats
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
stats.head = (options) => ({
	url: stats.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\StatsController::stats
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
const statsForm = (options) => ({
	action: stats.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\StatsController::stats
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
statsForm.get = (options) => ({
	action: stats.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\StatsController::stats
* @see app/Http/Controllers/StatsController.php:13
* @route '/diary/stats'
*/
statsForm.head = (options) => ({
	action: stats.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
stats.form = statsForm;
/**
* @see \App\Http\Controllers\WeaknessController::weaknesses
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
export const weaknesses = (options) => ({
	url: weaknesses.url(options),
	method: "get"
});
weaknesses.definition = {
	methods: ["get", "head"],
	url: "/diary/weaknesses"
};
/**
* @see \App\Http\Controllers\WeaknessController::weaknesses
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
weaknesses.url = (options) => {
	return weaknesses.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\WeaknessController::weaknesses
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
weaknesses.get = (options) => ({
	url: weaknesses.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\WeaknessController::weaknesses
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
weaknesses.head = (options) => ({
	url: weaknesses.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\WeaknessController::weaknesses
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
const weaknessesForm = (options) => ({
	action: weaknesses.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\WeaknessController::weaknesses
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
weaknessesForm.get = (options) => ({
	action: weaknesses.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\WeaknessController::weaknesses
* @see app/Http/Controllers/WeaknessController.php:13
* @route '/diary/weaknesses'
*/
weaknessesForm.head = (options) => ({
	action: weaknesses.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
weaknesses.form = weaknessesForm;
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
* @see app/Http/Controllers/RiotAccountController.php:22
* @route '/diary/accounts'
*/
export const accounts = (options) => ({
	url: accounts.url(options),
	method: "get"
});
accounts.definition = {
	methods: ["get", "head"],
	url: "/diary/accounts"
};
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
* @see app/Http/Controllers/RiotAccountController.php:22
* @route '/diary/accounts'
*/
accounts.url = (options) => {
	return accounts.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
* @see app/Http/Controllers/RiotAccountController.php:22
* @route '/diary/accounts'
*/
accounts.get = (options) => ({
	url: accounts.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
* @see app/Http/Controllers/RiotAccountController.php:22
* @route '/diary/accounts'
*/
accounts.head = (options) => ({
	url: accounts.url(options),
	method: "head"
});
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
* @see app/Http/Controllers/RiotAccountController.php:22
* @route '/diary/accounts'
*/
const accountsForm = (options) => ({
	action: accounts.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
* @see app/Http/Controllers/RiotAccountController.php:22
* @route '/diary/accounts'
*/
accountsForm.get = (options) => ({
	action: accounts.url(options),
	method: "get"
});
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
* @see app/Http/Controllers/RiotAccountController.php:22
* @route '/diary/accounts'
*/
accountsForm.head = (options) => ({
	action: accounts.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
accounts.form = accountsForm;
const diary = {
	index: Object.assign(index, index),
	calendar: Object.assign(calendar, calendar),
	stats: Object.assign(stats, stats),
	weaknesses: Object.assign(weaknesses, weaknesses),
	accounts: Object.assign(accounts, accounts)
};
export default diary;
