import { Hutao } from "../../lib/import"
import { ChatFormat } from "../../menu/adminMenu/chatFormat"
import { other } from "./structure/other"
import { admin } from "./structure/admin"
import { builder } from "./structure/builder"
import { member } from "./structure/member"
import { owner } from "./structure/owner"
import * as setting from "../../config"

export const structure = (player, command) => {
  if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new ChatFormat().structure(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenChatFormatStructure)
  } else if (command[2] == "owner") {
    owner(player, command)
  } else if (command[2] == "admin") {
    admin(player, command)
  } else if (command[2] == "builder") {
    builder(player, command)
  } else if (command[2] == "member") {
    member(player, command)
  } else if (command[2] == "other") {
    other(player, command)
  } else if (command[2] == undefined) {
    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}chat-format structure §dadmin`, Hutao.Player.getLanguage(player).commandChatFormatStructureAdmin],
      [`${setting.default.data.commands.normalPrefix}chat-format structure §dbuilder`, Hutao.Player.getLanguage(player).commandChatFormatStructureBuilder],
      [`${setting.default.data.commands.normalPrefix}chat-format structure §dmember`, Hutao.Player.getLanguage(player).commandChatFormatStructureMember],
      [`${setting.default.data.commands.normalPrefix}chat-format structure §dopen`, Hutao.Player.getLanguage(player).comman4dOpenChatFormatStructure],
      [`${setting.default.data.commands.normalPrefix}chat-format structure §dother`, Hutao.Player.getLanguage(player).commandChatFormatStructureOther],
      [`${setting.default.data.commands.normalPrefix}chat-format structure §downer`, Hutao.Player.getLanguage(player).commandChatFormatStructureOwner],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}