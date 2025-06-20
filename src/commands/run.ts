import {Command, Errors} from '@oclif/core'
import path from 'node:path'
import c from 'ansi-colors'

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

            await PlatformSpecific.gitClone(
                'https://github.com/trawor/XToDo.git',
                xtodoPath
            );

              try {
                  await sh(`cd ${xtodoPath} && xcodebuild -target XToDo`)
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } catch (error: any) {
                  if ('code' in error && error.code === 65) {
                      console.log(`${c.yellow('warning')} MACOSX_DEPLOYMENT_TARGET is lower, than minimal XCode requirements. XToDo Plugin may be built wrong.`)
                  }
              }
          }, {
            skip: PlatformSpecific.platform() !== 'darwin'
          })
          .execute()
    })
  }
}
