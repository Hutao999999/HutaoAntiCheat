import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { autoClickerA } from "./autoClicker/autoClickerA"
import { autoClickerB } from "./autoClicker/autoClickerB"

export const autoClicker = (player, command) => {
  if (command[2] == "a") {
    autoClickerA(player, command)
  } else if (command[2] == "b") {
    autoClickerB(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().autoClickerSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAutoClickerMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-clicker §da`, Hutao.Player.getLanguage(player).commandAntiCheatAutoClickerASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-clicker §db`, Hutao.Player.getLanguage(player).commandAntiCheatAutoClickerBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-clicker §dopen`, Hutao.Player.getLanguage(player).commandOpenAutoClickerMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}