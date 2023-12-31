import * as Minecraft from "@minecraft/server"
import * as setting from "../config"
import { World } from "./World"
import { en } from "../languages/en"
import { zhTw } from "../languages/zh-tw"
import { zhCh } from "../languages/zh-ch"

export class Player {
  static changePlayerNameTag(player) {
    if (typeof player == "object") {
      if (player.typeId) {
        if (player.typeId == "minecraft:player") {
          player = JSON.stringify(player.name)
        } else {
          player = player.id
        }
      } else {
        player = JSON.stringify(player)
      }
    } else {
      if (typeof player != "string") {
        player = JSON.stringify(player)
      }
    }

    return player
  }

  static toDown(player) {
    player.teleport({
      x: player.location.x,
      y: player.location.y - 2,
      z: player.location.z
    }, {
      dimension: player.dimension,
      rotation: {
        x: player.getRotation().x,
        y: player.getRotation().y
      }
    })
  }

  static setGamemode(player, gamemode) {
    player.runCommand(`gamemode ${gamemode} @s`)
  }

  static getPing(player) {
    return player.secondPing - player.ping
  }

  static getHandItem(player) {
    return player.getComponent("inventory").container.getItem(player.selectedSlot)
  }

  static isBuilder(player) {
    return setting.default.data.permission.builder.includes(player.id)
  }

  static isOwner(player) {
    return setting.default.data.permission.owner == player.id
  }

  static isAdmin(player) {
    return setting.default.data.permission.owner == player.id ||
      setting.default.data.permission.admin.includes(player.id)
  }

  static getGamemode(player) {
    for (const gamemode in Minecraft.GameMode) {
      if ([
        ...Minecraft.world.getPlayers({
          name: player.name,
          gameMode: Minecraft.GameMode[gamemode]
        })
      ].length > 0) return Minecraft.GameMode[gamemode]
    }
  }

  static getAllItem(player) {
    const inventory = player.getComponent("inventory").container
    const equipment = player.getComponent("equippable")
    const slots = [
      "head",
      "chest",
      "legs",
      "feet",
      "offhand",
    ]

    let items = {
      inventory: [],
      equipment: []
    }

    for (let i = 0; i < inventory.size; i++) {
      const item = inventory.getItem(i)

      if (item) {
        item._slot = i
        items.inventory.push(item)
      }
    }

    for (const slot of slots) {
      const item = equipment.getEquipment(slot)

      if (item) {
        item._slot = slot
        items.equipment.push(item)
      }
    }

    return items
  }

  static getLanguage(player) {
    if (setting.default.data.players[player.id].language == "en") return en
    if (setting.default.data.players[player.id].language == "zh-tw") return zhTw
    if (setting.default.data.players[player.id].language == "zh-ch") return zhCh
  }

  static getVelocity(
    player,
    velocityX = true,
    velocityY = true,
    velocityZ = true) {
    let velocity = {
      x: 0,
      y: 0,
      z: 0
    }

    if (velocityX) velocity.x = player.getVelocity().x
    if (velocityY) velocity.y = player.getVelocity().y
    if (velocityZ) velocity.z = player.getVelocity().z

    return Math.sqrt(
      velocity.x ** 2 +
      velocity.y ** 2 +
      velocity.z ** 2
    )
  }

  static getPlayers(id) {
    for (const player of Minecraft.world.getPlayers()) {
      if (player.id == id) return player.name
    }

    return setting.default.data.players[id].name
  }

  static getPlayersByName(name) {
    for (const player of Minecraft.world.getPlayers()) {
      if (player.name == name) return player
    }

    return undefined
  }

  static getPlayersById(id) {
    for (const player of Minecraft.world.getPlayers()) {
      if (player.id == id) return player
    }

    return undefined
  }

  static getPlayersIdByName(name) {
    for (const player of Minecraft.world.getPlayers()) {
      if (player.id == name) return player.id
    }

    for (const player of Object.entries(setting.default.data.players)) {
      if (player[1].name == name) return player[0]
    }

    return undefined
  }

  static hasPlayer(player) {
    let hasPlayer = false

    for (const currentPlayer of Minecraft.world.getPlayers()) {
      try {
        if (currentPlayer.id == player.id) {
          hasPlayer = true

          break
        }
      } catch { }
    }

    return hasPlayer
  }

  static returnLastLocation(player) {
    const returnSpeed = {
      x: ((player.lastAction.location.x - player.location.x) % 1) * 2,
      y: 0,
      z: ((player.lastAction.location.z - player.location.z) % 1) * 2
    }

    if (!player.returnSpeed) {
      player.returnSpeed = returnSpeed
    }

    player.teleport({
      x: player.lastAction.location.x + player.returnSpeed.x,
      y: player.lastAction.location.y,
      z: player.lastAction.location.z + player.returnSpeed.z
    }, {
      dimension: Minecraft.world.getDimension(player.lastAction.dimension),
      rotation: {
        x: player.lastAction.rotation.x,
        y: player.lastAction.rotation.y
      }
    })
  }

  static changeEntityToPlayer(entity) {
    for (const player of Minecraft.world.getPlayers()) {
      if (
        player.typeId == entity.typeId &&
        player.id == entity.id
      ) {
        return player
      }
    }
  }

  static checking(player, item, type) {
    let types

    for (const items of Object.keys(antiCheat)) {
      if (item.startsWith(items)) types = antiCheat[items]
    }

    player.flag[`${types}${type}`] += 1

    for (const currentPlayer of Minecraft.world.getPlayers()) {
      if (
        this.isAdmin(currentPlayer) &&
        player.id != currentPlayer.id
      ) {
        World.log(`${setting.addonTitle} §r§7▶ §e${player.name} §r§7${this.getLanguage(currentPlayer).failed} §c${item} §7[§c${this.getLanguage(currentPlayer).antiCheatType} ${type}§7] x §c${player.flag[`${types}${type}`]}`, currentPlayer)
      }
    }

    World.log(`${setting.addonTitle} §r§7▶ §e${player.name} §r§7${this.getLanguage(player).failed} §c${item} §7[§c${this.getLanguage(player).antiCheatType} ${type}§7] x §c${player.flag[`${types}${type}`]}`, player)
  }

  static getPermission(player) {
    let permission = "member"

    if (setting.default.data.permission.builder.includes(player.id)) permission = "builder"
    if (setting.default.data.permission.admin.includes(player.id)) permission = "admin"
    if (setting.default.data.permission.owner == player.id) permission = "owner"

    return permission
  }
}

const antiCheat = {
  "Aura": "aura",
  "AutoArmor": "autoArmor",
  "AutoClicker": "autoClicker",
  "AutoShield": "autoShield",
  "AutoTool": "autoTool",
  "AutoTotem": "autoTotem",
  "Blink": "blink",
  "BadPacket": "badPacket",
  "Crasher": "crasher",
  "FastLadder": "fastLadder",
  "FastThrow": "fastThrow",
  "Fly": "fly",
  "InvalidSprint": "invalidSprint",
  "InventoryAction": "inventoryAction",
  "ItemCheck": "itemCheck",
  "Killaura": "killaura",
  "Movement": "movement",
  "NameSpoof": "nameSpoof",
  "NoFall": "noFall",
  "NoSlowDown": "noSlowDown",
  "Nuker": "nuker",
  "Phase": "phase",
  "Reac": "reach",
  "Scaffold": "scaffold",
  "Spammer": "spammer",
  "Speed": "speed"
}