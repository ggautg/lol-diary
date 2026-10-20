import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:17
 * @route '/diary'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/diary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:17
 * @route '/diary'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:17
 * @route '/diary'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:17
 * @route '/diary'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:17
 * @route '/diary'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:17
 * @route '/diary'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:17
 * @route '/diary'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
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
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:58
 * @route '/diary/calendar'
 */
export const calendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})

calendar.definition = {
    methods: ["get","head"],
    url: '/diary/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:58
 * @route '/diary/calendar'
 */
calendar.url = (options?: RouteQueryOptions) => {
    return calendar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:58
 * @route '/diary/calendar'
 */
calendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:58
 * @route '/diary/calendar'
 */
calendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendar.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:58
 * @route '/diary/calendar'
 */
    const calendarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: calendar.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:58
 * @route '/diary/calendar'
 */
        calendarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:58
 * @route '/diary/calendar'
 */
        calendarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    calendar.form = calendarForm
const LolDiaryController = { index, fetch, calendar }

export default LolDiaryController