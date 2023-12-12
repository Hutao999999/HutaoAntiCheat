import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { fastThrowA } from "./fastThrow/fastThrowA"

export const fastThrow = (player, command) => {
  if (command[2] == "a") {
    fastThrowA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().fastThrowSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenFastThrowMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat fast-throw §da`, Hutao.Player.getLanguage(player).commandAntiCheatFastThrowASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat fast-throw §dopen`, Hutao.Player.getLanguage(player).commandOpenFastThrowMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}