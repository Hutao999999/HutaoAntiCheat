export default {
  data: {
    uuid: "ba7d4d7a-7fd1-11ee-b962-0242ac120002",
    permission: {
      owner: "",
      admin: [],
      builder: [],
    },
    timeDifference: 8,
    adminMenu: {
      encrypt: "",
      identifier: "minecraft:golden_sword"
    },
    playerMenu: {
      encrypt: "",
      identifier: "minecraft:compass",
      state: true,
    },
    commands: {
      state: true,
      normalPrefix: "!"
    },
    chatFormat: {
      state: true,
      structure: {
        owner: "{status}§7{player} §r§7▶ §r{message}",
        admin: "{status}§7{player} §r§7▶ §r{message}",
        builder: "{status}§7{player} §r§7▶ §r{message}",
        member: "{status}§7{player} §r§7▶ §r{message}",
        custom: {}
      },
      format: {
        status: {
          owner: "§7[§dOwner§7]§r",
          admin: "§7[§cAdmin§7]§r",
          builder: "§7[§6Builder§7]§r",
          member: "§7[§bMember§7]§r"
        },
        location: "§7[§aXYZ§7: §e{x}§7, §e{y}§7, §e{z}§7]§r",
        rotation: "§7[§aXY§7: §e{x}§7, §e{y}§7]§r",
        dimension: {
          overworld: "§7[§aOverworld§7]§r",
          nether: "§7[§cNether§7]§r",
          theEnd: "§7[§eThe end§7]§r",
          other: "§7[§7Other§7]§r"
        },
        health: "§7[§c{health}♥§7]§r",
        time: "§7[§b{year}§7/§b{month}§7/§b{date} §b{hour}§7:§b{minute}§7:§b{second}§7.§b{millisecond}§7]§r",
        gamemode: {
          survival: "§7[§eSurvival§7]§r",
          creative: "§7[§6Creative§7]§r",
          adventure: "§7[§cAdventure§7]§r",
          spectator: "§7[§7Spectator§7]§r",
          other: "§7[§7Other§7]§r"
        },
        level: "§7[§6Level§7: §e{level}§7]§r",
        team: {
          red: "§7[§cRed§7]§r",
          blue: "§7[§bBlue§7]§r",
          green: "§7[§aGreen§7]§r",
          yellow: "§7[§eYellow§7]§r",
          white: "§7[§fWhite§7]§r",
          orange: "§7[§6Orange§7]§r",
          gray: "§7[§7Gray§7]§r",
          purple: "§7[§dPurple§7]§r",
          aqua: "§7[§3Aqua§7]§r",
          black: "§7[§0Black§7]§r",
          other: "§7[§7Other§7]§r",
        }
      }
    },
    nameTag: {
      state: true,
      structure: {
        owner: "{status}§7{player}",
        admin: "{status}§7{player}",
        builder: "{status}§7{player}",
        member: "{status}§7{player}",
        custom: {}
      },
      format: {
        status: {
          owner: "§7[§dOwner§7]§r",
          admin: "§7[§cAdmin§7]§r",
          builder: "§7[§6Builder§7]§r",
          member: "§7[§bMember§7]§r"
        },
        location: "§7[§aXYZ§7: §e{x}§7, §e{y}§7, §e{z}§7]§r",
        rotation: "§7[§aXY§7: §e{x}§7, §e{y}§7]§r",
        dimension: {
          overworld: "§7[§aOverworld§7]§r",
          nether: "§7[§cNether§7]§r",
          theEnd: "§7[§eThe end§7]§r",
          other: "§7[§7Other§7]§r"
        },
        health: "§7[§c{health}♥§7]§r",
        time: "§7[§b{year}§7/§b{month}§7/§b{date} §b{hour}§7:§b{minute}§7:§b{second}§7.§b{millisecond}§7]§r",
        gamemode: {
          survival: "§7[§eSurvival§7]§r",
          creative: "§7[§6Creative§7]§r",
          adventure: "§7[§cAdventure§7]§r",
          spectator: "§7[§7Spectator§7]§r",
          other: "§7[§7Other§7]§r"
        },
        level: "§7[§6Level§7: §e{level}§7]§r",
        team: {
          red: "§7[§cRed§7]§r",
          blue: "§7[§bBlue§7]§r",
          green: "§7[§aGreen§7]§r",
          yellow: "§7[§eYellow§7]§r",
          white: "§7[§fWhite§7]§r",
          orange: "§7[§6Orange§7]§r",
          gray: "§7[§7Gray§7]§r",
          purple: "§7[§dPurple§7]§r",
          aqua: "§7[§3Aqua§7]§r",
          black: "§7[§0Black§7]§r",
          other: "§7[§7Other§7]§r",
        }
      }
    },
    deadMessage: {
      state: true,
      anvil: "§cDeath §7▶ §e{player} §r§cwas squashed by a falling anvil",
      blockExplosion: "§cDeath §7▶ §e{player} §r§cwas blown up",
      drowning: "§cDeath §7▶ §e{player} §r§cdrowned",
      entityAttack: "§cDeath §7▶ §e{player} §r§cwas slain by §e{attacker}",
      entityExplosion: "§cDeath §7▶ §e{player} §r§cwas blown up",
      fall: "§cDeath §7▶ §e{player} §r§chit the ground too hard",
      fire: "§cDeath §7▶ §e{player} §r§cwent up in flames",
      fireTick: "§cDeath §7▶ §e{player} §r§cburned to death",
      fireworks: "§cDeath §7▶ §e{player} §r§cwent off with a bang",
      flyIntoWall: "§cDeath §7▶ §e{player} §r§cexperienced kinetic energy",
      freezing: "§cDeath §7▶ §e{player} §r§cfroze to death",
      lava: "§cDeath §7▶ §e{player} §r§ctried to swim in lava",
      lightning: "§cDeath §7▶ §e{player} §r§cwas struck by lightning",
      magic: "§cDeath §7▶ §e{player} §r§cwas killed by magic",
      other: "§cDeath §7▶ §e{player} §r§cdied",
      projectile: "§cDeath §7▶ §e{player} §r§cwas slain by §e{attacker}",
      stalactite: "§cDeath §7▶ §e{player} §r§cwas skewered by a falling stalactite",
      stalagmite: "§cDeath §7▶ §e{player} §r§cwas impaled on a stalagmite",
      starve: "§cDeath §7▶ §e{player} §r§cstarved to death",
      void: "§cDeath §7▶ §e{player} §r§cfell out of the world",
      wither: "§cDeath §7▶ §e{player} §r§cwithered away",
    },
    verify: {
      state: true
    },
    players: {},
    antiCheat: {
      auraA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      auraB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoArmorA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoArmorB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoArmorC: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoArmorD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoArmorE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoArmorF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoArmorG: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoClickerA: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        maxCPS: 20
      },
      autoClickerB: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        maxCPS: 20
      },
      autoShieldA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoShieldB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoShieldC: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoShieldD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoShieldE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoShieldF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoShieldG: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoToolA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoTotemA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoTotemB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoTotemC: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoTotemD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoTotemE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoTotemF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      autoTotemG: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      badPacketA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      badPacketB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      blinkA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      crasherA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      crasherB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      entityCheckA: {
        state: true,
      },
      entityCheckB: {
        state: true,
        maxAmount: 100
      },
      entityList: [
        "minecraft:npc",
        "minecraft:command_block_minecart",
        "minecraft:tnt"
      ],
      fastLadderA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      fastThrowA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      flyA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      invalidSprintA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      invalidSprintB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      invalidSprintC: {
        state: true,
        punshment: "tmepkick",
        flags: 10
      },
      inventoryActionA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      inventoryActionB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      inventoryActionC: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      inventoryActionD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      inventoryActionE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      inventoryActionF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemCheckA: {
        state: true,
        flags: 10
      },
      itemCheckB: {
        state: true,
        flags: 10
      },
      itemCheckC: {
        state: true,
        flags: 10
      },
      itemCheckD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemCheckE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemCheckF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemCheckG: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemCheckH: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemCheckI: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemCheckJ: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemCheckK: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraC: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraG: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraH: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      killauraI: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      movementA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nameSpoofA: {
        state: true,
        punishment: "tempkick"
      },
      nameSpoofB: {
        state: true,
        punishment: "tempkick"
      },
      noFallA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      noSlowDownA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      noSlowDownB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nukerA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nukerB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nukerC: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nukerD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nukerE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nukerF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nukerG: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      nukerH: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      phaseA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      reachA: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        distance: 7
      },
      reachB: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        distance: 7
      },
      reachC: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        distance: 7
      },
      reachD: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        distance: 7
      },
      scaffoldA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldC: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldG: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldH: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldI: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldJ: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldK: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      scaffoldL: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerB: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerC: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerD: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerE: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerF: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerG: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerH: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerI: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerJ: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerK: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      spammerL: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      speedA: {
        state: true,
        punishment: "tempkick",
        flags: 10
      },
      itemList: {
        ban: [
          "minecraft:movingblock",
          "minecraft:moving_block"
        ],
        kick: [
          "minecraft:lava",
          "minecraft:water",
          "minecraft:flowing_lava",
          "minecraft:flowing_water",
          "minecraft:invisible_bedrock",
          "minecraft:invisiblebedrock",
          "minecraft:fire",
          "minecraft:bubble_column",
          "minecraft:end_gateway",
          "minecraft:glowingobsidian",
          "minecraft:lit_blast_furnace",
          "minecraft:lit_furnace",
          "minecraft:lit_redstone_lamp",
          "minecraft:lit_deepslate_redstone_ore",
          "minecraft:lit_redstone_ore",
          "minecraft:lit_smoker",
          "minecraft:unlit_redstone_torch"
        ],
        tempkick: [
          "minecraft:lava_bucket",
          "minecraft:axolotl_bucket",
          "minecraft:cod_bucket",
          "minecraft:pufferfish_bucket",
          "minecraft:salmon_bucket",
          "minecraft:tropical_fish_bucket",
          "minecraft:tadpole_bucket",
          "minecraft:respawn_anchor",
          "minecraft:tnt",
          "minecraft:bedrock",
          "minecraft:barrier",
          "minecraft:beehive",
          "minecraft:bee_nest",
          "minecraft:command_block",
          "minecraft:chain_command_block",
          "minecraft:repeating_command_block",
          "minecraft:structure_block",
          "minecraft:structure_void",
          "minecraft:command_block_minecart",
          "minecraft:allow",
          "minecraft:deny"
        ]
      }
    }
  }
}

export const database = "hutao:database"
export const addonTitle = "§eHutao"