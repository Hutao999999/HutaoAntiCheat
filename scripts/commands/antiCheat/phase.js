import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { phaseA } from "./phase/phaseA"

export const phase = (player, command) => {
  if (command[2] == "a") {
    phaseA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().phaseSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenPhaseMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat phase §da`, Hutao.Player.getLanguage(player).commandAntiCheatPhaseASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat phase §dopen`, Hutao.Player.getLanguage(player).commandOpenPhaseMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}