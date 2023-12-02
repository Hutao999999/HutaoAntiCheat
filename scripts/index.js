import * as Minecraft from "@minecraft/server"
import * as setting from "./config"
import { Hutao } from "./lib/import"
import { AC } from "./ac"
import { configCache } from "./configCache"

const ms = Date.now()

Minecraft.world.afterEvents.dataDrivenEntityTriggerEvent.subscribe(ev => {
  const player = ev.entity
  const id = ev.id

  if (player.typeId == "minecraft:player") {
    if (id == "hutao:start") {
      startAC(player)
    } else if (id == "hutao:reset") {
      resetAC(player)
    }
  }
})

const startAC = (player) => {
  if (Hutao.Database.has()) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).theAddonWasAlreadyStart)

  let adminMenuEncrypt = ""
  let playerMenuEncrypt = ""
  const strings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  for (let i = 0; i < 25; i++) {
    adminMenuEncrypt += `§${strings[Math.floor(Math.random() * strings.length)]}`
    playerMenuEncrypt += `§${strings[Math.floor(Math.random() * strings.length)]}`
  }

  const configData = setting.default

  configData.data.permission.admin.push(player.id)
  configData.data.permission.owner = player.id
  configData.data.database = setting.database
  configData.data.adminMenu.encrypt = adminMenuEncrypt
  configData.data.playerMenu.encrypt = playerMenuEncrypt

  Hutao.Scoreboard(setting.database).addObjective("")

  let json = {}
  json.db = configData
  Hutao.Database.set("db", configData)
}

const resetAC = (player) => {
  if (!Hutao.Database.has()) return Hutao.World.wrong(player, `The addon is not started`)
  if (Hutao.Database.get("db").data.permission.owner != player.id) return Hutao.World.wrong(player, Hutao.Player.getLanguage(player).youAreNotTheOwner)

  Hutao.World.success(player, Hutao.Player.getLanguage(player).resetSuccessfully)
  Minecraft.world.databaseDelete = true
  Hutao.Scoreboard(setting.database).removeObjective()
}

Hutao.SetTickTimeOut(() => {
  new AC().start(ms)
}, 5, 1, false).on()

Minecraft.world.afterEvents.chatSend.subscribe(ev => {
  const player = ev.sender
  const message = ev.message

  if (message == "reset") {
    const configData = configCache

    let adminMenuEncrypt = ""
    let playerMenuEncrypt = ""
    const strings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    for (let i = 0; i < 25; i++) {
      adminMenuEncrypt += `§${strings[Math.floor(Math.random() * strings.length)]}`
      playerMenuEncrypt += `§${strings[Math.floor(Math.random() * strings.length)]}`
    }

    configData.data.permission.admin.push(player.id)
    configData.data.permission.owner = player.id
    configData.data.database = setting.database
    configData.data.adminMenu.encrypt = adminMenuEncrypt
    configData.data.playerMenu.encrypt = playerMenuEncrypt

    Hutao.Database.set("db", configData)
    Hutao.World.success(player, `Reseted successfully`)
  } else if (message == "get") {
    const item = new Minecraft.ItemStack(setting.default.data.adminMenu.identifier, 1)
    const container = player.getComponent("inventory").container

    item.setLore([setting.default.data.adminMenu.encrypt])

    container.addItem(item)
  }
})