import * as setting from "../config"
import { Hutao } from "../lib/import"

export const autoTool = (player) => {
  if (setting.default.data.antiCheat.autoToolA.state) {
    if (
      player.autoToolAChecking &&
      player.selectedSlot != player.lastAction.selectedSlot &&
      tools.includes(player.getComponent("inventory").container.getItem(player.selectedSlot)?.typeId)
    ) {
      Hutao.Player.checking(player, `AutoTool`, `A`)

      player.selectedSlot = player.lastAction.selecteSlot
    }
  }

  player.autoToolAChecking = false
}

const tools = [
  "minecraft:wooden_sword",
  "minecraft:wooden_axe",
  "minecraft:wooden_shovel",
  "minecraft:wooden_hoe",
  "minecraft:wooden_pickaxe",
  "minecraft:stone_sword",
  "minecraft:stone_axe",
  "minecraft:stone_shovel",
  "minecraft:stone_hoe",
  "minecraft:stone_pickaxe",
  "minecraft:iron_sword",
  "minecraft:iron_axe",
  "minecraft:iron_shovel",
  "minecraft:iron_hoe",
  "minecraft:iron_pickaxe",
  "minecraft:golden_sword",
  "minecraft:golden_axe",
  "minecraft:golden_shovel",
  "minecraft:golden_hoe",
  "minecraft:golden_pickaxe",
  "minecraft:diamond_sword",
  "minecraft:diamond_axe",
  "minecraft:diamond_shovel",
  "minecraft:diamond_hoe",
  "minecraft:diamond_pickaxe",
  "minecraft:netherite_sword",
  "minecraft:netherite_axe",
  "minecraft:netherite_shovel",
  "minecraft:netherite_hoe",
  "minecraft:netherite_pickaxe",
  "minecraft:shears"
]