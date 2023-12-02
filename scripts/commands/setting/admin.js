import * as Minecraft from "@minecraft/server"
import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AdminMenu } from "../../menu/adminMenu"

export const admin = (player, command) => {
  if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

  if (command[2] == "get") {
    const item = new Minecraft.ItemStack(setting.default.data.adminMenu.identifier, 1)
    const container = player.getComponent("inventory").container

    item.setLore([
      setting.default.data.adminMenu.encrypt
    ])

    container.addItem(item)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).getAdminMenuSuccessfully)
  } else if (command[2] == "open") {
    new AdminMenu().open(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAdminMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}setting admin §dget`, Hutao.Player.getLanguage(player).commandGetAdminMenu],
      [`${setting.default.data.commands.normalPrefix}setting admin §dopen`, Hutao.Player.getLanguage(player).commandOpenAdminMenu]
    )
  } else {
    return Hutao.World.wrongCommand(player, command, 2)
  }
}