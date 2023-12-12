import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { autoArmorA } from "./autoArmor/autoArmorA"
import { autoArmorB } from "./autoArmor/autoArmorB"
import { autoArmorC } from "./autoArmor/autoArmorC"
import { autoArmorD } from "./autoArmor/autoArmorD"
import { autoArmorE } from "./autoArmor/autoArmorE"
import { autoArmorF } from "./autoArmor/autoArmorF"
import { autoArmorG } from "./autoArmor/autoArmorG"

export const autoArmor = (player, command) => {
  if (command[2] == "a") {
    autoArmorA(player, command)
  } else if (command[2] == "b") {
    autoArmorB(player, command)
  } else if (command[2] == "c") {
    autoArmorC(player, command)
  } else if (command[2] == "d") {
    autoArmorD(player, command)
  } else if (command[2] == "e") {
    autoArmorE(player, command)
  } else if (command[2] == "f") {
    autoArmorF(player, command)
  } else if (command[2] == "g") {
    autoArmorG(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().autoArmorSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAutoArmorMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-armor §da`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-armor §db`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-armor §dc`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-armor §dd`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-armor §de`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-armor §df`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-armor §dg`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorGSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat auto-armor §dopen`, Hutao.Player.getLanguage(player).commandOpenAutoArmorMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}