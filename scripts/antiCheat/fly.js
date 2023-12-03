import * as setting from "../config"
import { Hutao } from "../lib/import"

export const fly = (player) => {
  if (setting.default.data.antiCheat.flyA.state) {
    if (
      !player.hasTag("hutao:has_mayfly") &&
      player.isFlying &&
      Hutao.Player.getGamemode(player) != "spectator"
    ) {
      const gamemode = Hutao.Player.getGamemode(player)

      Hutao.Player.checking(player, `Fly`, `A`)
      Hutao.Player.returnLastLocation(player)

      Hutao.Player.setGamemode(player, "spectator")
      Hutao.Player.setGamemode(player, gamemode)
    }
  }
}