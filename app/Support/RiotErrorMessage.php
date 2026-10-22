<?php

namespace App\Support;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;

class RiotErrorMessage
{
    public static function describe(RequestException|ConnectionException $e): string
    {
        if ($e instanceof ConnectionException) {
            return 'No se pudo conectar con Riot. Revisa tu conexión e inténtalo de nuevo.';
        }

        return match ($e->response->status()) {
            401, 403 => 'La API key de Riot es inválida o caducó. Regenérala y corre config:clear.',
            404 => 'Riot no encontró esa cuenta. Revisa el nombre y el tag.',
            429 => 'Límite de peticiones alcanzado. Espera un par de minutos.',
            default => 'Error de la API de Riot (' . $e->response->status() . ').',
        };
    }
}