import * as setting from "../config"
import { Hutao } from "../lib/import"

export default {
  name: "language",
  description: "commandLanguageDescription",
  function(player, command) {
    if (command[2]) return Hutao.World.wrongCommand(player, command, 2)

    if (command[1] == undefined) {
      if (command[2]) return Hutao.World.wrongCommand(player, command, 2)

      Hutao.World.showHelp(player,
        [`${setting.default.data.commands.normalPrefix}language §ezh-ch`, `更改你的语言成§e简体中文`],
        [`${setting.default.data.commands.normalPrefix}language §een`, `Change your language to §eEnglish`],
        [`${setting.default.data.commands.normalPrefix}language §ezh-tw`, `更改你的語言成§e繁體中文`]
      )
    } else if (command[1] == "en") {
      let config = Hutao.Database.get("db")

      config.data.players[player.id].language = "en"

      Hutao.Database.set("db", config)
      Hutao.World.success(player, `Changed your language successfully`)
    } else if (command[1] == "zh-tw") {
      let config = Hutao.Database.get("db")

      config.data.players[player.id].language = "zh-tw"

      Hutao.Database.set("db", config)
      Hutao.World.success(player, `更改成功`)
    } else if (command[1] == "zh-ch") {
      let config = Hutao.Database.get("db")

      config.data.players[player.id].language = "zh-ch"

      Hutao.Database.set("db", config)
      Hutao.World.success(player, `更改成功`)
    } else {
      Hutao.World.wrongCommand(player, command, 1)
    }
  }
}