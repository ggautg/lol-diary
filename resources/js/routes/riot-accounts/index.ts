import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LolDiaryController::fetch
 * @see app/Http/Controllers/LolDiaryController.php:36
 * @route '/riot-accounts/{riotAccount}/fetch'
 */
export const fetch = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fetch.url(args, options),
    method: 'post',
})

fetch.definition = {
    methods: ["post"],
    url: '/riot-accounts/{riotAccount}/fetch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LolDiaryController::fetch
 * @see app/Http/Controllers/LolDiaryController.php:36
 * @route '/riot-accounts/{riotAccount}/fetch'
 */
fetch.url = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { riotAccount: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { riotAccount: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    riotAccount: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        riotAccount: typeof args.riotAccount === 'object'
                ? args.riotAccount.id
                : args.riotAccount,
                }

    return fetch.definition.url
            .replace('{riotAccount}', parsedArgs.riotAccount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LolDiaryController::fetch
 * @see app/Http/Controllers/LolDiaryController.php:36
 * @route '/riot-accounts/{riotAccount}/fetch'
 */
fetch.post = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fetch.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\LolDiaryController::fetch
 * @see app/Http/Controllers/LolDiaryController.php:36
 * @route '/riot-accounts/{riotAccount}/fetch'
 */
    const fetchForm = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: fetch.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LolDiaryController::fetch
 * @see app/Http/Controllers/LolDiaryController.php:36
 * @route '/riot-accounts/{riotAccount}/fetch'
 */
        fetchForm.post = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: fetch.url(args, options),
            method: 'post',
        })
    
    fetch.form = fetchForm
const riotAccounts = {
    fetch: Object.assign(fetch, fetch),
}

export default riotAccounts