import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { crasherA } from "./crasher/crasherA"
import { crasherB } from "./crasher/crasherB"

export const crasher = (player, command) => {
  if (command[2] == "a") {
    crasherA(player, command)
  } else if (command[2] == "b") {
    crasherB(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().crasherSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenCrasherMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat crasher §da`, Hutao.Player.getLanguage(player).commandAntiCheatCrasherASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat crasher §db`, Hutao.Player.getLanguage(player).commandAntiCheatCrasherBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat crasher §dopen`, Hutao.Player.getLanguage(player).commandOpenCrasherMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}