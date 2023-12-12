import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { autoTotemA } from "./autoTotem/autoTotemA"
import { autoTotemB } from "./autoTotem/autoTotemB"
import { autoTotemC } from "./autoTotem/autoTotemC"
import { autoTotemD } from "./autoTotem/autoTotemD"
import { autoTotemE } from "./autoTotem/autoTotemE"
import { autoTotemF } from "./autoTotem/autoTotemF"
import { autoTotemG } from "./autoTotem/autoTotemG"

export const autoTotem = (player, command) => {
  if (command[2] == "a") {
    autoTotemA(player, command)
  } else if (command[2] == "b") {
    autoTotemB(player, command)
  } else if (command[2] == "c") {
    autoTotemC(player, command)
  } else if (command[2] == "d") {
    autoTotemD(player, command)
  } else if (command[2] == "e") {
    autoTotemE(player, command)
  } else if (command[2] == "f") {
    autoTotemF(player, command)
  } else if (command[2] == "g") {
    autoTotemG(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().autoTotemSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAutoTotemMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §da`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §db`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §dc`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §dd`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §de`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §df`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §dg`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemGSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §dopen`, Hutao.Player.getLanguage(player).commandOpenAutoTotemMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}