import * as Minecraft from "@minecraft/server"
import * as setting from "../config"
import { Hutao } from "../lib/import"

export const autoArmor = (player) => {
  if (Minecraft.system.currentTick - Minecraft.world.startTick < 5) return

  const equipment = player.getComponent("equippable")
  const container = player.getComponent("inventory").container

  const slots = [
    "Head",
    "Chest",
    "Legs",
    "Feet"
  ]

  for (const slot of slots) {
    if (player.armorSlot) {
      if (!player.armorSlot[slot]) {
        const item = equipment.getEquipment(slot)

        if (item) {
          if (container.emptySlotsCount - player.emptyInventorySlots > 0) {
            if (setting.default.data.antiCheat.autoArmorA.state) {
              if (player.isSprinting) {
                Minecraft.system.run(() => {
                  if (Date.now() - player.autoArmorChecking > 100) {
                    Hutao.Player.checking(player, `AutoArmor`, `A`)

                    container.addItem(item)
                    equipment.setEquipment(slot)
                  }
                })
              }
            }

            if (setting.default.data.antiCheat.autoArmorB.state) {
              if (Date.now() - player.autoArmorB < 70) {
                Hutao.Player.checking(player, `AutoArmor`, `B`)

                container.addItem(item)
                equipment.setEquipment(slot)
              }
            }

            if (setting.default.data.antiCheat.autoArmorC.state) {
              if (Date.now() - player.lastPlaceBlock < 100) {
                Hutao.Player.checking(player, `AutoArmor`, `C`)

                container.addItem(item)
                equipment.setEquipment(slot)
              }
            }

            if (setting.default.data.antiCheat.autoArmorD.state) {
              if (Date.now() - player.lastBrokeBlock < 100) {
                Hutao.Player.checking(player, `AutoArmor`, `D`)

                container.addItem(item)
                equipment.setEquipment(slot)
              }
            }

            if (setting.default.data.antiCheat.autoArmorE.state) {
              if (
                Date.now() - player.lastHitBlock < 100 ||
                Date.now() - player.lastHitEntity < 100
              ) {
                Hutao.Player.checking(player, `AutoArmor`, `E`)

                container.addItem(item)
                equipment.setEquipment(slot)
              }
            }

            if (setting.default.data.antiCheat.autoArmorF.state) {
              if (
                Date.now() - player.openContainer < 1000 &&
                player.hasTag("hutao:has_container_open")
              ) {
                Hutao.Player.checking(player, `AutoArmor`, `F`)

                container.addItem(item)
                equipment.setEquipment(slot)
              }
            }

            if (setting.default.data.antiCheat.autoArmorG.state) {
              if (player.isSleeping) {
                Hutao.Player.checking(player, `AutoArmor`, `G`)

                container.addItem(item)
                equipment.setEquipment(slot)
              }
            }

            player.autoArmorB = Date.now()
          }
        }
      }
    }
  }

  if (!player.armorSlot?.Offhand) {
    const item = equipment.getEquipment("Offhand")

    if (item) {
      if (container.emptySlotsCount - player.emptyInventorySlots > 0) {
        if (setting.default.data.antiCheat.autoTotemA.state) {
          if (player.isSprinting) {
            if (item.typeId == "minecraft:totem_of_undying") {
              Minecraft.system.run(() => {
                if (Date.now() - player.autoArmorChecking > 100) {
                  Hutao.Player.checking(player, `AutoTotem`, `A`)

                  container.addItem(item)
                  equipment.setEquipment("Offhand")
                }
              })
            }
          }
        }

        if (setting.default.data.antiCheat.autoTotemB.state) {
          if (item.typeId == "minecraft:totem_of_undying") {
            if (Date.now() - player.autoArmorB < 70) {
              Hutao.Player.checking(player, `AutoTotem`, `B`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoTotemC.state) {
          if (item.typeId == "minecraft:totem_of_undying") {
            if (Date.now() - player.lastPlaceBlock < 100) {
              Hutao.Player.checking(player, `AutoTotem`, `C`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoTotemD.state) {
          if (item.typeId == "minecraft:totem_of_undying") {
            if (Date.now() - player.lastBrokeBlock < 100) {
              Hutao.Player.checking(player, `AutoTotem`, `D`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoTotemE.state) {
          if (item.typeId == "minecraft:totem_of_undying") {
            if (
              Date.now() - player.lastHitBlock < 100 ||
              Date.now() - player.lastHitEntity < 100
            ) {
              Hutao.Player.checking(player, `AutoTotem`, `E`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoTotemF.state) {
          if (item.typeId == "minecraft:totem_of_undying") {
            if (
              Date.now() - player.openContainer < 1000 &&
              player.hasTag("hutao:has_container_open")
            ) {
              Hutao.Player.checking(player, `AutoTotem`, `F`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoTotemG.state) {
          if (item.typeId == "minecraft:totem_of_undying") {
            if (player.isSleeping) {
              Hutao.Player.checking(player, `AutoTotem`, `G`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoShieldA.state) {
          if (player.isSprinting) {
            if (item.typeId == "minecraft:shield") {
              Minecraft.system.run(() => {
                if (Date.now() - player.autoArmorChecking > 100) {
                  Hutao.Player.checking(player, `AutoShield`, `A`)

                  container.addItem(item)
                  equipment.setEquipment("Offhand")
                }
              })
            }
          }
        }

        if (setting.default.data.antiCheat.autoShieldB.state) {
          if (item.typeId == "minecraft:shield") {
            if (Date.now() - player.autoArmorB < 70) {
              Hutao.Player.checking(player, `AutoShield`, `B`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoShieldC.state) {
          if (item.typeId == "minecraft:shield") {
            if (Date.now() - player.lastPlaceBlock < 100) {
              Hutao.Player.checking(player, `AutoShield`, `C`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoShieldD.state) {
          if (item.typeId == "minecraft:shield") {
            if (Date.now() - player.lastBrokeBlock < 100) {
              Hutao.Player.checking(player, `AutoShield`, `D`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoShieldE.state) {
          if (item.typeId == "minecraft:shield") {
            if (
              Date.now() - player.lastHitBlock < 100 ||
              Date.now() - player.lastHitEntity < 100
            ) {
              Hutao.Player.checking(player, `AutoShield`, `E`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoShieldF.state) {
          if (item.typeId == "minecraft:shield") {
            if (
              Date.now() - player.openContainer < 1000 &&
              player.hasTag("hutao:has_container_open")
            ) {
              Hutao.Player.checking(player, `AutoShield`, `F`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        if (setting.default.data.antiCheat.autoShieldG.state) {
          if (item.typeId == "minecraft:shield") {
            if (player.isSleeping) {
              Hutao.Player.checking(player, `AutoShield`, `G`)

              container.addItem(item)
              equipment.setEquipment("Offhand")
            }
          }
        }

        player.autoArmorB = Date.now()
      }
    }
  }
}