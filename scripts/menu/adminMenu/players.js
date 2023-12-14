import * as Minecraft from "@minecraft/server"
import * as UI from "@minecraft/server-ui"
import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AdminMenu } from "../adminMenu"

export class Players {
  open(player) {
    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)

    const players = Hutao.World.getAllPlayers()

    players.forEach(player => form.button(`${player.name}`, `textures/${player.permission == "owner" ? "ui/store_home_icon" :
      player.permission == "admin" ? "ui/permissions_op_crown" :
        player.permission == "builder" ? "blocks/planks_oak" :
          "ui/permissions_member_star"
      }`))

    form.button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.open(player)
        }

        if (res.selection == 0) this.open(player)
        if (res.selection - 1 == players.length) new AdminMenu().open(player)

        if (
          res.selection > 0 &&
          res.selection - 1 < players.length
        ) this.playerSetting(player, players[res.selection - 1])
      })
  }

  playerSetting(player, selectedPlayer) {
    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

    const health = selectedPlayer.getComponent("health")
    const spawnpoint = selectedPlayer.getSpawnPoint()

    const bodies = []

    bodies.push(
      Hutao.Player.getLanguage(player).playerSettingDimension.replaceAll("{dimension}", `§e${Hutao.Player.getLanguage(player)[selectedPlayer.dimension.id.replaceAll("minecraft:", "")]}`),
      Hutao.Player.getLanguage(player).playerSettingGamemode.replaceAll("{gamemode}", `§e${Hutao.Player.getLanguage(player)[Hutao.Player.getGamemode(selectedPlayer)]}`),
      Hutao.Player.getLanguage(player).playerSettingHealth.replaceAll("{health}", `§e${health.currentValue}§7/§e${health.effectiveMax} `),
      Hutao.Player.getLanguage(player).playerSettingId.replaceAll("{id}", `§e${selectedPlayer.id}`),
      Hutao.Player.getLanguage(player).playerSettingIsOperator.replaceAll("{operator}", selectedPlayer.isOp() ? `§a${Hutao.Player.getLanguage(player).true}` : `§c${Hutao.Player.getLanguage(player).false}`),
      Hutao.Player.getLanguage(player).playerSettingLocation.replaceAll("{location}", `§e${Math.floor(selectedPlayer.location.x * 100) / 100}§7, §e${Math.floor(selectedPlayer.location.y * 100) / 100}§7, §e${Math.floor(selectedPlayer.location.z * 100) / 100} `),
      Hutao.Player.getLanguage(player).playerSettingPermission.replaceAll("{permission}", `§e${Hutao.Player.getLanguage(player)[selectedPlayer.permission]}`),
      Hutao.Player.getLanguage(player).playerSettingRotation.replaceAll("{rotation}", `§e${Math.floor(selectedPlayer.getRotation().x * 100) / 100}§7, §e${Math.floor(selectedPlayer.getRotation().y * 100) / 100} `),
    )

    if (spawnpoint) Hutao.Player.getLanguage(player).playerSettingSpawnpoint.replaceAll("{position}", `§e${spawnpoint.x}§7, §e${spawnpoint.y}§7, §e${spawnpoint.z}§7, §e${spawnpoint.dimension.id.replaceAll("{minecraft}", "")} `)

    bodies.push(
      Hutao.Player.getLanguage(player).playerSettingXp.replaceAll("{xp}", `§e${Math.floor(player.xpEarnedAtCurrentLevel / player.totalXpNeededForNextLevel * 100) / 100 + player.level}`)
    )

    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .body([
        Hutao.Player.getLanguage(player).playerSettingInfo.replaceAll("{player}", selectedPlayer.name),
        ``,
        ...bodies
      ].join("\n§r"))
      .button(`§1${Hutao.Player.getLanguage(player).abilities}`, `textures/ui/chat_send`)
      .button(`§1${Hutao.Player.getLanguage(player).behaviors}`, "textures/ui/sidebar_icons/emotes")
      .button(`§1${Hutao.Player.getLanguage(player).inventory}`, `textures/ui/icon_recipe_item`)
      .button(`§1${Hutao.Player.getLanguage(player).permission}`, `textures/ui/permissions_op_crown`)
      .button(`§1${Hutao.Player.getLanguage(player).teleport}`, `textures/items/ender_pearl`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.playerSetting(player)
        }

        if (res.selection == 0) this.ability(player, selectedPlayer)
        if (res.selection == 1) this.behaviors(player, selectedPlayer)
        if (res.selection == 2) this.inventory(player, selectedPlayer)
        if (res.selection == 3) this.permission(player, selectedPlayer)
        if (res.selection == 4) this.teleport(player, selectedPlayer)
        if (res.selection == 5) this.open(player)
      })
  }

  ability(player, selectedPlayer) {
    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).freeze}\n${setting.default.data.players[selectedPlayer.id].freeze ? `§a${Hutao.Player.getLanguage(player).true}` : `§c${Hutao.Player.getLanguage(player).false}`}`, `textures/blocks/ice`)
      .button(`§1${Hutao.Player.getLanguage(player).mute}\n${setting.default.data.players[selectedPlayer.id].mute ? `§a${Hutao.Player.getLanguage(player).true}` : `§c${Hutao.Player.getLanguage(player).false}`}`, `textures/ui/chat_send`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.ability(player, selectedPlayer)
        }

        if (res.selection == 0) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .toggle(Hutao.Player.getLanguage(player).freeze, setting.default.data.players[selectedPlayer.id].freeze)
            .show(player)
            .then(res => {
              if (res.canceled) return this.ability(player, selectedPlayer)

              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

              let config = Hutao.Database.get("db")

              if (res.formValues[0]) {
                config.data.players[selectedPlayer.id].freeze = true
                config.data.players[selectedPlayer.id].freezeLocation = {
                  x: selectedPlayer.location.x,
                  y: selectedPlayer.location.y,
                  z: selectedPlayer.location.z,
                  rx: selectedPlayer.getRotation().x,
                  ry: selectedPlayer.getRotation().y,
                  dimension: selectedPlayer.dimension.id
                }

                Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreFreeze.replaceAll("{player}", player.name))
              } else {
                config.data.players[selectedPlayer.id].freeze = false
                config.data.players[selectedPlayer.id].freezeLocation = {}
                Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreUnfreeze.replaceAll("{player}", player.name))
              }

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.ability(player, selectedPlayer)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 1) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .toggle(Hutao.Player.getLanguage(player).mute, setting.default.data.players[selectedPlayer.id].mute)
            .show(player)
            .then(res => {
              if (res.canceled) return this.ability(player, selectedPlayer)

              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

              let config = Hutao.Database.get("db")

              if (res.formValues[0]) {
                config.data.players[selectedPlayer.id].mute = true
                Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreMute.replaceAll("{player}", player.name))
              } else {
                config.data.players[selectedPlayer.id].mute = false
                Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreUnmute.replaceAll("{player}", player.name))
              }

              Hutao.Database.set("db", config)
              Hutao.World.success(player, Hutao.Player.getLanguage(player).changedSuccessfully)

              Hutao.SetTickTimeOut(() => {
                this.ability(player, selectedPlayer)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 2) this.playerSetting(player, selectedPlayer)
      })
  }

  teleport(player, selectedPlayer) {
    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).teleportToHere}`, `textures/items/ender_pearl`)
      .button(`§1${Hutao.Player.getLanguage(player).teleportToThere}`, `textures/items/ender_eye`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.teleport(player)
        }

        if (res.selection == 0) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

          selectedPlayer.teleport({
            x: player.location.x,
            y: player.location.y,
            z: player.location.z
          }, {
            dimension: player.dimension,
            rotation: {
              x: player.getRotation().x,
              y: player.getRotation().y
            }
          })

          Hutao.World.success(player, Hutao.Player.getLanguage(player).teleportSuccessfully)
          Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreTeleportTo.replaceAll("{player}", player.name))

          Hutao.SetTickTimeOut(() => {
            this.playerSetting(player, selectedPlayer)
          }, 5, 1, false).on()
        }

        if (res.selection == 1) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

          player.teleport({
            x: selectedPlayer.location.x,
            y: selectedPlayer.location.y,
            z: selectedPlayer.location.z
          }, {
            dimension: selectedPlayer.dimension,
            rotation: {
              x: selectedPlayer.getRotation().x,
              y: selectedPlayer.getRotation().y
            }
          })

          Hutao.World.success(player, Hutao.Player.getLanguage(player).teleportSuccessfully)
          Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).isTeleportToYou.replaceAll("{player}", player.name))

          Hutao.SetTickTimeOut(() => {
            this.playerSetting(player, selectedPlayer)
          }, 5, 1, false).on()
        }

        if (res.selection == 2) this.playerSetting(player, selectedPlayer)
      })
  }

  inventory(player, selectedPlayer) {
    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

    const form = new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)

    const container = selectedPlayer.getComponent("inventory").container
    const equipment = selectedPlayer.getComponent("equippable")
    const items = []

    const slots = [
      "Head",
      "Chest",
      "Legs",
      "Feet",
      "Offhand"
    ]

    for (let i = 0; i < container.size; i++) {
      const item = container.getItem(i)

      if (item) {
        item._slot = i
        items.push(item)
      }
    }

    for (const slot of slots) {
      const item = equipment.getEquipment(slot)

      if (item) {
        item._slot = slot
        items.push(item)
      }
    }

    items.forEach(item => {
      if (item._slot == selectedPlayer.selectedSlot) {
        form.button(`§8${item.typeId} §0x §8${item.amount}\n§0${Hutao.Player.getLanguage(player).slot}: §8${item._slot} §c[${Hutao.Player.getLanguage(player).selected}]`)
      } else {
        form.button(`§8${item.typeId} §0x §8${item.amount}\n§0${Hutao.Player.getLanguage(player).slot}: §8${item._slot}`)
      }
    })

    form.button(`§1${Hutao.Player.getLanguage(player).addItems}`, `textures/ui/color_plus`)
      .button(`§1${Hutao.Player.getLanguage(player).clearEnderChest}`, `textures/blocks/ender_chest_front`)
      .button(`§1${Hutao.Player.getLanguage(player).clearInventory}`, `textures/ui/icon_trash`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.inventory(player)
        }

        if (res.selection == 0) this.inventory(player)

        if ((res.selection - 1) == items.length) {
          const chooseSlot = (player, selectedPlayer) => {
            if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

            const container = selectedPlayer.getComponent("inventory").container

            const slots = [
              "Head",
              "Chest",
              "Legs",
              "Feet",
              "Offhand"
            ]

            const form = new UI.ActionFormData()
              .title(Hutao.Player.getLanguage(player).adminMenuTitle)

            for (let i = 0; i < container.size; i++) {
              form.button(`§0${Hutao.Player.getLanguage(player).slot} §8${i}`)
            }

            for (const slot of slots) {
              form.button(`§0${Hutao.Player.getLanguage(player).slot} §8${slot}`)
            }

            form.button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
              .show(player)
              .then(res => {
                if (res.canceled) {
                  if (res.cancelationReason == "UserBusy") return chooseSlot(player, selectedPlayer)
                }

                if (res.selection < container.size + slots.length) chooseType(player, selectedPlayer, res.selection < container.size ? res.selection : slots[res.selection - container.size])
                if (res.selection == container.size + slots.length) this.inventory(player, selectedPlayer)
              })
          }

          const chooseType = (player, selectedPlayer, slot) => {
            if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

            new UI.ActionFormData()
              .title(Hutao.Player.getLanguage(player).adminMenuTitle)
              .body(`§6${Hutao.Player.getLanguage(player).slot} §7> §e${slot}`)
              .button(`§1${Hutao.Player.getLanguage(player).itemYouHeld}`, `textures/items/paper`)
              .button(`§1${Hutao.Player.getLanguage(player).blockYouLook}`, `textures/blocks/planks_oak`)
              .button(`§1${Hutao.Player.getLanguage(player).itemType}`, `textures/items/paper`)
              .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
              .show(player)
              .then(res => {
                if (res.canceled) {
                  if (res.cancelationReason == "UserBusy") return chooseType(player, selectedPlayer, slot)
                }

                if (res.selection == 0) {
                  if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                  const item = player.getComponent("inventory").container.getItem(player.selectedSlot)
                  const container = selectedPlayer.getComponent("inventory").container
                  const equipment = selectedPlayer.getComponent("equippable")

                  if (isNaN(Number(slot))) {
                    equipment.setEquipment(slot, item)
                  } else {
                    container.setItem(slot, item)
                  }

                  Hutao.World.success(player, Hutao.Player.getLanguage(player).setSuccessfully)
                  Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).yourSlotIsSetBy.replaceAll("{player}", player.name).replaceAll("{slot}", slot))

                  Hutao.SetTickTimeOut(() => {
                    this.inventory(player, selectedPlayer)
                  }, 5, 1, false).on()
                }

                if (res.selection == 1) {
                  if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                  const item = player.getBlockFromViewDirection().block.permutation.getItemStack()
                  const container = selectedPlayer.getComponent("inventory").container
                  const equipment = selectedPlayer.getComponent("equippable")

                  if (isNaN(Number(slot))) {
                    equipment.setEquipment(slot, item)
                  } else {
                    container.setItem(slot, item)
                  }

                  Hutao.World.success(player, Hutao.Player.getLanguage(player).setSuccessfully)
                  Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).yourSlotIsSetBy.replaceAll("{player}", player.name).replaceAll("{slot}", slot))

                  Hutao.SetTickTimeOut(() => {
                    this.inventory(player, selectedPlayer)
                  }, 5, 1, false).on()
                }

                if (res.selection == 2) {
                  if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                  new UI.ModalFormData()
                    .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                    .textField(`${Hutao.Player.getLanguage(player).itemTypeId}`, `<String>`)
                    .textField(`${Hutao.Player.getLanguage(player).itemTypeAmount}`, `<Number>`)
                    .show(player)
                    .then(res => {
                      if (res.canceled) return chooseType(player, selectedPlayer, slot)

                      if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                        if (number > 64) return {
                          condition: true,
                          reason: Hutao.Player.getLanguage(player).cannotMoreThan64
                        }

                        return {
                          codnition: false,
                          reason: "None"
                        }
                      }

                      const endForm = (player, selectedPlayer, slot, item) => {
                        if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                        new UI.ActionFormData()
                          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                          .button(`§1${Hutao.Player.getLanguage(player).itemTypeCanDestroy}`, `textures/environment/destroy_stage_6`)
                          .button(`§1${Hutao.Player.getLanguage(player).itemTypeCanPlaceOn}`, `textures/blocks/planks_oak`)
                          .button(`§1${Hutao.Player.getLanguage(player).itemTypeEnchantment}`, `textures/items/book_enchanted`)
                          .button(`§1${Hutao.Player.getLanguage(player).itemTypeNormalSetting}`, `textures/ui/icon_setting`)
                          .button(`§1${Hutao.Player.getLanguage(player).itemTypeLore}`, `textures/items/name_tag`)
                          .button(`§1${Hutao.Player.getLanguage(player).itemTypeOtherSetting}`, `textures/ui/icon_setting`)
                          .button(`§1${Hutao.Player.getLanguage(player).itemTypeSet}`, `textures/items/ender_pearl`)
                          .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
                          .show(player)
                          .then(res => {
                            if (res.canceled) {
                              if (res.cancelationReason == "UserBusy") return endForm(player, selectedPlayer, slot, item)
                            }

                            if (res.selection == 0) canDestroy(player, selectedPlayer, slot, item)
                            if (res.selection == 1) canPlaceOn(player, selectedPlayer, slot, item)
                            if (res.selection == 2) enchantment(player, selectedPlayer, slot, item)
                            if (res.selection == 3) normalSetting(player, selectedPlayer, slot, item)
                            if (res.selection == 4) lore(player, selectedPlayer, slot, item)
                            if (res.selection == 5) other(player, selectedPlayer, slot, item)
                            if (res.selection == 6) set(player, selectedPlayer, slot, item)
                            if (res.selection == 7) chooseSlot(player, selectedPlayer)
                          })
                      }

                      const set = (player, selectedPlayer, slot, item) => {
                        if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                        const currentItem = new Minecraft.ItemStack(item.id, item.amount)
                        const itemEnchant = currentItem.getComponent("enchantments").enchantments
                        const container = selectedPlayer.getComponent("inventory").container
                        const equipment = selectedPlayer.getComponent("equippable")

                        currentItem.setCanDestroy(item.canDestroy)
                        currentItem.setCanPlaceOn(item.canPlaceOn)
                        currentItem.setLore(item.lore)
                        currentItem.keepOnDeath = item.keepOnDeath
                        currentItem.nameTag = item.nameTag
                        currentItem.lockMode = item.lockMode

                        for (const enchantment of item.enchantment) {
                          itemEnchant.addEnchantment(new Minecraft.Enchantment(enchantment.id, enchantment.level))
                        }

                        currentItem.getComponent("enchantments").enchantments = itemEnchant

                        if (isNaN(Number(slot))) {
                          equipment.setEquipment(slot, currentItem)
                        } else {
                          container.setItem(slot, currentItem)
                        }

                        Hutao.World.success(player, Hutao.Player.getLanguage(player).setSuccessfully)
                        Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).yourSlotIsSetBy.replaceAll("{player}", player.name).replaceAll("{slot}", slot))

                        Hutao.SetTickTimeOut(() => {
                          this.inventory(player, selectedPlayer)
                        }, 5, 1, false).on()
                      }

                      const other = (player, selectedPlayer, slot, item) => {
                        if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                        new UI.ModalFormData()
                          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                          .toggle(Hutao.Player.getLanguage(player).itemTypeKeepOnDeath, item.keepOnDeath)
                          .dropdown(Hutao.Player.getLanguage(player).itemTypeLockMode, [
                            Hutao.Player.getLanguage(player).noneItemLockMode,
                            Hutao.Player.getLanguage(player).inventoryItemLockMode,
                            Hutao.Player.getLanguage(player).slotItemLockMode
                          ], [
                            "none",
                            "inventory",
                            "slot"
                          ].indexOf(item.lockMode))
                          .textField(Hutao.Player.getLanguage(player).itemTypeNameTag, "<String>")
                          .show(player)
                          .then(res => {
                            if (res.canceled) return endForm(player, selectedPlayer, slot, item)

                            if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                            item.keepOnDeath = res.formValues[0]
                            item.lockMode = [
                              "none",
                              "inventory",
                              "slot"
                            ][res.formValues[1]]

                            item.nameTag = res.formValues[2].trim() == "" ? undefined : res.formValues[2].trim()

                            endForm(player, selectedPlayer, slot, item)
                          })
                      }

                      const enchantment = (player, selectedPlayer, slot, item) => {
                        if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                        const form = new UI.ActionFormData()
                          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                          .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)

                        item.enchantment.forEach(enchantment => form.button(`§8${enchantment.id}\n§0${Hutao.Player.getLanguage(player).level} §8${enchantment.level}`))

                        form.button(`§1${Hutao.Player.getLanguage(player).itemTypeAddEnchantment}`, `textures/ui/color_plus`)
                          .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
                          .show(player)
                          .then(res => {
                            if (res.canceled) {
                              if (res.cancelationReason == "UserBusy") return enchantment(player, selectedPlayer, slot, item)
                            }

                            if (res.selection == 0) enchantment(player, selectedPlayer, slot, item)

                            if ((res.selection - 1) == item.enchantment.length) {
                              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                              const change = (player, selectedPlayer, slot, item) => {
                                new UI.ModalFormData()
                                  .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheEnchantment, "<String>")
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheEnchantmentLevel, "<Number>")
                                  .show(player)
                                  .then(res => {
                                    if (res.canceled) return enchantment(player, selectedPlayer, slot, item)

                                    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                                      if (number > 5) return {
                                        condition: true,
                                        reason: Hutao.Player.getLanguage(player).cannotMoreThan5
                                      }

                                      return {
                                        condition: false,
                                        reason: "None"
                                      }
                                    }

                                    if (validString(res.formValues[0]).condition) {
                                      Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }

                                    if (validNumber(res.formValues[1]).condition) {
                                      Hutao.World.wrong(player, validNumber(res.formValues[1]).reason)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }

                                    if (item.enchantment.includes(res.formValues[0].trim())) {
                                      Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatEnchantment)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }

                                    item.enchantment.push({
                                      id: res.formValues[0].trim(),
                                      level: Math.floor(Number(res.formValues[1].trim()))
                                    })

                                    enchantment(player, selectedPlayer, slot, item)
                                  })
                              }

                              change(player, selectedPlayer, slot, item)
                            }

                            if (
                              res.selection > 0 &&
                              (res.selection - 1) < item.enchantment.length
                            ) {
                              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                              const response = res.selection - 1

                              const change = (player, selectedPlayer, slot, item) => {
                                new UI.ModalFormData()
                                  .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheEnchantment, "<String>", item.enchantment[response].id)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheEnchantmentLevel, "<Number>", String(item.enchantment[response].level))
                                  .show(player)
                                  .then(res => {
                                    if (res.canceled) return enchantment(player, selectedPlayer, slot, item)

                                    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                                      if (number > 5) return {
                                        condition: true,
                                        reason: Hutao.Player.getLanguage(player).cannotMoreThan5
                                      }

                                      return {
                                        condition: false,
                                        reason: "None"
                                      }
                                    }

                                    if (validString(res.formValues[0]).condition) {
                                      Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }

                                    if (validNumber(res.formValues[1]).condition) {
                                      Hutao.World.wrong(player, validNumber(res.formValues[1]).reason)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }

                                    if (item.enchantment.includes(res.formValues[0].trim())) {
                                      Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatEnchantment)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }

                                    item.enchantment[response] = {
                                      id: res.formValues[0].trim(),
                                      level: Math.floor(Number(res.formValues[1].trim()))
                                    }

                                    enchantment(player, selectedPlayer, slot, item)
                                  })
                              }

                              change(player, selectedPlayer, slot, item)
                            }

                            if ((res.selection - 1) == item.enchantment.length + 1) endForm(player, selectedPlayer, slot, item)
                          })
                      }

                      const lore = (player, selectedPlayer, slot, item) => {
                        if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                        const form = new UI.ActionFormData()
                          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                          .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)

                        item.lore.forEach(destroy => form.button(destroy))

                        form.button(`§1${Hutao.Player.getLanguage(player).itemTypeAddLore}`, `textures/ui/color_plus`)
                          .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
                          .show(player)
                          .then(res => {
                            if (res.canceled) {
                              if (res.cancelationReason == "UserBusy") return lore(player, selectedPlayer, slot, item)
                            }

                            if (res.selection == 0) lore(player, selectedPlayer, slot, item)

                            if ((res.selection - 1) == item.lore.length) {
                              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                              const change = (player, selectedPlayer, slot, item) => {
                                new UI.ModalFormData()
                                  .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheLore, "<String>")
                                  .show(player)
                                  .then(res => {
                                    if (res.canceled) return lore(player, selectedPlayer, slot, item)

                                    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                                    if (validString(res.formValues[0]).condition) {
                                      Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }

                                    if (item.lore.includes(res.formValues[0].trim())) {
                                      Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatLore)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }


                                    item.lore.push(res.formValues[0].trim())

                                    lore(player, selectedPlayer, slot, item)
                                  })
                              }

                              change(player, selectedPlayer, slot, item)
                            }

                            if (
                              res.selection > 0 &&
                              (res.selection - 1) < item.lore.length
                            ) {
                              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                              const response = res.selection - 1

                              const change = (player, selectedPlayer, slot, item) => {
                                new UI.ModalFormData()
                                  .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheLore, "<String>", item.lore[response])
                                  .toggle(`§c${Hutao.Player.getLanguage(player).removeLore}`)
                                  .show(player)
                                  .then(res => {
                                    if (res.canceled) return lore(player, selectedPlayer, slot, item)

                                    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                                    if (res.formValues[1]) {
                                      item.lore.splice(response, 1)
                                    } else {
                                      if (validString(res.formValues[0]).condition) {
                                        Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                                        Hutao.SetTickTimeOut(() => {
                                          change(player, selectedPlayer, slot, item)
                                        }, 20, 1, false).on()

                                        return
                                      }

                                      if (item.lore.includes(res.formValues[0].trim())) {
                                        Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatLore)

                                        Hutao.SetTickTimeOut(() => {
                                          change(player, selectedPlayer, slot, item)
                                        }, 20, 1, false).on()

                                        return
                                      }

                                      item.lore[response] = res.formValues[0].trim()
                                    }

                                    lore(player, selectedPlayer, slot, item)
                                  })
                              }

                              change(player, selectedPlayer, slot, item)
                            }

                            if ((res.selection - 1) == item.lore.length + 1) endForm(player, selectedPlayer, slot, item)
                          })
                      }

                      const canPlaceOn = (player, selectedPlayer, slot, item) => {
                        if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                        const form = new UI.ActionFormData()
                          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                          .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)

                        item.canPlaceOn.forEach(destroy => form.button(destroy))

                        form.button(`§1${Hutao.Player.getLanguage(player).itemTypeAddBlock}`, `textures/ui/color_plus`)
                          .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
                          .show(player)
                          .then(res => {
                            if (res.canceled) {
                              if (res.cancelationReason == "UserBusy") return canPlaceOn(player, selectedPlayer, slot, item)
                            }

                            if (res.selection == 0) canPlaceOn(player, selectedPlayer, slot, item)

                            if ((res.selection - 1) == item.canPlaceOn.length) {
                              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                              const change = (player, selectedPlayer, slot, item) => {
                                new UI.ModalFormData()
                                  .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheBlockYouWantToPlaceOn, "<String>")
                                  .show(player)
                                  .then(res => {
                                    if (res.canceled) return canPlaceOn(player, selectedPlayer, slot, item)

                                    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                                    if (validString(res.formValues[0]).condition) {
                                      Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()
                                    }

                                    if (item.canPlaceOn.includes(res.formValues[0].trim())) {
                                      Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheBlock)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()
                                    }


                                    item.canPlaceOn.push(res.formValues[0].trim())

                                    canPlaceOn(player, selectedPlayer, slot, item)
                                  })
                              }

                              change(player, selectedPlayer, slot, item)
                            }

                            if (
                              res.selection > 0 &&
                              (res.selection - 1) < item.canPlaceOn.length
                            ) {
                              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                              const response = res.selection - 1

                              const change = (player, selectedPlayer, slot, item) => {
                                new UI.ModalFormData()
                                  .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheBlockYouWantToPlaceOn, "<String>", item.canPlaceOn[response])
                                  .toggle(`§c${Hutao.Player.getLanguage(player).removeBlock}`)
                                  .show(player)
                                  .then(res => {
                                    if (res.canceled) return canPlaceOn(player, selectedPlayer, slot, item)

                                    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                                    if (res.formValues[1]) {
                                      item.canPlaceOn.splice(response, 1)
                                    } else {
                                      if (validString(res.formValues[0]).condition) {
                                        Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                                        Hutao.SetTickTimeOut(() => {
                                          change(player, selectedPlayer, slot, item)
                                        }, 20, 1, false).on()

                                        return
                                      }

                                      if (item.canPlaceOn.includes(res.formValues[0].trim())) {
                                        Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheBlock)

                                        Hutao.SetTickTimeOut(() => {
                                          change(player, selectedPlayer, slot, item)
                                        }, 20, 1, false).on()

                                        return
                                      }

                                      item.canPlaceOn[response] = res.formValues[0].trim()
                                    }

                                    canPlaceOn(player, selectedPlayer, slot, item)
                                  })
                              }

                              change(player, selectedPlayer, slot, item)
                            }

                            if ((res.selection - 1) == item.canPlaceOn.length + 1) endForm(player, selectedPlayer, slot, item)
                          })
                      }

                      const canDestroy = (player, selectedPlayer, slot, item) => {
                        if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                        const form = new UI.ActionFormData()
                          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                          .button(`§1${Hutao.Player.getLanguage(player).refresh}`, `textures/ui/refresh_light`)

                        item.canDestroy.forEach(destroy => form.button(destroy))

                        form.button(`§1${Hutao.Player.getLanguage(player).itemTypeAddBlock}`, `textures/ui/color_plus`)
                          .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
                          .show(player)
                          .then(res => {
                            if (res.canceled) {
                              if (res.cancelationReason == "UserBusy") return canDestroy(player, selectedPlayer, slot, item)
                            }

                            if (res.selection == 0) canDestroy(player, selectedPlayer, slot, item)

                            if ((res.selection - 1) == item.canDestroy.length) {
                              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                              const change = (player, selectedPlayer, slot, item) => {
                                new UI.ModalFormData()
                                  .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheBlockYouWantToDestroy, "<String>")
                                  .show(player)
                                  .then(res => {
                                    if (res.canceled) return canDestroy(player, selectedPlayer, slot, item)

                                    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                                    if (validString(res.formValues[0]).condition) {
                                      Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }

                                    if (item.canDestroy.includes(res.formValues[0].trim())) {
                                      Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheBlock)

                                      Hutao.SetTickTimeOut(() => {
                                        change(player, selectedPlayer, slot, item)
                                      }, 20, 1, false).on()

                                      return
                                    }


                                    item.canDestroy.push(res.formValues[0].trim())

                                    canDestroy(player, selectedPlayer, slot, item)
                                  })
                              }

                              change(player, selectedPlayer, slot, item)
                            }

                            if (
                              res.selection > 0 &&
                              (res.selection - 1) < item.canDestroy.length
                            ) {
                              if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                              const response = res.selection - 1

                              const change = (player, selectedPlayer, slot, item) => {
                                new UI.ModalFormData()
                                  .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                                  .textField(Hutao.Player.getLanguage(player).pleaseEnterTheBlockYouWantToDestroy, "<String>", item.canDestroy[response])
                                  .toggle(`§c${Hutao.Player.getLanguage(player).removeBlock}`)
                                  .show(player)
                                  .then(res => {
                                    if (res.canceled) return canDestroy(player, selectedPlayer, slot, item)

                                    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

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

                                    if (res.formValues[1]) {
                                      item.canDestroy.splice(response, 1)
                                    } else {
                                      if (validString(res.formValues[0]).condition) {
                                        Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                                        Hutao.SetTickTimeOut(() => {
                                          change(player, selectedPlayer, slot, item)
                                        }, 20, 1, false).on()

                                        return
                                      }

                                      if (item.canDestroy.includes(res.formValues[0].trim())) {
                                        Hutao.World.wrong(player, Hutao.Player.getLanguage(player).repeatIdOfTheBlock)

                                        Hutao.SetTickTimeOut(() => {
                                          change(player, selectedPlayer, slot, item)
                                        }, 20, 1, false).on()

                                        return
                                      }

                                      item.canDestroy[response] = res.formValues[0].trim()
                                    }

                                    canDestroy(player, selectedPlayer, slot, item)
                                  })
                              }

                              change(player, selectedPlayer, slot, item)
                            }

                            if ((res.selection - 1) == item.canDestroy.length + 1) endForm(player, selectedPlayer, slot, item)
                          })
                      }

                      const normalSetting = (player, selectedPlayer, slot, item) => {
                        if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                        new UI.ModalFormData()
                          .title(Hutao.Player.getLanguage(player).adminMenuTitle)
                          .textField(Hutao.Player.getLanguage(player).itemTypeId, "<String>", item.id)
                          .textField(Hutao.Player.getLanguage(player).itemTypeAmount, "<Number>", String(item.amount))
                          .show(player)
                          .then(res => {
                            if (res.canceled) return endForm(player, selectedPlayer, slot, item)

                            if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

                            if (validString(res.formValues[0]).condition) {
                              Hutao.World.wrong(player, validString(res.formValues[0]).reason)

                              Hutao.SetTickTimeOut(() => {
                                normalSetting(player, selectedPlayer, slot, item)
                              }, 20, 1, false).on()

                              return
                            }

                            if (validNumber(res.formValues[1]).condition) {
                              Hutao.World.wrong(player, validNumber(res.formValues[1]).reason)

                              Hutao.SetTickTimeOut(() => {
                                normalSetting(player, selectedPlayer, slot, item)
                              }, 20, 1, false).on()

                              return
                            }


                            endForm(player, selectedPlayer, slot, {
                              id: res.formValues[0].trim(),
                              amount: Number(res.formValues[1].trim())
                            })
                          })
                      }

                      if (validString(res.formValues[0]).condition) return Hutao.World.wrong(player, validString(res.formValues[0]).reason)
                      if (validNumber(res.formValues[1]).codnition) return Hutao.World.wrong(player, validNumber(res.formValues[1]).reason)

                      endForm(player, selectedPlayer, slot, {
                        id: res.formValues[0].trim(),
                        amount: Math.floor(Number(res.formValues[1].trim())),
                        canDestroy: [],
                        canPlaceOn: [],
                        lore: [],
                        enchantment: [],
                        nameTag: undefined,
                        lockMode: "none",
                        keepOnDeath: false
                      })
                    })
                }

                if (res.selection == 3) chooseSlot(player, selectedPlayer)
              })
          }

          chooseSlot(player, selectedPlayer)
        }

        if ((res.selection - 1) == items.length + 1) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

          selectedPlayer.runCommand(`function utils/clearEnderChest`)

          Hutao.World.success(player, Hutao.Player.getLanguage(player).clearSuccessfully)
          Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreClearedTheEnderChest.replaceAll("{player}", player.name))

          Hutao.SetTickTimeOut(() => {
            this.inventory(player, selectedPlayer)
          }, 5, 1, false).on()
        }

        if ((res.selection - 1) == items.length + 2) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

          const container = selectedPlayer.getComponent("inventory").container
          const equipment = selectedPlayer.getComponent("equippable")

          const slots = [
            "Head",
            "Chest",
            "Legs",
            "Feet",
            "Offhand"
          ]

          for (let i = 0; i < container.size; i++) {
            container.setItem(i)
          }

          for (const slot of slots) {
            equipment.setEquipment(slot)
          }

          Hutao.World.success(player, Hutao.Player.getLanguage(player).clearSuccessfully)
          Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreClearedTheInventory.replaceAll("{player}", player.name))

          Hutao.SetTickTimeOut(() => {
            this.inventory(player, selectedPlayer)
          }, 5, 1, false).on()
        }

        if (
          res.selection > 0 &&
          (res.selection - 1) < items.length
        ) this.items(player, selectedPlayer, items[res.selection - 1])

        if ((res.selection - 1) == items.length + 3) this.playerSetting(player, selectedPlayer)
      })
  }

  items(player, selectedPlayer, selectedItem) {
    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)
    if (notItem(selectedPlayer, selectedItem)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).theItemWasMoved)

    const canDestroy = selectedItem.getCanDestroy()
    const canPlaceOn = selectedItem.getCanPlaceOn()

    const bodies = [
      Hutao.Player.getLanguage(player).itemAmount.replaceAll("{amount}", selectedItem.amount)
    ]

    if (canDestroy.length > 0) bodies.push(Hutao.Player.getLanguage(player).itemCanDestroy.replaceAll("{blocks}", canDestroy.map(block => `  §e${block}`).join("\n§r")))
    if (canPlaceOn.length > 0) bodies.push(Hutao.Player.getLanguage(player).itemCanPlaceOn.replaceAll("{blocks}", canPlaceOn.map(block => `  §e${block}`).join("\n§r")))

    bodies.push(
      Hutao.Player.getLanguage(player).itemId.replaceAll("{id}", selectedItem.typeId),
      Hutao.Player.getLanguage(player).itemKeepOnDeath.replaceAll("{keepOnDeath}", selectedItem.keepOnDeath ? `§a${Hutao.Player.getLanguage(player).true}` : `§c${Hutao.Player.getLanguage(player).false}`),
      Hutao.Player.getLanguage(player).itemLockMode.replaceAll("{mode}", Hutao.Player.getLanguage(player)[`${selectedItem.lockMode}ItemLockMode`])
    )

    if (selectedItem.getLore()?.length > 0) bodies.push(Hutao.Player.getLanguage(player).itemLore.replaceAll("{lore}", selectedItem.getLore().map(item => `  §r${item}`)))
    if (selectedItem.nameTag) bodies.push(Hutao.Player.getLanguage(player).itemNameTag.replaceAll("{nameTag}", selectedItem.nameTag))

    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .body(bodies.join("\n§r"))
      .button(`§1${Hutao.Player.getLanguage(player).clearItem}`, `textures/ui/icon_trash`)
      .button(`§1${Hutao.Player.getLanguage(player).copyItem}`, `textures/ui/copy`)
      .button(`§1${Hutao.Player.getLanguage(player).moveItem}`, `textures/ui/icon_import`)
      .button(`§c${Hutao.Player.getLanguage(player).back}`, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.items(player)
        }

        if (res.selection == 0) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)
          if (notItem(selectedPlayer, selectedItem)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).theItemWasMoved)

          Hutao.World.success(player, Hutao.Player.getLanguage(player).clearSuccessfully)
          Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).yourSlotIsClearBy.replaceAll("{player}", player.name).replaceAll("{slot}", selectedItem._slot))

          if (isNaN(Number(selectedItem._slot))) {
            selectedPlayer.getComponent("equippable").setEquipment(selectedItem._slot)
          } else {
            selectedPlayer.getComponent("inventory").container.setItem(selectedItem._slot)
          }

          Hutao.SetTickTimeOut(() => {
            this.inventory(player, selectedPlayer)
          }, 5, 1, false).on()
        }

        if (res.selection == 1) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)
          if (notItem(selectedPlayer, selectedItem)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).theItemWasMoved)

          player.getComponent("inventory").container.addItem(selectedItem)

          Hutao.World.success(player, Hutao.Player.getLanguage(player).copySuccessfully)

          Hutao.SetTickTimeOut(() => {
            this.inventory(player, selectedPlayer)
          })
        }

        if (res.selection == 2) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)
          if (notItem(selectedPlayer, selectedItem)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).theItemWasMoved)

          player.getComponent("inventory").container.addItem(selectedItem)
          Hutao.World.success(player, Hutao.Player.getLanguage(player).moveSuccessfully)
          Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).yourSlotIsMoveBy.replaceAll("{player}", player.name).replaceAll("{slot}", selectedItem._slot))

          if (isNaN(Number(selectedItem._slot))) {
            selectedPlayer.getComponent("equippable").setEquipment(selectedItem._slot)
          } else {
            selectedPlayer.getComponent("inventory").container.setItem(selectedItem._slot)
          }

          Hutao.SetTickTimeOut(() => {
            this.inventory(player, selectedPlayer)
          }, 5, 1, false).on()
        }

        if (res.selection == 3) this.inventory(player, selectedPlayer)
      })
  }

  permission(player, selectedPlayer) {
    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .button(`§1${Hutao.Player.getLanguage(player).admin}\n${Hutao.Player.isAdmin(selectedPlayer) ? `§a${Hutao.Player.getLanguage(player).true}` : `§c${Hutao.Player.getLanguage(player).false}`}`, `textures/ui/permissions_op_crown`)
      .button(`§1${Hutao.Player.getLanguage(player).builder}\n${Hutao.Player.isBuilder(selectedPlayer) ? `§a${Hutao.Player.getLanguage(player).true}` : `§c${Hutao.Player.getLanguage(player).false}`}`, `textures/blocks/planks_oak`)
      .button(`§c${Hutao.Player.getLanguage(player).back} `, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.caneled) {
          if (res.cancelationReason == "UserBusy") return this.permission(player, selectedPlayer)
        }

        if (res.selection == 0) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .toggle(`§1${Hutao.Player.getLanguage(player).admin}`, Hutao.Player.isAdmin(player))
            .show(player)
            .then(res => {
              if (res.canceled) return this.permission(player)

              let config = Hutao.Database.get("db")

              if (res.formValues[0]) {
                if (!config.data.permission.admin.includes(selectedPlayer.id)) {
                  config.data.permission.admin.push(selectedPlayer.id)
                }

                Hutao.World.success(player, Hutao.Player.getLanguage(player).removeSuccessfully)
                Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreAddedToTheAdmin.replaceAll("{player}", player.name))
              } else {
                if (config.data.permission.admin.includes(selectedPlayer.id)) {
                  config.data.permission.admin.splice(config.data.permission.admin.indexOf(selectedPlayer.id), 1)
                }

                Hutao.World.success(player, Hutao.Player.getLanguage(player).addSuccessfully)
                Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreRemovedFromTheAdmin.replaceAll("{player}", player.name))
              }

              Hutao.Database.set("db", config)

              Hutao.SetTickTimeOut(() => {
                this.permission(player, selectedPlayer)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 1) {
          if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

          new UI.ModalFormData()
            .title(Hutao.Player.getLanguage(player).adminMenuTitle)
            .toggle(`§1${Hutao.Player.getLanguage(player).builder}`, Hutao.Player.isBuilder(player))
            .show(player)
            .then(res => {
              if (res.canceled) return this.permission(player)

              let config = Hutao.Database.get("db")

              if (res.formValues[0]) {
                if (!config.data.permission.builder.includes(selectedPlayer.id)) {
                  config.data.permission.builder.push(selectedPlayer.id)
                }

                Hutao.World.success(player, Hutao.Player.getLanguage(player).removeSuccessfully)
                Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreAddedToTheBuilder.replaceAll("{player}", player.name))
              } else {
                if (config.data.permission.builder.includes(selectedPlayer.id)) {
                  config.data.permission.builder.splice(config.data.permission.builder.indexOf(selectedPlayer.id), 1)
                }

                Hutao.World.success(player, Hutao.Player.getLanguage(player).addSuccessfully)
                Hutao.World.runCommand(selectedPlayer, Hutao.Player.getLanguage(selectedPlayer).youAreRemovedFromTheBuilder.replaceAll("{player}", player.name))
              }

              Hutao.Database.set("db", config)

              Hutao.SetTickTimeOut(() => {
                this.permission(player, selectedPlayer)
              }, 5, 1, false).on()
            })
        }

        if (res.selection == 2) this.playerSetting(player, selectedPlayer)
      })
  }

  behaviors(player, selectedPlayer) {
    if (notPlayer(selectedPlayer)) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).unknownPlayer)

    new UI.ActionFormData()
      .title(Hutao.Player.getLanguage(player).adminMenuTitle)
      .body([
        Hutao.Player.getLanguage(player).playerSettingBehaviorClimbing.replaceAll("{climb}", selectedPlayer.isClimbing ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorEmoting.replaceAll("{emote}", selectedPlayer.isEmoting ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorFalling.replaceAll("{fall}", selectedPlayer.isFalling ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorFlying.replaceAll("{fly}", selectedPlayer.isFlying ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorGliding.replaceAll("{glide}", selectedPlayer.isGliding ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorInWater.replaceAll("{inWater}", selectedPlayer.isInWater ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorJumping.replaceAll("{jump}", selectedPlayer.isJumping ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorOnGround.replaceAll("{ground}", selectedPlayer.isOnGround ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorSleeping.replaceAll("{sleep}", selectedPlayer.isSleeping ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorSneaking.replaceAll("{sneak}", selectedPlayer.isSneaking ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorSprinting.replaceAll("{sprint}", selectedPlayer.isSprinting ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
        Hutao.Player.getLanguage(player).playerSettingBehaviorSwimming.replaceAll("{swim}", selectedPlayer.isSwimming ? `§a${Hutao.Player.getLanguage(player).true} ` : `§c${Hutao.Player.getLanguage(player).false} `),
      ].join("\n§r"))
      .button(`§1${Hutao.Player.getLanguage(player).refresh} `, `textures/ui/refresh_light`)
      .button(`§c${Hutao.Player.getLanguage(player).back} `, `textures/ui/arrow_dark_left_stretch`)
      .show(player)
      .then(res => {
        if (res.canceled) {
          if (res.cancelationReason == "UserBusy") return this.behaviors(player)
        }

        if (res.selection == 0) this.behaviors(player, selectedPlayer)
        if (res.selection == 1) this.playerSetting(player, selectedPlayer)
      })
  }
}

const notPlayer = (player) => {
  return !Hutao.Player.hasPlayer(player)
}

const notItem = (player, selectedItem) => {
  let same = true

  if (isNaN(Number(selectedItem.slot))) {
    const item = player.getComponent("equipment_inventory").getEquipment(selectedItem.slot)

    if (item.typeId != selectedItem.typeId) same = false
    if (item.amount != selectedItem.amount) same = false
    if (item.lockMode != selectedItem.lockMode) same = false
    if (item.keepOnDeath != selectedItem.keepOnDeath) same = false
    if (item.nameTag != selectedItem.nameTag) same = false
    if (item.getLore() != selectedItem.getLore()) same = false

    const itemEnchant = {
      item: item.getComponent("enchantments").enchantments,
      selectedItem: selectedItem.getComponent("enchantments").enchantments
    }

    let enchantments = {
      item: [],
      selectedItem: []
    }

    for (const enchant of itemEnchant.selectedItem) {
      if (!itemEnchant.item.getEnchantment(enchant.type.id)) same = false

      enchantments.selectedItem.push(enchant)
    }

    for (const enchant of itemEnchant.item) {
      if (!itemEnchant.selectedItem.getEnchantment(enchant.type.id)) same = false

      enchantments.push(enchant)
    }

    if (enchantments.item.length != enchantments.selectedItem.length) same = false
  } else {
    const item = player.getComponent("inventory").container.getItem(selectedItem.slot)

    if (item.typeId != selectedItem.typeId) same = false
    if (item.amount != selectedItem.amount) same = false
    if (item.lockMode != selectedItem.lockMode) same = false
    if (item.keepOnDeath != selectedItem.keepOnDeath) same = false
    if (item.nameTag != selectedItem.nameTag) same = false
    if (item.getLore() != selectedItem.getLore()) same = false

    const itemEnchant = {
      item: item.getComponent("enchantments").enchantments,
      selectedItem: selectedItem.getComponent("enchantments").enchantments
    }

    let enchantments = {
      item: [],
      selectedItem: []
    }

    for (const enchant of itemEnchant.selectedItem) {
      if (!itemEnchant.item.getEnchantment(enchant.type.id)) same = false

      enchantments.selectedItem.push(enchant)
    }

    for (const enchant of itemEnchant.item) {
      if (!itemEnchant.selectedItem.getEnchantment(enchant.type.id)) same = false

      enchantments.push(enchant)
    }

    if (enchantments.item.length != enchantments.selectedItem.length) same = false
  }

  return !same
}