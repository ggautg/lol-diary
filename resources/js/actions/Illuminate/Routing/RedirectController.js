import { queryParams } from "./../../../wayfinder";
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
const RedirectController42a740574ecbfbac32f8cc353fc32db9 = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "get"
});
RedirectController42a740574ecbfbac32f8cc353fc32db9.definition = {
	methods: [
		"get",
		"head",
		"post",
		"put",
		"patch",
		"delete",
		"options",
		"query"
	],
	url: "/dashboard"
};
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.url = (options) => {
	return RedirectController42a740574ecbfbac32f8cc353fc32db9.definition.url + queryParams(options);
};
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.get = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.head = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "head"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.post = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.put = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "put"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.patch = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "patch"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.delete = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "delete"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.options = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "options"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9.query = (options) => ({
	url: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "query"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
const RedirectController42a740574ecbfbac32f8cc353fc32db9Form = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9Form.get = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9Form.head = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9Form.post = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url(options),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9Form.put = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9Form.patch = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9Form.delete = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9Form.options = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "OPTIONS",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/dashboard'
*/
RedirectController42a740574ecbfbac32f8cc353fc32db9Form.query = (options) => ({
	action: RedirectController42a740574ecbfbac32f8cc353fc32db9.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "QUERY",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
RedirectController42a740574ecbfbac32f8cc353fc32db9.form = RedirectController42a740574ecbfbac32f8cc353fc32db9Form;
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
const RedirectController4b87d2df7e3aa853f6720faea796e36c = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "get"
});
RedirectController4b87d2df7e3aa853f6720faea796e36c.definition = {
	methods: [
		"get",
		"head",
		"post",
		"put",
		"patch",
		"delete",
		"options",
		"query"
	],
	url: "/settings"
};
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.url = (options) => {
	return RedirectController4b87d2df7e3aa853f6720faea796e36c.definition.url + queryParams(options);
};
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.get = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.head = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "head"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.post = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.put = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "put"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.patch = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "patch"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.delete = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "delete"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.options = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "options"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36c.query = (options) => ({
	url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "query"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
const RedirectController4b87d2df7e3aa853f6720faea796e36cForm = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36cForm.get = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36cForm.head = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36cForm.post = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36cForm.put = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PUT",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36cForm.patch = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "PATCH",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36cForm.delete = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "DELETE",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36cForm.options = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "OPTIONS",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/settings'
*/
RedirectController4b87d2df7e3aa853f6720faea796e36cForm.query = (options) => ({
	action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "QUERY",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "post"
});
RedirectController4b87d2df7e3aa853f6720faea796e36c.form = RedirectController4b87d2df7e3aa853f6720faea796e36cForm;
/**
* Multiple routes resolve to \Illuminate\Routing\RedirectController::RedirectController, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `RedirectController['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
const RedirectController = {
	"/dashboard": RedirectController42a740574ecbfbac32f8cc353fc32db9,
	"/settings": RedirectController4b87d2df7e3aa853f6720faea796e36c
};
export default RedirectController;
