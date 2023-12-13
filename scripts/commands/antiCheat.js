import { aura } from "./antiCheat/aura"
import * as setting from "../config"
import { Hutao } from "../lib/import"
import { AntiCheat } from "../menu/adminMenu/antiCheat"
import { autoArmor } from "./antiCheat/autoArmor"
import { autoShield } from "./antiCheat/autoShield"
import { autoTotem } from "./antiCheat/autoTotem"
import { autoClicker } from "./antiCheat/autoClicker"
import { badPacket } from "./antiCheat/badPacket"
import { blink } from "./antiCheat/blink"
import { crasher } from "./antiCheat/crasher"
import { autoTool } from "./antiCheat/autoTool"
import { entityCheck } from "./antiCheat/entityCheck"
import { fastLadder } from "./antiCheat/fastLadder"
import { fastThrow } from "./antiCheat/fastThrow"
import { fly } from "./antiCheat/fly"
import { invalidSprint } from "./antiCheat/invalidSprint"
import { inventoryAction } from "./antiCheat/inventoryAction"
import { itemCheck } from "./antiCheat/itemCheck"
import { killaura } from "./antiCheat/killaura"
import { movement } from "./antiCheat/movement"
import { nameSpoof } from "./antiCheat/nameSpoof"
import { noFall } from "./antiCheat/noFall"
import { noSlowDown } from "./antiCheat/noSlowDown"
import { nuker } from "./antiCheat/nuker"
import { reach } from "./antiCheat/reach"
import { scaffold } from "./antiCheat/scaffold"
import { spammer } from "./antiCheat/spammer"
import { speed } from "./antiCheat/speed"
import { entityList } from "./antiCheat/entityList"
import { itemList } from "./antiCheat/itemList"

export default {
  name: "antiCheat",
  description: "commandAntiCheatDescription",
  function(player, command) {
    if (command[1] == undefined) {
      if (command[2]) return Hutao.World.wrongCommand(player, command, 2)

      Hutao.World.showHelp(player,
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dentity-list`, Hutao.Player.getLanguage(player).commandAntiCheatEntityListSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §ditem-list`, Hutao.Player.getLanguage(player).commandAntiCheatItemListSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §daura`, Hutao.Player.getLanguage(player).commandAntiCheatAuraSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dauto-armor`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dauto-clicker`, Hutao.Player.getLanguage(player).commandAntiCheatAutoClickerSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dauto-shield`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dauto-tool`, Hutao.Player.getLanguage(player).commandAntiCheatAutoToolSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dauto-totem`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dbad-packet`, Hutao.Player.getLanguage(player).commandAntiCheatBadPacketSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dblink`, Hutao.Player.getLanguage(player).commandAntiCheatBlinkSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dcrasher`, Hutao.Player.getLanguage(player).commandAntiCheatCrasherSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dentity-check`, Hutao.Player.getLanguage(player).commandAntiCheatEntityCheckSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dfast-ladder`, Hutao.Player.getLanguage(player).commandAntiCheatFastLadderSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dfast-throw`, Hutao.Player.getLanguage(player).commandAntiCheatFastThrowSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dinvalid-sprint`, Hutao.Player.getLanguage(player).commandAntiCheatInvalidSprintSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dinventory-action`, Hutao.Player.getLanguage(player).commandAntiCheatInventoryActionSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §ditem-check`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dkillaura`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dmovement`, Hutao.Player.getLanguage(player).commandAntiCheatMovementSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dname-spoof`, Hutao.Player.getLanguage(player).commandAntiCheatNameSpoofSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dno-fall`, Hutao.Player.getLanguage(player).commandAntiCheatNoFallSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dno-slow-down`, Hutao.Player.getLanguage(player).commandAntiCheatNoSlowDownSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dnuker`, Hutao.Player.getLanguage(player).commandAntiCheatNukerSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dopen`, Hutao.Player.getLanguage(player).commandOpenAntiCheatMenu],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dreach`, Hutao.Player.getLanguage(player).commandAntiCheatReachSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dscaffold`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dspammer`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §dspeed`, Hutao.Player.getLanguage(player).commandAntiCheatSpeedSetting]
      )
    } else if (command[1] == "aura") {
      aura(player, command)
    } else if (command[1] == "auto-armor") {
      autoArmor(player, command)
    } else if (command[1] == "auto-shield") {
      autoShield(player, command)
    } else if (command[1] == "auto-totem") {
      autoTotem(player, command)
    } else if (command[1] == "auto-clicker") {
      autoClicker(player, command)
    } else if (command[1] == "auto-tool") {
      autoTool(player, command)
    } else if (command[1] == "bad-packet") {
      badPacket(player, command)
    } else if (command[1] == "blink") {
      blink(player, command)
    } else if (command[1] == "crasher") {
      crasher(player, command)
    } else if (command[1] == "entity-check") {
      entityCheck(player, command)
    } else if (command[1] == "fast-ladder") {
      fastLadder(player, command)
    } else if (command[1] == "fast-throw") {
      fastThrow(player, command)
    } else if (command[1] == "fly") {
      fly(player, command)
    } else if (command[1] == "invalid-sprint") {
      invalidSprint(player, command)
    } else if (command[1] == "inventory-action") {
      inventoryAction(player, command)
    } else if (command[1] == "item-check") {
      itemCheck(player, command)
    } else if (command[1] == "killaura") {
      killaura(player, command)
    } else if (command[1] == "movement") {
      movement(player, command)
    } else if (command[1] == "name-spoof") {
      nameSpoof(player, command)
    } else if (command[1] == "no-fall") {
      noFall(player, command)
    } else if (command[1] == "no-slow-down") {
      noSlowDown(player, command)
    } else if (command[1] == "nuker") {
      nuker(player, command)
    } else if (command[1] == "reach") {
      reach(player, command)
    } else if (command[1] == "scaffold") {
      scaffold(player, command)
    } else if (command[1] == "spammer") {
      spammer(player, command)
    } else if (command[1] == "speed") {
      speed(player, command)
    } else if (command[1] == "entity-list") {
      entityList(player, command)
    } else if (command[1] == "item-list") {
      itemList(player, command)
    } else if (command[1] == "open") {
      if (command[2]) return Hutao.World.wrongCommand(player, command, 2)

      new AntiCheat().open(player)

      Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenAntiCheatMenu)
    } else {
      Hutao.World.wrongCommand(player, command, 1)
    }
  }
}