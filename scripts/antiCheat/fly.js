import * as setting from "../config"
import { Hutao } from "../lib/import"

export const fly = (player) => {
  if (setting.default.data.antiCheat.flyA.state) {
    if (
      !player.hasTag("hutao:has_mayfly") &&
      player.isFlying &&
      Hutao.Player.getGamemode(player) != "spectator"
    ) {
      Hutao.Player.checking(player, `Fly`, `A`)
      Hutao.Player.returnLastLocation(player)
    }
  }
}