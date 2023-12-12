import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { entityCheckA } from "./entityCheck/entityCheckA"
import { entityCheckB } from "./entityCheck/entityCheckB"

export const entityCheck = (player, command) => {
  if (command[2] == "a") {
    entityCheckA(player, command)
  } else if (command[2] == "b") {
    entityCheckB(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().entityCheckSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenEntityCheckMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat entity-check §da`, Hutao.Player.getLanguage(player).commandAntiCheatEntityCheckASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat entity-check §db`, Hutao.Player.getLanguage(player).commandAntiCheatEntityCheckBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat entity-check §dopen`, Hutao.Player.getLanguage(player).commandOpenEntityCheckMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}