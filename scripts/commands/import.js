import * as setting from "../config"
import antiCheatCommand from "./antiCheat"
import settingCommand from "./setting"
import languageCommand from "./language"
import { Hutao } from "../lib/import"
import chatFormat from "./chatFormat"

export const command = (player, command) => {
  const commands = {
    "anti-cheat": {
      name: "antiCheat",
      permission: "admin",
      state: true,
    },
    "chat-format": {
      name: "chatFormat",
      permission: "admin",
      state: true
    },
    "language": {
      name: "language",
      permission: "all",
      state: true
    },
    "setting": {
      name: "setting",
      permission: "all",
      state: true
    },
  }

  if (Object.keys(commands).includes(command[0])) {
    if (commands[command[0]].state) {
      if (commands[command[0]].permission == "admin") {
        if (Hutao.Player.isAdmin(player)) {
          functions[commands[command[0]].name].function(player, command)
        } else {
          return Hutao.World.wrongCommand(player, command, 0)
        }
      } else {
        functions[commands[command[0]].name].function(player, command)
      }
    } else {
      return Hutao.World.wrongCommand(player, command, 0)
    }
  } else {
    return Hutao.World.wrongCommand(player, command, 0)
  }
}

const functions = {
  antiCheat: antiCheatCommand,
  chatFormat: chatFormat,
  language: languageCommand,
  setting: settingCommand,
}