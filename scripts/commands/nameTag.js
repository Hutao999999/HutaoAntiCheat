import { Hutao } from "../lib/import"
import * as setting from "../config"
import { state } from "./nameTag/state"
import { NameTag } from "../menu/adminMenu/nameTag"
import { format } from "./nameTag/format"
import { structure } from "./nameTag/structure"

export default {
  name: "nameTag",
  description: "commandNameTagDescription",
  function(player, command) {
    if (command[1] == "format") {
      format(player, command)
    } else if (command[1] == "structure") {
      structure(player, command)
    } else if (command[1] == "state") {
      state(player, command)
    } else if (command[1] == "open") {
      if (command[2]) return Hutao.World.wrongCommand(player, command, 2)

      new NameTag().open(player)

      Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameTagMenu)
    } else if (command[1] == undefined) {
      Hutao.World.showHelp(player,
        [`${setting.default.data.commands.normalPrefix}name-tag §dformat`, Hutao.Player.getLanguage(player).commandNameTagFormat],
        [`${setting.default.data.commands.normalPrefix}name-tag §dopen`, Hutao.Player.getLanguage(player).commandOpenNameTagMenu],
        [`${setting.default.data.commands.normalPrefix}name-tag §dstate`, Hutao.Player.getLanguage(player).commandState],
        [`${setting.default.data.commands.normalPrefix}name-tag §dstructure`, Hutao.Player.getLanguage(player).commandNameTagStructure],
      )
    } else {
      Hutao.World.wrongCommand(player, command, 1)
    }
  }
}