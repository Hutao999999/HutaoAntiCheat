import * as UI from "@minecraft/server-ui"
import { Hutao } from "../lib/import"

export class Verify {
  open(player) {
    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).verifyTitle)
      .body(Hutao.Player.getLanguage(player).pleaseChooseTheDifferentColor)

    const random = Math.floor(Math.random() * 4)

    for (let i = 0; i < 4; i++) {
      if (i == random) {
        form.button(`§1${Hutao.Player.getLanguage(player).verify}`)
      } else {
        form.button(`§c${Hutao.Player.getLanguage(player).verify}`)
      }
    }

    form.show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.open(player)
          else return Hutao.Player.getLanguage(player).verificationFailed
        }

        if (res.selection == random) {
          let config = Hutao.Database.get("db")

          config.data.players[player.id].verified = true
          delete config.data.players[player.id].verifyLocation

          Hutao.Database.set("db", config)
          Hutao.World.success(player, Hutao.Player.getLanguage(player).verificationSuccessful)
        } else {
          Hutao.World.wrong(player, Hutao.Player.getLanguage(player).verificationFailed)
        }
      })
  }
}