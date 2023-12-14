import * as UI from "@minecraft/server-ui"
import { Hutao } from "../../lib/import"
import { AdminMenu } from "../adminMenu"
import * as setting from "../../config"

export class ChatFormat {
  open(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).state}\n${setting.default.data.chatFormat.state ? `§a${Hutao.Player.getLanguage(player).enabled}` : `§c${Hutao.Player.getLanguage(player).disabled}`}`, `textures/ui/toggle_${setting.default.data.chatFormat.state ? "on" : "off"}`)
      .button(`§1${Hutao.Player.getLanguage(player).format}`, `textures/blocks/structure_block`)
      .button(`§1${Hutao.Player.getLanguage(player).structure}`, `textures/blocks/structure_void`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.open(player)
        }

        if (res.selection == 0) {
          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .toggle(`§7${Hutao.Player.getLanguage(player).disabledEnabled} ${Hutao.Player.getLanguage(player).chatFormat}`, setting.default.data.chatFormat.state)
            .show(player)
            .then(res => {
              if (res.canceled) {
                if (res.cancelationReason == "UserBusy") return this.open(player)
              }

              let config = Hutao.Database.get("db")

              config.data.chatFormat.state = res.formValues[0]

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.open(player)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 1) this.format(player)
        if (res.selection == 2) this.structure(player)
        if (res.selection == 3) new AdminMenu().open(player)
      })
  }

  format(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimension}`, `textures/ui/mashup_world`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatGamemode}`, `textures/ui/flyingascent_pressed`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatHealth}`, `textures/ui/heart`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatLevel}`, `textures/items/experience_bottle`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatLocation}`, `textures/ui/xyz_axis`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatRotation}`, `textures/blocks/camera_front`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatStatus}`, `textures/ui/permission_member_star`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatTeam}`, `textures/items/dye_powder_red`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatTime}`, `textures/items/clock_item`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_strectch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.format(player)
        }

        if (res.selection == 0) this.dimension(player)
        if (res.selection == 1) this.gamemode(player)
        if (res.selection == 2) this.health(player)
        if (res.selection == 3) this.level(player)
        if (res.selection == 4) this.location(player)
        if (res.selection == 5) this.rotation(player)
        if (res.selection == 6) this.status(player)
        if (res.selection == 7) this.team(player)
        if (res.selection == 8) this.time(player)
        if (res.selection == 9) this.open(player)
      })
  }

  dimension(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimensionNether}`, `textures/blocks/netherrack`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimensionOther}`, `textures/ui/mashup_world`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimensionOverworld}`, `textures/blocks/grass_size_carried`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimensionTheEnd}`, `textures/blocks/end_stone`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.dimension(player)
        }

        if (res.selection == 0) this.dimensionNether(player)
        if (res.selection == 1) this.dimensionOther(player)
        if (res.selection == 2) this.dimensionOverworld(player)
        if (res.selection == 3) this.dimensionTheEnd(player)
        if (res.selection == 4) this.format(player)
      })
  }

  dimensionNether(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheDimensionFormat.replaceAll("{dimension}", Hutao.Player.getLanguage(player).chatFormatDimensionNether), "<String>", setting.default.data.chatFormat.format.dimension.nether)
      .show(player)
      .then(res => {
        if (res.canceled) return this.dimension(player)

        const validString = (string) => {
          if (string.trim() == "") return {
            condition: true,
            reason: Hutao.Player.getLanguage(player).cannotBeEmpty
          }

          return {
            condition: false,
            reason: "None"
          }
        }

        if (validString(res.formValues[0]).condition) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)

        let config = Hutao.Database.get("db")

        config.data.chatFormat.format.dimension.nether = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.dimension(player)
        }, 5, 1, false).on()
      })
  }

  dimensionOther(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheDimensionFormat.replaceAll("{dimension}", Hutao.Player.getLanguage(player).chatFormatDimensionOther), "<String>", setting.default.data.chatFormat.format.dimension.other)
      .show(player)
      .then(res => {
        if (res.canceled) return this.dimension(player)

        const validString = (string) => {
          if (string.trim() == "") return {
            condition: true,
            reason: Hutao.Player.getLanguage(player).cannotBeEmpty
          }

          return {
            condition: false,
            reason: "None"
          }
        }

        if (validString(res.formValues[0]).condition) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)

        let config = Hutao.Database.get("db")

        config.data.chatFormat.format.dimension.other = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.dimension(player)
        }, 5, 1, false).on()
      })
  }

  dimensionOverworld(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheDimensionFormat.replaceAll("{dimension}", Hutao.Player.getLanguage(player).chatFormatDimensionOverworld), "<String>", setting.default.data.chatFormat.format.dimension.overworld)
      .show(player)
      .then(res => {
        if (res.canceled) return this.dimension(player)

        const validString = (string) => {
          if (string.trim() == "") return {
            condition: true,
            reason: Hutao.Player.getLanguage(player).cannotBeEmpty
          }

          return {
            condition: false,
            reason: "None"
          }
        }

        if (validString(res.formValues[0]).condition) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)

        let config = Hutao.Database.get("db")

        config.data.chatFormat.format.dimension.overworld = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.dimension(player)
        }, 5, 1, false).on()
      })
  }

  dimensionTheEnd(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheDimensionFormat.replaceAll("{dimension}", Hutao.Player.getLanguage(player).chatFormatDimensionTheEnd), "<String>", setting.default.data.chatFormat.format.dimension.theEnd)
      .show(player)
      .then(res => {
        if (res.canceled) return this.dimension(player)

        const validString = (string) => {
          if (string.trim() == "") return {
            condition: true,
            reason: Hutao.Player.getLanguage(player).cannotBeEmpty
          }

          return {
            condition: false,
            reason: "None"
          }
        }

        if (validString(res.formValues[0]).condition) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)

        let config = Hutao.Database.get("db")

        config.data.chatFormat.format.dimension.theEnd = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.dimension(player)
        }, 5, 1, false).on()
      })
  }
}