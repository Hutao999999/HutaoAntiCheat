import * as Minecraft from "@minecraft/server"
import * as setting from "../config"
import { Tools } from "./Tools"
import { Player } from "./Player"

let deltaTime = []
let ms
let mspt = 0

export class World {
  static cmd(commands, dimension = "overworld") {
    if (typeof commands == "object") {
      for (const command of commands) {
        Minecraft.world.getDimension(dimension).runCommand(command)
      }
    } else {
      Minecraft.world.getDimension(dimension).runCommand(commands)
    }
  }

  static showHelp(player, ...helps) {
    let messages = [
      "§一§7========================="
    ]

    for (const help of helps) {
      messages.push(`§一§7${help[0]} §r§7- ${help[1]}`)
    }

    messages.push("§一§7=========================")
    this.log(messages.join("\n"), player)
  }

  static log(message, player) {
    if (player) {
      player.sendMessage(String(message))
    } else {
      Minecraft.world.sendMessage(String(message))
    }
  }

  static getAllPlayers() {
    const result = Tools.repair([...Minecraft.world.getPlayers()].map(player => player.name))

    for (let i = 0; i < result.length; i++) {
      result[i] = Minecraft.world.getPlayers({
        name: result[i]
      })[0]
    }

    return result
  }

  static getNowTime(add) {
    const time = new Date()

    let months = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    }

    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let day = time.getDay()
    let hour = time.getHours() + add
    let minute = time.getMinutes()
    let second = time.getSeconds()
    let millisecond = time.getMilliseconds()

    if (
      (year % 400 == 0) ||
      (
        year % 4 == 0 &&
        year % 100 != 0
      )
    ) {
      months[2] = 29
    }

    if (hour > 23) {
      date += 1
      day += 1
      hour -= 16
    }

    day = day % 7

    if (date > months[month]) {
      month += 1
      date -= months[month]
    }

    if (month > 12) {
      year += 1
      month -= 12
    }

    if (
      (year % 400 == 0) ||
      (
        year % 4 == 0 &&
        year % 100 != 0
      )
    ) {
      months[2] = 29
    }

    month = Tools.betterNumberToTen(month)
    date = Tools.betterNumberToTen(date)
    hour = Tools.betterNumberToTen(hour)
    minute = Tools.betterNumberToTen(minute)
    second = Tools.betterNumberToTen(second)
    millisecond = Tools.betterNumberToHundred(millisecond)

    return {
      year: year,
      month: month,
      date: date,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      millisecond: millisecond
    }
  }

  static getCommand(message, toLowerCase = true, type = "normal") {
    const get = (string) => {
      let strings
      let output = []
      let quote = false

      for (let i = 0; i < string.length; i++) {
        let has = false

        if (string.charAt(i) == "\"") {
          if (quote == true) {
            quote = false

            if (strings) output.push(strings)

            strings = undefined
            has = true
          } else if (quote == false) {
            quote = true
          }
        } else if (string.charAt(i) == " ") {
          if (quote == false) {
            if (strings) output.push(strings)

            has = true
            strings = undefined
          } else if (quote == true) {
            strings ??= ""
            strings += string.charAt(i)
          }
        } else {
          strings ??= ""
          strings += string.charAt(i)
        }

        if (!has) {
          if (i == string.length - 1) {
            if (strings) output.push(strings)
          }
        }
      }

      return output
    }

    let item = message.trim()

    if (type == "normal") {
      if (item.startsWith(setting.default.data.commands.normalPrefix)) {
        item = item.slice(setting.default.data.commands.normalPrefix.length)
      }
    } else if (type == "worldedit") {
      if (item.startsWith(setting.default.data.commands.worldEditPrefix)) {
        item = item.slice(setting.default.data.commands.worldEditPrefix.length)
      }
    }

    if (toLowerCase) item = item.toLowerCase()

    const output = get(item)
    return output ?? undefined
  }

  static getAllCommand(message) {
    return message.trim()
  }

  static wrongCommand(player, message, index = 0) {
    message = message.join(" ")
    let allCommand = message

    const change = this.getCommand(message)[index]
    allCommand = allCommand.split(/ +/g)

    if (allCommand[index] == change) {
      allCommand[index] = `§c>>${change ?? ""}§r§c<<`
    }

    this.log(`§l§c▶§r §c${Player.getLanguage(player).unknownCommand}\n §7${allCommand.join(" ")}`, player)
  }

  static saveTps(tps) {
    deltaTime.push(tps)

    if (deltaTime.lenght > 20) deltaTime.shift()
  }

  static saveMS(tick) {
    ms = tick
  }

  static saveMSPT(ms) {
    mspt = ms
  }

  static getMS() {
    return ms
  }

  static getMSPT() {
    return Date.now() - mspt
  }

  static getTps() {
    return Math.min(
      Math.floor(Tools.average(deltaTime.map(n => 1000 / n))),
      20
    )
  }

  static success(player, message) {
    this.log(`§l§a▶ §r§7${message}`, player)
    player.playSound(`random.orb`)
  }

  static wrong(player, message) {
    this.log(`§l§c▶ §r§7${message}`, player)
    player.playSound(`note.bass`)
  }

  static runCommand(player, message) {
    this.log(`§l§d▶ §r§7${message}`, player)
    player.playSound(`note.pling`)
  }
}