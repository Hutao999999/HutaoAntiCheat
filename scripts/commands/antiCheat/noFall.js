import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { noFallA } from "./noFall/noFallA"

export const noFall = (player, command) => {
  if (command[2] == "a") {
    noFallA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().noFallSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNoFallMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat no-fall §da`, Hutao.Player.getLanguage(player).commandAntiCheatNoFallASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat no-fall §dopen`, Hutao.Player.getLanguage(player).commandOpenNoFallMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}