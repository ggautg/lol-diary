import { queryParams, applyUrlDefaults } from "./../../wayfinder";
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
* @see \App\Http\Controllers\RiotAccountController::store
* @see app/Http/Controllers/RiotAccountController.php:49
* @route '/riot-accounts'
*/
export const store = (options) => ({
	url: store.url(options),
	method: "post"
});
store.definition = {
	methods: ["post"],
	url: "/riot-accounts"
};
/**
* @see \App\Http\Controllers\RiotAccountController::store
* @see app/Http/Controllers/RiotAccountController.php:49
* @route '/riot-accounts'
*/
store.url = (options) => {
	return store.definition.url + queryParams(options);
};
/**
* @see \App\Http\Controllers\RiotAccountController::store
* @see app/Http/Controllers/RiotAccountController.php:49
* @route '/riot-accounts'
*/
store.post = (options) => ({
	url: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\RiotAccountController::store
* @see app/Http/Controllers/RiotAccountController.php:49
* @route '/riot-accounts'
*/
const storeForm = (options) => ({
	action: store.url(options),
	method: "post"
});
/**
* @see \App\Http\Controllers\RiotAccountController::store
* @see app/Http/Controllers/RiotAccountController.php:49
* @route '/riot-accounts'
*/
storeForm.post = (options) => ({
	action: store.url(options),
	method: "post"
});
store.form = storeForm;
/**
* @see \App\Http\Controllers\RiotAccountController::update
* @see app/Http/Controllers/RiotAccountController.php:95
* @route '/riot-accounts/{riotAccount}'
*/
export const update = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
update.definition = {
	methods: ["put"],
	url: "/riot-accounts/{riotAccount}"
};
/**
* @see \App\Http\Controllers\RiotAccountController::update
* @see app/Http/Controllers/RiotAccountController.php:95
* @route '/riot-accounts/{riotAccount}'
*/
update.url = (args, options) => {
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
	return update.definition.url.replace("{riotAccount}", parsedArgs.riotAccount.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\RiotAccountController::update
* @see app/Http/Controllers/RiotAccountController.php:95
* @route '/riot-accounts/{riotAccount}'
*/
update.put = (args, options) => ({
	url: update.url(args, options),
	method: "put"
});
/**
* @see \App\Http\Controllers\RiotAccountController::update
* @see app/Http/Controllers/RiotAccountController.php:95
* @route '/riot-accounts/{riotAccount}'
*/
const updateForm = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\RiotAccountController::update
* @see app/Http/Controllers/RiotAccountController.php:95
* @route '/riot-accounts/{riotAccount}'
*/
updateForm.put = (args, options) => ({
	action: update.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
update.form = updateForm;
/**
* @see \App\Http\Controllers\RiotAccountController::sync
* @see app/Http/Controllers/RiotAccountController.php:117
* @route '/riot-accounts/{riotAccount}/sync'
*/
export const sync = (args, options) => ({
	url: sync.url(args, options),
	method: "post"
});
sync.definition = {
	methods: ["post"],
	url: "/riot-accounts/{riotAccount}/sync"
};
/**
* @see \App\Http\Controllers\RiotAccountController::sync
* @see app/Http/Controllers/RiotAccountController.php:117
* @route '/riot-accounts/{riotAccount}/sync'
*/
sync.url = (args, options) => {
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
	return sync.definition.url.replace("{riotAccount}", parsedArgs.riotAccount.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\RiotAccountController::sync
* @see app/Http/Controllers/RiotAccountController.php:117
* @route '/riot-accounts/{riotAccount}/sync'
*/
sync.post = (args, options) => ({
	url: sync.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\RiotAccountController::sync
* @see app/Http/Controllers/RiotAccountController.php:117
* @route '/riot-accounts/{riotAccount}/sync'
*/
const syncForm = (args, options) => ({
	action: sync.url(args, options),
	method: "post"
});
/**
* @see \App\Http\Controllers\RiotAccountController::sync
* @see app/Http/Controllers/RiotAccountController.php:117
* @route '/riot-accounts/{riotAccount}/sync'
*/
syncForm.post = (args, options) => ({
	action: sync.url(args, options),
	method: "post"
});
sync.form = syncForm;
/**
* @see \App\Http\Controllers\RiotAccountController::destroy
* @see app/Http/Controllers/RiotAccountController.php:147
* @route '/riot-accounts/{riotAccount}'
*/
export const destroy = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
destroy.definition = {
	methods: ["delete"],
	url: "/riot-accounts/{riotAccount}"
};
/**
* @see \App\Http\Controllers\RiotAccountController::destroy
* @see app/Http/Controllers/RiotAccountController.php:147
* @route '/riot-accounts/{riotAccount}'
*/
destroy.url = (args, options) => {
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
	return destroy.definition.url.replace("{riotAccount}", parsedArgs.riotAccount.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \App\Http\Controllers\RiotAccountController::destroy
* @see app/Http/Controllers/RiotAccountController.php:147
* @route '/riot-accounts/{riotAccount}'
*/
destroy.delete = (args, options) => ({
	url: destroy.url(args, options),
	method: "delete"
});
/**
* @see \App\Http\Controllers\RiotAccountController::destroy
* @see app/Http/Controllers/RiotAccountController.php:147
* @route '/riot-accounts/{riotAccount}'
*/
const destroyForm = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \App\Http\Controllers\RiotAccountController::destroy
* @see app/Http/Controllers/RiotAccountController.php:147
* @route '/riot-accounts/{riotAccount}'
*/
destroyForm.delete = (args, options) => ({
	action: destroy.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
destroy.form = destroyForm;
const riotAccounts = {
	fetch: Object.assign(fetch, fetch),
	store: Object.assign(store, store),
	update: Object.assign(update, update),
	sync: Object.assign(sync, sync),
	destroy: Object.assign(destroy, destroy)
};
export default riotAccounts;
