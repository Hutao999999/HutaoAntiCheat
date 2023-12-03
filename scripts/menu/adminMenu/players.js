import * as Minecraft from "@minecraft/server"
import * as UI from "@minecraft/server-ui"
import { Hutao } from "../../lib/import"
import { AdminMenu } from "../adminMenu"

export class Players {
  open(player) {
    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)

    const players = Hutao.World.getAllPlayers()

    players.forEach(player => form.button(`${player.name}`, `textures/${player.permission == "owner" ? "ui/store_home_icon" :
      player.permission == "admin" ? "ui/permissions_op_crown" :
        player.permission == "builder" ? "blocks/planks_oak" :
          "ui/permissions_member"
      }`))

    form.button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.open(player)
        }

        if (res.selection == 0) this.open(player)
        if (res.selection - 1 == players.length) new AdminMenu().open(player)

        if (
          res.selection > 0 &&
          res.selection - 1 < players.length
        ) this.playerSetting(player, players[res.selection - 1])
      })
  }

  playerSetting(player, selectedPlayer) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .body([

      ].join("\n"))
  }
}