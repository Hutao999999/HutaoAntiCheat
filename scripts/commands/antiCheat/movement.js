import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { movementA } from "./movement/movementA"

export const movement = (player, command) => {
  if (command[2] == "a") {
    movementA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().movementSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenMovementMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat movement §da`, Hutao.Player.getLanguage(player).commandAntiCheatMovementASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat movement §dopen`, Hutao.Player.getLanguage(player).commandOpenMovementMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}