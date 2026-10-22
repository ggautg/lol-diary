import { queryParams, applyUrlDefaults } from "./../../../../wayfinder";
/**
* @see \Inertia\DevTools\Http\EntriesController::index
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:17
* @route '/_inertia/devtools/entries'
*/
export const index = (options) => ({
	url: index.url(options),
	method: "get"
});
index.definition = {
	methods: ["get", "head"],
	url: "/_inertia/devtools/entries"
};
/**
* @see \Inertia\DevTools\Http\EntriesController::index
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:17
* @route '/_inertia/devtools/entries'
*/
index.url = (options) => {
	return index.definition.url + queryParams(options);
};
/**
* @see \Inertia\DevTools\Http\EntriesController::index
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:17
* @route '/_inertia/devtools/entries'
*/
index.get = (options) => ({
	url: index.url(options),
	method: "get"
});
/**
* @see \Inertia\DevTools\Http\EntriesController::index
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:17
* @route '/_inertia/devtools/entries'
*/
index.head = (options) => ({
	url: index.url(options),
	method: "head"
});
/**
* @see \Inertia\DevTools\Http\EntriesController::index
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:17
* @route '/_inertia/devtools/entries'
*/
const indexForm = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \Inertia\DevTools\Http\EntriesController::index
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:17
* @route '/_inertia/devtools/entries'
*/
indexForm.get = (options) => ({
	action: index.url(options),
	method: "get"
});
/**
* @see \Inertia\DevTools\Http\EntriesController::index
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:17
* @route '/_inertia/devtools/entries'
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
* @see \Inertia\DevTools\Http\EntriesController::show
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:37
* @route '/_inertia/devtools/entries/{id}'
*/
export const show = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
show.definition = {
	methods: ["get", "head"],
	url: "/_inertia/devtools/entries/{id}"
};
/**
* @see \Inertia\DevTools\Http\EntriesController::show
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:37
* @route '/_inertia/devtools/entries/{id}'
*/
show.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") {
		args = { id: args };
	}
	if (Array.isArray(args)) {
		args = { id: args[0] };
	}
	args = applyUrlDefaults(args);
	const parsedArgs = { id: args.id };
	return show.definition.url.replace("{id}", parsedArgs.id.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \Inertia\DevTools\Http\EntriesController::show
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:37
* @route '/_inertia/devtools/entries/{id}'
*/
show.get = (args, options) => ({
	url: show.url(args, options),
	method: "get"
});
/**
* @see \Inertia\DevTools\Http\EntriesController::show
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:37
* @route '/_inertia/devtools/entries/{id}'
*/
show.head = (args, options) => ({
	url: show.url(args, options),
	method: "head"
});
/**
* @see \Inertia\DevTools\Http\EntriesController::show
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:37
* @route '/_inertia/devtools/entries/{id}'
*/
const showForm = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \Inertia\DevTools\Http\EntriesController::show
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:37
* @route '/_inertia/devtools/entries/{id}'
*/
showForm.get = (args, options) => ({
	action: show.url(args, options),
	method: "get"
});
/**
* @see \Inertia\DevTools\Http\EntriesController::show
* @see vendor/inertiajs/inertia-laravel/src/DevTools/Http/EntriesController.php:37
* @route '/_inertia/devtools/entries/{id}'
*/
showForm.head = (args, options) => ({
	action: show.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
show.form = showForm;
const EntriesController = {
	index,
	show
};
export default EntriesController;
