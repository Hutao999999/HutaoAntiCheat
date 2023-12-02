import * as Minecraft from "@minecraft/server"
import * as setting from "../config"
import { Scoreboard } from "./Scoreboard"

export class Database {
  static has() {
    if (Minecraft.world.scoreboard.getObjective(setting.database)) {
      return true
    } else {
      return false
    }
  }

  static set(key, value) {
    let json = {}
    json[key] = value

    if (!this.has()) return

    if (
      key == undefined ||
      key.trim() == ""
    ) return console.warn("§l§c▶ §r§7Must enter the key")

    if (value == undefined) return console.warn("§l§c▶ §r§7Must enter the value")

    const item = [...Minecraft.world.scoreboard.getObjective(setting.database).getScores()]
      .map(item => item.participant.displayName)
      .filter(item =>
        item.startsWith(`{\"${key}\":`) &&
        item.endsWith("}")
      )

    new Scoreboard(setting.database).resetScores(item[0])
    new Scoreboard(setting.database).setScores(json, Math.floor(Math.random() * 4294967295) - 2147483648)
  }

  static get(key) {
    if (!this.has()) return

    if (
      key == undefined ||
      key.trim() == ""
    ) return console.warn("§l§c▶ §r§7Must enter the key")

    const item = [...Minecraft.world.scoreboard.getObjective(setting.database).getScores()]
      .map(item => item.participant.displayName)
      .filter(item =>
        item.startsWith(`{\"${key}\":`) &&
        item.endsWith("}")
      )

    if (item.length > 0) {
      return JSON.parse(`${item[0]}`)[key]
    } else {
      return undefined
    }
  }
}