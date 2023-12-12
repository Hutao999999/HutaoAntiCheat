import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { auraA } from "./aura/auraA"
import { auraB } from "./aura/auraB"

export const aura = (player, command) => {
  if (command[2] == "a") {
    auraA(player, command)
  } else if (command[2] == "b") {
    auraB(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().auraSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAuraMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat aura §da`, Hutao.Player.getLanguage(player).commandAntiCheatAuraASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat aura §db`, Hutao.Player.getLanguage(player).commandAntiCheatAuraBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat aura §dopen`, Hutao.Player.getLanguage(player).commandOpenAuraMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}