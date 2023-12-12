import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { autoShieldA } from "./autoShield/autoShieldA"
import { autoShieldB } from "./autoShield/autoShieldB"
import { autoShieldC } from "./autoShield/autoShieldC"
import { autoShieldD } from "./autoShield/autoShieldD"
import { autoShieldE } from "./autoShield/autoShieldE"
import { autoShieldF } from "./autoShield/autoShieldF"
import { autoShieldG } from "./autoShield/autoShieldG"

export const autoShield = (player, command) => {
  if (command[2] == "a") {
    autoShieldA(player, command)
  } else if (command[2] == "b") {
    autoShieldB(player, command)
  } else if (command[2] == "c") {
    autoShieldC(player, command)
  } else if (command[2] == "d") {
    autoShieldD(player, command)
  } else if (command[2] == "e") {
    autoShieldE(player, command)
  } else if (command[2] == "f") {
    autoShieldF(player, command)
  } else if (command[2] == "g") {
    autoShieldG(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().autoShieldSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAutoShieldMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §da`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §db`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §dc`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §dd`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §de`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §df`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §dg`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldGSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-shield §dopen`, Hutao.Player.getLanguage(player).commandOpenAutoShieldMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}