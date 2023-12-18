import { Hutao } from "../lib/import"
import * as setting from "../config"
import { state } from "./chatFormat/state"
import { ChatFormat } from "../menu/adminMenu/chatFormat"
import { format } from "./chatFormat/format"

export default {
  name: "chatFormat",
  description: "commandChatFormatDescription",
  function(player, command) {
    if (command[1] == "format") {
      format(player, command)
    } else if (command[1] == "structure") {

    } else if (command[1] == "state") {
      state(player, command)
    } else if (command[1] == "open") {
      if (command[2]) return Hutao.World.wrongCommand(player, command, 2)

      new ChatFormat().open(player)

      Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenChatFormatMenu)
    } else if (command[1] == undefined) {
      Hutao.World.showHelp(player,
        [`${setting.default.data.commands.normalPrefix}chat-format §dformat`, Hutao.Player.getLanguage(player).commandChatFormatFormat],
        [`${setting.default.data.commands.normalPrefix}chat-format §dopen`, Hutao.Player.getLanguage(player).commandOpenChatFormatMenu],
        [`${setting.default.data.commands.normalPrefix}chat-format §dstate`, Hutao.Player.getLanguage(player).commandState],
        [`${setting.default.data.commands.normalPrefix}chat-format §dstructure`, Hutao.Player.getLanguage(player).commandChatFormatStructure],
      )
    } else {
      Hutao.World.wrongCommand(player, command, 1)
    }
  }
}