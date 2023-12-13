import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import * as setting from "../../config"

export const entityList = (player, command) => {
  if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().entityList(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenEntityListMenu)
  } else if (command[2] == "add") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    if (command[3] != undefined) {
      let config = Hutao.Database.get("db")

      if (setting.default.data.antiCheat.entityList.includes(command[3].trim())) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheEntity)

      config.data.antiCheat.entityList.push(command[3].trim())

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).addSuccessfully)
    } else {
      Hutao.World.showHelp(player,
        [`entity-list add §d<Entity>`, Hutao.Player.getLanguage(player).commandAntiCheatEntityListAddSetting]
      )
    }
  } else if (command[2] == "remove") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    if (command[3] != undefined) {
      let config = Hutao.Database.get("db")

      if (!setting.default.data.antiCheat.entityList.includes(command[3].trim())) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).notEntityInTheList)

      config.data.antiCheat.entityList.splice(config.data.antiCheat.entityList.indexOf(command[3].trim()), 1)

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).removeSuccessfully)
    } else {
      Hutao.World.showHelp(player,
        [`entity-list remove §d<Entity>`, Hutao.Player.getLanguage(player).commandAntiCheatEntityListRemoveSetting]
      )
    }
  } else if (command[2] == "view") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    const entities = setting.default.data.antiCheat.entityList

    const messages = [
      "§一§7=========================",
      `§d${Hutao.Player.getLanguage(player).entityList}`,
      ``
    ]

    entities.forEach(entity => messages.push(`§e${entity}`))
    messages.push(`§一§7=========================`)

    Hutao.World.log(messages.join("\n§r"), player)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat entity-list §dadd`, Hutao.Player.getLanguage(player).commandAntiCheatEntityListAddSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat entity-list §dopen`, Hutao.Player.getLanguage(player).commandOpenEntityListMenu],
      [`${setting.default.data.commands.normalPrefix}anti-cheat entity-list §dremove`, Hutao.Player.getLanguage(player).commandAntiCheatEntityListRemoveSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat entity-list §dview`, Hutao.Player.getLanguage(player).commandView],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}