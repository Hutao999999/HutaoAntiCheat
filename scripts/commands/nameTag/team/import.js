import { Hutao } from "../../../lib/import"
import { NameTag } from "../../../menu/adminMenu/nameTag"
import { aqua } from "./aqua"
import { black } from "./black"
import { blue } from "./blue"
import { gray } from "./gray"
import { green } from "./green"
import { orange } from "./orange"
import { other } from "./other"
import { purple } from "./purple"
import { red } from "./red"
import { white } from "./white"
import { yellow } from "./yellow"

export const team = (player, command) => {
  if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new NameTag().team(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameTagFormatTeamMenu)
  } else if (command[3] == "red") {
    red(player, command)
  } else if (command[3] == "aqua") {
    aqua(player, command)
  } else if (command[3] == "black") {
    black(player, command)
  } else if (command[3] == "blue") {
    blue(player, command)
  } else if (command[3] == "gray") {
    gray(player, command)
  } else if (command[3] == "green") {
    green(player, command)
  } else if (command[3] == "orange") {
    orange(player, command)
  } else if (command[3] == "other") {
    other(player, command)
  } else if (command[3] == "purple") {
    purple(player, command)
  } else if (command[3] == "white") {
    white(player, command)
  } else if (command[3] == "yellow") {
    yellow(player, command)
  } else if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`format team §daqua`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamAqua],
      [`format team §dblack`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamBlack],
      [`format team §dblue`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamBlue],
      [`format team §dgray`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamGray],
      [`format team §dgreen`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamGreen],
      [`format team §dopen`, Hutao.Player.getLanguage(player).commandOpenNameTagFormatTeamMenu],
      [`format team §dorange`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamOrange],
      [`format team §dother`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamOther],
      [`format team §dpurple`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamPurple],
      [`format team §dred`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamRed],
      [`format team §dwhite`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamWhite],
      [`format team §dyellow`, Hutao.Player.getLanguage(player).commandNameTagFormatTeamYellow],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}