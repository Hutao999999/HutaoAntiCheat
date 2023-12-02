import * as setting from "../config"
import { Hutao } from "../lib/import"

export const inventoryAction = (player) => {
  if (Date.now() - player.openContainer > 2000) return
  if (!player.hasTag("hutao:has_container_open")) return
  if (player.isSwimming) return

  if (setting.default.data.antiCheat.inventoryActionA.state) {
    if (player.hasTag("right")) {
      Hutao.Player.checking(player, `InventoryAction`, `A`)
    }
  }

  if (setting.default.data.antiCheat.inventoryActionB.state) {
    if (player.selectedSlot != player.lastAction.selectedSlot) {
      Hutao.Player.checking(player, `InventoryAction`, `B`)

      player.selectedSlot = player.lastAction.selectedSlot
    }
  }

  if (setting.default.data.antiCheat.inventoryActionC.state) {
    if (player.isSprinting) {
      player.inventoryActionCChecking = true
    }
  }

  if (setting.default.data.antiCheat.inventoryActionE.state) {
    if (player.isJumping) {
      player.inventoryActionEChecking = true
    }
  }

  if (setting.default.data.antiCheat.inventoryActionF.state) {
    if (Date.now() - player.autoArmorB < 100) {
      Hutao.Player.checking(player, `InventoryAction`, `F`)
    }
  }

  if (player.inventoryActionCChecking) {
    player.inventoryActionCReturn ??= 0
    player.inventoryActionCReturn += 1

    if (player.inventoryActionCReturn > 5) {
      if (player.isSprinting) {
        Hutao.Player.checking(player, `InventoryAction`, `C`)
        Hutao.Player.returnLastLocation(player)
      }

      player.inventoryActionCReturn = 0
      player.inventoryActionCChecking = false
    }
  }

  if (player.inventoryActionEChecking) {
    player.inventoryActionEReturn ??= 0
    player.inventoryActionEReturn += 1

    if (player.inventoryActionEReturn > 5) {
      if (player.isJumping) {
        Hutao.Player.checking(player, `InventoryAction`, `E`)
        Hutao.Player.returnLastLocation(player)
      }

      player.inventoryActionEReturn = 0
      player.inventoryActionEChecking = false
    }
  }
}