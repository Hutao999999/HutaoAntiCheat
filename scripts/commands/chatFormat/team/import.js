import { Hutao } from "../../../lib/import"
import { ChatFormat } from "../../../menu/adminMenu/chatFormat"
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

    new ChatFormat().team(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenChatFormatFormatTeamMenu)
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
      [`format team §daqua`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamAqua],
      [`format team §dblack`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamBlack],
      [`format team §dblue`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamBlue],
      [`format team §dgray`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamGray],
      [`format team §dgreen`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamGreen],
      [`format team §dopen`, Hutao.Player.getLanguage(player).commandOpenChatFormatFormatTeamMenu],
      [`format team §dorange`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamOrange],
      [`format team §dother`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamOther],
      [`format team §dpurple`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamPurple],
      [`format team §dred`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamRed],
      [`format team §dwhite`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamWhite],
      [`format team §dyellow`, Hutao.Player.getLanguage(player).commandChatFormatFormatTeamYellow],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}