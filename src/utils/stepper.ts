// eslint-disable-next-line @typescript-eslint/no-unused-vars,n/no-extraneous-import
import c from 'ansi-colors';

type Step = () => Promise<void> | void

class StepInstance {
    previewLog: string
    step: Step

    constructor(previewLog: string, step: Step) {
        this.step = step
        this.previewLog = previewLog
    }
}

export class Stepper {
    private _steps: StepInstance[] = []

    async execute() {
        const tasks: Promise<void>[] =
            this._steps.map(async ({previewLog}, idx) => {
                console.log(`${c.dim(`[${idx + 1}/${this._steps.length}]`)} ${previewLog}`)
            })

        await Promise.all(tasks)
    }

    step(previewLog: string, fn: () => Promise<void> | void): Stepper {
        this._steps.push(new StepInstance(previewLog, fn))
        return this
    }
}