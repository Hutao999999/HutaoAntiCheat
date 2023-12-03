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

  player.scaffoldAPlaceBlock = 0
}