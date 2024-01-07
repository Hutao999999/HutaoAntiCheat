import * as setting from "../config"
import { Hutao } from "../lib/import"

export const nameSpoof = (player) => {
  if (setting.default.data.antiCheat.nameSpoofA.state) {
    const validString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
    let name = player.name

    for (const string of validString) {
      name = name.replaceAll(string, "")
    }

    if (name.length > 0) {
      Hutao.Player.checking(player, `NameSpoof`, `A`)
    }
  }

  if (setting.default.data.antiCheat.nameSpoofB.state) {
    if (
      player.name.length < 5 ||
      player.name.length > 16
    ) {
      Hutao.Player.checking(player, `NameSpoof`, `B`)
    }
  }
}