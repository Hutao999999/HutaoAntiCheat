import { Hutao } from "../../../lib/import"
import * as setting from "../../../config"
import { NameTag } from "../../../menu/adminMenu/nameTag"

export const level = (player, command) => {
  if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`format level §dset`, Hutao.Player.getLanguage(player).commandNameTagLevel],
      [`format level §dopen`, Hutao.Player.getLanguage(player).commandOpenNameTagFormatLevelMenu],
      [`format level §dview`, Hutao.Player.getLanguage(player).commandView]
    )
  } else if (command[3] == "set") {
    if (command[4] == undefined) {
      Hutao.World.showHelp(player,
        [`level set §d<string>`, Hutao.Player.getLanguage(player).commandNameTagLevel]
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

      config.data.nameTag.format.level = Hutao.World.getNormalCommand(player, 4);

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
    }
  } else if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new NameTag().level(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameTagFormatLevelMenu)
  } else if (command[3] == "view") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    Hutao.World.log([
      `§7=========================`,
      `§e${Hutao.Player.getLanguage(player).project} §7▶ §6${Hutao.Player.getLanguage(player).level}`,
      ``,
      `§e${Hutao.Player.getLanguage(player).level} §7▶ §r${setting.default.data.nameTag.format.level}`,
      `§7=========================`
    ].join("\n§r"), player)
  } else {
    Hutao.World.wrongCommand(player, command, 4)
  }
}