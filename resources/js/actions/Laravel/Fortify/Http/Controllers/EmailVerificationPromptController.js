import { queryParams } from "./../../../../../wayfinder";
/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:18
* @route '/email/verify'
*/
export const __invoke = (options) => ({
	url: __invoke.url(options),
	method: "get"
});
__invoke.definition = {
	methods: ["get", "head"],
	url: "/email/verify"
};
/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:18
* @route '/email/verify'
*/
__invoke.url = (options) => {
	return __invoke.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:18
* @route '/email/verify'
*/
__invoke.get = (options) => ({
	url: __invoke.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:18
* @route '/email/verify'
*/
__invoke.head = (options) => ({
	url: __invoke.url(options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:18
* @route '/email/verify'
*/
const __invokeForm = (options) => ({
	action: __invoke.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:18
* @route '/email/verify'
*/
__invokeForm.get = (options) => ({
	action: __invoke.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationPromptController::__invoke
* @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationPromptController.php:18
* @route '/email/verify'
*/
__invokeForm.head = (options) => ({
	action: __invoke.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
__invoke.form = __invokeForm;
const EmailVerificationPromptController = { __invoke };
export default EmailVerificationPromptController;
