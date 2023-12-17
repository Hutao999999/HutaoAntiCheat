import * as UI from "@minecraft/server-ui"
import { Hutao } from "../../lib/import"
import { AdminMenu } from "../adminMenu"
import config, * as setting from "../../config"

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

  structure(player) {
    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)
      .button(`§c${Hutao.Player.getLanguage(player).admin}\n${setting.default.data.chatFormat.structure.admin}`, `textures/ui/permissions_op_crown`)
      .button(`§6${Hutao.Player.getLanguage(player).builder}\n${setting.default.data.chatFormat.structure.builder}`, `textures/blocks/planks_oak`)
      .button(`§b${Hutao.Player.getLanguage(player).member}\n${setting.default.data.chatFormat.structure.member}`, `textures/ui/permissions_member_star`)
      .button(`§d${Hutao.Player.getLanguage(player).owner}\n${setting.default.data.chatFormat.structure.owner}`, `textures/ui/store_home_icon`)

    const custom = setting.default.data.chatFormat.structure.custom

    Object.entries(custom).forEach(item => form.button(`${item[0]}\n§r${item[1]}`))

    form.button(`§1${Hutao.Player.getLanguage(player).addChatFormatSomeoneSpecific}`, `textures/ui/color_plus`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.structure(player)
        }

        if (res.selection == 0) this.structure(player)
        if (res.selection == 1) this.structureAdmin(player)
        if (res.selection == 2) this.structureBuilder(player)
        if (res.selection == 3) this.structureMember(player)
        if (res.selection == 4) this.structureOwner(player)
        if ((res.selection - 5) == Object.keys(custom).length) this.addCustomStructure(player)
        if ((res.selection - 5) == Object.keys(custom).length + 1) this.open(player)

        if (
          res.selection > 4 &&
          (res.selection - 5) < Object.keys(custom).length
        ) this.setCustomStructure(player, Hutao.Player.getPlayers(Object.keys(custom)))
      })
  }

  setCustomStructure(player, selectedPlayerName) {
    // notHaveStructure

    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStructure.replaceAll("{player}", selectedPlayerName), "<String>", setting.default.data.chatFormat.structure.custom[Hutao.Player.getPlayersIdByName(selectedPlayerName)])
      .toggle(Hutao.Player.getLanguage(player).removeChatFormat)
      .show(player)
      .then(res => {
        if (res.canceled) return this.setCustomStructure(player)
        // notHaveStructure

        let config = Hutao.Database.get("db")

        if (res.formValues[0]) {
          delete config.data.chatFormat.structure.custom[Hutao.Player.getPlayersIdByName(selectedPlayerName)]

          Hutao.World.success(player, Hutao.Player.getLanguage(player).removeSuccessfully)
          Hutao.World.runCommand(Hutao.Player.getPlayersByName(selectedPlayerName), Hutao.Player.getLanguage(Hutao.Player.getPlayersByName(selectedPlayerName)).yourChatFormatWasRemove.replaceAll("{player}", player.name))
        } else {
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

          config.data.chatFormat.structure.custom[Hutao.Player.getPlayersIdByName(selectedPlayerName)] = res.formValues[0].trim()

          Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
          Hutao.World.runCommand(Hutao.Player.getPlayersByName(selectedPlayerName), Hutao.Player.getLanguage(Hutao.Player.getPlayersByName(selectedPlayerName)).youAreSetYourChatFormat.replaceAll("{player}", player.name))
        }

        Hutao.Database.set("db", config)

        Hutao.SetTickTimeOut(() => {
          this.structure(player)
        }, 5, 1, false).on()
      })
  }

  addCustomStructure(player) {
    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)

    const players = Hutao.World.getAllPlayers()

    players.forEach(player => Object.keys(setting.default.data.chatFormat.structure.custom).includes(player.id) ? "" : form.button(`${player.name}`))

    form.button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.addCustomStructure(player)
        }

        if (res.selection == 0) this.addCustomStructure(player)
        if ((res.selection - 1) == players.length) this.structure(player)

        if (
          res.selection > 0 &&
          (res.selection - 1) < players.length
        ) this.addPlayerCustomStructure(player, players[res.selection - 1])
      })
  }

  addPlayerCustomStructure(player, selectedPlayer) {
    // notPlayer
    // hasStructure

    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStructure.replaceAll("{player}", selectedPlayer.name), "<String>")
      .show(player)
      .then(res => {
        if (res.canceled) return this.addCustomStructure(player)

        // notPlayer
        // hasStructure

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

        config.data.chatFormat.structure.custom[selectedPlayer.id] = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)
        Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreAddAChatFormat.replaceAll("{player}", player.name))

        Hutao.SetTickTimeOut(() => {
          this.structure(player)
        }, 5, 1, false).on()
      })
  }

  structureOwner(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStructureOf.replaceAll("{structure}", Hutao.Player.getLanguage(player).owner), "<String>", setting.default.data.chatFormat.structure.owner)
      .show(player)
      .then(res => {
        if (res.canceled) return this.structure(player)

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

        if (validString(res.formValues[0])) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)

        let config = Hutao.Database.get("db")

        config.data.chatFormat.structure.owner = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.structure(player)
        }, 5, 1, false).on()
      })
  }

  structureMember(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStructureOf.replaceAll("{structure}", Hutao.Player.getLanguage(player).member), "<String>", setting.default.data.chatFormat.structure.member)
      .show(player)
      .then(res => {
        if (res.canceled) return this.structure(player)

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

        if (validString(res.formValues[0])) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)

        let config = Hutao.Database.get("db")

        config.data.chatFormat.structure.member = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.structure(player)
        }, 5, 1, false).on()
      })
  }

  structureBuilder(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStructureOf.replaceAll("{structure}", Hutao.Player.getLanguage(player).builder), "<String>", setting.default.data.chatFormat.structure.builder)
      .show(player)
      .then(res => {
        if (res.canceled) return this.structure(player)

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

        if (validString(res.formValues[0])) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)

        let config = Hutao.Database.get("db")

        config.data.chatFormat.structure.builder = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.structure(player)
        }, 5, 1, false).on()
      })
  }

  structureAdmin(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStructureOf.replaceAll("{structure}", Hutao.Player.getLanguage(player).admin), "<String>", setting.default.data.chatFormat.structure.admin)
      .show(player)
      .then(res => {
        if (res.canceled) return this.structure(player)

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

        if (validString(res.formValues[0])) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)

        let config = Hutao.Database.get("db")

        config.data.chatFormat.structure.admin = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.structure(player)
        }, 5, 1, false).on()
      })
  }

  format(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimension}`, `textures/ui/mashup_world`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatGamemode}`, `textures/ui/flyingascend_pressed`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatHealth}`, `textures/ui/heart`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatLevel}`, `textures/items/experience_bottle`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatLocation}`, `textures/ui/xyz_axis`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatRotation}`, `textures/blocks/camera_front`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatStatus}`, `textures/ui/permissions_member_star`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatTeam}`, `textures/items/dye_powder_red`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatTime}`, `textures/items/clock_item`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
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

  team(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§3${Hutao.Player.getLanguage(player).chatFormatTeamAqua}`, `textures/items/dye_powder_cyan`)
      .button(`§0${Hutao.Player.getLanguage(player).chatFormatTeamBlack}`, `textures/items/dye_powder_black`)
      .button(`§b${Hutao.Player.getLanguage(player).chatFormatTeamBlue}`, `textures/items/dye_powder_light_blue`)
      .button(`§8${Hutao.Player.getLanguage(player).chatFormatTeamGray}`, `textures/items/dye_powder_gray`)
      .button(`§a${Hutao.Player.getLanguage(player).chatFormatTeamGreen}`, `textures/items/dye_powder_lime`)
      .button(`§6${Hutao.Player.getLanguage(player).chatFormatTeamOrange}`, `textures/items/dye_powder_orange`)
      .button(`§8${Hutao.Player.getLanguage(player).chatFormatTeamOther}`, `textures/items/dye_powder_gray`)
      .button(`§d${Hutao.Player.getLanguage(player).chatFormatTeamPurple}`, `textures/items/dye_powder_purple`)
      .button(`§c${Hutao.Player.getLanguage(player).chatFormatTeamRed}`, `textures/items/dye_powder_red`)
      .button(`§8${Hutao.Player.getLanguage(player).chatFormatTeamWhite}`, `textures/items/dye_powder_white_new`)
      .button(`§e${Hutao.Player.getLanguage(player).chatFormatTeamYellow}`, `textures/items/dye_powder_yellow`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.team(player)
        }

        if (res.selection == 0) this.teamAqua(player)
        if (res.selection == 1) this.teamBlack(player)
        if (res.selection == 2) this.teamBlue(player)
        if (res.selection == 3) this.teamGray(player)
        if (res.selection == 4) this.teamGreen(player)
        if (res.selection == 5) this.teamOrange(player)
        if (res.selection == 6) this.teamOther(player)
        if (res.selection == 7) this.teamPurple(player)
        if (res.selection == 8) this.teamRed(player)
        if (res.selection == 9) this.teamWhite(player)
        if (res.selection == 10) this.teamYellow(player)
        if (res.selection == 11) this.format(player)
      })
  }

  time(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatTime}\n${setting.default.data.chatFormat.format.time}`, `textures/items/clock_item`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.time(player)
        }

        if (res.selection == 0) this.timeTime(player)
        if (res.selection == 1) this.format(player)
      })
  }

  timeTime(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTimeFormat.replaceAll("{time}", Hutao.Player.getLanguage(player).chatFormatTime), "<String>", setting.default.data.chatFormat.format.time)
      .show(player)
      .then(res => {
        if (res.canceled) return this.time(player)

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

        config.data.chatFormat.format.time = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.time(player)
        }, 5, 1, false).on()
      })
  }

  teamYellow(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamYellow), "<String>", setting.default.data.chatFormat.format.team.yellow)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.yellow = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamWhite(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamWhite), "<String>", setting.default.data.chatFormat.format.team.white)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.white = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamRed(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamRed), "<String>", setting.default.data.chatFormat.format.team.red)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.red = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamPurple(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamPurple), "<String>", setting.default.data.chatFormat.format.team.purple)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.purple = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamOther(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamOther), "<String>", setting.default.data.chatFormat.format.team.other)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.aquother = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamOrange(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamOrange), "<String>", setting.default.data.chatFormat.format.team.orange)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.orange = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamGreen(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamGreen), "<String>", setting.default.data.chatFormat.format.team.green)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.green = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamGray(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamGray), "<String>", setting.default.data.chatFormat.format.team.gray)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.gray = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamBlue(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamBlue), "<String>", setting.default.data.chatFormat.format.team.blue)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.blue = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamBlack(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamBlack), "<String>", setting.default.data.chatFormat.format.team.black)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.black = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  teamAqua(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheTeamFormat.replaceAll("{team}", Hutao.Player.getLanguage(player).chatFormatTeamAqua), "<String>", setting.default.data.chatFormat.format.team.aqua)
      .show(player)
      .then(res => {
        if (res.canceled) return this.team(player)

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

        config.data.chatFormat.format.team.aqua = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.team(player)
        }, 5, 1, false).on()
      })
  }

  status(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatStatusAdmin}\n${setting.default.data.chatFormat.format.status.admin}`, `textures/ui/permissions_op_crown`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatStatusBuilder}\n${setting.default.data.chatFormat.format.status.builder}`, `textures/blocks/planks_oak`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatStatusMember}\n${setting.default.data.chatFormat.format.status.member}`, `textures/ui/permissions_member_star`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatStatusOwner}\n${setting.default.data.chatFormat.format.status.owner}`, `textures/ui/store_home_icon`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.status(player)
        }

        if (res.selection == 0) this.statusAdmin(player)
        if (res.selection == 1) this.statusBuilder(player)
        if (res.selection == 2) this.statusMember(player)
        if (res.selection == 3) this.statusOwner(player)
        if (res.selection == 4) this.format(player)
      })
  }

  statusAdmin(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStatusFormat.replaceAll("{status}", Hutao.Player.getLanguage(player).chatFormatStatusAdmin), "<String>", setting.default.data.chatFormat.format.status.admin)
      .show(player)
      .then(res => {
        if (res.canceled) return this.status(player)

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

        config.data.chatFormat.format.status.admin = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.status(player)
        }, 5, 1, false).on()
      })
  }

  statusBuilder(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStatusFormat.replaceAll("{status}", Hutao.Player.getLanguage(player).chatFormatStatusBuilder), "<String>", setting.default.data.chatFormat.format.status.builder)
      .show(player)
      .then(res => {
        if (res.canceled) return this.status(player)

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

        config.data.chatFormat.format.status.builder = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.status(player)
        }, 5, 1, false).on()
      })
  }

  statusMember(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStatusFormat.replaceAll("{status}", Hutao.Player.getLanguage(player).chatFormatStatusMember), "<String>", setting.default.data.chatFormat.format.status.member)
      .show(player)
      .then(res => {
        if (res.canceled) return this.status(player)

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

        config.data.chatFormat.format.status.member = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.status(player)
        }, 5, 1, false).on()
      })
  }

  statusOwner(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheStatusFormat.replaceAll("{status}", Hutao.Player.getLanguage(player).chatFormatStatusOwner), "<String>", setting.default.data.chatFormat.format.status.owner)
      .show(player)
      .then(res => {
        if (res.canceled) return this.status(player)

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

        config.data.chatFormat.format.status.owner = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.status(player)
        }, 5, 1, false).on()
      })
  }

  rotation(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatRotation}\n${setting.default.data.chatFormat.format.rotation}`, `textures/ui/xyz_axis`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.rotation(player)
        }

        if (res.selection == 0) this.rotationRotation(player)
        if (res.selection == 1) this.format(player)
      })
  }

  rotationRotation(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheRotationFormat.replaceAll("{rotation}", Hutao.Player.getLanguage(player).chatFormatRotation), "<String>", setting.default.data.chatFormat.format.rotation)
      .show(player)
      .then(res => {
        if (res.canceled) return this.rotation(player)

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

        config.data.chatFormat.format.rotation = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.rotation(player)
        }, 5, 1, false).on()
      })
  }

  location(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatLocation}\n${setting.default.data.chatFormat.format.location}`, `textures/ui/xyz_axis`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.location(player)
        }

        if (res.selection == 0) this.locationLocation(player)
        if (res.selection == 1) this.format(player)
      })
  }

  locationLocation(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheLocationFormat.replaceAll("{location}", Hutao.Player.getLanguage(player).chatFormatLocation), "<String>", setting.default.data.chatFormat.format.location)
      .show(player)
      .then(res => {
        if (res.canceled) return this.location(player)

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

        config.data.chatFormat.format.location = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.location(player)
        }, 5, 1, false).on()
      })
  }

  level(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatLevel}\n${setting.default.data.chatFormat.format.level}`, `textures/items/experience_bottle`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.level(player)
        }

        if (res.selection == 0) this.levelLevel(player)
        if (res.selection == 1) this.format(player)
      })
  }

  levelLevel(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheLevelFormat.replaceAll("{level}", Hutao.Player.getLanguage(player).chatFormatLevel), "<String>", setting.default.data.chatFormat.format.level)
      .show(player)
      .then(res => {
        if (res.canceled) return this.level(player)

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

        config.data.chatFormat.format.level = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.level(player)
        }, 5, 1, false).on()
      })
  }

  health(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatHealth}\n${setting.default.data.chatFormat.format.health}`, `textures/ui/heart`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.health(player)
        }

        if (res.selection == 0) this.healthHealth(player)
        if (res.selection == 1) this.format(player)
      })
  }

  healthHealth(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheHealthFormat.replaceAll("{health}", Hutao.Player.getLanguage(player).chatFormatHealth), "<String>", setting.default.data.chatFormat.format.health)
      .show(player)
      .then(res => {
        if (res.canceled) return this.health(player)

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

        config.data.chatFormat.format.health = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.health(player)
        }, 5, 1, false).on()
      })
  }

  gamemode(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatGamemodeAdventure}\n${setting.default.data.chatFormat.format.gamemode.adventure}`, `textures/items/book_normal`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatGamemodeCreative}\n${setting.default.data.chatFormat.format.gamemode.creative}`, `textures/blocks/planks_oak`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatGamemodeOther}\n${setting.default.data.chatFormat.format.gamemode.other}`, `textures/ui/flyingascend_pressed`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatGamemodeSpectator}\n${setting.default.data.chatFormat.format.gamemode.spectator}`, `textures/ui/night_vision`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatGamemodeSurvival}\n${setting.default.data.chatFormat.format.gamemode.survival}`, `textures/items/stone_pickaxe`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.gamemode(player)
        }

        if (res.selection == 0) this.gamemodeAdventure(player)
        if (res.selection == 1) this.gamemodeCreative(player)
        if (res.selection == 2) this.gamemodeOther(player)
        if (res.selection == 3) this.gamemodeSpectator(player)
        if (res.selection == 4) this.gamemodeSurvival(player)
        if (res.selection == 5) this.format(player)
      })
  }

  gamemodeAdventure(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheGamemodeFormat.replaceAll("{gamemode}", Hutao.Player.getLanguage(player).chatFormatGamemodeAdventure), "<String>", setting.default.data.chatFormat.format.gamemode.adventure)
      .show(player)
      .then(res => {
        if (res.canceled) return this.gamemode(player)

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

        config.data.chatFormat.format.gamemode.adventure = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.gamemode(player)
        }, 5, 1, false).on()
      })
  }

  gamemodeCreative(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheGamemodeFormat.replaceAll("{gamemode}", Hutao.Player.getLanguage(player).chatFormatGamemodeCreative), "<String>", setting.default.data.chatFormat.format.gamemode.creative)
      .show(player)
      .then(res => {
        if (res.canceled) return this.gamemode(player)

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

        config.data.chatFormat.format.gamemode.creative = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.gamemode(player)
        }, 5, 1, false).on()
      })
  }

  gamemodeOther(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheGamemodeFormat.replaceAll("{gamemode}", Hutao.Player.getLanguage(player).chatFormatGamemodeOther), "<String>", setting.default.data.chatFormat.format.gamemode.other)
      .show(player)
      .then(res => {
        if (res.canceled) return this.gamemode(player)

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

        config.data.chatFormat.format.gamemode.other = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.gamemode(player)
        }, 5, 1, false).on()
      })
  }

  gamemodeSpectator(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheGamemodeFormat.replaceAll("{gamemode}", Hutao.Player.getLanguage(player).chatFormatGamemodeSpectator), "<String>", setting.default.data.chatFormat.format.gamemode.spectator)
      .show(player)
      .then(res => {
        if (res.canceled) return this.gamemode(player)

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

        config.data.chatFormat.format.gamemode.spectator = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.gamemode(player)
        }, 5, 1, false).on()
      })
  }

  gamemodeSurvival(player) {
    new UI.ModalFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .textField(Hutao.Player.getLanguage(player).pleaseEnterTheGamemodeFormat.replaceAll("{gamemode}", Hutao.Player.getLanguage(player).chatFormatGamemodeSurvival), "<String>", setting.default.data.chatFormat.format.gamemode.survival)
      .show(player)
      .then(res => {
        if (res.canceled) return this.gamemode(player)

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

        config.data.chatFormat.format.gamemode.survival = res.formValues[0].trim()

        Hutao.Database.set("db", config)
        Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

        Hutao.SetTickTimeOut(() => {
          this.gamemode(player)
        }, 5, 1, false).on()
      })
  }

  dimension(player) {
    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimensionNether}\n${setting.default.data.chatFormat.format.dimension.nether}`, `textures/blocks/netherrack`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimensionOther}\n${setting.default.data.chatFormat.format.dimension.other}`, `textures/ui/mashup_world`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimensionOverworld}\n${setting.default.data.chatFormat.format.dimension.overworld}`, `textures/blocks/grass_size_carried`)
      .button(`§1${Hutao.Player.getLanguage(player).chatFormatDimensionTheEnd}\n${setting.default.data.chatFormat.format.dimension.theEndset}`, `textures/blocks/end_stone`)
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