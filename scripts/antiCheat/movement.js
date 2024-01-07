import * as setting from "../config"
import { Hutao } from "../lib/import"

export const movement = (player) => {
  if (setting.default.data.antiCheat.movementA.state) {
    if (
      Date.now() - player.dimensionTime > 3000 &&
      Date.now() - player.elytra > 1000 &&
      Date.now() - player.die > 250 &&
      Date.now() - player.gotHurt > 250 &&
      Date.now() - player.gotExplosion > 5000 &&
      player.isOnAir &&
      player.getVelocity().y > 0 &&
      !player.getEffect("levitation") &&
      !player.getEffect("jump_boost") &&
      !player.isFlying &&
      !player.hasTag("riding") &&
      player.location.y >= player.dimension.heightRange.min &&
      player.location.y - player.lastAction3.location.y > 3
    ) {
      player.movementATimes ??= 0
      player.movementATimes += 1

      player.movementAChecking = 0

      Hutao.Player.returnLastLocation(player)

      if (player.movementATimes > 1) {
        Hutao.Player.checking(player, `Movement`, `A`)
      }
    }
  }

  if (player.movementATimes > 0) {
    player.movementAChecking ??= 0
    player.movementAChecking += 1
  }

  if (player.movementAChecking > 200) {
    player.movementATimes = 0
    player.movementAChecking = undefined
  }
}