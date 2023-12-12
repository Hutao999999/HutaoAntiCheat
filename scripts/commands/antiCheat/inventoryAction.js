import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { inventoryActionA } from "./inventoryAction/inventoryActionA"
import { inventoryActionB } from "./inventoryAction/inventoryActionB"
import { inventoryActionC } from "./inventoryAction/inventoryActionC"
import { inventoryActionD } from "./inventoryAction/inventoryActionD"
import { inventoryActionE } from "./inventoryAction/inventoryActionE"
import { inventoryActionF } from "./inventoryAction/inventoryActionF"

export const inventoryAction = (player, command) => {
  if (command[2] == "a") {
    inventoryActionA(player, command)
  } else if (command[2] == "b") {
    inventoryActionB(player, command)
  } else if (command[2] == "c") {
    inventoryActionC(player, command)
  } else if (command[2] == "d") {
    inventoryActionD(player, command)
  } else if (command[2] == "e") {
    inventoryActionE(player, command)
  } else if (command[2] == "f") {
    inventoryActionF(player, command)
  } else if (command[2] == "g") {
    inventoryActionG(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().inventoryActionSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenInventoryActionMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat inventory-action §da`, Hutao.Player.getLanguage(player).commandAntiCheatInventoryActionASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat inventory-action §db`, Hutao.Player.getLanguage(player).commandAntiCheatInventoryActionBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat inventory-action §dc`, Hutao.Player.getLanguage(player).commandAntiCheatInventoryActionCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat inventory-action §dd`, Hutao.Player.getLanguage(player).commandAntiCheatInventoryActionDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat inventory-action §de`, Hutao.Player.getLanguage(player).commandAntiCheatInventoryActionESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat inventory-action §df`, Hutao.Player.getLanguage(player).commandAntiCheatInventoryActionFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat inventory-action §dopen`, Hutao.Player.getLanguage(player).commandOpenInventoryActionMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}