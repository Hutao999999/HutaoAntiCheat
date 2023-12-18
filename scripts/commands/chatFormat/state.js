import { Hutao } from "../../lib/import"
import * as setting from "../../config"

export const state = (player, command) => {
  if (command[2] == undefined) {
    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}chat-format state §d<Boolean>`, Hutao.Player.getLanguage(player).commandState],
    )
  } else {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    let config = Hutao.Database.get("db")

    if (command[2] == "true") {
      config.data.chatFormat.state = true
    } else if (command[2] == "false") {
      config.data.chatFormat.state = false
    } else {
      return Hutao.World.wrongCommand(player, command, 2)
    }

    Hutao.Database.set("db", config)
    Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
  }
}