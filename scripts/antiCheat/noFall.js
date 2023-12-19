import * as setting from "../config"
import { Hutao } from "../lib/import"

export const noFall = (player) => {
  if (setting.default.data.antiCheat.noFallA.state) {
    if (
      (Date.now() - player.dimensionTime > 3000) &&
      (Date.now() - player.die > 250) &&
      (Date.now() - player.gotHurt > 250) &&
      (Date.now() - player.gotExplosion > 5000) &&
      player.lastAction?.velocity?.y < 0 &&
      player.getVelocity().y == 0 &&
      player.isOnAir &&
      !player.isFlying &&
      Hutao.Player.getGamemode(player) != "creative" &&
      player.location.y >= player.dimension.heightRange.min &&
      check(player)
    ) {
      player.noFallA = true
      player.noFallAChecking ??= 0
    }

    if (player.noFallA) {
      player.noFallAChecking += 1

      if (player.noFallAChecking > 3) {
        if (
          player.getVelocity().y < -1 &&
          player.lastAction3?.velocity?.y == 0
        ) {
          Hutao.Player.checking(player, `NoFall`, "A")
          Hutao.Player.returnLastLocation(player)
        }
      }
    }
  }

  if (player.noFallAChecking > 20) {
    player.noFallA = false
    player.noFallAChecking = 0
  }
}

const check = (player) => {
  if (
    player.location.y <= player.dimension.heightRange.max &&
    player.location.y >= player.dimension.heightRange.min
  ) {
    const blockUnder = player.dimension.getBlock({
      x: player.location.x - 1,
      y: player.location.y - 1,
      z: player.location.z - 1
    })

    if (
      !player.legBlock?.typeId.endsWith("slab") &&
      !player.legBlock?.typeId.endsWith("carpet") &&
      !player.legBlock?.typeId.endsWith("wall") &&
      !blockUnder?.typeId.endsWith("slab") &&
      !blockUnder?.typeId.endsWith("carpet") &&
      !blockUnder?.typeId.endsWith("wall") &&
      !blockUnder?.typeId.endsWith("stairs")
    ) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}