import * as setting from "../config"
import { Hutao } from "../lib/import"
import { admin } from "./setting/admin"
import { players } from "./setting/player"

export default {
  name: "setting",
  description: "commandSettingDescription",
  function(player, command) {
    if (command[1] == "admin") {
      if (Hutao.Player.isAdmin(player)) {
        admin(player, command)
      }
    } else if (command[1] == "player") {
      players(player, command)
    } else if (command[1] == undefined) {
      if (command[2]) return Hutao.World.wrongCommand(player, command, 1)

      if (Hutao.Player.isAdmin(player)) {
        Hutao.World.showHelp(player,
          [`${setting.default.data.commands.normalPrefix}setting §dadmin`, Hutao.Player.getLanguage(player).commandAdminMenuSetting],
          [`${setting.default.data.commands.normalPrefix}setting §aplayer`, Hutao.Player.getLanguage(player).commandPlayerMenuSetting]
        )
      } else {
        Hutao.World.showHelp(player,
          [`${setting.default.data.commands.normalPrefix}setting §aplayer`, Hutao.Player.getLanguage(player).commandPlayerMenuSetting]
        )
      }
    } else {
      return Hutao.World.wrongCommand(player, command, 1)
    }
  }
}