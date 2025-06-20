import os from "node:os";

import {GitCloneOptions} from "../types/index.ts";
import {sh} from "./shell.ts";

// eslint-disable-next-line unicorn/no-static-only-class
export class PlatformSpecific {
    static async gitClone(
        repoUrl: string,
        relativePath: string,
        options?: GitCloneOptions
    ) {
        // eslint-disable-next-line unicorn/no-negated-condition
        const script = `${!options?.noGitFolder ? 'git clone' : 'degit'} ${repoUrl} ${relativePath}`
        await sh(script)
    }

    static platform() {
        return os.platform()
    }
}