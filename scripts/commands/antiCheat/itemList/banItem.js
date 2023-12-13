import { Hutao } from "../../../lib/import"
import { AntiCheat } from "../../../menu/adminMenu/antiCheat"
import * as setting from "../../../config"

export const banItem = (player, command) => {
  if (command[3] == "open") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    new AntiCheat().banItem(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenItemListBanMenu)
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
        [`ban add §d<Entity>`, Hutao.Player.getLanguage(player).commandAntiCheatItemListBanAddSetting]
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
        [`ban remove §d<Entity>`, Hutao.Player.getLanguage(player).commandAntiCheatItemListBanRemoveSetting]
      )
    }
  } else if (command[3] == "view") {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    const items = setting.default.data.antiCheat.itemList.ban

    const messages = [
      "§一§7=========================",
      `§d${Hutao.Player.getLanguage(player).itemListBanList}`,
      ``
    ]

    items.forEach(item => messages.push(`§e${item}`))
    messages.push(`§一§7=========================`)

    Hutao.World.log(messages.join("\n§r"), player)
  } else if (command[3] == undefined) {
    if (command[4]) return Hutao.World.wrongCommand(player, command, 4)

    Hutao.World.showHelp(player,
      [`item-list ban §dadd`, Hutao.Player.getLanguage(player).commandAntiCheatItemListBanAddSetting],
      [`item-list ban §dopen`, Hutao.Player.getLanguage(player).commandOpenItemListBanMenu],
      [`item-list ban §dremove`, Hutao.Player.getLanguage(player).commandAntiCheatItemListBanRemoveSetting],
      [`item-list ban §dview`, Hutao.Player.getLanguage(player).commandView],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 3)
  }
}