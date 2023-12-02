import * as Minecraft from "@minecraft/server"
import * as setting from "../config"
import { Hutao } from "../lib/import"

export const crasher = (player) => {
  if (setting.default.data.antiCheat.crasherA.state) {
    if (
      Math.abs(player.location.x) > 30000000 ||
      Math.abs(player.location.y) > 30000000 ||
      Math.abs(player.location.z) > 30000000
    ) {
      if (player.lastAction) {
        Hutao.Player.returnLastLocation(player)
      } else {
        player.teleport({
          x: 0.5,
          y: 0.5,
          z: 0.5
        }, {
          dimenison: Minecraft.world.getDimension("overworld"),
          rotation: {
            x: 0,
            y: 0
          }
        })
      }

      Hutao.Player.checking(player, `Crasher`, `A`)
    }
  }

  if (setting.default.data.antiCheat.crasherB.state) {
    if (player.crasherB > 0) {
      Hutao.Player.checking(player, `Crasher`, `B`)
    }
  }
}