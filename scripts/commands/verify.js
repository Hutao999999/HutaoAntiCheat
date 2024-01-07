import * as setting from "../config"
import { Hutao } from "../lib/import"
import { Verify } from "../menu/verify"

export default {
  name: "verify",
  description: "commandVerifyDescription",
  function(player, command) {
    if (command[1]) return Hutao.World.wrongCommand(player, command, 1)

    if (!setting.default.data.players[player.id].verify) {
      new Verify().open(player)

      Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenVerifyMenu)
    }
  }
}