import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { scaffoldA } from "./scaffold/scaffoldA"
import { scaffoldB } from "./scaffold/scaffoldB"
import { scaffoldC } from "./scaffold/scaffoldC"
import { scaffoldD } from "./scaffold/scaffoldD"
import { scaffoldE } from "./scaffold/scaffoldE"
import { scaffoldF } from "./scaffold/scaffoldF"
import { scaffoldG } from "./scaffold/scaffoldG"
import { scaffoldH } from "./scaffold/scaffoldH"
import { scaffoldI } from "./scaffold/scaffoldI"
import { scaffoldJ } from "./scaffold/scaffoldJ"
import { scaffoldK } from "./scaffold/scaffoldK"

export const scaffold = (player, command) => {
  if (command[2] == "a") {
    scaffoldA(player, command)
  } else if (command[2] == "b") {
    scaffoldB(player, command)
  } else if (command[2] == "c") {
    scaffoldC(player, command)
  } else if (command[2] == "d") {
    scaffoldD(player, command)
  } else if (command[2] == "e") {
    scaffoldE(player, command)
  } else if (command[2] == "f") {
    scaffoldF(player, command)
  } else if (command[2] == "g") {
    scaffoldG(player, command)
  } else if (command[2] == "h") {
    scaffoldH(player, command)
  } else if (command[2] == "i") {
    scaffoldI(player, command)
  } else if (command[2] == "j") {
    scaffoldJ(player, command)
  } else if (command[2] == "k") {
    scaffoldK(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().scaffoldSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenScaffoldMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §da`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §db`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §dc`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §dd`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §de`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §df`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §dg`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldGSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §dh`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldHSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §di`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldISetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §dj`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldJSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §dk`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldKSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat scaffold §dopen`, Hutao.Player.getLanguage(player).commandOpenScaffoldMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}