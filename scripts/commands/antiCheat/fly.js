import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { flyA } from "./fly/flyA"

export const fly = (player, command) => {
  if (command[2] == "a") {
    flyA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().flySetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenFlyMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat fly §da`, Hutao.Player.getLanguage(player).commandAntiCheatFlyASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat fly §dopen`, Hutao.Player.getLanguage(player).commandOpenFlyMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}