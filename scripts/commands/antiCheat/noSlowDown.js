import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { noSlowDownA } from "./noSlowDown/noSlowDownA"
import { noSlowDownB } from "./noSlowDown/noSlowDownB"

export const noSlowDown = (player, command) => {
  if (command[2] == "a") {
    noSlowDownA(player, command)
  } else if (command[2] == "b") {
    noSlowDownB(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().noSlowDownSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNoSlowDownMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat no-slow-down §da`, Hutao.Player.getLanguage(player).commandAntiCheatNoSlowDownASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat no-slow-down §db`, Hutao.Player.getLanguage(player).commandAntiCheatNoSlowDownBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat no-slow-down §dopen`, Hutao.Player.getLanguage(player).commandOpenNoSlowDownMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}