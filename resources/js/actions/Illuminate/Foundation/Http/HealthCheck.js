import { queryParams } from "./../../../../wayfinder";
/**
* @see \Illuminate\Foundation\Http\HealthCheck::__invoke
* @see vendor/laravel/framework/src/Illuminate/Foundation/Http/HealthCheck.php:18
* @route '/up'
*/
const HealthCheck = (options) => ({
	url: HealthCheck.url(options),
	method: "get"
});
HealthCheck.definition = {
	methods: ["get", "head"],
	url: "/up"
};
/**
* @see \Illuminate\Foundation\Http\HealthCheck::__invoke
* @see vendor/laravel/framework/src/Illuminate/Foundation/Http/HealthCheck.php:18
* @route '/up'
*/
HealthCheck.url = (options) => {
	return HealthCheck.definition.url + queryParams(options);
};
/**
* @see \Illuminate\Foundation\Http\HealthCheck::__invoke
* @see vendor/laravel/framework/src/Illuminate/Foundation/Http/HealthCheck.php:18
* @route '/up'
*/
HealthCheck.get = (options) => ({
	url: HealthCheck.url(options),
	method: "get"
});
/**
* @see \Illuminate\Foundation\Http\HealthCheck::__invoke
* @see vendor/laravel/framework/src/Illuminate/Foundation/Http/HealthCheck.php:18
* @route '/up'
*/
HealthCheck.head = (options) => ({
	url: HealthCheck.url(options),
	method: "head"
});
/**
* @see \Illuminate\Foundation\Http\HealthCheck::__invoke
* @see vendor/laravel/framework/src/Illuminate/Foundation/Http/HealthCheck.php:18
* @route '/up'
*/
const HealthCheckForm = (options) => ({
	action: HealthCheck.url(options),
	method: "get"
});
/**
* @see \Illuminate\Foundation\Http\HealthCheck::__invoke
* @see vendor/laravel/framework/src/Illuminate/Foundation/Http/HealthCheck.php:18
* @route '/up'
*/
HealthCheckForm.get = (options) => ({
	action: HealthCheck.url(options),
	method: "get"
});
/**
* @see \Illuminate\Foundation\Http\HealthCheck::__invoke
* @see vendor/laravel/framework/src/Illuminate/Foundation/Http/HealthCheck.php:18
* @route '/up'
*/
HealthCheckForm.head = (options) => ({
	action: HealthCheck.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
HealthCheck.form = HealthCheckForm;
export default HealthCheck;
