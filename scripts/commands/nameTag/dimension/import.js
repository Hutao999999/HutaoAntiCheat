import { Hutao } from "../../../lib/import"
import { NameTag } from "../../../menu/adminMenu/nameTag"
import { nether } from "./nether"
import { other } from "./other"
import { overworld } from "./overworld"
import { theEnd } from "./theEnd"

export const dimension = (player, command) => {
  if (command[3] == "overworld") {
    overworld(player, command)
  } else if (command[3] == "nether") {
    nether(player, command)
  } else if (command[3] == "the-end") {
    theEnd(player, command)
  } else if (command[3] == "other") {
    other(player, command)
  } else if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new NameTag().dimension(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameTagFormatDimensionMenu)
  } else if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`format dimension §dopen`, Hutao.Player.getLanguage(player).commandOpenNameTagFormatDimensionMenu],
      [`format dimension §dother`, Hutao.Player.getLanguage(player).commandNameTagDimensionOther],
      [`format dimension §doverworld`, Hutao.Player.getLanguage(player).commandNameTagDimensionOverworld],
      [`format dimension §dnether`, Hutao.Player.getLanguage(player).commandNameTagDimensionNether],
      [`format dimension §dthe-end`, Hutao.Player.getLanguage(player).commandNameTagDimensionTheEnd],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}