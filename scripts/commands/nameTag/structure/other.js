import { Hutao } from "../../../lib/import"
import * as setting from "../../../config"

export const other = (player, command) => {
  if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`structure other §d@<Player>`, Hutao.Player.getLanguage(player).commandChatFormatStructureOther],
    )
  } else {
    const currentPlayer = Hutao.World.getPlayerFromCommand(command[3])

    if (currentPlayer == undefined) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

    if (command[4] == "set") {
      if (command[5] == undefined) {

      } else {
        if (command[6]) return Hutao.World.wrongCommand(player, command, 6)

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

        if (validString(command[5]).condition) return Hutao.World.wrong(player, validString(command[5]).reason)

        let config = Hutao.Database.get("db")

        config.data.nameTag.structure.custom[currentPlayer.id] = Hutao.World.getNormalCommand(player, 5).trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
      }
    } else if (command[4] == "remove") {
      if (command[5]) return Hutao.World.wrongCommand(player, command, 5)
      if (!Object.keys(setting.default.data.nameTag.structure.custom).includes(currentPlayer.id)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).thePlayerHasNoStructure)

      let config = Hutao.Database.get("db")

      delete config.data.nameTag.structure.custom[currentPlayer.id]

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).removeSuccessfully)
    } else if (command[4] == "view") {
      if (command[5]) return Hutao.World.wrongCommand(player, command, 5)
      if (!Object.keys(setting.default.data.nameTag.structure.custom).includes(currentPlayer.id)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).thePlayerHasNoStructure)

      Hutao.World.log([
        `§7=========================`,
        `§e${Hutao.Player.getLanguage(player).project} §7▶ §6${Hutao.Player.getLanguage(player).other}`,
        ``,
        `§e${currentPlayer.name} §7▶ §r${setting.default.data.nameTag.structure.custom[currentPlayer.id]}`,
        `§7=========================`
      ].join("\n§r"), player)
    } else if (command[4] == undefined) {
      Hutao.World.showHelp(player,
        [`other ${currentPlayer.name} §dremove`, Hutao.Player.getLanguage(player).commandChatFormatStructureRemoveOtherPlayer.replaceAll("{player}", currentPlayer.name)],
        [`other ${currentPlayer.name} §dset`, Hutao.Player.getLanguage(player).commandChatFormatStructureOtherPlayer.replaceAll("{player}", currentPlayer.name)],
        [`other ${currentPlayer.name} §dview`, Hutao.Player.getLanguage(player).commandView],
      )
    } else {
      Hutao.World.wrongCommand(player, command, 4)
    }
  }
}