import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DiaryEntryController::update
 * @see app/Http/Controllers/DiaryEntryController.php:15
 * @route '/matches/{lolMatch}/diary-entry'
 */
export const update = (args: { lolMatch: number | { id: number } } | [lolMatch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/matches/{lolMatch}/diary-entry',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DiaryEntryController::update
 * @see app/Http/Controllers/DiaryEntryController.php:15
 * @route '/matches/{lolMatch}/diary-entry'
 */
update.url = (args: { lolMatch: number | { id: number } } | [lolMatch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lolMatch: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lolMatch: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lolMatch: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lolMatch: typeof args.lolMatch === 'object'
                ? args.lolMatch.id
                : args.lolMatch,
                }

    return update.definition.url
            .replace('{lolMatch}', parsedArgs.lolMatch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DiaryEntryController::update
 * @see app/Http/Controllers/DiaryEntryController.php:15
 * @route '/matches/{lolMatch}/diary-entry'
 */
update.put = (args: { lolMatch: number | { id: number } } | [lolMatch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DiaryEntryController::update
 * @see app/Http/Controllers/DiaryEntryController.php:15
 * @route '/matches/{lolMatch}/diary-entry'
 */
    const updateForm = (args: { lolMatch: number | { id: number } } | [lolMatch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DiaryEntryController::update
 * @see app/Http/Controllers/DiaryEntryController.php:15
 * @route '/matches/{lolMatch}/diary-entry'
 */
        updateForm.put = (args: { lolMatch: number | { id: number } } | [lolMatch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const DiaryEntryController = { update }

export default DiaryEntryController