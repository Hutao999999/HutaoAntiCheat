import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { nameSpoofA } from "./nameSpoof/nameSpoofA"
import { nameSpoofB } from "./nameSpoof/nameSpoofB"

export const nameSpoof = (player, command) => {
  if (command[2] == "a") {
    nameSpoofA(player, command)
  } else if (command[2] == "b") {
    nameSpoofB(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().nameSpoofSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameSpoofMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat name-spoof §da`, Hutao.Player.getLanguage(player).commandAntiCheatNameSpoofASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat name-spoof §db`, Hutao.Player.getLanguage(player).commandAntiCheatNameSpoofBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat name-spoof §dopen`, Hutao.Player.getLanguage(player).commandOpenNameSpoofMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}