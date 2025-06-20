import os from "node:os";

import {GitCloneOptions} from "../types/index.ts";
import {sh} from "./shell.js";

export class PlatformSpecific {
    static gitClone(
        repoUrl: string,
        relativePath: string,
        options?: GitCloneOptions
    ) {
        // eslint-disable-next-line unicorn/no-negated-condition
        const script = `${!options?.noGitFolder ? 'git clone' : 'degit'} ${repoUrl} ${relativePath}`
        sh(script)
    }

    private static platform() {
        return os.platform()
    }
}