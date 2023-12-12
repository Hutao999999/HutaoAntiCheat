import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { invalidSprintA } from "./invalidSprint/invalidSprintA"
import { invalidSprintB } from "./invalidSprint/invalidSprintB"
import { invalidSprintC } from "./invalidSprint/invalidSprintC"

export const invalidSprint = (player, command) => {
  if (command[2] == "a") {
    invalidSprintA(player, command)
  } else if (command[2] == "b") {
    invalidSprintB(player, command)
  } else if (command[2] == "c") {
    invalidSprintC(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().invalidSprintSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenInvalidSprintMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat invalid-sprint §da`, Hutao.Player.getLanguage(player).commandAntiCheatInvalidSprintASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat invalid-sprint §db`, Hutao.Player.getLanguage(player).commandAntiCheatInvalidSprintBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat invalid-sprint §dc`, Hutao.Player.getLanguage(player).commandAntiCheatInvalidSprintCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat invalid-sprint §dopen`, Hutao.Player.getLanguage(player).commandOpenInvalidSprintMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}