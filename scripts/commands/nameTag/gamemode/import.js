import { Hutao } from "../../../lib/import"
import { NameTag } from "../../../menu/adminMenu/nameTag"
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

    new NameTag().gamemode(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameTagFormatGamemodeMenu)
  } else if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`format gamemode §dadventure`, Hutao.Player.getLanguage(player).commandNameTagGamemodeAdventure],
      [`format gamemode §dcreative`, Hutao.Player.getLanguage(player).commandNameTagGamemodeCreative],
      [`format gamemode §dopen`, Hutao.Player.getLanguage(player).commandOpenNameTagFormatGamemodeMenu],
      [`format gamemode §dother`, Hutao.Player.getLanguage(player).commandNameTagGamemodeOther],
      [`format gamemode §dspectator`, Hutao.Player.getLanguage(player).commandNameTagGamemodeSpectator],
      [`format gamemode §dsurvival`, Hutao.Player.getLanguage(player).commandNameTagGamemodeSurvival],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}