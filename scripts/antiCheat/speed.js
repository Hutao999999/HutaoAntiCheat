import * as setting from "../config"
import { Hutao } from "../lib/import"

export const speed = (player) => {
  if (setting.default.data.antiCheat.speedA.state) {
    if (
      !(Date.now() - player.dimensionTime < 3000 ||
        Date.now() - player.gotHurt < 250 ||
        Date.now() - player.gotExplosion < 5000)
    ) {
      const average = (
        Math.sqrt(
          player.getVelocity().x ** 2 +
          player.getVelocity().z ** 2
        ) + player.lastSpeedAVelocity
      ) / 2

      if (
        average > (
          1.2 +
          player.elytraSpeed +
          player.ridingSpeed +
          player.tridentSpeed +
          player.flySpeed +
          player.speed
        )
      ) {
        if (!player.gotPush) {
          player.speedATimes ??= 0
          player.speedATimes += 1
          player.speedAChecking = 0

          Hutao.Player.returnLastLocation(player)

          if (player.speedATimes > 1) {
            Hutao.Player.checking(player, `Speed`, `A`)
          }
        }
      }
    }
  }

  if (player.speedATimes > 0) {
    player.speedAChecking++
  }

  if (player.speedAChecking > 200) {
    player.speedATimes = 0
    player.speedAChecking = 0
  }

  player.lastSpeedAVelocity = Math.sqrt(
    player.getVelocity().x ** 2 +
    player.getVelocity().z ** 2
  )
}