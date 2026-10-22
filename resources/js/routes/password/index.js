import { queryParams, applyUrlDefaults } from "./../../wayfinder";
import confirmD7e05f from "./confirm";
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::request
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:22
* @route '/forgot-password'
*/
export const request = (options) => ({
	url: request.url(options),
	method: "get"
});
request.definition = {
	methods: ["get", "head"],
	url: "/forgot-password"
};
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::request
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:22
* @route '/forgot-password'
*/
request.url = (options) => {
	return request.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::request
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:22
* @route '/forgot-password'
*/
request.get = (options) => ({
	url: request.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::request
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:22
* @route '/forgot-password'
*/
request.head = (options) => ({
	url: request.url(options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::request
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:22
* @route '/forgot-password'
*/
const requestForm = (options) => ({
	action: request.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::request
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:22
* @route '/forgot-password'
*/
requestForm.get = (options) => ({
	action: request.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::request
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:22
* @route '/forgot-password'
*/
requestForm.head = (options) => ({
	action: request.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
request.form = requestForm;
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::reset
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:45
* @route '/reset-password/{token}'
*/
export const reset = (args, options) => ({
	url: reset.url(args, options),
	method: "get"
});
reset.definition = {
	methods: ["get", "head"],
	url: "/reset-password/{token}"
};
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::reset
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:45
* @route '/reset-password/{token}'
*/
reset.url = (args, options) => {
	if (typeof args === "string" || typeof args === "number") {
		args = { token: args };
	}
	if (Array.isArray(args)) {
		args = { token: args[0] };
	}
	args = applyUrlDefaults(args);
	const parsedArgs = { token: args.token };
	return reset.definition.url.replace("{token}", parsedArgs.token.toString()).replace(/\/+$/, "") + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::reset
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:45
* @route '/reset-password/{token}'
*/
reset.get = (args, options) => ({
	url: reset.url(args, options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::reset
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:45
* @route '/reset-password/{token}'
*/
reset.head = (args, options) => ({
	url: reset.url(args, options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::reset
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:45
* @route '/reset-password/{token}'
*/
const resetForm = (args, options) => ({
	action: reset.url(args, options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::reset
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:45
* @route '/reset-password/{token}'
*/
resetForm.get = (args, options) => ({
	action: reset.url(args, options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::reset
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:45
* @route '/reset-password/{token}'
*/
resetForm.head = (args, options) => ({
	action: reset.url(args, { [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
reset.form = resetForm;
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::email
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:30
* @route '/forgot-password'
*/
export const email = (options) => ({
	url: email.url(options),
	method: "post"
});
email.definition = {
	methods: ["post"],
	url: "/forgot-password"
};
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::email
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:30
* @route '/forgot-password'
*/
email.url = (options) => {
	return email.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::email
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:30
* @route '/forgot-password'
*/
email.post = (options) => ({
	url: email.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::email
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:30
* @route '/forgot-password'
*/
const emailForm = (options) => ({
	action: email.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\PasswordResetLinkController::email
* @see vendor/laravel/fortify/src/Http/Controllers/PasswordResetLinkController.php:30
* @route '/forgot-password'
*/
emailForm.post = (options) => ({
	action: email.url(options),
	method: "post"
});
email.form = emailForm;
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::update
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:56
* @route '/reset-password'
*/
export const update = (options) => ({
	url: update.url(options),
	method: "post"
});
update.definition = {
	methods: ["post"],
	url: "/reset-password"
};
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::update
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:56
* @route '/reset-password'
*/
update.url = (options) => {
	return update.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::update
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:56
* @route '/reset-password'
*/
update.post = (options) => ({
	url: update.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::update
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:56
* @route '/reset-password'
*/
const updateForm = (options) => ({
	action: update.url(options),
	method: "post"
});
/**
* @see \Laravel\Fortify\Http\Controllers\NewPasswordController::update
* @see vendor/laravel/fortify/src/Http/Controllers/NewPasswordController.php:56
* @route '/reset-password'
*/
updateForm.post = (options) => ({
	action: update.url(options),
	method: "post"
});
update.form = updateForm;
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:40
* @route '/user/confirm-password'
*/
export const confirm = (options) => ({
	url: confirm.url(options),
	method: "get"
});
confirm.definition = {
	methods: ["get", "head"],
	url: "/user/confirm-password"
};
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:40
* @route '/user/confirm-password'
*/
confirm.url = (options) => {
	return confirm.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:40
* @route '/user/confirm-password'
*/
confirm.get = (options) => ({
	url: confirm.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:40
* @route '/user/confirm-password'
*/
confirm.head = (options) => ({
	url: confirm.url(options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:40
* @route '/user/confirm-password'
*/
const confirmForm = (options) => ({
	action: confirm.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:40
* @route '/user/confirm-password'
*/
confirmForm.get = (options) => ({
	action: confirm.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmablePasswordController::confirm
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmablePasswordController.php:40
* @route '/user/confirm-password'
*/
confirmForm.head = (options) => ({
	action: confirm.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
confirm.form = confirmForm;
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
export const confirmation = (options) => ({
	url: confirmation.url(options),
	method: "get"
});
confirmation.definition = {
	methods: ["get", "head"],
	url: "/user/confirmed-password-status"
};
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmation.url = (options) => {
	return confirmation.definition.url + queryParams(options);
};
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmation.get = (options) => ({
	url: confirmation.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmation.head = (options) => ({
	url: confirmation.url(options),
	method: "head"
});
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
const confirmationForm = (options) => ({
	action: confirmation.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmationForm.get = (options) => ({
	action: confirmation.url(options),
	method: "get"
});
/**
* @see \Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController::confirmation
* @see vendor/laravel/fortify/src/Http/Controllers/ConfirmedPasswordStatusController.php:17
* @route '/user/confirmed-password-status'
*/
confirmationForm.head = (options) => ({
	action: confirmation.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
confirmation.form = confirmationForm;
const password = {
	request: Object.assign(request, request),
	reset: Object.assign(reset, reset),
	email: Object.assign(email, email),
	update: Object.assign(update, update),
	confirm: Object.assign(confirm, confirmD7e05f),
	confirmation: Object.assign(confirmation, confirmation)
};
export default password;
