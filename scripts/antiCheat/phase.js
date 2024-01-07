import * as Minecraft from "@minecraft/server"
import { Hutao } from "../lib/import"
import * as setting from "../config"

export const phase = (player) => {
  if (setting.default.data.antiCheat.phaseA.state) {
    const speed = Math.sqrt(
      player.getVelocity().x ** 2 +
      player.getVelocity().z ** 2
    )

    const block = player.dimension.getBlock({
      x: player.location.x,
      y: player.location.y,
      z: player.location.z
    })

    const headBlock = player.dimension.getBlock({
      x: player.getHeadLocation().x,
      y: player.getHeadLocation().y,
      z: player.getHeadLocation().z
    })

    if (
      block &&
      headBlock
    ) {
      if (
        block.isSolid ||
        headBlock.isSolid
      ) {
        if (speed > 0.5) {
          Minecraft.system.runTimeout(() => {
            if (!player.gotPush) {
              player.phaseA ??= 0
              player.phaseA += 1

              Hutao.Player.returnLastLocation(player)

              if (player.phaseA > 2) {
                Hutao.Player.checking(player, `Phase`, `A`)
              }
            }
          }, 3)
        }
      }
    }
  }

  if (player.phaseA > 0) {
    player.phaseAChecking ??= 0
    player.phaseAChecking += 1
  }

  if (player.phaseAChecking > 40) {
    player.phaseA = 0
    player.phaseAChecking = undefined
  }
}