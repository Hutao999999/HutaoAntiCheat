import * as setting from "../config"
import { Hutao } from "../lib/import"

export default {
  name: "antiCheat",
  description: "commandAntiCheatDescription",
  function(player, command) {
    if (command[1] == undefined) {
      if (command[2]) return Hutao.World.wrongCommand(player, command, 2)

      Hutao.World.showHelp(player,
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eaura`, Hutao.Player.getLanguage(player).commandAntiCheatAuraSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eauto-armor`, Hutao.Player.getLanguage(player).commandAntiCheatAutoArmorSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eauto-clicker`, Hutao.Player.getLanguage(player).commandAntiCheatAutoClickerSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eauto-shield`, Hutao.Player.getLanguage(player).commandAntiCheatAutoShieldSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eauto-tool`, Hutao.Player.getLanguage(player).commandAntiCheatAutoToolSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eauto-totem`, Hutao.Player.getLanguage(player).commandAntiCheatAutoTotemSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §ebad-packet`, Hutao.Player.getLanguage(player).commandAntiCheatBadPacketSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §ecrasher`, Hutao.Player.getLanguage(player).commandAntiCheatCrasherSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eentity-check`, Hutao.Player.getLanguage(player).commandAntiCheatEntityCheckSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §efast-ladder`, Hutao.Player.getLanguage(player).commandAntiCheatFastLadderSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §efast-throw`, Hutao.Player.getLanguage(player).commandAntiCheatFastThrowSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §einvalid-sprint`, Hutao.Player.getLanguage(player).commandAntiCheatInvalidSprintSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §einventory-action`, Hutao.Player.getLanguage(player).commandAntiCheatInventoryActionSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eitem-check`, Hutao.Player.getLanguage(player).commandAntiCheatItemCheckSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §ekillaura`, Hutao.Player.getLanguage(player).commandAntiCheatKillauraSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §emovement`, Hutao.Player.getLanguage(player).commandAntiCheatMovementSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §ename-spoof`, Hutao.Player.getLanguage(player).commandAntiCheatNameSpoofSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eno-fall`, Hutao.Player.getLanguage(player).commandAntiCheatNoFallSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §eno-slow-down`, Hutao.Player.getLanguage(player).commandAntiCheatNoSlowDownSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §enuker`, Hutao.Player.getLanguage(player).commandAntiCheatNukerSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §ereach`, Hutao.Player.getLanguage(player).commandAntiCheatReachSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §escaffold`, Hutao.Player.getLanguage(player).commandAntiCheatScaffoldSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §espammer`, Hutao.Player.getLanguage(player).commandAntiCheatSpammerSetting],
        [`${setting.default.data.commands.normalPrefix}anti-cheat §espeed`, Hutao.Player.getLanguage(player).commandAntiCheatSpeedSetting]
      )
    } else {
      Hutao.World.wrongCommand(player, command, 1)
    }
  }
}