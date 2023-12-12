import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { fastLadderA } from "./fastLadder/fastLadderA"

export const fastLadder = (player, command) => {
  if (command[2] == "a") {
    fastLadderA(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().fastLadderSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenFastLadderMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat fast-ladder §da`, Hutao.Player.getLanguage(player).commandAntiCheatFastLadderASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat fast-ladder §dopen`, Hutao.Player.getLanguage(player).commandOpenFastLadderMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}