import {Command} from '@oclif/core'
import path from 'node:path'

import {createDir, doWorkInTempFolder, PlatformSpecific, sh, Stepper} from "../utils/index.ts";

export default class Run extends Command {
  static override description = 'describe the command here'
  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  // static override flags = {
  //   // flag with no value (-f, --force)
  //   force: Flags.boolean({char: 'f'}),
  //   // flag with a value (-n, --name=VALUE)
  //   name: Flags.string({char: 'n', description: 'name to print'}),
  // }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Run)

    await doWorkInTempFolder(async (tempDirPath) => {
      await new Stepper()
          .step('🛠️ Installing XCode plugins...', async () => {
            const pluginsPath = path.join(tempDirPath, 'xcode-plugins')
            const xtodoPath = path.join(pluginsPath, 'xtodo')

            await createDir(pluginsPath)
            await createDir(xtodoPath)

            PlatformSpecific.gitClone(
                'https://github.com/trawor/XToDo.git',
                xtodoPath
            );
            // Build XToDo
            //   sh(`cd ${xtodoPath} && xcodebuild -target XToDo`)
          }, {
            skip: PlatformSpecific.platform() !== 'darwin'
          })
          .execute()
    })
  }
}
