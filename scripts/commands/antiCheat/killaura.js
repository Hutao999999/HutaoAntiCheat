import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { killauraA } from "./killaura/killauraA"
import { killauraB } from "./killaura/killauraB"
import { killauraC } from "./killaura/killauraC"
import { killauraD } from "./killaura/killauraD"
import { killauraE } from "./killaura/killauraE"
import { killauraF } from "./killaura/killauraF"
import { killauraG } from "./killaura/killauraG"
import { killauraH } from "./killaura/killauraH"
import { killauraI } from "./killaura/killauraI"

export const killaura = (player, command) => {
  if (command[2] == "a") {
    killauraA(player, command)
  } else if (command[2] == "b") {
    killauraB(player, command)
  } else if (command[2] == "c") {
    killauraC(player, command)
  } else if (command[2] == "d") {
    killauraD(player, command)
  } else if (command[2] == "e") {
    killauraE(player, command)
  } else if (command[2] == "f") {
    killauraF(player, command)
  } else if (command[2] == "g") {
    killauraG(player, command)
  } else if (command[2] == "h") {
    killauraH(player, command)
  } else if (command[2] == "i") {
    killauraI(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().killauraSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenKillauraMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §da`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §db`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §dc`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §dd`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §de`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §df`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §dg`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraGSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §dh`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraHSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §di`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraISetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat killaura §dopen`, Hutao.Player.getLanguage(player).commandOpenKillauraMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}