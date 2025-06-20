// eslint-disable-next-line n/no-extraneous-import
import c from 'ansi-colors';

type Step = () => Promise<void> | void

interface StepInstanceOptions {
    skip?: boolean
}

class StepInstance implements StepInstanceOptions {
    previewLog: string
    skip: boolean
    step: Step

    constructor(previewLog: string, step: Step, options?: StepInstanceOptions) {
        this.step = step
        this.previewLog = previewLog
        this.skip = options?.skip ?? false
    }
}

export class Stepper {
    private _steps: StepInstance[] = []

    async execute() {
        const tasks: Promise<void>[] =
            this._steps.map(async ({previewLog, step, skip}, idx) => {
                const numberHeader = c.dim(`[${idx + 1}/${this._steps.length}]`)

                if (skip) {
                    console.log(c.dim(`${numberHeader} [SKIPPED] ${c.italic(previewLog)}`))
                    return;
                }

                console.log(`${numberHeader} ${previewLog}`)
                step()
            })

        await Promise.all(tasks)
    }

    step(previewLog: string, fn: () => Promise<void> | void, options?: StepInstanceOptions): Stepper {
        this._steps.push(new StepInstance(previewLog, fn, options))
        return this
    }
}