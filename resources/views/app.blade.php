<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="/favicon.ico?v=2" sizes="32x32">
    <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2">
    <link rel="manifest" href="/manifest.webmanifest">
    <meta name="theme-color" content="#010a13">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline script to apply the saved LoL palette (light / dark / region) before first paint --}}
    <script>
        (function () {
            const fallback = 'dark';
            let theme = fallback;

            try {
                theme = window.localStorage.getItem('lol-theme') || fallback;
            } catch (error) {
                const match = document.cookie.match(/(?:^|;\s*)lol_theme=([^;]*)/);
                theme = match ? decodeURIComponent(match[1]) : fallback;
            }

            document.documentElement.dataset.theme = theme;
            document.documentElement.classList.toggle('dark', theme !== 'light');
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    @fonts

    @vite(['resources/css/app.css', 'resources/js/app.js', "resources/js/pages/{$page['component']}.vue"])
    <x-inertia::head>
        <title>{{ config('app.name', 'Laravel') }}</title>
    </x-inertia::head>
</head>

<body class="font-sans antialiased">
    <x-inertia::app />
</body>

</html>