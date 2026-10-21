import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RiotAccountController::index
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/diary/accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RiotAccountController::index
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiotAccountController::index
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RiotAccountController::index
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RiotAccountController::index
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RiotAccountController::index
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RiotAccountController::index
 * @see app/Http/Controllers/RiotAccountController.php:22
 * @route '/diary/accounts'
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
* @see \App\Http\Controllers\RiotAccountController::store
 * @see app/Http/Controllers/RiotAccountController.php:49
 * @route '/riot-accounts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/riot-accounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RiotAccountController::store
 * @see app/Http/Controllers/RiotAccountController.php:49
 * @route '/riot-accounts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiotAccountController::store
 * @see app/Http/Controllers/RiotAccountController.php:49
 * @route '/riot-accounts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RiotAccountController::store
 * @see app/Http/Controllers/RiotAccountController.php:49
 * @route '/riot-accounts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RiotAccountController::store
 * @see app/Http/Controllers/RiotAccountController.php:49
 * @route '/riot-accounts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RiotAccountController::update
 * @see app/Http/Controllers/RiotAccountController.php:95
 * @route '/riot-accounts/{riotAccount}'
 */
export const update = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/riot-accounts/{riotAccount}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\RiotAccountController::update
 * @see app/Http/Controllers/RiotAccountController.php:95
 * @route '/riot-accounts/{riotAccount}'
 */
update.url = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{riotAccount}', parsedArgs.riotAccount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiotAccountController::update
 * @see app/Http/Controllers/RiotAccountController.php:95
 * @route '/riot-accounts/{riotAccount}'
 */
update.put = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\RiotAccountController::update
 * @see app/Http/Controllers/RiotAccountController.php:95
 * @route '/riot-accounts/{riotAccount}'
 */
    const updateForm = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RiotAccountController::update
 * @see app/Http/Controllers/RiotAccountController.php:95
 * @route '/riot-accounts/{riotAccount}'
 */
        updateForm.put = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\RiotAccountController::sync
 * @see app/Http/Controllers/RiotAccountController.php:117
 * @route '/riot-accounts/{riotAccount}/sync'
 */
export const sync = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/riot-accounts/{riotAccount}/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RiotAccountController::sync
 * @see app/Http/Controllers/RiotAccountController.php:117
 * @route '/riot-accounts/{riotAccount}/sync'
 */
sync.url = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return sync.definition.url
            .replace('{riotAccount}', parsedArgs.riotAccount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiotAccountController::sync
 * @see app/Http/Controllers/RiotAccountController.php:117
 * @route '/riot-accounts/{riotAccount}/sync'
 */
sync.post = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RiotAccountController::sync
 * @see app/Http/Controllers/RiotAccountController.php:117
 * @route '/riot-accounts/{riotAccount}/sync'
 */
    const syncForm = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sync.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RiotAccountController::sync
 * @see app/Http/Controllers/RiotAccountController.php:117
 * @route '/riot-accounts/{riotAccount}/sync'
 */
        syncForm.post = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sync.url(args, options),
            method: 'post',
        })
    
    sync.form = syncForm
/**
* @see \App\Http\Controllers\RiotAccountController::destroy
 * @see app/Http/Controllers/RiotAccountController.php:147
 * @route '/riot-accounts/{riotAccount}'
 */
export const destroy = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/riot-accounts/{riotAccount}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RiotAccountController::destroy
 * @see app/Http/Controllers/RiotAccountController.php:147
 * @route '/riot-accounts/{riotAccount}'
 */
destroy.url = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{riotAccount}', parsedArgs.riotAccount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RiotAccountController::destroy
 * @see app/Http/Controllers/RiotAccountController.php:147
 * @route '/riot-accounts/{riotAccount}'
 */
destroy.delete = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RiotAccountController::destroy
 * @see app/Http/Controllers/RiotAccountController.php:147
 * @route '/riot-accounts/{riotAccount}'
 */
    const destroyForm = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RiotAccountController::destroy
 * @see app/Http/Controllers/RiotAccountController.php:147
 * @route '/riot-accounts/{riotAccount}'
 */
        destroyForm.delete = (args: { riotAccount: number | { id: number } } | [riotAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const RiotAccountController = { index, store, update, sync, destroy }

export default RiotAccountController