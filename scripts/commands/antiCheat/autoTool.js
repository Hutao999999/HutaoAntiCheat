import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { autoToolA } from "./autoTool/autoToolA"

export const autoTool = (player, command) => {
  if (command[2] == "a") {
    autoToolA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().autoToolSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAutoToolMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-tool §da`, Hutao.Player.getLanguage(player).commandAntiCheatAutoToolASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-tool §dopen`, Hutao.Player.getLanguage(player).commandOpenAutoToolMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}