import {Command} from '@oclif/core'
import os from 'node:os'

import {doWorkInTempFolder} from "../utils/index.ts";

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

    await doWorkInTempFolder(async (path) => {
      this.log(path)
    })
  }
}
