import execSh from 'exec-sh';

/**
 * Executes shell script programmatically.
 * @param cmd
 * @example
 * sh(`cd ${fetchedPath} && yarn remove ${depsChoice.join(' ')}`);
 */
export function sh(cmd: string) {
    // @ts-expect-error wrong library types
    execSh(cmd);
}