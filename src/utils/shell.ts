import execSh from 'exec-sh';

/**
 * Executes shell script programmatically.
 * @param cmd
 * @example
 * sh(`cd ${fetchedPath} && yarn remove ${depsChoice.join(' ')}`);
 */
export function shSync(cmd: string) {
    // @ts-expect-error wrong library types
    execSh(cmd);
}

export async function sh(cmd: string) {
    // @ts-expect-error wrong library types
    await execSh.promise(cmd)
}