import { Hutao } from "../../lib/import"
import * as setting from "../../config"
import { NameTag } from "../../menu/adminMenu/nameTag"
import { dimension } from "./dimension/import"
import { gamemode } from "./gamemode/import"
import { health } from "./health/import"
import { level } from "./level/import"
import { location } from "./location/import"
import { rotation } from "./rotation/import"
import { time } from "./time/import"
import { status } from "./status/import"
import { team } from "./team/import"

export const format = (player, command) => {
  if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new NameTag().format(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameTagFormatMenu)
  } else if (command[2] == "dimension") {
    dimension(player, command)
  } else if (command[2] == "gamemode") {
    gamemode(player, command)
  } else if (command[2] == "health") {
    health(player, command)
  } else if (command[2] == "level") {
    level(player, command)
  } else if (command[2] == "location") {
    location(player, command)
  } else if (command[2] == "rotation") {
    rotation(player, command)
  } else if (command[2] == "time") {
    time(player, command)
  } else if (command[2] == "status") {
    status(player, command)
  } else if (command[2] == "team") {
    team(player, command)
  } else if (command[2] == undefined) {
    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}name-tag format §ddimension`, Hutao.Player.getLanguage(player).commandNameTagDimension],
      [`${setting.default.data.commands.normalPrefix}name-tag format §dgamemode`, Hutao.Player.getLanguage(player).commandNameTagGamemode],
      [`${setting.default.data.commands.normalPrefix}name-tag format §dhealth`, Hutao.Player.getLanguage(player).commandNameTagHealth],
      [`${setting.default.data.commands.normalPrefix}name-tag format §dlevel`, Hutao.Player.getLanguage(player).commandNameTagLevel],
      [`${setting.default.data.commands.normalPrefix}name-tag format §dlocation`, Hutao.Player.getLanguage(player).commandNameTagLocation],
      [`${setting.default.data.commands.normalPrefix}name-tag format §dopen`, Hutao.Player.getLanguage(player).commandOpenNameTagFormatMenu],
      [`${setting.default.data.commands.normalPrefix}name-tag format §drotation`, Hutao.Player.getLanguage(player).commandNameTagRotation],
      [`${setting.default.data.commands.normalPrefix}name-tag format §dstatus`, Hutao.Player.getLanguage(player).commandNameTagStatus],
      [`${setting.default.data.commands.normalPrefix}name-tag format §dteam`, Hutao.Player.getLanguage(player).commandNameTagTeam],
      [`${setting.default.data.commands.normalPrefix}name-tag format §dtime`, Hutao.Player.getLanguage(player).commandNameTagTime],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}