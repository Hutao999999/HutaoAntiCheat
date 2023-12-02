import * as Minecraft from "@minecraft/server"

export class Item {
  static changeItemToJSON(item) {
    let enchantments = []
    const itemEnchant = item.getComponent("enchantments").enchantments
    const itemCooldown = item.getComponent("cooldown")
    const itemDurability = item.getComponent("durability")
    const itemFood = item.getComponent("food")

    for (const enchant of itemEnchant) {
      enchantments.push({
        id: enchantData.type.id,
        level: enchantData.level
      })
    }

    return {
      typeId: item.typeId,
      amount: item.amount,
      enchantments: enchantments,
      lore: item.getLore(),
      nameTag: item.nameTag,
      lockMode: item.lockMode,
      keepOnDeath: item.keepOnDeath,
      cooldown: {
        category: itemCooldown?.cooldownCategory,
        ticks: itemCooldown?.cooldownTicks
      },
      durability: {
        damage: itemDurability?.damage,
        maxDurability: itemDurability?.maxDurability,
      },
      food: {
        canAlwaysEat: itemFood?.canAlwaysEat,
        nutrition: itemFood?.nutrition,
        saturationModifier: itemFood?.saturationModifier,
        usingConvertsTo: itemFood?.usingConvertsTo,
      },
      canDestroy: item.getCanDestroy(),
      canPlaceOn: item.getCanPlaceOn()
    }
  }

  static changeJSONToItem(json) {
    let item = new Minecraft.ItemStack(json.typeId, json.amount)
    let itemDurability = item.getComponent("durability")
    const itemEnchant = item.getComponent("enchantments").enchantments

    item.setLore(json.lore)
    item.setCanDestroy(json.canDestroy)
    item.setCanPlaceOn(json.canPlaceOn)
    item.nameTag = json.nameTag
    item.lockMode = json.lockMode
    item.keepOnDeath = json.keepOnDeath
    itemDurability.damage = json.durability.damage

    for (const enchant of json.enchantments) {
      const enchantment = new Minecraft.Enchantment(enchant.id, enchant.level)

      itemEnchant.addEnchantment(enchantment)
    }

    item.getComponent("enchantments").enchantments = itemEnchant

    return item
  }

  static sameItem(item1, item2) {
    if (this.changeItemToJSON(item1) == this.changeItemToJSON(item2)) {
      return true
    } else {
      return false
    }
  }
}