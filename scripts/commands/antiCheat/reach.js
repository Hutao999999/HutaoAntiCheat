import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { reachA } from "./reach/reachA"
import { reachB } from "./reach/reachB"
import { reachC } from "./reach/reachC"
import { reachD } from "./reach/reachD"

export const reach = (player, command) => {
  if (command[2] == "a") {
    reachA(player, command)
  } else if (command[2] == "b") {
    reachB(player, command)
  } else if (command[2] == "c") {
    reachC(player, command)
  } else if (command[2] == "d") {
    reachD(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().reachSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenReachMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat reach §da`, Hutao.Player.getLanguage(player).commandAntiCheatReachASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat reach §db`, Hutao.Player.getLanguage(player).commandAntiCheatReachBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat reach §dc`, Hutao.Player.getLanguage(player).commandAntiCheatReachCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat reach §dd`, Hutao.Player.getLanguage(player).commandAntiCheatReachDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat reach §dopen`, Hutao.Player.getLanguage(player).commandOpenReachMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}