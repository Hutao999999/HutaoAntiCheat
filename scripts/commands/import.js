import * as setting from "../config"
import antiCheatCommand from "./antiCheat"
import settingCommand from "./setting"
import languageCommand from "./language"
import { Hutao } from "../lib/import"
import chatFormat from "./chatFormat"
import nameTag from "./nameTag"
import verifyCommand from "./verify"

export const command = (player, command) => {
  const commands = {
    "anti-cheat": {
      name: "antiCheat",
      permission: "admin",
      state: true,
    },
    "anticheat": {
      name: "antiCheat",
      permission: "admin",
      state: true,
    },
    "ac": {
      name: "antiCheat",
      permission: "admin",
      state: true
    },
    "chat-format": {
      name: "chatFormat",
      permission: "admin",
      state: true
    },
    "chatformat": {
      name: "chatFormat",
      permission: "admin",
      state: true
    },
    "cf": {
      name: "chatFormat",
      permission: "admin",
      state: true
    },
    "language": {
      name: "language",
      permission: "all",
      state: true
    },
    "lang": {
      name: "language",
      permission: "all",
      state: true,
    },
    "name-tag": {
      name: "language",
      permission: "admin",
      state: true,
    },
    "nametag": {
      name: "language",
      permission: "admin",
      state: true,
    },
    "nt": {
      name: "language",
      permission: "admin",
      state: true,
    },
    "setting": {
      name: "setting",
      permission: "all",
      state: true
    },
  }

  if (!setting.default.data.players[player.id].verified) {
    if (
      command[0] == "language" ||
      command[0] == "lang"
    ) {
      functions.language.function(player, command)
    } else if (command[0] == "verify") {
      functions.verify.function(player, command)
    } else {
      return Hutao.World.wrongCommand(player, command, 0)
    }
  } else {
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
}

const functions = {
  antiCheat: antiCheatCommand,
  chatFormat: chatFormat,
  language: languageCommand,
  nameTag: nameTag,
  setting: settingCommand,
  verify: verifyCommand
}