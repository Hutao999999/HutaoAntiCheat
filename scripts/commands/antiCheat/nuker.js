import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { nukerA } from "./nuker/nukerA"
import { nukerB } from "./nuker/nukerB"
import { nukerC } from "./nuker/nukerC"
import { nukerD } from "./nuker/nukerD"
import { nukerE } from "./nuker/nukerE"
import { nukerF } from "./nuker/nukerF"
import { nukerG } from "./nuker/nukerG"

export const nuker = (player, command) => {
  if (command[2] == "a") {
    nukerA(player, command)
  } else if (command[2] == "b") {
    nukerB(player, command)
  } else if (command[2] == "c") {
    nukerC(player, command)
  } else if (command[2] == "d") {
    nukerD(player, command)
  } else if (command[2] == "e") {
    nukerE(player, command)
  } else if (command[2] == "f") {
    nukerF(player, command)
  } else if (command[2] == "g") {
    nukerG(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().nukerSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNukerMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat nuker §da`, Hutao.Player.getLanguage(player).commandAntiCheatNukerASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat nuker §db`, Hutao.Player.getLanguage(player).commandAntiCheatNukerBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat nuker §dc`, Hutao.Player.getLanguage(player).commandAntiCheatNukerCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat nuker §dd`, Hutao.Player.getLanguage(player).commandAntiCheatNukerDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat nuker §de`, Hutao.Player.getLanguage(player).commandAntiCheatNukerESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat nuker §df`, Hutao.Player.getLanguage(player).commandAntiCheatNukerFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat nuker §dg`, Hutao.Player.getLanguage(player).commandAntiCheatNukerGSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat nuker §dopen`, Hutao.Player.getLanguage(player).commandOpenNukerMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}