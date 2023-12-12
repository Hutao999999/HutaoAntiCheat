import { configCache } from "../../../configCache"
import { Hutao } from "../../../lib/import"
import { AntiCheat } from "../../../menu/adminMenu/antiCheat"
import * as setting from "../../../config"

export const fastThrowA = (player, command) => {
  if (command[3] == undefined) {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    Hutao.World.showHelp(player,
      [`fast-throw a §dflags`, Hutao.Player.getLanguage(player).commandFlags],
      [`fast-throw a §dopen`, Hutao.Player.getLanguage(player).commandOpenFastThrowAMenu],
      [`fast-throw a §dpunishment`, Hutao.Player.getLanguage(player).commandPunishment],
      [`fast-throw a §dreset`, Hutao.Player.getLanguage(player).commandReset],
      [`fast-throw a §dstate`, Hutao.Player.getLanguage(player).commandState],
      [`fast-throw a §dview`, Hutao.Player.getLanguage(player).commandView]
    )
  } else if (command[3] == "state") {
    if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

    if (command[4] != undefined) {
      let config = Hutao.Database.get("db")

      if (command[4] == "true") {
        config.data.antiCheat.fastThrowA.state = true
      } else if (command[4] == "false") {
        config.data.antiCheat.fastThrowA.state = false
      } else {
        return Hutao.World.wrongCommand(player, command, 4)
      }

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
    } else {
      Hutao.World.showHelp(player,
        [`a state §d<Boolean>`, Hutao.Player.getLanguage(player).commandState],
      )
    }
  } else if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new AntiCheat().fastThrowA(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenFastThrowAMenu)
  } else if (command[3] == "flags") {
    if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

    if (command[4] != undefined) {
      const validNumber = (number) => {
        if (number.trim() == "") return true
        if (isNaN(Number(number))) return true
        if (number < 1) return true
        return false
      }

      if (validNumber(command[4])) return Hutao.World.wrongCommand(player, command, 4)

      let config = Hutao.Database.get("db")

      config.data.antiCheat.fastThrowA.flags = Math.floor(Number(command[4]))

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
    } else {
      Hutao.World.showHelp(player,
        [`a flags §d<Number>`, Hutao.Player.getLanguage(player).commandFlags],
      )
    }
  } else if (command[3] == "punishment") {
    if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

    if (command[4] != undefined) {
      if (Hutao.Punishment.getAll().includes(command[4])) {
        let config = Hutao.Database.get("db")

        config.data.antiCheat.fastThrowA.punishment = command[4]

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
      } else {
        Hutao.World.wrongCommand(player, command, 4)
      }
    } else {
      Hutao.World.showHelp(player,
        [`a punishment §d${Hutao.Punishment.getText()}`, Hutao.Player.getLanguage(player).commandPunishment]
      )
    }
  } else if (command[3] == "view") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    Hutao.World.log([
      `§7=========================`,
      `§e${Hutao.Player.getLanguage(player).project} §7▶ §6FastThrow/A`,
      ``,
      `§e${Hutao.Player.getLanguage(player).limitOfFlags} §7▶ §6${setting.default.data.antiCheat.fastThrowA.flags}`,
      `§e${Hutao.Player.getLanguage(player).punishment} §7▶ §6${Hutao.Player.getLanguage(player)[setting.default.data.antiCheat.fastThrowA.punishment]}`,
      `§e${Hutao.Player.getLanguage(player).state} §7▶ §6${setting.default.data.antiCheat.fastThrowA.state ? `§a${Hutao.Player.getLanguage(player).enabled}` : `§c${Hutao.Player.getLanguage(player).disabled}`}`,
      `§7=========================`,
    ].join("\n§r"), player)
  } else if (command[3] == "reset") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    let config = Hutao.Database.get("db")

    config.data.antiCheat.fastThrowA = configCache.data.antiCheat.fastThrowA

    Hutao.Database.set("db", config)
    Hutao.World.success(player, Hutao.Player.getLanguage(player).resetSuccessfully)
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}