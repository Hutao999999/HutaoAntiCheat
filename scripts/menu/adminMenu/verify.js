import * as UI from "@minecraft/server-ui"
import { Hutao } from "../../lib/import"
import * as setting from "../../config"
import { AdminMenu } from "../adminMenu"

export class Verify {
  open(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .toggle(`§7${Hutao.Player.getLanguage(player).disabledEnabled} ${Hutao.Player.getLanguage(player).verify}`, setting.default.data.verify.state)
      .show(player)
      .then(res => {
        if (res.canceled) return new AdminMenu().open(player)

        let config = Hutao.Database.get("db")

        config.data.verify.state = res.formValues[0]

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          new AdminMenu().open(player)
        }, 5, 1, false).on()
      })
  }
}