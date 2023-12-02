import * as Minecraft from "@minecraft/server"
import * as setting from "../config"

export const entityCheck = () => {
  let entities = {}

  for (const entity of Minecraft.world.getDimension("overworld").getEntities({
    excludeTypes: [
      "minecraft:player"
    ]
  })) {
    if (setting.default.data.antiCheat.entityCheckA.state) {
      if (setting.default.data.antiCheat.entityList.includes(entity.typeId)) {
        entity.kill()
      }
    }

    if (setting.default.data.antiCheat.entityCheckB.state) {
      entities[entity.typeId] ??= 0
      entities[entity.typeId] += 1
    }
  }

  if (setting.default.data.antiCheat.entityCheckB.state) {
    for (const entity of Object.entries(entities)) {
      if (entity[1] > setting.default.data.antiCheat.entityCheckB.maxAmount) {
        for (const currentEntity of Minecraft.world.getDimension("overworld").getEntities({
          type: entity[0]
        })) {
          currentEntity.kill()
        }
      }
    }
  }
}