import * as UI from "@minecraft/server-ui"
import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AdminMenu } from "../adminMenu"
import { configCache } from "../../configCache"

export class AntiCheat {
  open(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).entityList}`, `textures/items/egg_chicken`)
      .button(`§1${Hutao.Player.getLanguage(player).itemList}`, `textures/ui/icon_recipe_item`)
      .button(`§1Aura`, `textures/items/end_crystal`)
      .button(`§1AutoArmor`, `textures/items/iron_chestplate`)
      .button(`§1AutoClicker`, `textures/ui/strength_effect`)
      .button(`§1AutoShield`, `textures/items/iron_chestplate`)
      .button(`§1AutoTool`, `textures/items/diamond_pickaxe`)
      .button(`§1AutoTotem`, `textures/items/totem`)
      .button(`§1BadPacket`, `textures/blocks/barrier`)
      .button(`§1Blink`, `textures/ui/speed_effect`)
      .button(`§1Crasher`, `textures/environment/destroy_stage_6`)
      .button(`§1EntityCheck`, `textures/items/egg_chicken`)
      .button(`§1FastLadder`, `textures/blocks/ladder`)
      .button(`§1FastThrow`, `textures/items/snowball`)
      .button(`§1InvalidSprint`, `textures/ui/speed_effect`)
      .button(`§1InventoryAction`, `textures/blocks/chest_front`)
      .button(`§1ItemCheck`, `textures/ui/icon_recipe_item`)
      .button(`§1Killaura`, `textures/ui/strength_effect`)
      .button(`§1Movement`, `textures/ui/speed_effect`)
      .button(`§1NameSpoof`, `textures/items/name_tag`)
      .button(`§1NoFall`, `textures/ui/levitation_effect`)
      .button(`§1NoSlowDown`, `textures/ui/slowness_effect`)
      .button(`§1Nuker`, `textures/environment/destroy_stage_6`)
      .button(`§1Reach`, `textures/ui/strength_effect`)
      .button(`§1Scaffold`, `textures/blocks/planks_oak`)
      .button(`§1Spammer`, `textures/ui/chat_send`)
      .button(`§1Speed`, `textures/ui/speed_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBust") return this.open(player)
        }

        if (res.selection == 0) this.entityList(player)
        if (res.selection == 1) this.itemList(player)
        if (res.selection == 2) this.auraSetting(player)
        if (res.selection == 3) this.autoArmorSetting(player)
        if (res.selection == 4) this.autoClickerSetting(player)
        if (res.selection == 5) this.autoShieldSetting(player)
        if (res.selection == 6) this.autoToolSetting(player)
        if (res.selection == 7) this.autoTotemSetting(player)
        if (res.selection == 8) this.badPacketSetting(player)
        if (res.selection == 9) this.blinkSetting(player)
        if (res.selection == 10) this.crasherSetting(player)
        if (res.selection == 11) this.entityCheckSetting(player)
        if (res.selection == 12) this.fastLadderSetting(player)
        if (res.selection == 13) this.fastThrowSetting(player)
        if (res.selection == 14) this.invalidSprintSetting(player)
        if (res.selection == 15) this.inventoryActionSetting(player)
        if (res.selection == 16) this.itemCheckSetting(player)
        if (res.selection == 17) this.killauraSetting(player)
        if (res.selection == 18) this.movementSetting(player)
        if (res.selection == 19) this.nameSpoofSetting(player)
        if (res.selection == 20) this.noFallSetting(player)
        if (res.selection == 21) this.noSlowDownSetting(player)
        if (res.selection == 22) this.nukerSetting(player)
        if (res.selection == 23) this.reachSetting(player)
        if (res.selection == 24) this.scaffoldSetting(player)
        if (res.selection == 25) this.spammerSetting(player)
        if (res.selection == 26) this.speedSetting(player)
        if (res.selection == 27) new AdminMenu().open(player)
      })
  }

  auraSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Aura/A\n${getEnabled(player, "auraA")}`, `textures/items/end_crystal`)
      .button(`§1Aura/B\n${getEnabled(player, "auraB")}`, `textures/items/flint_and_steel`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.auraSetting(player)
        }

        if (res.selection == 0) this.auraA(player)
        if (res.selection == 1) this.auraB(player)
        if (res.selection == 2) this.open(player)
      })
  }

  autoArmorSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1AutoArmor/A\n${getEnabled(player, "autoArmorA")}`, `textures/items/iron_chestplate`)
      .button(`§1AutoArmor/B\n${getEnabled(player, "autoArmorB")}`, `textures/items/iron_chestplate`)
      .button(`§1AutoArmor/C\n${getEnabled(player, "autoArmorC")}`, `textures/blocks/planks_oak`)
      .button(`§1AutoArmor/D\n${getEnabled(player, "autoArmorD")}`, `textures/environment/destroy_stage_6`)
      .button(`§1AutoArmor/E\n${getEnabled(player, "autoArmorE")}`, `textures/ui/strength_effect`)
      .button(`§1AutoArmor/F\n${getEnabled(player, "autoArmorF")}`, `textures/blocks/chest_front`)
      .button(`§1AutoArmor/G\n${getEnabled(player, "autoArmorG")}`, `textures/items/bed_red`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoArmorSetting(player)
        }

        if (res.selection == 0) this.autoArmorA(player)
        if (res.selection == 1) this.autoArmorB(player)
        if (res.selection == 2) this.autoArmorC(player)
        if (res.selection == 3) this.autoArmorD(player)
        if (res.selection == 4) this.autoArmorE(player)
        if (res.selection == 5) this.autoArmorF(player)
        if (res.selection == 6) this.autoArmorG(player)
        if (res.selection == 7) this.open(player)
      })
  }

  autoClickerSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1AutoClicker/A\n${getEnabled(player, "autoClickerA")}`, `textures/ui/strength_effect`)
      .button(`§1AutoClicker/B\n${getEnabled(player, "autoClickerB")}`, `textures/blocks/grass_side_carried`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoClickerSetting(player)
        }

        if (res.selection == 0) this.autoClickerA(player)
        if (res.selection == 1) this.autoClickerB(player)
        if (res.selection == 2) this.open(player)
      })
  }

  autoShieldSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1AutoShield/A\n${getEnabled(player, "autoShieldA")}`, `textures/items/iron_chestplate`)
      .button(`§1AutoShield/B\n${getEnabled(player, "autoShieldB")}`, `textures/items/iron_chestplate`)
      .button(`§1AutoShield/C\n${getEnabled(player, "autoShieldC")}`, `textures/blocks/planks_oak`)
      .button(`§1AutoShield/D\n${getEnabled(player, "autoShieldD")}`, `textures/environment/destroy_stage_6`)
      .button(`§1AutoShield/E\n${getEnabled(player, "autoShieldE")}`, `textures/ui/strength_effect`)
      .button(`§1AutoShield/F\n${getEnabled(player, "autoShieldF")}`, `textures/blocks/chest_front`)
      .button(`§1AutoShield/G\n${getEnabled(player, "autoShieldG")}`, `textures/items/bed_red`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoShieldSetting(player)
        }

        if (res.selection == 0) this.autoShieldA(player)
        if (res.selection == 1) this.autoShieldB(player)
        if (res.selection == 2) this.autoShieldC(player)
        if (res.selection == 3) this.autoShieldD(player)
        if (res.selection == 4) this.autoShieldE(player)
        if (res.selection == 5) this.autoShieldF(player)
        if (res.selection == 6) this.autoShieldG(player)
        if (res.selection == 7) this.open(player)
      })
  }

  autoToolSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1AutoTool/A\n${getEnabled(player, `autoToolA`)}`, `textures/items/diamond_pickaxe`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoToolSetting(player)
        }

        if (res.selection == 0) this.autoToolA(player)
        if (res.selection == 1) this.open(player)
      })
  }

  autoTotemSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1AutoTotem/A\n${getEnabled(player, "autoTotemA")}`, `textures/items/iron_chestplate`)
      .button(`§1AutoTotem/B\n${getEnabled(player, "autoTotemB")}`, `textures/items/iron_chestplate`)
      .button(`§1AutoTotem/C\n${getEnabled(player, "autoTotemC")}`, `textures/blocks/planks_oak`)
      .button(`§1AutoTotem/D\n${getEnabled(player, "autoTotemD")}`, `textures/environment/destroy_stage_6`)
      .button(`§1AutoTotem/E\n${getEnabled(player, "autoTotemE")}`, `textures/ui/strength_effect`)
      .button(`§1AutoTotem/F\n${getEnabled(player, "autoTotemF")}`, `textures/blocks/chest_front`)
      .button(`§1AutoTotem/G\n${getEnabled(player, "autoTotemG")}`, `textures/items/bed_red`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoTotem(player)
        }

        if (res.selection == 0) this.autoTotemA(player)
        if (res.selection == 1) this.autoTotemB(player)
        if (res.selection == 2) this.autoTotemC(player)
        if (res.selection == 3) this.autoTotemD(player)
        if (res.selection == 4) this.autoTotemE(player)
        if (res.selection == 5) this.autoTotemF(player)
        if (res.selection == 6) this.autoTotemG(player)
        if (res.selection == 7) this.open(player)
      })
  }

  badPacketSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1BadPacket/A\n${getEnabled(player, `badPacketA`)}`, `textures/blocks/barrier`)
      .button(`§1BadPacket/B\n${getEnabled(player, `badPacketB`)}`, `textures/blocks/camera_front`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.badPacketSetting(player)
        }

        if (res.selection == 0) this.badPacketA(player)
        if (res.selection == 1) this.badPacketB(player)
        if (res.selection == 2) this.open(player)
      })
  }

  blinkSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Blink/A\n${getEnabled(player, `blinkA`)}`, `textures/blocks/barrier`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.badPacketSetting(player)
        }

        if (res.selection == 0) this.blinkA(player)
        if (res.selection == 1) this.open(player)
      })
  }

  crasherSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Crasher/A\n${getEnabled(player, `crasherA`)}`, `textures/environment/destroy_stage_6`)
      .button(`§1Crasher/B\n${getEnabled(player, `crasherB`)}`, `textures/ui/strength_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.crasherSetting(player)
        }

        if (res.selection == 0) this.crasherA(player)
        if (res.selection == 1) this.crasherB(player)
        if (res.selection == 2) this.open(player)
      })
  }

  entityCheckSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1EntityCheck/A\n${getEnabled(player, `entityCheckA`)}`, `textures/items/egg_chicken`)
      .button(`§1EntityCheck/B\n${getEnabled(player, `entityCheckB`)}`, `textures/items/egg_chicken`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.entityCheckSetting(player)
        }

        if (res.selection == 0) this.entityCheckA(player)
        if (res.selection == 1) this.entityCheckB(player)
        if (res.selection == 2) this.open(player)
      })
  }

  fastLadderSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1FastLadder/A\n${getEnabled(player, `fastLadderA`)}`, `textures/blocks/ladder`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.fastLadderSetting(player)
        }

        if (res.selection == 0) this.fastLadderA(player)
        if (res.selection == 1) this.open(player)
      })
  }

  fastThrowSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1FastThrow/A\n${getEnabled(player, `fastThrowA`)}`, `textures/items/snowball`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.fastThrowSetting(player)
        }

        if (res.selection == 0) this.fastThrowA(player)
        if (res.selection == 1) this.open(player)
      })
  }

  flySetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Fly/A\n${getEnabled(player, `flyA`)}`, `textures/ui/levitation_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.flySetting(player)
        }

        if (res.selection == 0) this.flyA(player)
        if (res.selection == 1) this.open(player)
      })
  }

  invalidSprintSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1InvalidSprint/A\n${getEnabled(player, `invalidSprintA`)}`, `textures/ui/speed_effect`)
      .button(`§1InvalidSprint/B\n${getEnabled(player, `invalidSprintB`)}`, `textures/ui/speed_effect`)
      .button(`§1InvalidSprint/C\n${getEnabled(player, `invalidSprintC`)}`, `textures/ui/speed_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.invalidSprintSetting(player)
        }

        if (res.selection == 0) this.invalidSprintA(player)
        if (res.selection == 1) this.invalidSprintB(player)
        if (res.selection == 2) this.invalidSprintC(player)
        if (res.selection == 3) this.open(player)
      })
  }

  inventoryActionSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1InventoryAction/A\n${getEnabled(player, `inventoryActionA`)}`, `textures/blocks/planks_oak`)
      .button(`§1InventoryAction/B\n${getEnabled(player, `inventoryActionB`)}`, `textures/blocks/structure_void`)
      .button(`§1InventoryAction/C\n${getEnabled(player, `inventoryActionC`)}`, `textures/ui/speed_effect`)
      .button(`§1InventoryAction/D\n${getEnabled(player, `inventoryActionD`)}`, `textures/blocks/planks_oak`)
      .button(`§1InventoryAction/E\n${getEnabled(player, `inventoryActionE`)}`, `textures/environment/destroy_stage_6`)
      .button(`§1InventoryAction/F\n${getEnabled(player, `inventoryActionF`)}`, `textures/blocks/chest_front`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.inventoryActionSetting(player)
        }

        if (res.selection == 0) this.inventoryActionA(player)
        if (res.selection == 1) this.inventoryActionB(player)
        if (res.selection == 2) this.inventoryActionC(player)
        if (res.selection == 3) this.inventoryActionD(player)
        if (res.selection == 4) this.inventoryActionE(player)
        if (res.selection == 5) this.inventoryActionF(player)
        if (res.selection == 6) this.open(player)
      })
  }

  itemCheckSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1ItemCheck/A\n${getEnabled(player, `itemCheckA`)}`, `textures/blocks/barrier`)
      .button(`§1ItemCheck/B\n${getEnabled(player, `itemCheckB`)}`, `textures/ui/friend_glyph_desaturated`)
      .button(`§1ItemCheck/C\n${getEnabled(player, `itemCheckC`)}`, `textures/ui/chat_send`)
      .button(`§1ItemCheck/D\n${getEnabled(player, `itemCheckD`)}`, `textures/ui/icon_recipe_item`)
      .button(`§1ItemCheck/E\n${getEnabled(player, `itemCheckE`)}`, `textures/ui/crossout`)
      .button(`§1ItemCheck/F\n${getEnabled(player, `itemCheckF`)}`, `textures/items/egg_chicken`)
      .button(`§1ItemCheck/G\n${getEnabled(player, `itemCheckG`)}`, `textures/blocks/barrier`)
      .button(`§1ItemCheck/H\n${getEnabled(player, `itemCheckH`)}`, `textures/items/name_tag`)
      .button(`§1ItemCheck/I\n${getEnabled(player, `itemCheckI`)}`, `textures/items/name_tag`)
      .button(`§1ItemCheck/J\n${getEnabled(player, `itemCheckJ`)}`, `textures/items/book_enchanted`)
      .button(`§1ItemCheck/K\n${getEnabled(player, `itemCheckK`)}`, `textures/items/book_enchanted`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckSetting(player)
        }

        if (res.selection == 0) this.itemCheckA(player)
        if (res.selection == 1) this.itemCheckB(player)
        if (res.selection == 2) this.itemCheckC(player)
        if (res.selection == 3) this.itemCheckD(player)
        if (res.selection == 4) this.itemCheckE(player)
        if (res.selection == 5) this.itemCheckF(player)
        if (res.selection == 6) this.itemCheckG(player)
        if (res.selection == 7) this.itemChecKH(player)
        if (res.selection == 8) this.itemCheckI(player)
        if (res.selection == 9) this.itemCheckJ(player)
        if (res.selection == 10) this.itemCheckK(player)
        if (res.selection == 11) this.open(player)
      })
  }

  killauraSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Killaura/A\n${getEnabled(player, `killauraA`)}`, `textures/ui/strength_effect`)
      .button(`§1Killaura/B\n${getEnabled(player, `killauraB`)}`, `textures/ui/strength_effect`)
      .button(`§1Killaura/C\n${getEnabled(player, `killauraC`)}`, `textures/blocks/chest_front`)
      .button(`§1Killaura/D\n${getEnabled(player, `killauraD`)}`, `textures/items/bed_red`)
      .button(`§1Killaura/E\n${getEnabled(player, `killauraE`)}`, `textures/blocks/planks_oak`)
      .button(`§1Killaura/F\n${getEnabled(player, `killauraF`)}`, `textures/environment/destroy_stage_6`)
      .button(`§1Killaura/G\n${getEnabled(player, `killauraG`)}`, `textures/items/snowball`)
      .button(`§1Killaura/H\n${getEnabled(player, `killauraH`)}`, `textures/blocks/planks_oak`)
      .button(`§1Killaura/I\n${getEnabled(player, `killauraI`)}`, `textures/ui/strength_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraSetting(player)
        }

        if (res.selection == 0) this.killauraA(player)
        if (res.selection == 1) this.killauraB(player)
        if (res.selection == 2) this.killauraC(player)
        if (res.selection == 3) this.killauraD(player)
        if (res.selection == 4) this.killauraE(player)
        if (res.selection == 5) this.killauraF(player)
        if (res.selection == 6) this.killauraG(player)
        if (res.selection == 7) this.killauraH(player)
        if (res.selection == 8) this.killauraI(player)
        if (res.selection == 9) this.open(player)
      })
  }

  movementSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Movement/A\n${getEnabled(player, `movementA`)}`, `textures/ui/speed_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.cnaceled) {
          if (res.cancelationReason == "UserBusy") return this.movementSetting(player)
        }

        if (res.selection == 0) this.movementA(player)
        if (res.selection == 1) this.open(player)
      })
  }

  nameSpoofSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1NameSpoof/A\n${getEnabled(player, `nameSpoofA`)}`, `textures/items/name_tag`)
      .button(`§1NameSpoof/B\n${getEnabled(player, `nameSpoofB`)}`, `textures/items/name_tag`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nameSpoofSetting(player)
        }

        if (res.selection == 0) this.nameSpoofA(player)
        if (res.selection == 1) this.nameSpoofB(player)
        if (res.selection == 2) this.open(player)
      })
  }

  noFallSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1NoFall/A\n${getEnabled(player, `noFallA`)}`, `textures/ui/jump_boost_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.noFallSetting(player)
        }

        if (res.selection == 0) this.noFallA(player)
        if (res.selection == 1) this.open(player)
      })
  }

  noSlowDownSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1NoSlowDown/A\n${getEnabled(player, `noSlowDownA`)}`, `textures/ui/slowness_effect`)
      .button(`§1NoSlowDown/B\n${getEnabled(player, `noSlowDownB`)}`, `textures/ui/slowness_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.noSlowDownSetting(player)
        }

        if (res.selection == 0) this.noSlowDownA(player)
        if (res.selection == 1) this.noSlowDownB(player)
        if (res.selection == 2) this.open(player)
      })
  }

  nukerSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Nuker/A\n${getEnabled(player, `nukerA`)}`, `textures/environment/destroy_stage_6`)
      .button(`§1Nuker/B\n${getEnabled(player, `nukerB`)}`, `textures/environment/destroy_stage_6`)
      .button(`§1Nuker/C\n${getEnabled(player, `nukerC`)}`, `textures/blocks/chest_front`)
      .button(`§1Nuker/D\n${getEnabled(player, `nukerD`)}`, `textures/ui/strength_effect`)
      .button(`§1Nuker/E\n${getEnabled(player, `nukerE`)}`, `textures/items/bed_red`)
      .button(`§1Nuker/F\n${getEnabled(player, `nukerF`)}`, `textures/items/bed_red`)
      .button(`§1Nuker/G\n${getEnalbed(player, `nukerG`)}`, `textures/environment/destroy_stage_6`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nukerSetting(player)
        }

        if (res.selection == 0) this.nukerA(player)
        if (res.selection == 1) this.nukerB(player)
        if (res.selection == 2) this.nukerC(player)
        if (res.selection == 3) this.nukerD(player)
        if (res.selection == 4) this.nukerE(player)
        if (res.selection == 5) this.nukerF(player)
        if (res.selection == 6) this.nukerG(player)
        if (res.selection == 7) this.open(player)
      })
  }

  reachSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Reach/A\n${getEnabled(player, `reachA`)}`, `textures/ui/strength_effect`)
      .button(`§1Reach/B\n${getEnabled(player, `reachB`)}`, `textures/ui/strength_effect`)
      .button(`§1Reach/C\n${getEnabled(player, `reachC`)}`, `textures/environment/destroy_stage_6`)
      .button(`§1Raech/D\n${getEnabled(player, `reachD`)}`, `textures/blocks/planks_oak`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.reachSetting(player)
        }

        if (res.selection == 0) this.reachA(player)
        if (res.selection == 1) this.reachB(player)
        if (res.selection == 2) this.reachC(player)
        if (res.selection == 3) this.reachD(player)
      })
  }

  scaffoldSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Scaffold/A\n${getEnabled(player, `scaffoldA`)}`, `textures/blocks/planks_oak`)
      .button(`§1Scaffold/B\n${getEnabled(player, `scaffoldB`)}`, `textures/blocks/planks_oak`)
      .button(`§1Scaffold/C\n${getEnabled(player, `scaffoldC`)}`, `textures/blocks/planks_oak`)
      .button(`§1Scaffold/D\n${getEnabled(player, `scaffoldD`)}`, `textures/blocks/planks_oak`)
      .button(`§1Scaffold/E\n${getEnabled(player, `scaffoldE`)}`, `textures/ui/strength_effect`)
      .button(`§1Scaffold/F\n${getEnabled(player, `scaffoldF`)}`, `textures/blocks/planks_oak`)
      .button(`§1Scaffold/G\n${getEnabled(player, `scaffoldG`)}`, `textures/blocks/planks_oak`)
      .button(`§1Scaffold/H\n${getEnabled(player, `scaffoldH`)}`, `textures/items/iron_chestplate`)
      .button(`§1Scaffold/I\n${getEnabled(player, `scaffoldI`)}`, `textures/ui/speed_effect`)
      .button(`§1Scaffold/J\n${getEnabled(player, `scaffoldJ`)}`, `textures/blocks/planks`)
      .button(`§1Scaffold/K\n${getEnabled(player, `scaffoldK`)}`, `textures/blocks/planks_oak`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldSetting(player)
        }

        if (res.selection == 0) this.scaffoldA(player)
        if (res.selection == 1) this.scaffoldB(player)
        if (res.selection == 2) this.scaffoldC(player)
        if (res.selection == 3) this.scaffoldD(player)
        if (res.selection == 4) this.scaffoldE(player)
        if (res.selection == 5) this.scaffoldF(player)
        if (res.selection == 6) this.scaffoldG(player)
        if (res.selection == 7) this.scaffoldH(player)
        if (res.selection == 8) this.scaffoldI(player)
        if (res.selection == 9) this.scaffoldJ(player)
        if (res.selection == 10) this.scaffoldK(player)
        if (res.selection == 11) this.open(player)
      })
  }

  spammerSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Spammer/A\n${getEnabled(player, `spammerA`)}`, `textures/ui/speed_effect`)
      .button(`§1Spammer/B\n${getEnabled(player, `spammerB`)}`, `textures/blocks/chest_front`)
      .button(`§1Spammer/C\n${getEnabled(player, `spammerC`)}`, `textures/blocks/planks_oak`)
      .button(`§1Spammer/D\n${getEnabled(player, `spammerD`)}`, `textures/ui/strength_effect`)
      .button(`§1Spammer/E\n${getEnabled(player, `spammerE`)}`, `textures/items/snowball`)
      .button(`§1Spammer/F\n${getEnabled(player, `spammerF`)}`, `textures/ui/jump_boost_effect`)
      .button(`§1Spammer/G\n${getEnabled(player, `spammerG`)}`, `textures/blocks/water_placeholder`)
      .button(`§1Spammer/H\n${getEnabled(player, `spammerH`)}`, `textures/blocks/structure_void`)
      .button(`§1Spammer/I\n${getEnabled(player, `spammerI`)}`, `textures/blocks/planks_oak`)
      .button(`§1Spammer/J\n${getEnabled(player, `spammerJ`)}`, `textures/environment/destroy_stage_6`)
      .button(`§1Spammer/K\n${getEnabled(player, `spammerK`)}`, `textures/items/snowball`)
      .button(`§1Spammer/L\n${getEnabled(player, `spammerL`)}`, `textures/ui/chat_send`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerSetting(player)
        }

        if (res.selection == 0) this.spammerA(player)
        if (res.selection == 1) this.spammerB(player)
        if (res.selection == 2) this.spammerC(player)
        if (res.selection == 3) this.spammerD(player)
        if (res.selection == 4) this.spammerE(player)
        if (res.selection == 5) this.spammerF(player)
        if (res.selection == 6) this.spammerG(player)
        if (res.selection == 7) this.spammerH(player)
        if (res.selection == 8) this.spammerI(player)
        if (res.selection == 9) this.spammerJ(player)
        if (res.selection == 10) this.spammerK(player)
        if (res.selection == 11) this.spammerL(player)
        if (res.selection == 12) this.open(player)
      })
  }

  speedSetting(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1Speed/A\n${getEnabled(player, `speedA`)}`, `textures/ui/speed_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.speedSetting(player)
        }

        if (res.selection == 0) this.speedA(player)
        if (res.selection == 1) this.open(player)
      })
  }

  scaffoldK(player) {
    this.antiCheatForm(player, `scaffoldK`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldK(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldK`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }


  scaffoldJ(player) {
    this.antiCheatForm(player, `scaffoldJ`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldJ(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldJ`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  inventoryActionF(player) {
    this.antiCheatForm(player, `inventoryActionF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.inventoryActionF(player)
        }

        this.dealAntiCheatForm(player, res, `inventoryActionF`, true, true)

        if (res.selection == 4) this.inventoryActionSetting(player)
      })
  }

  invalidSprintC(player) {
    this.antiCheatForm(player, `invalidSprintC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.invalidSprintC(player)
        }

        this.dealAntiCheatForm(player, res, `invalidSprintC`, true, true)

        if (res.selection == 4) this.invalidSprintSetting(player)
      })
  }

  scaffoldI(player) {
    this.antiCheatForm(player, `scaffoldI`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldI(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldI`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  scaffoldH(player) {
    this.antiCheatForm(player, `scaffoldH`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldH(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldH`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  blinkA(player) {
    this.antiCheatForm(player, `blinkA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.blinkA(player)
        }

        this.dealAntiCheatForm(player, res, `blinkA`, true, true)

        if (res.selection == 4) this.blinkSetting(player)
      })
  }

  nukerG(player) {
    this.antiCheatForm(player, `nukerG`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nukerG(player)
        }

        this.dealAntiCheatForm(player, res, `nukerG`, true, true)

        if (res.selection == 4) this.nukerSetting(player)
      })
  }

  nukerF(player) {
    this.antiCheatForm(player, `nukerF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nukerF(player)
        }

        this.dealAntiCheatForm(player, res, `nukerF`, true, true)

        if (res.selection == 4) this.nukerSetting(player)
      })
  }

  autoArmorA(player) {
    this.antiCheatForm(player, `autoArmorA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoArmorA(player)
        }

        this.dealAntiCheatForm(player, res, `autoArmorA`, true, true)

        if (res.selection == 4) this.autoArmorSetting(player)
      })
  }

  autoArmorB(player) {
    this.antiCheatForm(player, `autoArmorB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoArmorB(player)
        }

        this.dealAntiCheatForm(player, res, `autoArmorB`, true, true)

        if (res.selection == 4) this.autoArmorSetting(player)
      })
  }

  autoArmorC(player) {
    this.antiCheatForm(player, `autoArmorC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoArmorC(player)
        }

        this.dealAntiCheatForm(player, res, `autoArmorC`, true, true)

        if (res.selection == 4) this.autoArmorSetting(player)
      })
  }

  autoArmorD(player) {
    this.antiCheatForm(player, `autoArmorD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoArmorD(player)
        }

        this.dealAntiCheatForm(player, res, `autoArmorD`, true, true)

        if (res.selection == 4) this.autoArmorSetting(player)
      })
  }

  autoArmorE(player) {
    this.antiCheatForm(player, `autoArmorE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoArmorE(player)
        }

        this.dealAntiCheatForm(player, res, `autoArmorE`, true, true)

        if (res.selection == 4) this.autoArmorSetting(player)
      })
  }

  autoArmorF(player) {
    this.antiCheatForm(player, `autoArmorF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoArmorF(player)
        }

        this.dealAntiCheatForm(player, res, `autoArmorF`, true, true)

        if (res.selection == 4) this.autoArmorSetting(player)
      })
  }

  autoArmorG(player) {
    this.antiCheatForm(player, `autoArmorG`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoArmorG(player)
        }

        this.dealAntiCheatForm(player, res, `autoArmorG`, true, true)

        if (res.selection == 4) this.autoArmorSetting(player)
      })
  }

  autoShieldA(player) {
    this.antiCheatForm(player, `autoShieldA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoShieldA(player)
        }

        this.dealAntiCheatForm(player, res, `autoShieldA`, true, true)

        if (res.selection == 4) this.autoShieldSetting(player)
      })
  }

  autoShieldB(player) {
    this.antiCheatForm(player, `autoShieldB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoShieldB(player)
        }

        this.dealAntiCheatForm(player, res, `autoShieldB`, true, true)

        if (res.selection == 4) this.autoShieldSetting(player)
      })
  }

  autoShieldC(player) {
    this.antiCheatForm(player, `autoShieldC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoShieldC(player)
        }

        this.dealAntiCheatForm(player, res, `autoShieldC`, true, true)

        if (res.selection == 4) this.autoShieldSetting(player)
      })
  }

  autoShieldD(player) {
    this.antiCheatForm(player, `autoShieldD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoShieldD(player)
        }

        this.dealAntiCheatForm(player, res, `autoShieldD`, true, true)

        if (res.selection == 4) this.autoShieldSetting(player)
      })
  }

  autoShieldE(player) {
    this.antiCheatForm(player, `autoShieldE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoShieldE(player)
        }

        this.dealAntiCheatForm(player, res, `autoShieldE`, true, true)

        if (res.selection == 4) this.autoShieldSetting(player)
      })
  }

  autoShieldF(player) {
    this.antiCheatForm(player, `autoShieldF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoShieldF(player)
        }

        this.dealAntiCheatForm(player, res, `autoShieldF`, true, true)

        if (res.selection == 4) this.autoShieldSetting(player)
      })
  }

  autoShieldG(player) {
    this.antiCheatForm(player, `autoShieldG`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoShieldG(player)
        }

        this.dealAntiCheatForm(player, res, `autoShieldG`, true, true)

        if (res.selection == 4) this.autoShieldSetting(player)
      })
  }

  autoTotemA(player) {
    this.antiCheatForm(player, `autoTotemA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoTotemA(player)
        }

        this.dealAntiCheatForm(player, res, `autoTotemA`, true, true)

        if (res.selection == 4) this.autoTotemSetting(player)
      })
  }

  autoTotemB(player) {
    this.antiCheatForm(player, `autoTotemB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoTotemB(player)
        }

        this.dealAntiCheatForm(player, res, `autoTotemB`, true, true)

        if (res.selection == 4) this.autoTotemSetting(player)
      })
  }

  autoTotemC(player) {
    this.antiCheatForm(player, `autoTotemC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoTotemC(player)
        }

        this.dealAntiCheatForm(player, res, `autoTotemC`, true, true)

        if (res.selection == 4) this.autoTotemSetting(player)
      })
  }

  autoTotemD(player) {
    this.antiCheatForm(player, `autoTotemD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoTotemD(player)
        }

        this.dealAntiCheatForm(player, res, `autoTotemD`, true, true)

        if (res.selection == 4) this.autoTotemSetting(player)
      })
  }

  autoTotemE(player) {
    this.antiCheatForm(player, `autoTotemE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoTotemE(player)
        }

        this.dealAntiCheatForm(player, res, `autoTotemE`, true, true)

        if (res.selection == 4) this.autoTotemSetting(player)
      })
  }

  autoTotemF(player) {
    this.antiCheatForm(player, `autoTotemF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoTotemF(player)
        }

        this.dealAntiCheatForm(player, res, `autoTotemF`, true, true)

        if (res.selection == 4) this.autoTotemSetting(player)
      })
  }

  autoTotemG(player) {
    this.antiCheatForm(player, `autoTotemG`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoTotemG(player)
        }

        this.dealAntiCheatForm(player, res, `autoTotemG`, true, true)

        if (res.selection == 4) this.autoTotemSetting(player)
      })
  }

  scaffoldG(player) {
    this.antiCheatForm(player, `scaffoldG`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldG(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldG`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  scaffoldF(player) {
    this.antiCheatForm(player, `scaffoldF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldF(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldF`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  scaffoldE(player) {
    this.antiCheatForm(player, `scaffoldE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldE(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldE`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  scaffoldD(player) {
    this.antiCheatForm(player, `scaffoldD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldD(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldD`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  scaffoldC(player) {
    this.antiCheatForm(player, `scaffoldC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldC(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldC`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  scaffoldB(player) {
    this.antiCheatForm(player, `scaffoldB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldB(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldB`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  scaffoldA(player) {
    this.antiCheatForm(player, `scaffoldA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.scaffoldA(player)
        }

        this.dealAntiCheatForm(player, res, `scaffoldA`, true, true)

        if (res.selection == 4) this.scaffoldSetting(player)
      })
  }

  killauraI(player) {
    this.antiCheatForm(player, `killauraI`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraI(player)
        }

        this.dealAntiCheatForm(player, res, `killauraI`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  reachD(player) {
    this.antiCheatForm(player, `reachD`, true, true)
      .button(`§1${Hutao.Player.getLanguage(player).distance} \n§8${setting.default.data.antiCheat.reachD.distance}`, `textures/ui/strength_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.reachA(player)
        }

        this.dealAntiCheatForm(player, res, `reachD`, true, true)

        if (res.selection == 4) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .textField(Hutao.Player.getLanguage(player).pleaseEnterTheMaxDistance, `< Int >`, String(setting.default.data.antiCheat.reachD.distance))
            .show(player)
            .then(res => {
              if (res.canceled) return this.reachD(player)

              const validNumber = (number) => {
                if (number.trim() == "") return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotBeEmpty
                }

                if (isNaN(Number(number))) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).mustBeNumber
                }

                if (number < 1) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotLessThan1
                }

                return {
                  condition: false,
                  reason: `None`
                }
              }

              if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

              let config = Hutao.Database.get("db")

              config.data.antiCheat.reachD.distance = Math.floor(Number(res.formValues[0]))

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.reachA(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 5) this.reachSetting(player)
      })
  }

  reachC(player) {
    this.antiCheatForm(player, `reachC`, true, true)
      .button(`§1${Hutao.Player.getLanguage(player).distance} \n§8${setting.default.data.antiCheat.reachC.distance}`, `textures/ui/strength_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.reachA(player)
        }

        this.dealAntiCheatForm(player, res, `reachC`, true, true)

        if (res.selection == 4) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .textField(Hutao.Player.getLanguage(player).pleaseEnterTheMaxDistance, `< Int >`, String(setting.default.data.antiCheat.reachC.distance))
            .show(player)
            .then(res => {
              if (res.canceled) return this.reachC(player)

              const validNumber = (number) => {
                if (number.trim() == "") return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotBeEmpty
                }

                if (isNaN(Number(number))) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).mustBeNumber
                }

                if (number < 1) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotLessThan1
                }

                return {
                  condition: false,
                  reason: `None`
                }
              }

              if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

              let config = Hutao.Database.get("db")

              config.data.antiCheat.reachC.distance = Math.floor(Number(res.formValues[0]))

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.reachA(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 5) this.reachSetting(player)
      })
  }

  reachB(player) {
    this.antiCheatForm(player, `reachB`, true, true)
      .button(`§1${Hutao.Player.getLanguage(player).distance} \n§8${setting.default.data.antiCheat.reachA.distance}`, `textures/ui/strength_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.reachA(player)
        }

        this.dealAntiCheatForm(player, res, `reachB`, true, true)

        if (res.selection == 4) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .textField(Hutao.Player.getLanguage(player).pleaseEnterTheMaxDistance, `< Int >`, String(setting.default.data.antiCheat.reachB.distance))
            .show(player)
            .then(res => {
              if (res.canceled) return this.reachB(player)

              const validNumber = (number) => {
                if (number.trim() == "") return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotBeEmpty
                }

                if (isNaN(Number(number))) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).mustBeNumber
                }

                if (number < 1) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotLessThan1
                }

                return {
                  condition: false,
                  reason: `None`
                }
              }

              if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

              let config = Hutao.Database.get("db")

              config.data.antiCheat.reachB.distance = Math.floor(Number(res.formValues[0]))

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.reachA(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 5) this.reachSetting(player)
      })
  }

  reachA(player) {
    this.antiCheatForm(player, `reachA`, true, true)
      .button(`§1${Hutao.Player.getLanguage(player).distance} \n§8${setting.default.data.antiCheat.reachA.distance}`, `textures/ui/strength_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.reachA(player)
        }

        this.dealAntiCheatForm(player, res, `reachA`, true, true)

        if (res.selection == 4) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .textField(Hutao.Player.getLanguage(player).pleaseEnterTheMaxDistance, `< Int >`, String(setting.default.data.antiCheat.reachA.distance))
            .show(player)
            .then(res => {
              if (res.canceled) return this.reachA(player)

              const validNumber = (number) => {
                if (number.trim() == "") return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotBeEmpty
                }

                if (isNaN(Number(number))) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).mustBeNumber
                }

                if (number < 1) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotLessThan1
                }

                return {
                  condition: false,
                  reason: `None`
                }
              }

              if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

              let config = Hutao.Database.get("db")

              config.data.antiCheat.reachA.distance = Math.floor(Number(res.formValues[0]))

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.reachA(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 5) this.reachSetting(player)
      })
  }

  speedA(player) {
    this.antiCheatForm(player, `speedA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.speedA(player)
        }

        this.dealAntiCheatForm(player, res, `speedA`, true, true)

        if (res.selection == 4) this.speedSetting(player)
      })
  }

  spammerL(player) {
    this.antiCheatForm(player, `spammerL`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerL(player)
        }

        this.dealAntiCheatForm(player, res, `spammerL`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerK(player) {
    this.antiCheatForm(player, `spammerK`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerK(player)
        }

        this.dealAntiCheatForm(player, res, `spammerK`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerJ(player) {
    this.antiCheatForm(player, `spammerJ`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerJ(player)
        }

        this.dealAntiCheatForm(player, res, `spammerJ`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerI(player) {
    this.antiCheatForm(player, `spammerI`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerI(player)
        }

        this.dealAntiCheatForm(player, res, `spammerI`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerH(player) {
    this.antiCheatForm(player, `spammerH`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerH(player)
        }

        this.dealAntiCheatForm(player, res, `spammerH`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerG(player) {
    this.antiCheatForm(player, `spammerG`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerG(player)
        }

        this.dealAntiCheatForm(player, res, `spammerG`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerF(player) {
    this.antiCheatForm(player, `spammerF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerF(player)
        }

        this.dealAntiCheatForm(player, res, `spammerF`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerE(player) {
    this.antiCheatForm(player, `spammerE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerE(player)
        }

        this.dealAntiCheatForm(player, res, `spammerE`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerD(player) {
    this.antiCheatForm(player, `spammerD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerD(player)
        }

        this.dealAntiCheatForm(player, res, `spammerD`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerC(player) {
    this.antiCheatForm(player, `spammerC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerC(player)
        }

        this.dealAntiCheatForm(player, res, `spammerC`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerB(player) {
    this.antiCheatForm(player, `spammerB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerB(player)
        }

        this.dealAntiCheatForm(player, res, `spammerB`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  spammerA(player) {
    this.antiCheatForm(player, `spammerA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.spammerA(player)
        }

        this.dealAntiCheatForm(player, res, `spammerA`, true, true)

        if (res.selection == 4) this.spammerSetting(player)
      })
  }

  nukerE(player) {
    this.antiCheatForm(player, `nukerE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nukerE(player)
        }

        this.dealAntiCheatForm(player, res, `nukerE`, true, true)

        if (res.selection == 4) this.nukerSetting(player)
      })
  }

  nukerD(player) {
    this.antiCheatForm(player, `nukerD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nukerD(player)
        }

        this.dealAntiCheatForm(player, res, `nukerD`, true, true)

        if (res.selection == 4) this.nukerSetting(player)
      })
  }

  nukerC(player) {
    this.antiCheatForm(player, `nukerC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nukerC(player)
        }

        this.dealAntiCheatForm(player, res, `nukerC`, true, true)

        if (res.selection == 4) this.nukerSetting(player)
      })
  }

  nukerB(player) {
    this.antiCheatForm(player, `nukerB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nukerB(player)
        }

        this.dealAntiCheatForm(player, res, `nukerB`, true, true)

        if (res.selection == 4) this.nukerSetting(player)
      })
  }

  nukerA(player) {
    this.antiCheatForm(player, `nukerA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nukerA(player)
        }

        this.dealAntiCheatForm(player, res, `nukerA`, true, true)

        if (res.selection == 4) this.nukerSetting(player)
      })
  }

  noSlowDownB(player) {
    this.antiCheatForm(player, `noSlowDownB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.noSlowDownB(player)
        }

        this.dealAntiCheatForm(player, res, `noSlowDownB`, true, true)

        if (res.selection == 4) this.noSlowDownSetting(player)
      })
  }

  noSlowDownA(player) {
    this.antiCheatForm(player, `noSlowDownA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.noSlowDownA(player)
        }

        this.dealAntiCheatForm(player, res, `noSlowDownA`, true, true)

        if (res.selection == 4) this.noSlowDownSetting(player)
      })
  }

  noFallA(player) {
    this.antiCheatForm(player, `noFallA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.noFallA(player)
        }

        this.dealAntiCheatForm(player, res, `noFallA`, true, true)

        if (res.selection == 4) this.noFallSetting(player)
      })
  }

  nameSpoofB(player) {
    this.antiCheatForm(player, `nameSpoofB`, true, false)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nameSpoofB(player)
        }

        this.dealAntiCheatForm(player, res, `nameSpoofB`, true, false)

        if (res.selection == 4) this.nameSpoofSetting(player)
      })
  }

  nameSpoofA(player) {
    this.antiCheatForm(player, `nameSpoofA`, true, false)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.nameSpoofA(player)
        }

        this.dealAntiCheatForm(player, res, `nameSpoofA`, true, false)

        if (res.selection == 4) this.nameSpoofSetting(player)
      })
  }

  movementA(player) {
    this.antiCheatForm(player, `movementA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.movementA(player)
        }

        this.dealAntiCheatForm(player, res, `movementA`, true, true)

        if (res.selection == 4) this.movementSetting(player)
      })
  }

  killauraH(player) {
    this.antiCheatForm(player, `killauraH`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraH(player)
        }

        this.dealAntiCheatForm(player, res, `killauraH`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  killauraG(player) {
    this.antiCheatForm(player, `killauraG`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraG(player)
        }

        this.dealAntiCheatForm(player, res, `killauraG`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  killauraF(player) {
    this.antiCheatForm(player, `killauraF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraF(player)
        }

        this.dealAntiCheatForm(player, res, `killauraF`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  killauraE(player) {
    this.antiCheatForm(player, `killauraE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraE(player)
        }

        this.dealAntiCheatForm(player, res, `killauraE`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  killauraD(player) {
    this.antiCheatForm(player, `killauraD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraD(player)
        }

        this.dealAntiCheatForm(player, res, `killauraD`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  killauraC(player) {
    this.antiCheatForm(player, `killauraC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraC(player)
        }

        this.dealAntiCheatForm(player, res, `killauraC`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  killauraB(player) {
    this.antiCheatForm(player, `killauraB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraB(player)
        }

        this.dealAntiCheatForm(player, res, `killauraB`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  killauraA(player) {
    this.antiCheatForm(player, `killauraA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.killauraA(player)
        }

        this.dealAntiCheatForm(player, res, `killauraA`, true, true)

        if (res.selection == 4) this.killauraSetting(player)
      })
  }

  itemCheckK(player) {
    this.antiCheatForm(player, `itemCheckK`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckK(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckK`, true, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckJ(player) {
    this.antiCheatForm(player, `itemCheckJ`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckJ(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckJ`, true, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckI(player) {
    this.antiCheatForm(player, `itemCheckI`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckI(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckI`, true, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckH(player) {
    this.antiCheatForm(player, `itemCheckH`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckH(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckH`, true, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckG(player) {
    this.antiCheatForm(player, `itemCheckG`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckG(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckG`, true, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckF(player) {
    this.antiCheatForm(player, `itemCheckF`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckF(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckF`, true, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckE(player) {
    this.antiCheatForm(player, `itemCheckE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckE(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckE`, true, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckD(player) {
    this.antiCheatForm(player, `itemCheckD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckD(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckD`, true, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckC(player) {
    this.antiCheatForm(player, `itemCheckC`, false, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckC(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckC`, false, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckB(player) {
    this.antiCheatForm(player, `itemCheckB`, false, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckB(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckB`, false, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  itemCheckA(player) {
    this.antiCheatForm(player, `itemCheckA`, false, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemCheckA(player)
        }

        this.dealAntiCheatForm(player, res, `itemCheckA`, false, true)

        if (res.selection == 4) this.itemCheckSetting(player)
      })
  }

  inventoryActionE(player) {
    this.antiCheatForm(player, `inventoryActionE`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.inventoryActionE(player)
        }

        this.dealAntiCheatForm(player, res, `inventoryActionE`, true, true)

        if (res.selection == 4) this.inventoryActionSetting(player)
      })
  }

  inventoryActionD(player) {
    this.antiCheatForm(player, `inventoryActionD`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.inventoryActionD(player)
        }

        this.dealAntiCheatForm(player, res, `inventoryActionD`, true, true)

        if (res.selection == 4) this.inventoryActionSetting(player)
      })
  }

  inventoryActionC(player) {
    this.antiCheatForm(player, `inventoryActionC`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.inventoryActionC(player)
        }

        this.dealAntiCheatForm(player, res, `inventoryActionC`, true, true)

        if (res.selection == 4) this.inventoryActionSetting(player)
      })
  }

  inventoryActionB(player) {
    this.antiCheatForm(player, `inventoryActionB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.inventoryActionB(player)
        }

        this.dealAntiCheatForm(player, res, `inventoryActionB`, true, true)

        if (res.selection == 4) this.inventoryActionSetting(player)
      })
  }

  inventoryActionA(player) {
    this.antiCheatForm(player, `inventoryActionA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.inventoryActionA(player)
        }

        this.dealAntiCheatForm(player, res, `inventoryActionA`, true, true)

        if (res.selection == 4) this.inventoryActionSetting(player)
      })
  }

  invalidSprintB(player) {
    this.antiCheatForm(player, `invalidSprintB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.invalidSprintB(player)
        }

        this.dealAntiCheatForm(player, res, `invalidSprintB`, true, true)

        if (res.selection == 4) this.invalidSprintSetting(player)
      })
  }

  invalidSprintA(player) {
    this.antiCheatForm(player, `invalidSprintA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.invalidSprintA(player)
        }

        this.dealAntiCheatForm(player, res, `invalidSprintA`, true, true)

        if (res.selection == 4) this.invalidSprintSetting(player)
      })
  }

  flyA(player) {
    this.antiCheatForm(player, `flyA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.flyA(player)
        }

        this.dealAntiCheatForm(player, res, `flyA`, true, true)

        if (res.selection == 4) this.flySetting(player)
      })
  }

  fastThrowA(player) {
    this.antiCheatForm(player, `fastThrowA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.fastThrowA(player)
        }

        this.dealAntiCheatForm(player, res, `fastThrowA`, true, true)

        if (res.selection == 4) this.fastThrowSetting(player)
      })
  }

  fastLadderA(player) {
    this.antiCheatForm(player, `fastLadderA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.fastLadderA(player)
        }

        this.dealAntiCheatForm(player, res, `fastLadderA`, true, true)

        if (res.selection == 4) this.fastLadderSetting(player)
      })
  }

  entityCheckB(player) {
    this.antiCheatForm(player, `auraB`, false, false)
      .button(`§1${Hutao.Player.getLanguage(player).maxAmount} \n§8${setting.default.data.antiCheat.entityCheckB.maxAmount}`, `textures/blocks/barrier`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.auraB(player)
        }

        this.dealAntiCheatForm(player, res, `auraB`, false, false)

        if (res.selection == 2) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .textField(Hutao.Player.getLanguage(player).pleaseEnterTheMaxAmountOfTheEntities, `< Int >`, String(setting.default.data.antiCheat.entityCheckB.maxAmount))
            .show(player)
            .then(res => {
              if (res.canceled) return this.entityCheckB(player)

              const validNumber = (number) => {
                if (number.trim() == "") return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotBeEmpty
                }

                if (isNaN(Number(number))) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).mustBeNumber
                }

                if (number < 1) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotLessThan1
                }

                return {
                  condition: false,
                  reason: `None`
                }
              }

              if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

              let config = Hutao.Database.get("db")

              config.data.antiCheat.entityCheckB.maxAmount = Math.floor(Number(res.formValues[0]))

              Hutao.Database.set("db")
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.entityCheckB(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 3) this.entityCheckSetting(player)
      })
  }

  entityCheckA(player) {
    this.antiCheatForm(player, `entityCheckA`, false, false)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.entityCheckA(player)
        }

        this.dealAntiCheatForm(player, res, `entityCheckA`, false, false)

        if (res.selection == 2) this.entityCheckSetting(player)
      })
  }

  crasherB(player) {
    this.antiCheatForm(player, `crasherB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.crasherB(player)
        }

        this.dealAntiCheatForm(player, res, `crasherB`, true, true)

        if (res.selection == 4) this.crasherSetting(player)
      })
  }

  crasherA(player) {
    this.antiCheatForm(player, `crasherA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.crasherA(player)
        }

        this.dealAntiCheatForm(player, res, `crasherA`, true, true)

        if (res.selection == 4) this.crasherSetting(player)
      })
  }

  badPacketB(player) {
    this.antiCheatForm(player, `badPacketB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.badPacketB(player)
        }

        this.dealAntiCheatForm(player, res, `badPacketB`, true, true)

        if (res.selection == 4) this.badPacketSetting(player)
      })
  }

  badPacketA(player) {
    this.antiCheatForm(player, `badPacketA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.badPacketA(player)
        }

        this.dealAntiCheatForm(player, res, `badPacketA`, true, true)

        if (res.selection == 4) this.badPacketSetting(player)
      })
  }

  autoToolA(player) {
    this.antiCheatForm(player, `autoToolA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoToolA(player)
        }

        this.dealAntiCheatForm(player, res, `autoToolA`, true, true)

        if (res.selection == 4) this.autoToolSetting(player)
      })
  }

  autoClickerB(player) {
    this.antiCheatForm(player, `autoClickerB`, true, true)
      .button(`§1${Hutao.Player.getLanguage(player).maxCps}`, `textures/ui/strength_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoClickerB(player)
        }

        this.dealAntiCheatForm(player, res, `autoClickerB`, true, true)

        if (res.selection == 4) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .textField(Hutao.Player.getLanguage(player).pleaseEnterTheMaxCps, `< Int >`, String(setting.default.data.antiCheat.autoClickerB.maxCPS))
            .show(player)
            .then(res => {
              if (res.canceled) return this.autoClickerB(player)

              const validNumber = (number) => {
                if (number.trim() == "") return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotBeEmpty
                }

                if (isNaN(Number(number))) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).mustBeNumber
                }

                if (number < 1) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotLessThan1
                }

                return {
                  condition: false,
                  reason: `None`
                }
              }

              if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

              let config = Hutao.Database.get("db")

              config.data.antiCheat.autoClickerB.maxCPS = Math.floor(Number(res.formValues[0]))

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.autoClickerB(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 5) this.autoClickerSetting(player)
      })
  }

  autoClickerA(player) {
    this.antiCheatForm(player, `autoClickerA`, true, true)
      .button(`§1${Hutao.Player.getLanguage(player).maxCps}`, `textures/ui/strength_effect`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.autoClickerA(player)
        }

        this.dealAntiCheatForm(player, res, `autoClickerA`, true, true)

        if (res.selection == 4) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .textField(Hutao.Player.getLanguage(player).pleaseEnterTheMaxCps, `< Int >`, String(setting.default.data.antiCheat.autoClickerA.maxCPS))
            .show(player)
            .then(res => {
              if (res.canceled) return this.autoClickerA(player)

              const validNumber = (number) => {
                if (number.trim() == "") return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotBeEmpty
                }

                if (isNaN(Number(number))) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).mustBeNumber
                }

                if (number < 1) return {
                  condition: true,
                  reason: Hutao.Player.getLanguage(player).cannotLessThan1
                }

                return {
                  condition: false,
                  reason: `None`
                }
              }

              if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

              let config = Hutao.Database.get("db")

              config.data.antiCheat.autoClickerA.maxCPS = Math.floor(Number(res.formValues[0]))

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.autoClickerA(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 5) this.autoClickerSetting(player)
      })
  }

  auraB(player) {
    this.antiCheatForm(player, `auraB`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.auraB(player)
        }

        this.dealAntiCheatForm(player, res, `auraB`, true, true)

        if (res.selection == 4) this.auraSetting(player)
      })
  }

  auraA(player) {
    this.antiCheatForm(player, `auraA`, true, true)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.auraA(player)
        }

        this.dealAntiCheatForm(player, res, `auraA`, true, true)

        if (res.selection == 4) this.auraSetting(player)
      })
  }

  entityList(player) {
    const form = this.entityForm(player)

    form.form
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.entityList(player)
        }

        this.dealEntityForm(player, res, form)
      })
  }

  itemList(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).banItem}`, `textures/blocks/barrier`)
      .button(`§1${Hutao.Player.getLanguage(player).kickItem}`, `textures/ui/friend_glyph_desaturated`)
      .button(`§1${Hutao.Player.getLanguage(player).tempkickItem}`, `textures/ui/chat_send`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.itemList(player)
        }

        if (res.selection == 0) this.banItem(player)
        if (res.selection == 1) this.kickItem(player)
        if (res.selection == 2) this.tempkickItem(player)
        if (res.selection == 3) this.open(player)
      })
  }

  banItem(player) {
    const form = this.itemsForm(player, `ban`)

    form.form
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.banItem(player)
        }

        this.dealItemsForm(player, res, `ban`, form)
      })
  }

  kickItem(player) {
    const form = this.itemsForm(player, `kick`)

    form.form
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.kickItem(player)
        }

        this.dealItemsForm(player, res, `kick`, form)
      })
  }

  tempkickItem(player) {
    const form = this.itemsForm(player, `tempkick`)

    form.form
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.tempkickItem(player)
        }

        this.dealItemsForm(player, res, `tempkick`, form)
      })
  }

  antiCheatForm(player, type, punish = true, flag = true) {
    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .body([
        `§e${Hutao.Player.getLanguage(player).project} §r§7▶ §6${dealAntiCheat[type]}`,
        Hutao.Player.getLanguage(player)[`${type}Description`],
        ``,
        ``
      ].join("\n§r"))
      .button(`§c${Hutao.Player.getLanguage(player).initialization}`, 'textures/ui/refresh')
      .button(`§1${Hutao.Player.getLanguage(player).state}\n§r§8${setting.default.data.antiCheat[type].state}`, `textures/ui/toggle_${setting.default.data.antiCheat[type].state ? `on` : `off`}`)

    if (punish) {
      form.button(`§1${Hutao.Player.getLanguage(player).punishment}\n§r§8${setting.default.data.antiCheat[type].punishment}`, `textures/ui/strength_effect`)
    }

    if (flag) {
      form.button(`§1${Hutao.Player.getLanguage(player).limitOfFlags}\n§r§8${setting.default.data.antiCheat[type].flags}`, `textures/ui/up_chevron`)
    }

    return form
  }

  dealAntiCheatForm(player, res, type, punish = true, flag = true) {
    if (res.selection == 0) {
      new UI.MessageFormData()
        .title(`§7<< §c${dealAntiCheat[type]} §r§7>>`)
        .body(Hutao.Player.getLanguage(player).areYouSureYouWantToInitializeThisFunction)
        .button1(`§c${Hutao.Player.getLanguage(player).thinkAboutIt}`)
        .button2(`§a${Hutao.Player.getLanguage(player).sure}`)
        .show(player)
        .then(res => {
          if (res.selection == 1) {
            let config = Hutao.Database.get("db")

            config.data.antiCheat[type] = configCache.data.antiCheat[type]
            Hutao.Database.set("db", config)
            Hutao.World.success(player, Hutao.Player.getLanguage(player).initializationSuccessfully)

            Hutao.SetTickTimeOut(() => {
              this.open(player)
            }, 5, 1, false).on()
          } else if (res.selection == 0) {
            this[type](player)
          }
        })
    } else if (res.selection == 1) {
      new UI.ModalFormData()
        .title(Hutao.Player.getLanguage(player).adminMenuTitle)
        .toggle(`§7${Hutao.Player.getLanguage(player).disabledEnabled} ${dealAntiCheat[type]}`, setting.default.data.antiCheat[type].state)
        .show(player)
        .then(res => {
          if (res.canceled) return this[type](player)

          let config = Hutao.Database.get("db")

          config.data.antiCheat[type].state = res.formValues[0]
          Hutao.Database.set("db", config)
          Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

          Hutao.SetTickTimeOut(() => {
            this[type](player)
          }, 5, 1, false).on()
        })
    }

    if (res.selection == 2) {
      if (punish) {
        new UI.ModalFormData()
          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
          .dropdown(`§6${Hutao.Player.getLanguage(player).punishment} \n\n
          §r§7${Hutao.Player.getLanguage(player).punshmentBan}
\n${Hutao.Player.getLanguage(player).punshmentKick}
\n${Hutao.Player.getLanguage(player).punshmentTempkick}
\n${Hutao.Player.getLanguage(player).punshmentNotify}
\n${Hutao.Player.getLanguage(player).punshmentNone}`,
            [
              Hutao.Player.getLanguage(player).punshmentBan,
              Hutao.Player.getLanguage(player).punshmentKick,
              Hutao.Player.getLanguage(player).punshmentTempkick,
              Hutao.Player.getLanguage(player).punshmentNotify,
              Hutao.Player.getLanguage(player).punshmentNone
            ],
            [
              "ban",
              "kick",
              "tempkick",
              "notify",
              "none"
            ].indexOf(setting.default.data.antiCheat[type].punishment)
          )
          .show(player)
          .then(res => {
            if (res.canceled) return this[type](player)

            let config = Hutao.Database.get("db")

            config.data.antiCheat[type].punishment = [
              "ban",
              "kick",
              "tempkick",
              "notify",
              "none"
            ][res.formValues[0]]

            Hutao.Database.set("db", config)
            Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

            Hutao.SetTickTimeOut(() => {
              this[type](player)
            }, 5, 1, false).on()
          })
      } else if (flag) {
        new UI.ModalFormData()
          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
          .textField(Hutao.Player.getLanguage(player).pleaseEnterTheLimitOfTheFlags, "<Number>", String(setting.default.data.antiCheat[type].flags))
          .show(player)
          .then(res => {
            if (res.canceled) return this[type](player)

            const validNumber = (number) => {
              if (number.trim() == "") return {
                condition: true,
                reason: Hutao.Player.getLanguage(player).cannotBeEmpty
              }

              if (isNaN(Number(number))) return {
                condition: true,
                reason: Hutao.Player.getLanguage(player).mustBeNumber
              }

              if (number < 1) return {
                condition: true,
                reason: Hutao.Player.getLanguage(player).cannotLessThan1
              }

              return {
                condition: false,
                reason: "None"
              }
            }

            if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

            let config = Hutao.Database.get("db")

            config.data.antiCheat[type].flags = Math.floor(Number(res.formValues[0]))
            Hutao.Database.set("db", config)
            Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

            Hutao.SetTickTimeOut(() => {
              this[type](player)
            }, 5, 1, false).on()
          })
      } else return
    }

    if (res.selection == 3) {
      if (flag) {
        new UI.ModalFormData()
          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
          .textField(Hutao.Player.getLanguage(player).pleaseEnterTheLimitOfTheFlags, "<Number>", String(setting.default.data.antiCheat[type].flags))
          .show(player)
          .then(res => {
            if (res.canceled) return this[type](player)

            const validNumber = (number) => {
              if (number.trim() == "") return {
                condition: true,
                reason: Hutao.Player.getLanguage(player).cannotBeEmpty
              }

              if (isNaN(Number(number))) return {
                condition: true,
                reason: Hutao.Player.getLanguage(player).mustBeNumber
              }

              if (number < 1) return {
                condition: true,
                reason: Hutao.Player.getLanguage(player).cannotLessThan1
              }

              return {
                condition: false,
                reason: "None"
              }
            }

            if (validNumber(res.formValues[0]).condition) return Hutao.World.wrong(player, validNumber(res.formValues[0]).reason)

            let config = Hutao.Database.get("db")

            config.data.antiCheat[type].flags = Math.floor(Number(res.formValues[0]))
            Hutao.Database.set("db", config)
            Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

            Hutao.SetTickTimeOut(() => {
              this[type](player)
            }, 5, 1, false).on()
          })
      }
    }
  }

  itemsForm(player, type) {
    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).refresh}`, "textures/ui/refresh_light")

    const items = setting.default.data.antiCheat.itemList[type]
    items.forEach(item => form.button(item))

    form.button(`§1${Hutao.Player.getLanguage(player).addItems}`, "textures/ui/color_plus")
      .button(`§c${Hutao.Player.getLanguage(player).back}`, "textures/ui/arrow_dark_left_stretch")

    return {
      form: form,
      items: items
    }
  }

  dealItemsForm(player, res, type, form) {
    if (res.canceled) return

    if (res.selection == 0) return this[`${type}Item`](player)
    else if ((res.selection - 1) == form.items.length) {
      new UI.ModalFormData()
        .title(Hutao.Player.getLanguage(player).adminMenuTitle)
        .textField(Hutao.Player.getLanguage(player).pleaseEnterTheIdOfTheItem, "<String>")
        .show(player)
        .then(res => {
          if (res.canceled) return this[`${type}Item`](player)

          if (res.formValues[0].trim() == "") return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).cannotBeEmpty)
          if (setting.default.data.antiCheat.itemList[type].includes(res.formValues[0].trim())) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheItem)

          let config = Hutao.Database.get("db")
          config.data.antiCheat.itemList[type].push(res.formValues[0].trim().toLowerCase())
          Hutao.Database.set("db", config)

          Hutao.World.success(player, Hutao.Player.getLanguage(player).addSuccessfully)

          Hutao.SetTickTimeOut(() => {
            this[`${type}Item`](player)
          }, 5, 1, false).on()
        })
    } else if ((res.selection - 1) == form.items.length + 1) return this.open(player)
    else if (
      res.selection > 0 &&
      (res.selection - 1) < form.items.length
    ) {
      const response = res.selection - 1

      if (this.notItem(type, form.items[response])) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).theItemWasRemoved)

      new UI.ModalFormData()
        .title(Hutao.Player.getLanguage(player).adminMenuTitle)
        .textField(Hutao.Player.getLanguage(player).pleaseEnterTheIdOfTheItem, "<String>", form.items[response])
        .toggle(`§c${Hutao.Player.getLanguage(player).removeItem}`)
        .show(player)
        .then(res => {
          if (res.canceled) return this[`${type}Item`](player)

          let config = Hutao.Database.get("db")

          const index = setting.default.data.antiCheat.itemList[type].indexOf(form.items[response])

          if (res.formValues[1]) {
            if (index != -1) config.data.antiCheat.itemList[type].splice(index, 1)

            Hutao.World.success(player, Hutao.Player.getLanguage(player).removeSuccessfully)
          } else {
            if (res.formValues[0].trim() == "") return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).cannotBeEmpty)
            if (setting.default.data.antiCheat.itemList[type].includes(res.formValues[0].trim().toLowerCase())) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheItem)

            if (index != -1) {
              config.data.antiCheat.itemList[type][index] = res.formValues[0].trim().toLowerCase()
            } else {
              config.data.antiCheat.itemList[type].push(res.formValues[0].trim())
            }

            Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
          }

          Hutao.Database.set("db", config)

          Hutao.SetTickTimeOut(() => {
            this[`${type}Item`](player)
          }, 5, 1, false).on()
        })
    }
  }

  entityForm(player) {
    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).refresh}`, "textures/ui/refresh_light")

    const entities = setting.default.data.antiCheat.entityList

    entities.forEach(entity => form.button(entity))

    form.button(`§1${Hutao.Player.getLanguage(player).addEntities}`, "textures/ui/color_plus")
      .button(`§c${Hutao.Player.getLanguage(player).back}`, "textures/ui/arrow_dark_left_stretch")

    return {
      form: form,
      entities: entities
    }
  }

  dealEntityForm(player, res, form) {
    if (res.canceled) return

    if (res.selection == 0) return this.entityList(player)
    else if ((res.selection - 1) == form.entities.length) {
      new UI.ModalFormData()
        .title(Hutao.Player.getLanguage(player).adminMenuTitle)
        .textField(Hutao.Player.getLanguage(player).pleaseEnterTheIdOfTheEntity, "<String>")
        .show(player)
        .then(res => {
          if (res.canceled) return this.entityList(player)

          if (res.formValues[0].trim() == "") return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).cannotBeEmpty)
          if (res.formValues[0].trim() == "minecraft:player") return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).cannotBePlayer)

          if (setting.default.data.antiCheat.entityList.includes(res.formValues[0].trim().toLowerCase())) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheEntity)

          let config = Hutao.Database.get("db")

          config.data.antiCheat.entityList.push(res.formValues[0].trim())

          Hutao.Database.set("db", config)

          Hutao.World.success(player, Hutao.Player.getLanguage(player).addSuccessfully)

          Hutao.SetTickTimeOut(() => {
            this.entityList(player)
          }, 5, 1, false).on()
        })
    } else if ((res.selection - 1) == form.entities.length + 1) return this.open(player)
    else if (
      res.selection > 0 &&
      (res.selection - 1) < form.entities.length
    ) {
      const response = res.selection - 1

      if (this.notEntity(form.entities[response])) return Hutao.World.wrong(player, Player.getLanguage(player).theEntityWasRemoved)

      new UI.ModalFormData()
        .title(Hutao.Player.getLanguage(player).adminMenuTitle)
        .textField(Hutao.Player.getLanguage(player).pleaseEnterTheIdOfTheEntity, "<String>", form.entities[response])
        .toggle(`§c${Hutao.Player.getLanguage(player).removeEntity}`)
        .show(player)
        .then(res => {
          if (res.canceled) return this.entityList(player)

          let config = Hutao.Database.get("db")

          const index = setting.default.data.antiCheat.entityList.indexOf(form.entities[response])

          if (res.formValues[1]) {
            if (index != -1) config.data.antiCheat.entityList.splice(index, 1)

            Hutao.World.success(player, Hutao.Player.getLanguage(player).removeSuccessfully)
          } else {
            if (res.formValues[0].trim() == "") return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).cannotBeEmpty)

            if (res.formValues[0].trim() == "minecraft:player") return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).cannotBePlayer)

            if (setting.default.data.antiCheat.entityList.includes(res.formValues[0].trim().toLowerCase())) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheEntity)

            if (index != -1) {
              config.data.antiCheat.entityList[index] = res.formValues[0].trim().toLowerCase()
            }

            Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
          }

          Hutao.Database.set("db", config)

          Hutao.SetTickTimeOut(() => {
            this.entityList(player)
          }, 5, 1, false).on()
        })
    }
  }

  notItem(type, items) {
    return !setting.default.data.antiCheat.itemList[type].includes(items)
  }

  notEntity(entity) {
    return !setting.default.data.antiCheat.entityList.includes(entity)
  }
}

