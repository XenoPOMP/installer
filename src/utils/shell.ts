import execSh from 'exec-sh';
import {SpawnOptions} from 'node:child_process'

type ExecOptions = {
    stdout?: Exclude<SpawnOptions['stdio'], Array<unknown>>
}

function execToSpawnOptions(execOptions: ExecOptions): SpawnOptions {
    const stdout = execOptions.stdout ?? 'ignore'

    return {
        stdio: ['pipe', stdout]
    }
}

/**
 * Executes shell script programmatically.
 * @param cmd
 * @example
 * sh(`cd ${fetchedPath} && yarn remove ${depsChoice.join(' ')}`);
 */
export function shSync(cmd: string, options?: ExecOptions) {
    // @ts-expect-error wrong library types
    execSh(cmd, execToSpawnOptions(options ?? {}));
}

export async function sh(cmd: string, options?: ExecOptions) {
    // @ts-expect-error wrong library types
    await execSh.promise(cmd, execToSpawnOptions(options ?? {}))
}