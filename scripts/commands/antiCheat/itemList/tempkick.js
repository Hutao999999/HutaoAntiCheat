import { Hutao } from "../../../lib/import"
import { AntiCheat } from "../../../menu/adminMenu/antiCheat"
import * as setting from "../../../config"

export const tempkickItem = (player, command) => {
  if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new AntiCheat().tempkickItem(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenItemListTempKickMenu)
  } else if (command[3] == "add") {
    if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

    if (command[4] != undefined) {
      let config = Hutao.Database.get("db")

      if (setting.default.data.antiCheat.itemList.includes(command[4].trim())) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheItem)

      config.data.antiCheat.itemList.push(command[4].trim())

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).addSuccessfully)
    } else {
      Hutao.World.showHelp(player,
        [`tempkick add §d<Entity>`, Hutao.Player.getLanguage(player).commandAntiCheatItemListTempKickAddSetting]
      )
    }
  } else if (command[3] == "remove") {
    if (command[5]) return Hutao.World.wrongCommand(player, command, 5)

    if (command[4] != undefined) {
      let config = Hutao.Database.get("db")

      if (!setting.default.data.antiCheat.itemList.includes(command[4].trim())) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).notItemInTheList)

      config.data.antiCheat.itemList.splice(config.data.antiCheat.itemList.indexOf(command[4].trim()), 1)

      Hutao.Database.set("db", config)
      Hutao.World.success(player, Hutao.Player.getLanguage(player).removeSuccessfully)
    } else {
      Hutao.World.showHelp(player,
        [`tempkick remove §d<Entity>`, Hutao.Player.getLanguage(player).commandAntiCheatItemListTempKickRemoveSetting]
      )
    }
  } else if (command[3] == "view") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    const items = setting.default.data.antiCheat.itemList.tempkick

    const messages = [
      "§一§7=========================",
      `§d${Hutao.Player.getLanguage(player).itemListTempkickList}`,
      ``
    ]

    items.forEach(item => messages.push(`§e${item}`))
    messages.push(`§一§7=========================`)

    Hutao.World.log(messages.join("\n§r"), player)
  } else if (command[3] == undefined) {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    Hutao.World.showHelp(player,
      [`item-list tempkick §dadd`, Hutao.Player.getLanguage(player).commandAntiCheatItemListTempKickAddSetting],
      [`item-list tempkick §dopen`, Hutao.Player.getLanguage(player).commandOpenItemListTempkickMenu],
      [`item-list tempkick §dremove`, Hutao.Player.getLanguage(player).commandAntiCheatItemListTempKickRemoveSetting],
      [`item-list tempkick §dview`, Hutao.Player.getLanguage(player).commandView],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}