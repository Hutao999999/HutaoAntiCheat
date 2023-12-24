import { Hutao } from "../../../lib/import"
import { ChatFormat } from "../../../menu/adminMenu/chatFormat"
import { adventure } from "./adventure"
import { creative } from "./creative"
import { other } from "./other"
import { spectator } from "./spectator"
import { survival } from "./survival"

export const gamemode = (player, command) => {
  if (command[3] == "survival") {
    survival(player, command)
  } else if (command[3] == "creative") {
    creative(player, command)
  } else if (command[3] == "adventure") {
    adventure(player, command)
  } else if (command[3] == "spectator") {
    spectator(player, command)
  } else if (command[3] == "other") {
    other(player, command)
  } else if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new ChatFormat().gamemode(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenChatFormatFormatGamemodeMenu)
  } else if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`format gamemode §dadventure`, Hutao.Player.getLanguage(player).commandChatFormatGamemodeAdventure],
      [`format gamemode §dcreative`, Hutao.Player.getLanguage(player).commandChatFormatGamemodeCreative],
      [`format gamemode §dopen`, Hutao.Player.getLanguage(player).commandOpenChatFormatFormatGamemodeMenu],
      [`format gamemode §dother`, Hutao.Player.getLanguage(player).commandChatFormatGamemodeOther],
      [`format gamemode §dspectator`, Hutao.Player.getLanguage(player).commandChatFormatGamemodeSpectator],
      [`format gamemode §dsurvival`, Hutao.Player.getLanguage(player).commandChatFormatGamemodeSurvival],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}