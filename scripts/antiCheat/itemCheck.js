import * as Minecraft from "@minecraft/server"
import * as setting from "../config"
import { Hutao } from "../lib/import"

export const itemCheck = (player) => {
  const container = player.getComponent("inventory").container
  const equipment = player.getComponent("equippable")
  const slots = [
    "Head",
    "Chest",
    "Legs",
    "Feet",
    "Offhand"
  ]

  let type = ""
  let armors = {}
  let armorSlot = {}

  for (let i = 0; i < container.size; i++) {
    const item = container.getItem(i)

    if (item) {
      const itemEnchant = item.getComponent("enchantments").enchantments

      if (
        item.typeId.endsWith("helmet") ||
        item.typeId.endsWith("chestplate") ||
        item.typeId.endsWith("leggings") ||
        item.typeId.endsWith("boots")
      ) {
        armors[i] = item
      }

      if (setting.default.data.antiCheat.itemCheckA.state) {
        if (setting.default.data.antiCheat.itemList.ban.includes(item.typeId)) {
          type = "A"
          container.setItem(i)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckB.state) {
        if (setting.default.data.antiCheat.itemList.kick.includes(item.typeId)) {
          type = "B"
          container.setItem(i)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckC.state) {
        if (setting.default.data.antiCheat.itemList.tempkick.includes(item.typeId)) {
          type = "C"
          container.setItem(i)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckD.state) {
        if (item.amount > item.maxAmount) {
          type = "D"
          container.setItem(i)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckE.state) {
        if (item.keepOnDeath) {
          type = "E"
          container.setItem(i)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckF.state) {
        if (
          item.typeId.startsWith("minecraft:") &&
          item.typeId.endsWith("spawn_egg")
        ) {
          type = "F"
          container.setItem(i)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckG.state) {
        if (item.typeId.startsWith("minecraft:element")) {
          type = "G"
          container.setItem(i)
        }
      }

      if (setting.default.data.antiCheat.itemCheckH.state) {
        if (item.nameTag?.length > 30) {
          item.nameTag = undefined
          type = "H"
          container.setItem(i)
        }
      }

      if (setting.default.data.antiCheat.itemCheckI.state) {
        const validLore = [
          "(+DATA)",
          setting.default.data.adminMenu.encrypt,
          setting.default.data.playerMenu.encrypt
        ]

        let is = false

        for (const lore of item.getLore()) {
          if (!validLore.includes(lore)) {
            is = true
            break
          }
        }

        if (is) {
          type = "I"
          container.setItem(i)

          continue
        }
      }

      for (const enchantment of itemEnchant) {
        if (setting.default.data.antiCheat.itemCheckJ.state) {
          if (
            enchantment.level > 5 ||
            enchantment.level < 1 ||
            enchantment.level > enchantment.type.maxLevel
          ) {
            itemEnchant.removeEnchantment(enchantment.type.id)
            item.getComponent("enchantments").enchantments = itemEnchant
            container.setItem(i, item)
            type = "J"

            continue
          }
        }

        if (setting.default.data.antiCheat.itemCheckK.state) {
          const item2 = new Minecraft.ItemStack(item.typeId, 1)

          if (!item2.getComponent("enchantments").enchantments.canAddEnchantment(new Minecraft.Enchantment(enchantment.type.id, 1))) {
            itemEnchant.removeEnchantment(enchantment.type.id)
            item.getComponent("enchantments").enchantments = itemEnchant
            container.setItem(i, item)
            type = "K"

            continue
          }
        }
      }

      item.getComponent("enchantments").enchantments = itemEnchant
    }
  }

  for (const slot of slots) {
    const item = equipment.getEquipment(slot)

    if (item) {
      const itemEnchant = item.getComponent("enchantments").enchantments

      armorSlot[slot] = item

      if (setting.default.data.antiCheat.itemCheckA.state) {
        if (setting.default.data.antiCheat.itemList.ban.includes(item.typeId)) {
          type = "A"
          equipment.setEquipment(slot)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckB.state) {
        if (setting.default.data.antiCheat.itemList.kick.includes(item.typeId)) {
          type = "B"
          equipment.setEquipment(slot)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckC.state) {
        if (setting.default.data.antiCheat.itemList.tempkick.includes(item.typeId)) {
          type = "C"
          equipment.setEquipment(slot)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckD.state) {
        if (item.amount > item.maxAmount) {
          type = "D"
          equipment.setEquipment(slot)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckE.state) {
        if (item.keepOnDeath) {
          type = "E"
          equipment.setEquipment(slot)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckF.state) {
        if (
          item.typeId.startsWith("minecraft:") &&
          item.typeId.endsWith("spawn_egg")
        ) {
          type = "F"
          equipment.setEquipment(slot)

          continue
        }
      }

      if (setting.default.data.antiCheat.itemCheckG.state) {
        if (item.typeId.startsWith("minecraft:element")) {
          type = "G"
          equipment.setEquipment(slot)
        }
      }

      if (setting.default.data.antiCheat.itemCheckH.state) {
        if (item.nameTag?.length > 30) {
          item.nameTag = undefined
          type = "H"
          equipment.setEquipment(slot)
        }
      }

      if (setting.default.data.antiCheat.itemCheckI.state) {
        const validLore = [
          "(+DATA)",
          setting.default.data.adminMenu.encrypt,
          setting.default.data.playerMenu.encrypt
        ]

        let is = false

        for (const lore of item.getLore()) {
          if (!validLore.includes(lore)) {
            is = true
            break
          }
        }

        if (is) {
          type = "I"
          equipment.setEquipment(slot)

          continue
        }
      }

      for (const enchantment of itemEnchant) {
        if (setting.default.data.antiCheat.itemCheckJ.state) {
          if (
            enchantment.level > 5 ||
            enchantment.level < 1 ||
            enchantment.level > enchantment.type.maxLevel
          ) {
            itemEnchant.removeEnchantment(enchantment.type.id)
            item.getComponent("enchantments").enchantments = itemEnchant
            equipment.setEquipment(slot, item)
            type = "J"

            continue
          }
        }

        if (setting.default.data.antiCheat.itemCheckK.state) {
          const item2 = new Minecraft.ItemStack(item.typeId, 1)

          if (!item2.getComponent("enchantments").enchantments.canAddEnchantment(new Minecraft.Enchantment(enchantment.type.id, 1))) {
            itemEnchant.removeEnchantment(enchantment.type.id)
            item.getComponent("enchantments").enchantments = itemEnchant
            equipment.setEquipment(slot, item)
            type = "K"

            continue
          }
        }
      }
    }
  }

  if (type != "") {
    Hutao.Player.checking(player, "ItemCheck", type)
  }

  player.emptyInventorySlots = container.emptySlotsCount
  player.armors = armors
  player.armorSlot = armorSlot
}