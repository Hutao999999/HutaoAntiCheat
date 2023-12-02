import * as setting from "../config"
import { Hutao } from "../lib/import"

export const badPacket = (player) => {
  if (setting.default.data.antiCheat.badPacketA.state) {
    const slots = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ]

    if (!slots.includes(player.selectedSlot)) {
      Hutao.Player.checking(player, `BadPacket`, `A`)
    }
  }

  if (setting.default.data.antiCheat.badPacketB.state) {
    const xDiff = player.getRotation().x - player.lastAction3?.rotation?.x
    const yDiff = player.getRotation().y - player.lastAction3?.rotation?.y

    if (
      (
        player.lastBadPacketB == 4 &&
        yDiff == 2
      ) ||
      (
        player.lastBadPacketB == 2 &&
        yDiff == 4
      ) ||
      (
        player.lastBadPacketB == 2 &&
        yDiff == 2
      )
    ) {
      const velocity = Math.sqrt(
        player.getVelocity().x ** 2 +
        player.getVelocity().y ** 2 +
        player.getVelocity().z ** 2
      )

      if (
        velocity > 0 ||
        Math.abs(xDiff) > 0
      ) {
        Hutao.Player.checking(player, `BadPacket`, `B`)
        Hutao.Player.returnLastLocation(player)
      }
    }

    player.lastBadPacketB = yDiff
  }

  if (setting.default.data.antiCheat.badPacketC.state) {
    if (player.location.y < player.dimension.heightRange.min) {
      Hutao.Player.checking(player, `BadPacket`, `C`)
      Hutao.Player.returnLastLocation(player)
    }
  }
}