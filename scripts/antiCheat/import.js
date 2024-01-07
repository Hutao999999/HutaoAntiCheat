import { Hutao } from "../lib/import"
import { aura } from "./aura"
import { autoArmor } from "./autoArmor"
import { autoTool } from "./autoTool"
import { badPacket } from "./badPacket"
import { blink } from "./blink"
import { crasher } from "./crasher"
import { fastLadder } from "./fastLadder"
import { fly } from "./fly"
import { invalidSprint } from "./invalidSprint"
import { inventoryAction } from "./inventoryAction"
import { itemCheck } from "./itemCheck"
import { movement } from "./movement"
import { nameSpoof } from "./nameSpoof"
import { noFall } from "./noFall"
import { noSlowDown } from "./noSlowDown"
import { phase } from "./phase"
import { scaffold } from "./scaffold"
import { speed } from "./speed"

export const antiCheat = (player) => {
  if ([
    "owner",
    "admin"
  ].includes(player.permission)) return

  aura(player)
  autoArmor(player)
  autoTool(player)
  badPacket(player)
  blink(player)
  crasher(player)
  fastLadder(player)
  fly(player)
  invalidSprint(player)
  inventoryAction(player)
  itemCheck(player)
  movement(player)
  nameSpoof(player)
  noFall(player)
  noSlowDown(player)
  phase(player)
  scaffold(player)
  speed(player)
}