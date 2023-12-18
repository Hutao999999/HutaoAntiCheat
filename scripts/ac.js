import * as Minecraft from "@minecraft/server"
import * as setting from "./config"
import { Hutao } from "./lib/import";
import { configCache } from "./configCache";
import { antiCheat } from "./antiCheat/import";
import { entityCheck } from "./antiCheat/entityCheck";
import { AdminMenu } from "./menu/adminMenu";
import { command } from "./commands/import";

export class AC {
  start(ms) {
    if (!Hutao.Database.has()) {
      for (const player of Minecraft.world.getPlayers()) {
        Hutao.World.wrong(player, `The addon is not started`)
      }

      return
    }

    let lastDeleted = Date.now()
    const config = Hutao.Database.get("db")

    if (!config) {
      try {
        Minecraft.world.scoreboard.addObjective(setting.database, "")
      } catch { }

      Hutao.Database.set("db", setting.default.data)
    }

    setting.default.data = config.data

    if (
      !setting.default.data.uuid ||
      setting.default.data.uuid != configCache.data.uuid
    ) {
      for (const player of Minecraft.world.getPlayers()) {
        Hutao.World.wrong(player, `Please reset and restart the addon`)
      }

      return
    }

    const start = Minecraft.system.currentTick

    Minecraft.world.startTick = start

    let lastTick
    let msTick

    const beforeEventsWatchdogTerminate = Minecraft.system.beforeEvents.watchdogTerminate.subscribe(ev => {
      ev.cancel = true
      console.warn(`§l§cThe watchdog want to crash the world: §r§c${ev.terminateReason}`)
    })

    const beforeEventsChatSend = Minecraft.world.beforeEvents.chatSend.subscribe(ev => {
      const player = ev.sender
      const message = ev.message

      if (message.startsWith(setting.default.data.commands.normalPrefix)) {
        if (setting.default.data.commands.state) {
          ev.cancel = true

          player.command = Hutao.World.getCommand(message, false)

          Minecraft.system.run(() => {
            command(player, Hutao.World.getCommand(message))
          })
        } else {
          ev.cancel = true
          Hutao.World.wrong(player, Hutao.Player.getLanguage(player).commandsWasNotOpened)
        }

        return
      }

      if (![
        "admin",
        "owner"
      ].includes(player.permission)) {
        if (setting.default.data.antiCheat.spammerA.state) {
          if (player.isSprinting) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `A`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerB.state) {
          if (
            Date.now() - player.openContainer < 1000 &&
            player.hasTag("hutao:has_container_open")
          ) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `B`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerC.state) {
          if (player.hasTag("hutao:right")) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `C`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerD.state) {
          if (player.hasTag("left")) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `D`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerE.state) {
          if (Date.now() - player.lastItemUse < 300) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `E`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerF.state) {
          if (player.isJumping) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `F`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerG.state) {
          if (player.isSwimming) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `G`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerH.state) {
          if (player.selectedSlot != player.lastAction.selectedSlot) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `H`)
              player.selectedSlot = player.lastAction.selectedSlot
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerI.state) {
          if (Date.now() - player.lastPlaceBlock < 300) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `I`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerJ.state) {
          if (Date.now() - player.lastBrokeBlock < 300) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `J`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerK.state) {
          if (
            Date.now() - player.lastHitEntity < 200 ||
            Date.now() - player.lastHitBlock < 200
          ) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `K`)
            })

            return
          }
        }

        if (setting.default.data.antiCheat.spammerL.state) {
          if (message.includes("Horion - the best minecraft bedrock utility mod - horion.download")) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Spammer`, `L`)
            })

            return
          }
        }
      }

      if (setting.default.data.chatFormat.state) {
        ev.cancel = true

        const health = player.getComponent("health")
        const time = Hutao.World.getNowTime()
        const gamemode = Hutao.Player.getGamemode(player)

        const changer = {
          player: player.name,
          message: message,
          status: setting.default.data.chatFormat.format.status[player.permission],
          location: setting.default.data.chatFormat.format.location.replaceAll("{x}", Math.floor(player.location.x * 100) / 100).replaceAll("{y}", Math.floor(player.location.y * 100) / 100).replaceAll("{z}", Math.floor(player.location.z * 100) / 100),
          rotation: setting.default.data.chatFormat.format.rotation.replaceAll("{x}", Math.floor(player.getRotation().x * 100) / 100).replaceAll("{y}", Math.floor(player.getRotation().y * 100) / 100),
          health: setting.default.data.chatFormat.format.health.replaceAll("{health}", health.currentValue).replaceAll("{percent}", health.currentValue / health.effectiveMax).replaceAll("{bar}", `§a▍`.repeat(health.currentValue) + `§c▍`.repeat(health.effectiveMax - health.currentValue)),
          time: setting.default.data.chatFormat.format.time.replaceAll("{year}", time.year).replaceAll("{month}", time.minute).replaceAll("{date}", time.date).replaceAll("{hour}", time.hour).replaceAll("{minute}", time.minute).replaceAll("{second}", time.second).replaceAll("{millisecond}", time.millisecond),
          level: setting.default.data.chatFormat.format.level.replaceAll("{level}", Math.floor(player.xpEarnedAtCurrentLevel / player.totalXpNeededForNextLevel * 100) / 100 + player.level),
        }

        if (player.dimension.id == "minecraft:overworld") changer.dimension = setting.default.data.chatFormat.format.dimension.overworld
        else if (player.dimension.id == "minecraft:nether") changer.dimension = setting.default.data.chatFormat.format.dimension.nether
        else if (player.dimension.id == "minecraft:the_end") changer.dimension = setting.default.data.chatFormat.format.dimension.nether
        else changer.dimension = setting.default.data.chatFormat.format.dimension.other

        if (gamemode == "survival") changer.gamemode = setting.default.data.chatFormat.format.gamemode.survival
        else if (gamemode == "creative") changer.gamemdoe = setting.default.data.chatFormat.format.gamemode.creative
        else if (gamemode == "adventure") changer.gamemode = setting.default.data.chatFormat.format.gamemode.adventure
        else if (gamemode == "spectator") changer.gamemode = setting.default.data.chatFormat.format.gamemode.spectator
        else changer.gamemode = setting.default.data.chatFormat.format.gamemode.other

        if (player.team == "red") changer.team = setting.default.data.chatFormat.format.team.red
        else if (player.team == "blue") changer.team = setting.default.data.chatFormat.format.team.blue
        else if (player.team == "green") changer.team = setting.default.data.chatFormat.format.team.green
        else if (player.team == "yellow") changer.team = setting.default.data.chatFormat.format.team.yellow
        else if (player.team == "white") changer.team = setting.default.data.chatFormat.format.team.white
        else if (player.team == "orange") changer.team = setting.default.data.chatFormat.format.team.orange
        else if (player.team == "gray") changer.team = setting.default.data.chatFormat.format.team.gray
        else if (player.team == "purple") changer.team = setting.default.data.chatFormat.format.team.purple
        else if (player.team == "aqua") changer.team = setting.default.data.chatFormat.format.team.aqua
        else if (player.team == "black") changer.team = setting.default.data.chatFormat.format.team.black
        else if (player.team == "other") changer.team = setting.default.data.chatFormat.format.team.other

        let beSent

        if (setting.default.data.chatFormat.structure.custom[player.id]) {
          beSent = setting.default.data.chatFormat.structure.custom[player.id]
        } else {
          beSent = setting.default.data.chatFormat.structure[player.permission]
        }

        for (const item of Object.entries(changer)) {
          beSent = beSent.replaceAll(`{${item[0]}}`, item[1])
        }

        Hutao.World.log(beSent)
      }
    })

    const afterEventsEntityHitEntity = Minecraft.world.afterEvents.entityHitEntity.subscribe(ev => {
      const damagingEntity = ev.damagingEntity
      const hitEntity = ev.hitEntity

      if (damagingEntity.typeId == "minecraft:player") {
        if (![
          "admin",
          "owner"
        ].includes(damagingEntity.permission)) {
          damagingEntity.autoClickerACPS ??= 0
          damagingEntity.autoClickerACPS += 1

          if (setting.default.data.antiCheat.autoClickerA.state) {
            if (damagingEntity.autoClickerACPS > setting.default.data.antiCheat.autoClickerA.maxCPS) {
              Hutao.Player.checking(damagingEntity, `AutoClicker`, `A`)
            }
          }

          if (setting.default.data.antiCheat.killauraA.state) {
            damagingEntity.killauraAAmount ??= 0

            if (hitEntity.id != damagingEntity.lastHitCurrentEntity) {
              damagingEntity.killauraAAmount += 1
            }

            if (damagingEntity.killauraAAmount > 2) {
              Hutao.Player.checking(damagingEntity, `Killaura`, `A`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.killauraB.state) {
            let angle = Math.atan2(
              hitEntity.location.z - damagingEntity.location.z,
              hitEntity.location.x - damagingEntity.location.x
            ) * 180 / Math.PI - damagingEntity.getRotation().y - 90

            angle += (angle <= -180 ? 360 : 0)
            angle = Math.abs(angle)

            if (
              angle > 95 &&
              Math.sqrt(
                (damagingEntity.location.x - hitEntity.location.x) ** 2 +
                (damagingEntity.location.z - hitEntity.location.z) ** 2
              ) > 2
            ) {
              Hutao.Player.checking(damagingEntity, `Killaura`, `B`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.killauraC.state) {
            if (
              Date.now() - damagingEntity.openContainer < 2000 &&
              damagingEntity.hasTag("hutao:has_container_open")
            ) {
              Hutao.Player.checking(damagingEntity, `Killaura`, `C`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.killauraD.state) {
            if (damagingEntity.isSleeping) {
              Hutao.Player.checking(damagingEntity, `Killaura`, `D`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.killauraE.state) {
            if (Date.now() - damagingEntity.lastPlaceBlock < 50) {
              Hutao.Player.checking(damagingEntity, `Killaura`, `E`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.killauraF.state) {
            if (Date.now() - damagingEntity.lastBrokeBlock < 50) {
              Hutao.Player.checking(damagingEntity, `Killaura`, `F`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.killauraG.state) {
            if (Date.now() - damagingEntity.lastItemUse < 50) {
              Hutao.Player.checking(damagingEntity, `Killaura`, `G`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.killauraH.state) {
            if (damagingEntity.hasTag("hutao:right")) {
              Hutao.Player.checking(damagingEntity, `Killaura`, `H`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.killauraI.state) {
            const distance = Math.sqrt(
              (damagingEntity.getHeadLocation().x - hitEntity.location.x) ** 2 +
              (damagingEntity.getHeadLocation().y - hitEntity.location.y) ** 2 +
              (damagingEntity.getHeadLocation().z - hitEntity.location.z) ** 2
            )

            const diffYRotation = -6 + (15 - Math.min(Math.abs(damagingEntity.getRotation().x) - 75, 0)) * (8 / 15)

            if (distance > diffYRotation) {
              Hutao.Player.checking(player, `Killaura`, `I`)

              damagingEntity.addEffect("weakness", 40, {
                amplifier: 255,
                showParticles: false
              })
            }
          }

          if (setting.default.data.antiCheat.reachA.state) {
            const distance = Math.sqrt(
              (damagingEntity.getHeadLocation().x - hitEntity.location.x) ** 2 +
              (damagingEntity.getHeadLocation().y - hitEntity.location.y) ** 2 +
              (damagingEntity.getHeadLocation().z - hitEntity.location.z) ** 2
            )

            if (
              distance > setting.default.data.antiCheat.reachA.distance +
              (Hutao.Player.getGamemode(damagingEntity) == "creative" ? 4 : 0)
            ) {
              ev.cancel = true

              Minecraft.system.run(() => {
                Hutao.Player.checking(damagingEntity, `Reach`, `A`)

                damagingEntity.addEffect("weakness", 40, {
                  amplifier: 255,
                  showParticles: false
                })
              })
            }
          }
        }

        damagingEntity.lastHitEntity = Date.now()
        damagingEntity.lastHitCurrentEntity = hitEntity.id
      }
    })

    const afterEventsItemUse = Minecraft.world.afterEvents.itemUse.subscribe(ev => {
      const player = ev.source
      const item = ev.itemStack

      if (
        item.typeId == setting.default.data.adminMenu.identifier &&
        item.getLore().includes(setting.default.data.adminMenu.encrypt)
      ) {
        if (Hutao.Player.isAdmin(player)) {
          new AdminMenu().open(player)
        }
      }

      if (
        item.typeId.endsWith("helmet") ||
        item.typeId.endsWith("chestplate") ||
        item.typeId.endsWith("leggings") ||
        item.typeId.endsWith("boots") ||
        item.typeId.endsWith("elytra")
      ) {
        player.autoArmorChecking = Date.now()
      }
    })

    const afterEventsEntityHurt = Minecraft.world.afterEvents.entityHurt.subscribe(ev => {
      const damagingEntity = ev.damageSource.damagingEntity
      const hurtEntity = ev.hurtEntity
      const cause = ev.damageSource.cause

      if (cause) {
        if (hurtEntity.typeId == "minecraft:player") {
          hurtEntity.gotHurt = Date.now()
        }
      }

      if (setting.default.data.deadMessage.state) {
        if (hurtEntity.typeId == "minecraft:player") {
          const health = hurtEntity.getComponent("health")

          if (health.currentValue <= 0) {
            if (cause) {
              if (Object.keys(setting.default.data.deadMessage).includes(cause)) {
                if (
                  cause == "entityAttack" ||
                  cause == "projetile"
                ) {
                  Hutao.World.log(
                    setting.default.data.deadMessage[cause]
                      .replaceAll("{player}", hurtEntity.name)
                      .replaceAll("{attacker}", damagingEntity ? (damagingEntity.typeId == "minecraft:player" ? damagingEntity.name : damagingEntity.typeId.replace("minecraft:", "")) : "")
                  )
                } else {
                  Hutao.World.log(setting.default.data.deadMessage[cause].replaceAll("{player}", hurtEntity.name))
                }
              }
            } else {
              Hutao.World.log(setting.default.data.deadMessage.other.replaceAll("{player}", hurtEntity.name))
            }
          }
        }
      }
    })

    const afterEventsExplosion = Minecraft.world.afterEvents.explosion.subscribe(ev => {
      const source = ev.source

      try {
        for (const player of Minecraft.world.getPlayers()) {
          if (
            Math.sqrt(
              Math.floor(player.location.x - source.location.x) ** 2 +
              Math.floor(player.location.y - source.location.y) ** 2 +
              Math.floor(player.location.z - source.location.z) ** 2
            ) < 15 &&
            player.dimension.id == source.dimension.id
          ) {
            player.gotExplosion = Date.now()
          }
        }
      } catch { }
    })

    const afterEventsEntityHitBlock = Minecraft.world.afterEvents.entityHitBlock.subscribe(ev => {
      const damagingEntity = ev.damagingEntity
      const hitBlock = ev.hitBlock

      if (damagingEntity.typeId == "minecraft:player") {
        if (![
          "admin",
          "owner"
        ].includes(damagingEntity.permission)) {
          damagingEntity.autoClickerBCPS ??= 0
          damagingEntity.autoClickerBCPS += 1

          if (setting.default.data.antiCheat.autoClickerB.state) {
            if (damagingEntity.autoClickerBCPS > setting.default.data.antiCheat.autoClickerB.maxCPS) {
              Hutao.Player.checking(damagingEntity, `AutoClicker`, `B`)
            }
          }

          if (setting.default.data.antiCheat.reachB.state) {
            const distance = Math.sqrt(
              (damagingEntity.getHeadLocation().x - hitBlock.location.x) ** 2 +
              (damagingEntity.getHeadLocation().y - hitBlock.location.y) ** 2 +
              (damagingEntity.getHeadLocation().z - hitBlock.location.z) ** 2
            )

            if (
              distance > setting.default.data.antiCheat.reachB.distance +
              (Hutao.Player.getGamemode(damagingEntity) == "creative" ? 4 : 0)
            ) {
              ev.cancel = true

              Minecraft.system.run(() => {
                Hutao.Player.checking(damagingEntity, `Reach`, `B`)
              })
            }
          }
        }

        damagingEntity.autoToolAChecking = true
      }

      damagingEntity.lastHitBlock = Date.now()
    })

    const beforeEventsPlayerBreakBlock = Minecraft.world.beforeEvents.playerBreakBlock.subscribe(ev => {
      const player = ev.player
      const block = ev.block

      if (![
        "admin",
        "owner"
      ].includes(player.permission)) {
        if (setting.default.data.antiCheat.nukerA.state) {
          player.nukerABreak ??= 0
          player.nukerABreak += 1

          if (player.nukerABreak > 6) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Nuker`, `A`)
            })
          }
        }

        if (setting.default.data.antiCheat.nukerB.state) {
          if (Date.now() - player.lastBrokeBlock < 3) {
            player.nukerBBreak ??= 0
            player.nukerBBreak += 1

            if (player.nukerBBreak > 4) {
              ev.cancel = true

              Minecraft.system.run(() => {
                Hutao.Player.checking(player, `Nuker`, `B`)
              })
            }
          }
        }

        if (setting.default.data.antiCheat.nukerC.state) {
          if (
            Date.now() - player.openContainer < 2000 &&
            player.hasTag("hutao:has_container_open")
          ) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Nuker`, `C`)
            })
          }
        }

        if (setting.default.data.antiCheat.nukerD.state) {
          if (Date.now() - player.lastHitEntity < 200) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Nuker`, `D`)
            })
          }
        }

        if (setting.default.data.antiCheat.nukerE.state) {
          if (player.isSleeping) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Nuker`, `E`)
            })
          }
        }

        if (setting.default.data.antiCheat.nukerF.state) {
          if (Date.now() - player.autoArmorB < 50) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Nuker`, `F`)
            })
          }
        }

        if (setting.default.data.antiCheat.inventoryActionE.state) {
          if (
            Date.now() - player.openContainer < 1000 &&
            player.hasTag("hutao:has_container_open")
          ) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `InventoryAction`, `E`)
            })
          }
        }

        if (setting.default.data.antiCheat.reachD.state) {
          const distance = Math.sqrt(
            (player.getHeadLocation().x - block.location.x) ** 2 +
            (player.getHeadLocation().y - block.location.y) ** 2 +
            (player.getHeadLocation().z - block.location.z) ** 2
          )

          if (
            distance > setting.default.data.antiCheat.reachD.distance +
            (Hutao.Player.getGamemode(player) == "creative" ? 4 : 0)
          ) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Reach`, `C`)
            })
          }
        }

        if (setting.default.data.antiCheat.nukerG.state) {
          let angle = Math.atan2(
            block.location.z - player.getHeadLocation().z,
            block.location.x - player.getHeadLocation().x
          ) * 180 / Math.PI - player.getRotation().y - 90

          angle += (angle <= -180 ? 360 : 0)
          angle = Math.abs(angle)

          if (Math.abs(player.getHeadLocation().y - block.location.y) < 3) {
            if (
              angle > 95 &&
              Math.sqrt(
                (player.getHeadLocation().x - block.location.x) ** 2 +
                (player.getHeadLocation().z - block.location.z) ** 2
              ) > 3
            ) {
              Hutao.Player.checking(player, `Nuker`, `G`)
            }
          }
        }
      }

      player.lastBrokeBlock = Date.now()
    })

    const beforeEventsPlayerPlaceBlock = Minecraft.world.beforeEvents.playerPlaceBlock.subscribe(ev => {
      const player = ev.player
      const block = ev.block

      if (![
        "admin",
        "owner"
      ].includes(player.permission)) {
        if (setting.default.data.antiCheat.reachC.state) {
          const distance = Math.sqrt(
            (player.getHeadLocation().x - block.location.x) ** 2 +
            (player.getHeadLocation().y - block.location.y) ** 2 +
            (player.getHeadLocation().z - block.location.z) ** 2
          )

          if (
            distance > setting.default.data.antiCheat.reachC.distance +
            (Hutao.Player.getGamemode(player) == "creative" ? 4 : 0)
          ) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Reach`, `D`)
            })
          }
        }

        if (setting.default.data.antiCheat.scaffoldD.state) {
          const headLocation = {
            x: player.getHeadLocation().x,
            y: player.getHeadLocation().y,
            z: player.getHeadLocation().z
          }

          const headBlock = player.dimension.getBlock({
            x: headLocation.x,
            y: headLocation.y,
            z: headLocation.z
          })

          if (!headBlock.isSolid) {
            if (!scaffoldDByPassBlock.includes(headBlock.typeId)) {
              if (!(
                headLocation.x == block.location.x &&
                headLocation.y == block.location.y &&
                headLocation.z == block.location.z &&
                player.dimension.id == block.dimension.id
              )) {
                ev.cancel = true

                Minecraft.system.run(() => {
                  Hutao.Player.checking(player, `Scaffold`, `D`)
                })
              }
            }
          }
        }

        if (setting.default.data.antiCheat.scaffoldE.state) {
          if (Date.now() - player.lastHitEntity < 50) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Scaffold`, `E`)
            })
          }
        }

        if (setting.default.data.antiCheat.scaffoldF.state) {
          if (Date.now() - player.lastHitBlock < 50) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Scaffold`, `F`)
            })
          }
        }

        if (setting.default.data.antiCheat.scaffoldG.state) {
          if (!player.isFlying) {
            if (player.getRotation().x == 60) {
              ev.cancel = true

              Minecraft.system.run(() => {
                Hutao.Player.checking(player, `Scaffold`, `G`)
              })
            }
          }
        }

        if (setting.default.data.antiCheat.scaffoldH.state) {
          if (Date.now() - player.autoArmorB < 50) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Scaffold`, `H`)
            })
          }
        }

        if (setting.default.data.antiCheat.scaffoldI.state) {
          if (player.unusualSprinting > 0) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `Scaffold`, `I`)
            })
          }
        }

        if (setting.default.data.antiCheat.inventoryActionD.state) {
          if (
            Date.now() - player.openContainer < 1000 &&
            player.hasTag("hutao:has_container_open")
          ) {
            ev.cancel = true

            Minecraft.system.run(() => {
              Hutao.Player.checking(player, `InventoryAction`, `D`)
            })
          }
        }

        if (setting.default.data.antiCheat.scaffoldJ.state) {
          if (player.movingDirection == "backward") {
            let distance = Math.sqrt(
              (player.location.x - block.location.x) ** 2 +
              (player.location.z - block.location.z) ** 2
            )

            let direction = Math.atan2(
              block.location.z - Math.floor(player.location.z),
              block.location.x - Math.floor(player.location.x)
            ) * 180 / Math.PI - player.getRotation().y - 90

            direction += (direction <= -180 ? 360 : 0)

            if (Math.abs(player.getHeadLocation().y - block.location.y) < 3) {
              if (distance > 1.2) {
                if (
                  direction <= -135 ||
                  direction >= 135
                ) {
                  ev.cancel = true

                  Minecraft.system.run(() => {
                    Hutao.Player.checking(player, `Scaffold`, `J`)
                  })
                }
              }
            }
          }
        }

        if (setting.default.data.antiCheat.scaffoldK.state) {
          let angle = Math.atan2(
            block.location.z - player.getHeadLocation().z,
            block.location.x - player.getHeadLocation().x
          ) * 180 / Math.PI - player.getRotation().y - 90

          angle += (angle <= -180 ? 360 : 0)
          angle = Math.abs(angle)

          if (
            angle > 95 &&
            Math.sqrt(
              (player.getHeadLocation().x - block.location.x) ** 2 +
              (player.getHeadLocation().z - block.location.z) ** 2
            ) > 3
          ) {
            Hutao.Player.checking(player, `Scaffold`, `K`)
          }
        }
      }

      player.lastPlaceBlock = Date.now()
    })

    const afterEventsPlayerPlaceBlock = Minecraft.world.afterEvents.playerPlaceBlock.subscribe(ev => {
      const player = ev.player
      const block = ev.block

      if (![
        "admin",
        "owner"
      ].includes(player.permission)) {
        if (setting.default.data.antiCheat.scaffoldA.state) {
          if (!(
            block.location.x == player.lastBlock?.block?.location?.x &&
            block.location.y - player.lastBlock?.block?.location?.y < 0 &&
            block.location.z == player.lastBlock?.block?.location?.z
          )) {
            if (
              player.isSprinting &&
              !player.isFlying &&
              !player.getEffect("speed") &&
              !player.getEffect("levitation")
            ) {
              const distance = Math.sqrt(
                (player.getHeadLocation().x - block.location.x) ** 2 +
                (player.getHeadLocation().y - block.location.y) ** 2 +
                (player.getHeadLocation().z - block.location.z) ** 2
              )

              if (distance < 3) {
                player.scaffoldAPlaceBlock ??= 0
                player.scaffoldAPlaceBlock += 1
              }
            }
          }
        }

        if (setting.default.data.antiCheat.scaffoldB.state) {
          const item = Hutao.Player.getHandItem(player)

          if (block.permutation.getItemStack(1).typeId != item.typeId) {
            Hutao.Player.checking(player, `Scaffold`, `B`)
            block.setType("minecraft:air")
          }
        }

        if (setting.default.data.antiCheat.scaffoldC.state) {
          if (player.getHeadLocation().y - block.location.y > 1.5) {
            if (player.getRotation().x < 0) {
              if (checkBlock(player, block)) {
                Hutao.Player.checking(player, `Scaffold`, `C`)
                block.setType("minecraft:air")
              }
            }
          }
        }
      }
    })

    const beforeEventsItemUse = Minecraft.world.beforeEvents.itemUse.subscribe(ev => {
      const player = ev.source
      const item = ev.itemStack

      if (![
        "admin",
        "owner"
      ].includes(player.permission)) {
        if (setting.default.data.antiCheat.fastThrowA.state) {
          if (throwable.includes(item.typeId)) {
            if (player.lastThrow) {
              if (Date.now() - player.lastThrow < 50) {
                Hutao.Player.checking(player, `FastThrow`, `A`)
                ev.cancel = true
              }
            }

            player.lastThrow = Date.now()
          }
        }
      }

      player.lastItemUse = Date.now()
    })

    const afterEventsPlayerSpawn = Minecraft.world.afterEvents.playerSpawn.subscribe(ev => {
      const player = ev.player
      const initialSpawn = ev.initialSpawn

      if (initialSpawn) {
        if (![
          "admin",
          "owner"
        ].includes(player)) {
          if (setting.default.data.antiCheat.nameSpoofA.state) {
            const validString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
            let name = player.name

            for (const string of validString) {
              name = name.replaceAll(string, "")
            }

            if (name.length > 0) {
              Hutao.Player.checking(player, `NameSpoof`, `A`)
            }
          }

          if (setting.default.data.antiCheat.nameSpoofB.state) {
            if (
              player.name.length < 5 ||
              player.name.length > 16
            ) {
              Hutao.Player.checking(player, `NameSpoof`, `B`)
            }
          }
        }
      }
    })

    const runInterval = Minecraft.system.runInterval(() => {
      if ((Minecraft.system.currentTick - start) % 2 == 0) {
        const config = Hutao.Database.get("db")

        setting.default.data = config.data
      }

      entityCheck()

      for (const player of Minecraft.world.getPlayers()) {
        if (Minecraft.system.currentTick - start > 2) {
          antiCheat(player)
        }

        if (!Object.keys(setting.default.data.players).includes(player.id)) {
          let config = Hutao.Database.get("db")

          config.data.players[player.id] = {
            language: "en",
            name: player.name,
            mute: false,
            freeze: false,
            freezeLocation: {}
          }

          Hutao.Database.set("db", config)
        }

        if (setting.default.data.players[player.id].freeze) {
          if (
            Math.abs(setting.default.data.players[player.id].freezeLocation.x - player.location.x) > 0.001 ||
            Math.abs(setting.default.data.players[player.id].freezeLocation.y - player.location.y) > 0.001 ||
            Math.abs(setting.default.data.players[player.id].freezeLocation.z - player.location.z) > 0.001 ||
            setting.default.data.players[player.id].freezeLocation.dimension != player.dimension.id
          ) {
            player.teleport({
              x: setting.default.data.players[player.id].freezeLocation.x,
              y: setting.default.data.players[player.id].freezeLocation.y,
              z: setting.default.data.players[player.id].freezeLocation.z
            }, {
              dimension: Minecraft.world.getDimension(setting.default.data.players[player.id].freezeLocation.dimension),
              rotation: {
                x: setting.default.data.players[player.id].freezeLocation.rx,
                y: setting.default.data.players[player.id].freezeLocation.ry
              }
            })
          }
        }

        resetValuable(player)
      }

      try {
        const scoreboard = Minecraft.world.scoreboard.getObjective("hutao:reset")

        if (scoreboard) {
          for (const player of Minecraft.world.getPlayers()) {
            try {
              if (scoreboard.getScore(player)) {
                resetAC(player)

                break
              }
            } catch { }
          }

          Minecraft.world.scoreboard.removeObjective("hutao:reset")
        }
      } catch { }
    })

    const msDelay = Date.now() - ms
    const time = Hutao.World.getNowTime(setting.default.data.timeDifference)
    const timeMessage = `§e${time.hour}§7:§e${time.minute}§7:§e${time.second}§7.§e${time.millisecond}`

    for (const player of Minecraft.world.getPlayers()) {
      Hutao.World.success(player, Hutao.Player.getLanguage(player).resetAddonSuccessfully.replaceAll("{time}", timeMessage).replaceAll("{ms}", msDelay))
    }
  }
}

const resetValuable = (player) => {
  player.flag ??= {}

  player.flag["auraA"] ??= 0
  player.flag["auraB"] ??= 0
  player.flag["autoArmorA"] ??= 0
  player.flag["autoArmorB"] ??= 0
  player.flag["autoArmorC"] ??= 0
  player.flag["autoArmorD"] ??= 0
  player.flag["autoArmorE"] ??= 0
  player.flag["autoArmorF"] ??= 0
  player.flag["autoArmorG"] ??= 0
  player.flag["autoClickerA"] ??= 0
  player.flag["autoClickerB"] ??= 0
  player.flag["autoShieldA"] ??= 0
  player.flag["autoShieldB"] ??= 0
  player.flag["autoShieldC"] ??= 0
  player.flag["autoShieldD"] ??= 0
  player.flag["autoShieldE"] ??= 0
  player.flag["autoShieldF"] ??= 0
  player.flag["autoShieldG"] ??= 0
  player.flag["autoToolA"] ??= 0
  player.flag["autoTotemA"] ??= 0
  player.flag["autoTotemB"] ??= 0
  player.flag["autoTotemC"] ??= 0
  player.flag["autoTotemD"] ??= 0
  player.flag["autoTotemE"] ??= 0
  player.flag["autoTotemF"] ??= 0
  player.flag["autoTotemG"] ??= 0
  player.flag["badPacketA"] ??= 0
  player.flag["badPacketB"] ??= 0
  player.flag["blinkA"] ??= 0
  player.flag["crasherA"] ??= 0
  player.flag["crasherB"] ??= 0
  player.flag["fastLadderA"] ??= 0
  player.flag["fastThrowA"] ??= 0
  player.flag["flyA"] ??= 0
  player.flag["invalidSprintA"] ??= 0
  player.flag["invalidSprintB"] ??= 0
  player.flag["invalidSprintC"] ??= 0
  player.flag["inventoryActionA"] ??= 0
  player.flag["inventoryActionB"] ??= 0
  player.flag["inventoryActionC"] ??= 0
  player.flag["inventoryActionD"] ??= 0
  player.flag["itemCheckA"] ??= 0
  player.flag["itemCheckB"] ??= 0
  player.flag["itemCheckC"] ??= 0
  player.flag["itemCheckD"] ??= 0
  player.flag["itemCheckE"] ??= 0
  player.flag["itemCheckF"] ??= 0
  player.flag["itemCheckG"] ??= 0
  player.flag["itemCheckH"] ??= 0
  player.flag["itemCheckI"] ??= 0
  player.flag["itemCheckJ"] ??= 0
  player.flag["itemCheckK"] ??= 0
  player.flag["killauraA"] ??= 0
  player.flag["killauraB"] ??= 0
  player.flag["killauraC"] ??= 0
  player.flag["killauraD"] ??= 0
  player.flag["killauraE"] ??= 0
  player.flag["killauraF"] ??= 0
  player.flag["killauraG"] ??= 0
  player.flag["killauraH"] ??= 0
  player.flag["killauraI"] ??= 0
  player.flag["movementA"] ??= 0
  player.flag["nameSpoofA"] ??= 0
  player.flag["nameSpoofB"] ??= 0
  player.flag["noFallA"] ??= 0
  player.flag["noSlowDownA"] ??= 0
  player.flag["noSlowDownB"] ??= 0
  player.flag["nukerA"] ??= 0
  player.flag["nukerB"] ??= 0
  player.flag["nukerC"] ??= 0
  player.flag["nukerD"] ??= 0
  player.flag["nukerE"] ??= 0
  player.flag["nukerF"] ??= 0
  player.flag["nukerG"] ??= 0
  player.flag["reachA"] ??= 0
  player.flag["reachB"] ??= 0
  player.flag["reachC"] ??= 0
  player.flag["reachD"] ??= 0
  player.flag["scaffoldA"] ??= 0
  player.flag["scaffoldB"] ??= 0
  player.flag["scaffoldC"] ??= 0
  player.flag["scaffoldD"] ??= 0
  player.flag["scaffoldE"] ??= 0
  player.flag["scaffoldF"] ??= 0
  player.flag["scaffoldG"] ??= 0
  player.flag["scaffoldH"] ??= 0
  player.flag["scaffoldI"] ??= 0
  player.flag["scaffoldJ"] ??= 0
  player.flag["scaffoldK"] ??= 0
  player.flag["spammerA"] ??= 0
  player.flag["spammerB"] ??= 0
  player.flag["spammerC"] ??= 0
  player.flag["spammerD"] ??= 0
  player.flag["spammerE"] ??= 0
  player.flag["spammerF"] ??= 0
  player.flag["spammerG"] ??= 0
  player.flag["spammerH"] ??= 0
  player.flag["spammerI"] ??= 0
  player.flag["spammerJ"] ??= 0
  player.flag["spammerK"] ??= 0
  player.flag["spammerL"] ??= 0
  player.flag["speedA"] ??= 0

  player.elytra ??= 0
  player.gotExplosion ??= 0
  player.dimensionTime ??= 0
  player.gotHurt ??= 0
  player.openContainer ??= 0
  player.gothurtEffect ??= 0
  player.trident ??= 0
  player.fly ??= 0
  player.die ??= 0
  player.lastHitEntity ??= 0
  player.lastHitBlock ??= 0
  player.lastPlaceBlock ??= 0
  player.lastBrokeBlock ??= 0
  player.autoArmorChecking ??= 0
  player.autoArmorB ??= 0
  player.levitation ??= 0
  player.jumpBoost ??= 0
  player.nukerABreak = 0
  player.killauraAAmount = 0
  player.nukerBBreak = 0
  player.elytraSpeed = Date.now() - player.elytra < 1000 ? 1.2 : 0
  player.ridingSpeed = Date.now() - player.riding < 1000 ? 4 : 0
  player.tridentSpeed = Date.now() - player.trident < 7000 ? 5 : 0
  player.flySpeed = Date.now() - player.fly < 2000 ? 1.4 : 0
  player.speed = (player.getEffect("speed")?.amplifier ?? 0) * 0.06
  player.permission = Hutao.Player.getPermission(player)
  player.lastAction = player.lastAction2
  player.lastAction2 = player.lastAction3

  player.lastActions ??= []

  if (typeof player.lastActions != "object") {
    player.lastActions = []
  }

  if (player.getEffect("levitation")) {
    player.levitation = 0
  } else {
    player.levitation += 1
  }

  if (player.getEffect("jump_boost")) {
    player.jumpBoost = 0
  } else {
    player.jumpBoost += 1
  }

  player.lastActions = [
    ...player.lastActions,
    player.lastAction3
  ]

  if (player.lastActions.length > 20) {
    player.lastActions.shift()
  }

  if (
    player.location.y <= player.dimension.heightRange.max &&
    player.location.y >= player.dimension.heightRange.min
  ) {
    player.legBlock = Minecraft.world.getDimension("overworld").getBlock({
      x: player.location.x,
      y: player.location.y,
      z: player.location.z
    })
  } else {
    player.legBlock = undefined
  }

  if (Minecraft.system.currentTick % 20 == 0) {
    player.cps = player.autoClickerACPS
    player.autoClickerACPS = 0
    player.autoClickerBCPS = 0
  }

  if (Hutao.Player.isAdmin(player)) {
    player.autoClickerACPS = 0
    player.autoClickerBCPS = 0
  }

  if (
    player.hasTag(`hutao:has_elytra`) &&
    player.isGliding
  ) {
    player.elytra = Date.now()
  }

  if (player.hasTag("hutao:riding")) {
    player.riding = Date.now()
  }

  if (player.hasTag("hutao:has_container_open")) {
    player.openContainer = Date.now()
  }

  if (player.hasTag("hutao:right")) {
    player.rightClick ??= 0
    player.rightClick += 1
  } else {
    player.rightClick = 0
  }

  if (player.isFlying) {
    player.fly = Date.now()
  }

  if (
    player.location.y <= player.dimension.heightRange.max &&
    player.location.y >= player.dimension.heightRange.min
  ) {
    if (player.legBlock?.typeId == "minecraft:ladder") {
      player.ladder ??= 0
      player.ladder += 1
    } else {
      player.ladder = 0
    }
  } else {
    player.ladder = 0
  }

  if (player.hasTag("red")) player.team = "red"
  else if (player.hasTag("blue")) player.team = "blue"
  else if (player.hasTag("green")) player.team = "green"
  else if (player.hasTag("yellow")) player.team = "yellow"
  else if (player.hasTag("white")) player.team = "white"
  else if (player.hasTag("orange")) player.team = "orange"
  else if (player.hasTag("gray")) player.team = "gray"
  else if (player.hasTag("purple")) player.team = "purple"
  else if (player.hasTag("aqua")) player.team = "aqua"
  else if (player.hasTag("black")) player.team = "black"
  else player.team = "other"

  let isWeb = false
  let isOnAir = true
  let gotPush = false

  const offsets = [
    0.1,
    0,
    -0.1
  ]

  const exceptBlock = [
    "minecraft:structure_void",
    "minecraft:air"
  ]

  if (
    player.location.y <= player.dimension.heightRange.max &&
    player.location.y >= player.dimension.heightRange.min
  ) {
    offsets.forEach(x => {
      offsets.forEach(y => {
        offsets.forEach(z => {
          const block = player.dimension.getBlock({
            x: player.location.x + x,
            y: player.location.y + y,
            z: player.location.z + z
          })

          if (
            x == 0 &&
            z == 0 &&
            (
              y == 0 ||
              y == 1
            )
          ) {
            if (block?.typeId == "minecraft:web") {
              isWeb = true
            }

            if (!scaffoldDByPassBlock.includes(block?.typeId)) {
              gotPush = true
            }
          }

          if (y == -1) {
            if (!exceptBlock.includes(block?.typeId)) {
              isOnAir = false
            }
          }
        })
      })
    })
  } else {
    isWeb = false
    isOnAir = true
  }

  player.isInWeb = isWeb
  player.isOnAir = isOnAir

  if (true) {
    const velocity = Math.sqrt(
      player.getVelocity().x ** 2 +
      player.getVelocity().z ** 2
    )

    let angle = Math.atan2(
      player.location.z - player.lastAction3?.location?.z,
      player.location.x - player.lastAction3?.location?.x
    ) * 180 / Math.PI - player.lastAction3?.rotation?.y - 90

    angle += (angle <= -180 ? 360 : 0)
    angle = Math.abs(angle)

    if (player.otherDirectionSprinting > 20) {
      const speed = Math.sqrt(
        player.getVelocity().x ** 2 +
        player.getVelocity().z ** 2
      )

      const average = (speed + player.unusualSprint) / 2

      if (
        average >
        0.35 +
        player.elytraSpeed +
        player.ridingSpeed +
        player.tridentSpeed +
        player.flySpeed +
        player.speed
      ) {
        if (!gotPush) {
          player.unusualSprinting ??= 0
          player.unusualSprinting += 1
          player.unusualSprintChecking = 0
        }
      }

      player.unusualSprint = speed
    }

    if (player.unusualSprinting > 0) {
      player.unusualSprintingChecking ??= 0
      player.unusualSprintingChecking += 1

      if (player.unusualSprintingChecking > 50) {
        player.unusualSprinting = 0
        player.unusualSprintingChecking = 0
      }
    }

    if (
      angle > 60 &&
      velocity > 0.05
    ) {
      player.otherDirectionSprinting ??= 0
      player.otherDirectionSprinting += 1
    } else {
      player.otherDirectionSprinting = 0
    }
  }

  if (true) {
    const velocity = Math.sqrt(
      player.getVelocity().x ** 2 +
      player.getVelocity().z ** 2
    )

    let angle = Math.atan2(
      player.location.z - player.lastAction3?.location?.z,
      player.location.x - player.lastAction3?.location?.x
    ) * 180 / Math.PI - player.lastAction3?.rotation?.y - 90

    angle += (angle <= -180 ? 360 : 0)

    if (velocity < 0.05) {
      player.movingDirection = "stop"
    } else {
      if (
        angle >= -45 &&
        angle <= 45
      ) {
        player.movingDirection = "forward"
      } else if (
        angle >= -135 &&
        angle <= -45
      ) {
        player.movingDirection = "left"
      } else if (
        angle >= 45 &&
        angle <= 135
      ) {
        player.movingDirection = "right"
      } else if (
        angle >= 135 ||
        angle <= -135
      ) {
        player.movingDirection = "backward"
      }
    }
  }

  player.lastAction3 = {
    location: {
      x: player.location.x,
      y: player.location.y,
      z: player.location.z
    },
    dimension: player.dimension.id,
    rotation: {
      x: player.getRotation().x,
      y: player.getRotation().y
    },
    velocity: {
      x: player.getVelocity().x,
      y: player.getVelocity().y,
      z: player.getVelocity().z
    },
    selectedSlot: player.selectedSlot
  }
}

const checkBlock = (player, block) => {
  if (
    Math.abs(player.getHeadLocation().x - block.location.x) < 3 &&
    Math.abs(player.getHeadLocation().z - block.location.z) < 3
  ) {
    return true
  } else {
    return false
  }
}

const resetAC = (player) => {
  if (!Hutao.Database.has()) return Hutao.World.wrong(player, `The addon is not started`)
  if (Hutao.Database.get("db").data.permission.owner != player.id) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).youAreNotTheOwner)

  Hutao.World.success(player, Hutao.Player.getLanguage(player).resetSuccessfully)
  Minecraft.world.databaseDelete = true
  Hutao.Scoreboard(setting.database).removeObjective()
  Minecraft.world.scoreboard.removeObjective("hutao:reset")
}

const throwable = [
  "minecraft:snowball",
  "minecraft:experience_bottle",
  "minecraft:egg",
  "minecraft:splash_potion",
  "minecraft:lingering_potion",
]

const scaffoldDByPassBlock = [
  "minecraft:water",
  "minecraft:lava",
  "minecraft:flowing_water",
  "minecraft:flowing_lava",
  "minecraft:air",
  "minecraft:structure_void"
]