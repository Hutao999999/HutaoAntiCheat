import * as setting from "../config"
import { Hutao } from "../lib/import"

export const noSlowDown = (player) => {
  if (Date.now() - player.dimensionTime < 3000) return
  if (Date.now() - player.gotHurt < 250) return
  if (Date.now() - player.gotExplosion < 5000) return
  if (player.isFlying) return

  const average = (
    Math.sqrt(
      player.getVelocity().x ** 2 +
      player.getVelocity().z ** 2
    ) + player.lastcheckingNoSlowDownVelocity
  ) / 2

  if (setting.default.data.antiCheat.noSlowDownA.state) {
    if (
      player.hasTag("hutao:right") &&
      player.rightClick > 10
    ) {
      if (
        average > (
          0.25 +
          player.elytraSpeed +
          player.ridingSpeed +
          player.tridentSpeed +
          player.speed
        )
      ) {
        player.noSlowDownATimes ??= 0
        player.noSlowDownATimes += 1
        player.noSlowDownAChecking = 0

        Hutao.Player.returnLastLocation(player)

        if (player.noSlowDownATimes > 1) {
          Hutao.Player.checking(player, `NoSlowDown`, `A`)
        }
      }
    }
  }

  if (setting.default.data.antiCheat.noSlowDownB.state) {
    if (player.isInWeb) {
      if (
        average > (
          0.25 +
          player.elytraSpeed +
          player.ridingSpeed +
          player.tridentSpeed +
          player.speed
        )
      ) {
        player.noSlowDownBTimes ??= 0
        player.noSlowDownBTimes += 1
        player.noSlowDownBChecking = 0

        Hutao.Player.returnLastLocation(player)

        if (player.noSlowDownBTimes > 1) {
          Hutao.Player.checking(player, `NoSlowDown`, `B`)
        }
      }
    }
  }

  if (player.noSlowDownATimes > 0) {
    player.noSlowDownAChecking++
  }

  if (player.noSlowDownBTimes > 0) {
    player.noSlowDownBChecking++
  }

  if (player.noSlowDownAChecking > 200) {
    player.noSlowDownATimes = 0
    player.noSlowDownAChecking = 0
  }

  if (player.noSlowDownBChecking > 200) {
    player.noSlowDownBTimes = 0
    player.noSlowDownBChecking = 0
  }

  player.lastcheckingNoSlowDownVelocity = Math.sqrt(
    player.getVelocity().x ** 2 +
    player.getVelocity().z ** 2
  )
}