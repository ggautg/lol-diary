import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:19
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
 * @see app/Http/Controllers/LolDiaryController.php:19
 * @route '/diary'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:19
 * @route '/diary'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:19
 * @route '/diary'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:19
 * @route '/diary'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:19
 * @route '/diary'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LolDiaryController::index
 * @see app/Http/Controllers/LolDiaryController.php:19
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
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:53
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
 * @see app/Http/Controllers/LolDiaryController.php:53
 * @route '/diary/calendar'
 */
calendar.url = (options?: RouteQueryOptions) => {
    return calendar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:53
 * @route '/diary/calendar'
 */
calendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:53
 * @route '/diary/calendar'
 */
calendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendar.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:53
 * @route '/diary/calendar'
 */
    const calendarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: calendar.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:53
 * @route '/diary/calendar'
 */
        calendarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LolDiaryController::calendar
 * @see app/Http/Controllers/LolDiaryController.php:53
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
/**
* @see \App\Http\Controllers\StatsController::stats
 * @see app/Http/Controllers/StatsController.php:13
 * @route '/diary/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/diary/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StatsController::stats
 * @see app/Http/Controllers/StatsController.php:13
 * @route '/diary/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatsController::stats
 * @see app/Http/Controllers/StatsController.php:13
 * @route '/diary/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StatsController::stats
 * @see app/Http/Controllers/StatsController.php:13
 * @route '/diary/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StatsController::stats
 * @see app/Http/Controllers/StatsController.php:13
 * @route '/diary/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StatsController::stats
 * @see app/Http/Controllers/StatsController.php:13
 * @route '/diary/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StatsController::stats
 * @see app/Http/Controllers/StatsController.php:13
 * @route '/diary/stats'
 */
        statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
export const accounts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accounts.url(options),
    method: 'get',
})

accounts.definition = {
    methods: ["get","head"],
    url: '/diary/accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RiotAccountController::accounts
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
accounts.url = (options?: RouteQueryOptions) => {
    return accounts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiotAccountController::accounts
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
accounts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accounts.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RiotAccountController::accounts
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
accounts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: accounts.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RiotAccountController::accounts
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
    const accountsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: accounts.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RiotAccountController::accounts
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
        accountsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accounts.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RiotAccountController::accounts
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
        accountsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accounts.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    accounts.form = accountsForm
const diary = {
    index: Object.assign(index, index),
calendar: Object.assign(calendar, calendar),
stats: Object.assign(stats, stats),
accounts: Object.assign(accounts, accounts),
}

export default diary