import { Hutao } from "../../../lib/import"
import { ChatFormat } from "../../../menu/adminMenu/chatFormat"
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

    new ChatFormat().dimension(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenChatFormatFormatDimensionMenu)
  } else if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`format dimension §doverworld`, Hutao.Player.getLanguage(player).commandChatFormatDimensionOverworld],
      [`format dimension §dnether`, Hutao.Player.getLanguage(player).commandChatFormatDimensionNether],
      [`format dimension §dthe-end`, Hutao.Player.getLanguage(player).commandChatFormatDimensionTheEnd],
      [`format dimension §dother`, Hutao.Player.getLanguage(player).commandChatFormatDimensionOther],
      [`format dimension §dopen`, Hutao.Player.getLanguage(player).commandOpenChatFormatFormatDimensionMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}