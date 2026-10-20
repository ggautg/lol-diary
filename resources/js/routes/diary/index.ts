import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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
const diary = {
    index: Object.assign(index, index),
calendar: Object.assign(calendar, calendar),
}

export default diary