import * as setting from "../config"
import { Hutao } from "../lib/import"

export const scaffold = (player) => {
  if (setting.default.data.antiCheat.scaffoldA.state) {
    if (player.scaffoldAPlaceBlock > 1) {
      player.scaffoldAChecking ??= 0
      player.scaffoldAChecking += 1

      if (player.scaffoldAChecking > 1) {
        Hutao.Player.checking(player, `Scaffold`, `A`)
      }
    }
  }

  if (setting.default.data.antiCheat.scaffoldG.state) {
    if (player.scaffoldFChecking > 1) {
      Hutao.Player.checking(player, `Scaffold`, `G`)
    }
  }

  if (player.scaffoldAPlaceBlock > 0) {
    player.resetScaffoldA ??= 0
    player.resetScaffoldA += 1

    if (player.resetScaffoldA > 40) {
      player.scaffoldAPlaceBlock = 0
      player.scaffoldAChecking = 0
    }
  } else {
    player.resetScaffoldA = undefined
  }

  if (player.scaffoldGChecking > 0) {
    player.resetScaffoldG ??= 0
    player.resetScaffoldG += 1

    if (player.resetScaffoldG > 20) {
      player.scaffoldGChecking = 0
    }
  } else {
    player.resetScaffoldG = undefined
  }

  player.scaffoldAPlaceBlock = 0
}