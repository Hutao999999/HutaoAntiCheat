import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { speedA } from "./speed/speedA"

export const speed = (player, command) => {
  if (command[2] == "a") {
    speedA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().speedSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenSpeedMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat speed §da`, Hutao.Player.getLanguage(player).commandAntiCheatSpeedASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat speed §dopen`, Hutao.Player.getLanguage(player).commandOpenSpeedMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}