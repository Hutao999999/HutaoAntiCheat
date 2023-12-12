import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { badPacketA } from "./badPacket/badPacketA"
import { badPacketB } from "./badPacket/badPacketB"

export const badPacket = (player, command) => {
  if (command[2] == "a") {
    badPacketA(player, command)
  } else if (command[2] == "b") {
    badPacketB(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().badPacketSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenBadPacketMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat bad-packet §da`, Hutao.Player.getLanguage(player).commandAntiCheatBadPacketASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat bad-packet §db`, Hutao.Player.getLanguage(player).commandAntiCheatBadPacketBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat bad-packet §dopen`, Hutao.Player.getLanguage(player).commandOpenBadPacketMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}