<?php

return [
    'api_key' => env('RIOT_API_KEY'),

    // platform (stored in riot_accounts) => regional routing host
    'regions' => [
        'la1' => 'americas',
        'la2' => 'americas',
        'na1' => 'americas',
        'br1' => 'americas',
    ],
];