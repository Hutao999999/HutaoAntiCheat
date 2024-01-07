import * as Minecraft from "@minecraft/server"
import * as setting from "../config"
import { Hutao } from "../lib/import"

export const invalidSprint = (player) => {
  if (setting.default.data.antiCheat.invalidSprintC.state) {
    if (player.unusualSprinting > 0) {
      Hutao.Player.checking(player, `InvalidSprint`, `C`)

      player.teleport({
        x: player.lastActions[0].location.x,
        y: player.lastActions[0].location.y,
        z: player.lastActions[0].location.z
      }, {
        dimension: Minecraft.world.getDimension(player.lastActions[0].dimension),
        rotation: {
          x: player.lastActions[0].rotation.x,
          y: player.lastActions[0].rotation.y
        }
      })

      player.unusualSprinting = 0

      Minecraft.system.runTimeout(() => {
        player.otherDirectionSprinting = 20
      }, 2)
    }
  }

  if (
    player.ground &&
    !player.isOnGround
  ) {
    return
  }

  if (player.isSwimming) return

  if (player.isSprinting) {
    player.sprint = true
  } else {
    player.sprint = false
  }

  if (player.getEffect("blindness")) {
    player.blindness = 0
  } else {
    player.blindness ??= 0
    player.blindness += 1
  }

  if (setting.default.data.antiCheat.invalidSprintA.state) {
    if (player.getEffect("blindness")) {
      if (
        (
          !player.lastSprint &&
          player.sprint
        ) ||
        player.checkingSprint
      ) {
        player.invalidSprintAChecking ??= 0
        player.invalidSprintAChecking += 1

        player.lastSprint = false
        player.sprint = false

        if (
          player.blindness < 20 &&
          player.invalidSprintAChecking > 5
        ) {
          Hutao.Player.checking(player, `InvalidSprint`, `A`)
          Hutao.Player.returnLastLocation(player)
          player.checkingSprint = true
        }
      }
    } else {
      player.blindness ??= 0
      player.blindness += 1
      player.checkingSprint = false
      player.invalidSprintAChecking = false
    }
  } else {
    player.blindness ??= 0
    player.blindness += 1
    player.checkingSprint = false
    player.invalidSprintAChecking = false
  }

  if (setting.default.data.antiCheat.invalidSprintB.state) {
    if (
      player.isSneaking &&
      player.isSprinting
    ) {
      player.invalidSprintBChecking ??= 0
      player.invalidSprintBChecking += 1

      if (player.invalidSprintBChecking > 5) {
        Hutao.Player.checking(player, `InvalidSprint`, `B`)
        Hutao.Player.returnLastLocation(player)
      }
    }
  }

  if (!player.sprint) {
    player.checkingSpring = false
  }

  player.ground = player.isOnGround
  player.lastSprint = player.sprint
}