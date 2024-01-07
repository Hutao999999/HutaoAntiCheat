import { Hutao } from "../../lib/import"
import { NameTag } from "../../menu/adminMenu/nameTag"
import { other } from "./structure/other"
import { admin } from "./structure/admin"
import { builder } from "./structure/builder"
import { member } from "./structure/member"
import { owner } from "./structure/owner"
import * as setting from "../../config"

export const structure = (player, command) => {
  if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new NameTag().structure(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameTagStructure)
  } else if (command[2] == "owner") {
    owner(player, command)
  } else if (command[2] == "admin") {
    admin(player, command)
  } else if (command[2] == "builder") {
    builder(player, command)
  } else if (command[2] == "member") {
    member(player, command)
  } else if (command[2] == "other") {
    other(player, command)
  } else if (command[2] == undefined) {
    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}name-tag structure §dadmin`, Hutao.Player.getLanguage(player).commandNameTagStructureAdmin],
      [`${setting.default.data.commands.normalPrefix}name-tag structure §dbuilder`, Hutao.Player.getLanguage(player).commandNameTagStructureBuilder],
      [`${setting.default.data.commands.normalPrefix}name-tag structure §dmember`, Hutao.Player.getLanguage(player).commandNameTagStructureMember],
      [`${setting.default.data.commands.normalPrefix}name-tag structure §dopen`, Hutao.Player.getLanguage(player).commandOpenNameTagStructure],
      [`${setting.default.data.commands.normalPrefix}name-tag structure §dother`, Hutao.Player.getLanguage(player).commandNameTagStructureOther],
      [`${setting.default.data.commands.normalPrefix}name-tag structure §downer`, Hutao.Player.getLanguage(player).commandNameTagStructureOwner],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}