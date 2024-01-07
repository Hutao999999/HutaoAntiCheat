import * as UI from "@minecraft/server-ui"
import { Hutao } from "../lib/import"
import { AntiCheat } from "./adminMenu/antiCheat"
import { DeadMessage } from "./adminMenu/deadMessage"
import { NameTag } from "./adminMenu/nameTag"
import { Players } from "./adminMenu/players"
import { ChatFormat } from "./adminMenu/chatFormat"
import { Verify } from "./adminMenu/verify"

export class AdminMenu {
  open(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).antiCheat}`, `textures/ui/icon_setting`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormat}`, `textures/ui/chat_send`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessage}`, `textures/ui/chat_send`)
      .button(`§1${Hutao.Player.getLanguage(player).nameTag}`, `textures/items/name_tag`)
      .button(`§1${Hutao.Player.getLanguage(player).players}`, `textures/ui/icon_multiplayer`)
      .button(`§1${Hutao.Player.getLanguage(player).verify}`, `textures/ui/accessibility_glyph_color`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.open(player)
        }

        if (res.selection == 0) new AntiCheat().open(player)
        if (res.selection == 1) new ChatFormat().open(player)
        if (res.selection == 2) new DeadMessage().open(player)
        if (res.selection == 3) new NameTag().open(player)
        if (res.selection == 4) new Players().open(player)
        if (res.selection == 5) new Verify().open(player)
      })
  }
}