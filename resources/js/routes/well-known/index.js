import { queryParams } from "./../../wayfinder";
/**
* @see routes/settings.php:29
* @route '/.well-known/passkey-endpoints'
*/
export const passkeys = (options) => ({
	url: passkeys.url(options),
	method: "get"
});
passkeys.definition = {
	methods: ["get", "head"],
	url: "/.well-known/passkey-endpoints"
};
/**
* @see routes/settings.php:29
* @route '/.well-known/passkey-endpoints'
*/
passkeys.url = (options) => {
	return passkeys.definition.url + queryParams(options);
};
/**
* @see routes/settings.php:29
* @route '/.well-known/passkey-endpoints'
*/
passkeys.get = (options) => ({
	url: passkeys.url(options),
	method: "get"
});
/**
* @see routes/settings.php:29
* @route '/.well-known/passkey-endpoints'
*/
passkeys.head = (options) => ({
	url: passkeys.url(options),
	method: "head"
});
/**
* @see routes/settings.php:29
* @route '/.well-known/passkey-endpoints'
*/
const passkeysForm = (options) => ({
	action: passkeys.url(options),
	method: "get"
});
/**
* @see routes/settings.php:29
* @route '/.well-known/passkey-endpoints'
*/
passkeysForm.get = (options) => ({
	action: passkeys.url(options),
	method: "get"
});
/**
* @see routes/settings.php:29
* @route '/.well-known/passkey-endpoints'
*/
passkeysForm.head = (options) => ({
	action: passkeys.url({ [options?.mergeQuery ? "mergeQuery" : "query"]: {
		_method: "HEAD",
		...options?.query ?? options?.mergeQuery ?? {}
	} }),
	method: "get"
});
passkeys.form = passkeysForm;
const wellKnown = { passkeys: Object.assign(passkeys, passkeys) };
export default wellKnown;
