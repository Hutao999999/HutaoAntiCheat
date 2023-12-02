import * as setting from "../config"
import antiCheatCommand from "./antiCheat"
import settingCommand from "./setting"
import languageCommand from "./language"
import { Hutao } from "../lib/import"

export const command = (player, command) => {
  if (Object.keys(commands).includes(command[0])) {
    if (setting.default.data.commands.commands[commands[command[0]]].state) {
      if (setting.default.data.commands.commands[commands[command[0]]].permission == "admin") {
        if (Hutao.Player.isAdmin(player)) {
          functions[commands[command[0]]].function(player, command)
        } else {
          return Hutao.World.wrongCommand(player, command, 0)
        }
      } else {
        functions[commands[command[0]]].function(player, command)
      }
    } else {
      return Hutao.World.wrongCommand(player, command, 0)
    }
  } else if (command[0] == undefined) {

  } else {
    return Hutao.World.wrongCommand(player, command, 0)
  }
}

const commands = {
  "anti-cheat": "antiCheat",
  "setting": "setting",
  "language": "language"
}

const functions = {
  antiCheat: antiCheatCommand,
  setting: settingCommand,
  language: languageCommand
}