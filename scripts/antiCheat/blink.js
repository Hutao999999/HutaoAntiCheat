import * as setting from "../config"
import { Hutao } from "../lib/import"

export const blink = (player) => {
  if (setting.default.data.antiCheat.blinkA.state) {
    if (
      !(Date.now() - player.dimensionTime < 3000 ||
        Date.now() - player.gotHurt < 250 ||
        Date.now() - player.gotExplosion < 5000)
    ) {
      const speed = Math.sqrt(
        player.getVelocity().x ** 2 +
        player.getVelocity().y ** 2 +
        player.getVelocity().z ** 2
      )

      if (speed > 0) {
        if (player.lastBlinkSpeed == speed) {
          if (
            (player.lastAction3?.location?.x - player.location.x) < 0.001 &&
            (player.lastAction3?.location?.y - player.location.y) < 0.001 &&
            (player.lastAction3?.location?.z - player.location.z) < 0.001
          ) {
            player.blinkAChecking ??= 0
            player.blinkAChecking += 1

            if (player.blinkAChecking > 10) {
              Hutao.Player.checking(player, "Blink", `A`)
            }
          } else {
            player.blinkAChecking = 0
          }
        } else {
          player.blinkAChecking = 0
        }
      } else {
        player.blinkAChecking = 0
      }

      player.lastBlinkSpeed = speed
    }
  }
}