const getEnabled = (player, item, type) => {
  if (setting.default.data.antiCheat[item].state) {
    return `§a${Hutao.Player.getLanguage(player).enabled}`
  } else {
    return `§c${Hutao.Player.getLanguage(player).disabled}`
  }
}

const dealAntiCheat = {
  auraA: `Aura/A`,
  auraB: `Aura/B`,
  autoArmorA: "AutoArmor/A",
  autoArmorB: "AutoArmor/B",
  autoArmorC: "AutoArmor/C",
  autoArmorD: "AutoArmor/D",
  autoArmorE: "AutoArmor/E",
  autoArmorF: "AutoArmor/F",
  autoArmorG: "AutoArmor/G",
  autoClickerA: `AutoClicker/A`,
  autoClickerB: `AutoClicker/B`,
  autoShieldA: "AutoShield/A",
  autoShieldB: "AutoShield/B",
  autoShieldC: "AutoShield/C",
  autoShieldD: "AutoShield/D",
  autoShieldE: "AutoShield/E",
  autoShieldF: "AutoShield/F",
  autoShieldG: "AutoShield/G",
  autoToolA: `AutoTool/A`,
  autoTotemA: "AutoTotem/A",
  autoTotemB: "AutoTotem/B",
  autoTotemC: "AutoTotem/C",
  autoTotemD: "AutoTotem/D",
  autoTotemE: "AutoTotem/E",
  autoTotemF: "AutoTotem/F",
  autoTotemG: "AutoTotem/G",
  blinkA: "Blink/A",
  badPacketA: `BadPacket/A`,
  badPacketB: "BadPacket/B",
  badPacketC: `BadPacket/C`,
  crasherA: `Crasher/A`,
  crasherB: `Crasher/B`,
  entityCheckA: `EntityCheck/A`,
  entityCheckB: `EntityCheck/B`,
  fastLadderA: `FastLadder/A`,
  fastThrowA: `FastThrow/A`,
  flyA: `Fly/A`,
  invalidSprintA: `InvalidSprint/A`,
  invalidSprintB: `InvalidSprint/B`,
  invalidSprintC: `InvalidSprint/C`,
  inventoryActionA: `InventoryAction/A`,
  inventoryActionB: `InventoryAction/B`,
  inventoryActionC: `InventoryAction/C`,
  inventoryActionD: `InventoryAction/D`,
  inventoryActionE: `InventoryAction/E`,
  inventoryActionF: `InventoryAction/F`,
  itemCheckA: `ItemCheck/A`,
  itemCheckB: `ItemCheck/B`,
  itemCheckC: `ItemCheck/C`,
  itemCheckD: `ItemCheck/D`,
  itemCheckE: `ItemCheck/E`,
  itemCheckF: `ItemCheck/F`,
  itemCheckG: `ItemCheck/G`,
  itemCheckH: `ItemCheck/H`,
  itemCheckI: `ItemCheck/I`,
  itemCheckJ: `ItemCheck/J`,
  itemCheckK: `ItemCheck/K`,
  killauraA: `Killaura/A`,
  killauraB: `Killaura/B`,
  killauraC: `Killaura/C`,
  killauraD: `Killaura/D`,
  killauraE: `Killaura/E`,
  killauraF: `Killaura/F`,
  killauraG: `Killaura/G`,
  killauraH: `Killaura/H`,
  killauraI: `Killaura/I`,
  movementA: `Movement/A`,
  nameSpoofA: `NameSpoof/A`,
  nameSpoofB: `NameSpoof/B`,
  noFallA: `NoFall/A`,
  noSlowDownA: `NoSlowDown/A`,
  noSlowDownB: `NoSlowDown/B`,
  nukerA: `Nuker/A`,
  nukerB: `Nuker/B`,
  nukerC: `Nuker/C`,
  nukerD: `Nuker/D`,
  nukerE: `Nuker/E`,
  nukerF: `Nuker/F`,
  nukerG: `Nuker/G`,
  reachA: `Reach/A`,
  reachB: `Reach/B`,
  reachC: `Reach/C`,
  reachD: `Reach/D`,
  scaffoldA: `Scaffold/A`,
  scaffoldB: `Scaffold/B`,
  scaffoldC: `Scaffold/C`,
  scaffoldD: `Scaffold/D`,
  scaffoldE: `Scaffold/E`,
  scaffoldF: `Scaffold/F`,
  scaffoldG: `Scaffold/G`,
  scaffoldH: `Scaffold/H`,
  scaffoldI: `Scaffold/I`,
  scaffoldK: `Scaffold/K`,
  spammerA: `Spammer/A`,
  spammerB: `Spammer/B`,
  spammerC: `Spammer/C`,
  spammerD: `Spammer/D`,
  spammerE: `Spammer/E`,
  spammerF: `Spammer/F`,
  spammerG: `Spammer/G`,
  spammerH: `Spammer/H`,
  spammerI: `Spammer/I`,
  spammerJ: `Spammer/J`,
  spammerK: `Spammer/K`,
  spammerL: `Spammer/L`,
  speedA: `Speed/A`,
}