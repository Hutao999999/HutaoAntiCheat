import * as UI from "@minecraft/server-ui"
import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AdminMenu } from "../adminMenu"

export class DeadMessage {
  open(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).state}\n§8${setting.default.data.deadMessage.state}`, `textures/ui/toggle_${setting.default.data.deadMessage.state ? "on" : "off"}`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageAnvil}\n§r${setting.default.data.deadMessage.anvil}`, "textures/ui/anvil_icon")
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageBlockExplosion}\n§r${setting.default.data.deadMessage.blockExplosion}`, "textures/blocks/tnt_side")
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageDrowning}\n§r${setting.default.data.deadMessage.drowning}`, `textures/ui/bubble`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageEntityAttack}\n§r${setting.default.data.deadMessage.entityAttack}`, `textures/ui/attack`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageEntiyExplosion}\n§r${setting.default.data.deadMessage.entityExplosion}`, `textures/items/egg_creeper`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageFall}\n§r${setting.default.data.deadMessage.fall}`, `textures/items/iron_boots`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageFire}\n§r${setting.default.data.deadMessage.fire}`, `textures/blocks/fire_0_placeholder`)
      .button(`§1${Hutao.Player.getLanguage(player).deadmessageFireTick}\n§r${setting.default.data.deadMessage.fireTick}`, `textures/blocks/fire_0_placeholder`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageFireworks}\n§r${setting.default.data.deadMessage.fireworks}`, `textures/items/fireworks`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageFlyIntoWall}\n§r${setting.default.data.deadMessage.flyIntoWall}`, `textures/items/elytra`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageFreezing}\n§r${setting.default.data.deadMessage.freezing}`, `textures/blocks/ice`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageLava}\n§r${setting.default.data.deadMessage.lava}`, `textures/items/bucket_lava`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageLightning}\n§r${setting.default.data.deadMessage.lightning}`, `textures/blocks/lightning_rod`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageMagic}\n§r${setting.default.data.deadMessage.magic}`, `textures/items/potion_bottle_splash_invisibility`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageOther}\n§r${setting.default.data.deadMessage.other}`, `textures/ui/icon_setting`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageProjectile}\n§r${setting.default.data.deadMessage.projectile}`, `textures/items/arrow`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageStalactite}\n§r${setting.default.data.deadMessage.stalactite}`, `textures/blocks/pointed_dripstone_down_tip`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageStalagmite}\n§r${setting.default.data.deadMessage.stalagmite}`, `textures/ui/potatoes_stage_0`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageStarve}\n§r${setting.default.data.deadMessage.starve}`, `textures/items/beef_cooked`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageVoid}\n§r${setting.default.data.deadMessage.void}`, `textures/blocks/structure_void`)
      .button(`§1${Hutao.Player.getLanguage(player).deadMessageWither}\n§r${setting.default.data.deadMessage.wither}`, `textures/items/potion_bottle_wither`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.open(player)
        }

        if (res.selection == 0) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .toggle(`§7${Hutao.Player.getLanguage(player).disabledEnabled} ${Hutao.Player.getLanguage(player).deadMessage}`, setting.default.data.deadMessage.state)
            .show(player)
            .then(res => {
              if (res.canceled) return this.open(player)

              let config = Hutao.Database.get("db")

              config.data.deadMessage.state = res.formValues[0]

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.open(player)
              }, 5, 1, false).on()
            })
        }

        if (
          res.selection > 0 &&
          res.selection < 22
        ) {
          const response = res.selection - 1

          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .textField(Hutao.Player.getLanguage(player)[`pleaseEnterDeadMessage${[path[response].attacker ? "WithAttacker" : ""]}`].replaceAll("{type}", path[response].type), "<String>", setting.default.data.deadMessage[path[response].type])
            .show(player)
            .then(res => {
              if (res.canceled) return this.open(player)

              if (res.formValues[0].trim() == "") return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).cannotBeEmpty)

              let config = Hutao.Database.get("db")

              config.data.deadMessage[path[response].type] = res.formValues[0].trim()

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.open(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 22) new AdminMenu().open(player)
      })
  }
}

const path = [
  {
    type: "anvil",
    attacker: false
  },

  {
    type: "blockExplosion",
    attacker: false
  },

  {
    type: "drowning",
    attacker: false
  },

  {
    type: "entityAttack",
    attacker: true
  },

  {
    type: "entityExplosion",
    attacker: false
  },

  {
    type: "fall",
    attacker: false
  },

  {
    type: "fire",
    attacker: false
  },

  {
    type: "fireTick",
    attacker: false
  },

  {
    type: "fireworks",
    attacker: false
  },

  {
    type: "flyIntoWall",
    attacker: false
  },

  {
    type: "freezing",
    attacker: false
  },

  {
    type: "lava",
    attacker: false
  },

  {
    type: "lightning",
    attacker: false
  },

  {
    type: "magic",
    attacker: false
  },

  {
    type: "other",
    attacker: false
  },

  {
    type: "projectile",
    attacker: true
  },

  {
    type: "stalactite",
    attacker: false
  },

  {
    type: "stalagmite",
    attacker: false
  },

  {
    type: "starve",
    attacker: false
  },

  {
    type: "void",
    attacker: false
  },

  {
    type: "wither",
    attacker: false
  }

]