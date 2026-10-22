import { queryParams, applyUrlDefaults } from "./../../../../../wayfinder";
/**
* @see \Laravel\Fortify\Http\Controllers\VerifyEmailController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/VerifyEmailController.php:18
* @route '/email/verify/{id}/{hash}'
*/
export const __invoke = (args, options) => ({
	url: __invoke.url(args, options),
	method: "get"
});
__invoke.definition = {
	methods: ["get", "head"],
	url: "/email/verify/{id}/{hash}"
};
/**
* @see \Laravel\Fortify\Http\Controllers\VerifyEmailController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/VerifyEmailController.php:18
* @route '/email/verify/{id}/{hash}'
*/
__invoke.url = (args, options) => {
	if (Array.isArray(args)) {
		args = {
			id: args[0],
			hash: args[1]
		};
	}
	args = applyUrlDefaults(args);
	const parsedArgs = {
		id: args.id,
		hash: args.hash
	};
	return __invoke.definition.url.replace("{id}", parsedArgs.id.toString()).replace("{hash}", parsedArgs.hash.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\VerifyEmailController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/VerifyEmailController.php:18
* @route '/email/verify/{id}/{hash}'
*/
__invoke.get = (args, options) => ({
	url: __invoke.url(args, options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\VerifyEmailController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/VerifyEmailController.php:18
* @route '/email/verify/{id}/{hash}'
*/
__invoke.head = (args, options) => ({
	url: __invoke.url(args, options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\VerifyEmailController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/VerifyEmailController.php:18
* @route '/email/verify/{id}/{hash}'
*/
const __invokeForm = (args, options) => ({
	action: __invoke.url(args, options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\VerifyEmailController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/VerifyEmailController.php:18
* @route '/email/verify/{id}/{hash}'
*/
__invokeForm.get = (args, options) => ({
	action: __invoke.url(args, options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\VerifyEmailController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/VerifyEmailController.php:18
* @route '/email/verify/{id}/{hash}'
*/
__invokeForm.head = (args, options) => ({
	action: __invoke.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
__invoke.form = __invokeForm;
const VerifyEmailController = { __invoke };
export default VerifyEmailController;
