import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';

/**
 * Asynchronous function for creating directories. If directory exists,
 * takes no effect.
 * @param path
 * @param options
 */
export async function createDir(...[path, options]: Parameters<typeof mkdir>) {
    if (existsSync(path)) return;
    return mkdir(path, options);
}