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

    // platform => label shown in the UI
    'platform_labels' => [
        'la1' => 'LAN',
        'la2' => 'LAS',
        'na1' => 'NA',
        'br1' => 'BR',
    ],
];