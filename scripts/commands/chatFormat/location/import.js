import { Hutao } from "../../../lib/import"
import * as setting from "../../../config"
import { ChatFormat } from "../../../menu/adminMenu/chatFormat"

export const location = (player, command) => {
  if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`format location §dset`, Hutao.Player.getLanguage(player).commandChatFormatLocation],
      [`format location §dopen`, Hutao.Player.getLanguage(player).commandOpenChatFormatFormatLocationMenu],
      [`format location §dview`, Hutao.Player.getLanguage(player).commandView]
    )
  } else if (command[3] == "set") {
    if (command[4] == undefined) {
      Hutao.World.showHelp(player,
        [`location set §d<string>`, Hutao.Player.getLanguage(player).commandChatFormatLocation]
      )
    } else {
      if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

      const validString = (string) => {
        if (string.trim() == "") return {
          condition: true,
          reason: Hutao.Player.getLanguage(player).cannotBeEmpty
        }

        return {
          condition: false,
          reason: "None"
        }
      }

      if (validString(command[4]).condition) return Hutao.World.wrong(player, validString(command[4]).reason)

      let config = Hutao.Database.get("db")

      config.data.chatFormat.format.location = Hutao.World.getNormalCommand(player, 4);

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
    }
  } else if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new ChatFormat().location(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenChatFormatFormatLocationMenu)
  } else if (command[3] == "view") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    Hutao.World.log([
      `§7=========================`,
      `§e${Hutao.Player.getLanguage(player).project} §7▶ §6${Hutao.Player.getLanguage(player).location}`,
      ``,
      `§e${Hutao.Player.getLanguage(player).location} §7▶ §r${setting.default.data.chatFormat.format.location}`,
      `§7=========================`
    ].join("\n§r"), player)
  } else {
    Hutao.World.wrongCommand(player, command, 4)
  }
}