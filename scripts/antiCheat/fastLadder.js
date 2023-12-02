import * as setting from "../config"
import { Hutao } from "../lib/import"

export const fastLadder = (player) => {
  if (setting.default.data.antiCheat.fastLadderA.state) {
    if (
      !(Date.now() - player.elytra < 1000 ||
        Date.now() - player.riding < 1000 ||
        player.getEffect("jump_boost") ||
        player.getEffect("levitation") ||
        player.isFlying
      )) {
      if (player.fastLadderA > 2) {
        if (player.getVelocity().y > 0.28) {
          if (player.legBlock.typeId == "minecraft:ladder") {
            Hutao.Player.checking(player, `FastLadder`, `A`)
            Hutao.Player.returnLastLocation(player)
          }
        }
      }
    }
  }
}