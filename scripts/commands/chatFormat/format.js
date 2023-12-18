import { Hutao } from "../../lib/import"
import * as setting from "../../config"
import { ChatFormat } from "../../menu/adminMenu/chatFormat"
import { dimension } from "./dimension/import"

export const format = (player, command) => {
  if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new ChatFormat().format(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenChatFormatFormatMenu)
  } else if (command[2] == "dimension") {
    dimension(player, command)
  } else if (command[2] == undefined) {
    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}chat-format format §ddimension`, Hutao.Player.getLanguage(player).commandChatFormatDimension],
      [`${setting.default.data.commands.normalPrefix}chat-format format §dgamemode`, Hutao.Player.getLanguage(player).commandChatFormatGamemode],
      [`${setting.default.data.commands.normalPrefix}chat-format format §dhealth`, Hutao.Player.getLanguage(player).commandChatFormatHealth],
      [`${setting.default.data.commands.normalPrefix}chat-format format §dlevel`, Hutao.Player.getLanguage(player).commandChatFormatLevel],
      [`${setting.default.data.commands.normalPrefix}chat-format format §dlocation`, Hutao.Player.getLanguage(player).commandChatFormatLocation],
      [`${setting.default.data.commands.normalPrefix}chat-format format §dopen`, Hutao.Player.getLanguage(player).commandOpenChatFormatFormatMenu],
      [`${setting.default.data.commands.normalPrefix}chat-format format §drotation`, Hutao.Player.getLanguage(player).commandChatFormatRotation],
      [`${setting.default.data.commands.normalPrefix}chat-format format §dstatus`, Hutao.Player.getLanguage(player).commandChatFormatStatus],
      [`${setting.default.data.commands.normalPrefix}chat-format format §dteam`, Hutao.Player.getLanguage(player).commandChatFormatTeam],
      [`${setting.default.data.commands.normalPrefix}chat-format format §dtime`, Hutao.Player.getLanguage(player).commandChatFormatTime],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}