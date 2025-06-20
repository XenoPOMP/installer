import os from "node:os";
import path from "node:path";
// eslint-disable-next-line n/no-extraneous-import
import {v4 as uuid} from "uuid";

import {createDir} from "./creation.ts";

export async function doWorkInTempFolder(
    promise: (path: string) => Promise<void>
) {
    // This folder is temporary in your system
    const rootTempDirPath = os.tmpdir()
    const tempDirParentPath = path.join(rootTempDirPath, 'xenopomp-installer')
    const tempDirPath = path.join(tempDirParentPath, uuid())

    // Create temporary folder
    await createDir(tempDirParentPath);
    await createDir(tempDirPath);

    // Do work, then delete temp folder
    await promise(tempDirPath)
}