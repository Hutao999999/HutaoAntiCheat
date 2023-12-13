import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { banItem } from "./itemList/banItem"
import { kickItem } from "./itemList/kickItem"
import { tempkickItem } from "./itemList/tempkick"
import * as setting from "../../config"

export const itemList = (player, command) => {
  if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().itemList(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenItemListMenu)
  } else if (command[2] == "ban") {
    banItem(player, command)
  } else if (command[2] == "kick") {
    kickItem(player, command)
  } else if (command[2] == "tempkick") {
    tempkickItem(player, command)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-list §dban`, Hutao.Player.getLanguage(player).commandAntiCheatItemListBanSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-list §dkick`, Hutao.Player.getLanguage(player).commandAntiCheatItemListKickSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-list §dopen`, Hutao.Player.getLanguage(player).commandOpenItemListMenu],
      [`${setting.default.data.commands.normalPrefix}anti-cheat item-list §dtempkick`, Hutao.Player.getLanguage(player).commandAntiCheatItemListTempkickSetting],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}