import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { itemCheckA } from "./itemCheck/itemCheckA"
import { itemCheckB } from "./itemCheck/itemCheckB"
import { itemCheckC } from "./itemCheck/itemCheckC"
import { itemCheckD } from "./itemCheck/itemCheckD"
import { itemCheckE } from "./itemCheck/itemCheckE"
import { itemCheckF } from "./itemCheck/itemCheckF"
import { itemCheckG } from "./itemCheck/itemCheckG"
import { itemCheckH } from "./itemCheck/itemCheckH"
import { itemCheckI } from "./itemCheck/itemCheckI"
import { itemCheckJ } from "./itemCheck/itemCheckJ"
import { itemCheckK } from "./itemCheck/itemCheckK"

export const itemCheck = (player, command) => {
  if (command[2] == "a") {
    itemCheckA(player, command)
  } else if (command[2] == "b") {
    itemCheckB(player, command)
  } else if (command[2] == "c") {
    itemCheckC(player, command)
  } else if (command[2] == "d") {
    itemCheckD(player, command)
  } else if (command[2] == "e") {
    itemCheckE(player, command)
  } else if (command[2] == "f") {
    itemCheckF(player, command)
  } else if (command[2] == "g") {
    itemCheckG(player, command)
  } else if (command[2] == "h") {
    itemCheckH(player, command)
  } else if (command[2] == "i") {
    itemCheckI(player, command)
  } else if (command[2] == "j") {
    itemCheckJ(player, command)
  } else if (command[2] == "k") {
    itemCheckK(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().itemCheckSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenItemCheckMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §da`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §db`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §dc`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §dd`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §de`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §df`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §dg`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckGSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §dh`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckHSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §di`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckISetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §dj`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckJSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §dk`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckKSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-check §dopen`, Hutao.Player.getLanguage(player).commandOpenItemCheckMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}