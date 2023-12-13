import * as setting from "../../config"
import { Hutao } from "../../lib/import"
import { AntiCheat } from "../../menu/adminMenu/antiCheat"
import { spammerA } from "./spammer/spammerA"
import { spammerB } from "./spammer/spammerB"
import { spammerC } from "./spammer/spammerC"
import { spammerD } from "./spammer/spammerD"
import { spammerE } from "./spammer/spammerE"
import { spammerF } from "./spammer/spammerF"
import { spammerG } from "./spammer/spammerG"
import { spammerH } from "./spammer/spammerH"
import { spammerI } from "./spammer/spammerI"
import { spammerJ } from "./spammer/spammerJ"
import { spammerK } from "./spammer/spammerK"
import { spammerL } from "./spammer/spammerL"

export const spammer = (player, command) => {
  if (command[2] == "a") {
    spammerA(player, command)
  } else if (command[2] == "b") {
    spammerB(player, command)
  } else if (command[2] == "c") {
    spammerC(player, command)
  } else if (command[2] == "d") {
    spammerD(player, command)
  } else if (command[2] == "e") {
    spammerE(player, command)
  } else if (command[2] == "f") {
    spammerF(player, command)
  } else if (command[2] == "g") {
    spammerG(player, command)
  } else if (command[2] == "h") {
    spammerH(player, command)
  } else if (command[2] == "i") {
    spammerI(player, command)
  } else if (command[2] == "j") {
    spammerJ(player, command)
  } else if (command[2] == "k") {
    spammerK(player, command)
  } else if (command[2] == "l") {
    spammerL(player, command)
  } else if (command[2] == "open") {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    new AntiCheat().spammerSetting(player)

    Hutao.World.success(player, Hutao.Player.getLanguage(player).closeTheChatBarToOpenSpammerMenu)
  } else if (command[2] == undefined) {
    if (command[3]) return Hutao.World.wrongCommand(player, command, 3)

    Hutao.World.showHelp(player,
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §da`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerASetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §db`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerBSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §dc`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerCSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §dd`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerDSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §de`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerESetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §df`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerFSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §dg`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerGSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §dh`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerHSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §di`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerISetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §dj`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerJSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §dk`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerKSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §dl`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerLSetting],
      [`${setting.default.data.commands.normalPrefix}anti-cheat spammer §dopen`, Hutao.Player.getLanguage(player).commandOpenSpammerMenu],
    )
  } else {
    Hutao.World.wrongCommand(player, command, 2)
  }
}