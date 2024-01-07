import * as Minecraft from "@minecraft/server"

export class SetTickTimeOut {
  constructor(
    run,
    tick = 0,
    times = 1,
    firstRun = false
  ) {
    this.run = run
    this.tick = tick
    this.times = times
    this.firstRun = firstRun
    this.callback

    return this
  }

  on() {
    let ticks = 0
    let times = 0

    if (this.tick) {
      this.callback = Minecraft.system.runInterval(() => {
        if (ticks % this.tick == 0) {
          if (ticks == 0) {
            if (this.firstRun) {
              this.run()
              times++

              if (times >= this.times) {
                this.off()
              }
            }
          } else {
            this.run()
            times++

            if (times >= this.times) {
              this.off()
            }
          }
        }

        ticks++
      })
    } else {
      for (let i = 0; i < this.times; i++) {
        this.run()
      }
    }
  }

  off() {
    Minecraft.system.clearRun(this.callback)
  }
}