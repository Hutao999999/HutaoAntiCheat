import { configCache } from "../../../configCache"
import { Hutao } from "../../../lib/import"
import { AntiCheat } from "../../../menu/adminMenu/antiCheat"
import * as setting from "../../../config"

export const autoArmorD = (player, command) => {
  if (command[3] == undefined) {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    Hutao.World.showHelp(player,
      [`auto-armor d §dflags`, Hutao.Player.getLanguage(player).commandFlags],
      [`auto-armor d §dopen`, Hutao.Player.getLanguage(player).commandOpenAutoArmorDMenu],
      [`auto-armor d §dpunishment`, Hutao.Player.getLanguage(player).commandPunishment],
      [`auto-armor d §dreset`, Hutao.Player.getLanguage(player).commandReset],
      [`auto-armor d §dstate`, Hutao.Player.getLanguage(player).commandState],
      [`auto-armor d §dview`, Hutao.Player.getLanguage(player).commandView]
    )
  } else if (command[3] == "state") {
    if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

    if (command[4] != undefined) {
      let config = Hutao.Database.get("db")

      if (command[4] == "true") {
        config.data.antiCheat.autoArmorD.state = true
      } else if (command[4] == "false") {
        config.data.antiCheat.autoArmorD.state = false
      } else {
        return Hutao.World.wrongCommand(player, command, 4)
      }

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
    } else {
      Hutao.World.showHelp(player,
        [`d state §d<Boolean>`, Hutao.Player.getLanguage(player).commandState],
      )
    }
  } else if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new AntiCheat().autoArmorD(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAutoArmorDMenu)
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

      config.data.antiCheat.autoArmorD.flags = Math.floor(Number(command[4]))

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
    } else {
      Hutao.World.showHelp(player,
        [`d flags §d<Number>`, Hutao.Player.getLanguage(player).commandFlags],
      )
    }
  } else if (command[3] == "punishment") {
    if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

    if (command[4] != undefined) {
      if (Hutao.Punishment.getAll().includes(command[4])) {
        let config = Hutao.Database.get("db")

        config.data.antiCheat.autoArmorD.punishment = command[4]

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
      } else {
        Hutao.World.wrongCommand(player, command, 4)
      }
    } else {
      Hutao.World.showHelp(player,
        [`d punishment §d${Hutao.Punishment.getText()}`, Hutao.Player.getLanguage(player).commandPunishment]
      )
    }
  } else if (command[3] == "view") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    Hutao.World.log([
      `§7=========================`,
      `§e${Hutao.Player.getLanguage(player).project} §7▶ §6AutoArmor/D`,
      ``,
      `§e${Hutao.Player.getLanguage(player).limitOfFlags} §7▶ §6${setting.default.data.antiCheat.autoArmorD.flags}`,
      `§e${Hutao.Player.getLanguage(player).punishment} §7▶ §6${Hutao.Player.getLanguage(player)[setting.default.data.antiCheat.autoArmorD.punishment]}`,
      `§e${Hutao.Player.getLanguage(player).state} §7▶ §6${setting.default.data.antiCheat.autoArmorD.state ? `§a${Hutao.Player.getLanguage(player).enabled}` : `§c${Hutao.Player.getLanguage(player).disabled}`}`,
      `§7=========================`,
    ].join("\n§r"), player)
  } else if (command[3] == "reset") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    let config = Hutao.Database.get("db")

    config.data.antiCheat.autoArmorD = configCache.data.antiCheat.autoArmorD

    Hutao.Database.set("db", config)
    Hutao.World.success(player, Hutao.Player.getLanguage(player).resetSuccessfully)
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}