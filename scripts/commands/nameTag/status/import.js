import { Hutao } from "../../../lib/import"
import { NameTag } from "../../../menu/adminMenu/nameTag"
import { admin } from "./admin"
import { builder } from "./builder"
import { member } from "./member"
import { owner } from "./owner"

export const status = (player, command) => {
  if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new NameTag().status(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenNameTagFormatStatusMenu)
  } else if (command[3] == "owner") {
    owner(player, command)
  } else if (command[3] == "admin") {
    admin(player, command)
  } else if (command[3] == "builder") {
    builder(player, command)
  } else if (command[3] == "member") {
    member(player, command)
  } else if (command[3] == undefined) {
    Hutao.World.showHelp(player,
      [`format status §dadmin`, Hutao.Player.getLanguage(player).commandNameTagStatusAdmin],
      [`format status §dbuilder`, Hutao.Player.getLanguage(player).commandNameTagStatusBuilder],
      [`format status §dmember`, Hutao.Player.getLanguage(player).commandNameTagStatusMember],
      [`format status §dopen`, Hutao.Player.getLanguage(player).commandOpenNameTagFormatStatusMenu]
      [`format status §downer`, Hutao.Player.getLanguage(player).commandNameTagStatusOwner],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}