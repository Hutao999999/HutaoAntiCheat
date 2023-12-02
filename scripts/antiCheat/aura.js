import * as setting from "../config"
import { Hutao } from "../lib/import"

export const aura = (player) => {
  const container = player.getComponent("inventory").container
  const item = container.getItem(player.selectedSlot)

  if (item) {
    if (setting.default.data.antiCheat.auraA.state) {
      if (item.typeId == "minecraft:ender_crystal") {
        Hutao.Player.checking(player, `Aura`, `A`)
        container.setItem(player.selectedSlot)
      }
    }

    if (setting.default.data.antiCheat.auraB.state) {
      if (item.typeId == "minecraft:flint_and_steel") {
        Hutao.Player.checking(player, `Aura`, `B`)
        container.setItem(player.selectedSlot)
      }
    }
  }
}