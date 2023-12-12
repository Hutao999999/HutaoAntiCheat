import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { blinkA } from "./blink/blinkA"

export const blink = (player, command) => {
  if (command[2] == "a") {
    blinkA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().blinkSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenBlinkMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat blink §da`, Hutao.Player.getLanguage(player).commandAntiCheatBlinkASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat blink §dopen`, Hutao.Player.getLanguage(player).commandOpenBlinkMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}