import { execFileSync } from 'node:child_process';
import {
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
    unlinkSync,
    writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { transformSync } from 'rolldown/experimental';

/**
 * Wayfinder only knows how to generate TypeScript. This wrapper runs the
 * artisan command and then strips the types so the generated files stay as
 * plain JavaScript (which is what this project uses everywhere else).
 *
 * It is wired up through the `command` option of the Wayfinder Vite plugin, so
 * it runs automatically on `npm run dev` and `npm run build`.
 */

const args = process.argv.slice(2);

execFileSync('php', ['artisan', 'wayfinder:generate', ...args], {
    stdio: 'inherit',
});

const roots = [
    'resources/js/actions',
    'resources/js/routes',
    'resources/js/wayfinder',
];

function convertDirectory(dir) {
    if (!existsSync(dir)) return;

    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);

        if (statSync(path).isDirectory()) {
            convertDirectory(path);
            continue;
        }

        if (!path.endsWith('.ts')) continue;

        const result = transformSync(path, readFileSync(path, 'utf8'), {
            sourcemap: false,
        });

        if (result.errors?.length) {
            throw new Error(
                `No se pudo convertir ${path}: ${result.errors
                    .map((error) => error.message)
                    .join('; ')}`,
            );
        }

        writeFileSync(path.replace(/\.ts$/, '.js'), result.code);
        unlinkSync(path);
    }
}

for (const root of roots) {
    convertDirectory(root);
}
