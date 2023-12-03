import { Hutao } from "../lib/import"

export const elytraFly = (player) => {
  if (!player.isGliding) return

  const velocity = Math.sqrt(
    player.getVelocity().x ** 2 +
    player.getVelocity().z ** 2
  )

  if (
    velocity < 0.3 &&
    Math.floor(Math.abs(player.getVelocity().y - player.lastElytraFlyAYVelocity) * 50000) == 0
  ) {
    player.elytraFlyAChecking ??= 0
    player.elytraFlyAReset = 0
    player.elytraFlyAChecking += 1

    if (player.elytraFlyAChecking > 3) {
      Hutao.Player.checking(player, `ElytraFly`, `A`)
    }
  }

  player.lastElytraFlyAYVelocity = player.getVelocity().y

  if (player.elytraFlyAChecking > 0) {
    player.elytraFlyAReset ??= 0
    player.elytraFlyAReset += 1

    if (player.elytraFlyAReset > 10) {
      player.elytraFlyAChecking = 0
      player.elytraFlyAReset = 0
    }
  }
}