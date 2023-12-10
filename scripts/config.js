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
      identifier: "minecraft:compass"
    },
    commands: {
      state: true,
      normalPrefix: "!",
      commands: {
        setting: {
          state: true,
          permission: "all"
        },
        language: {
          state: true,
          permission: "all"
        },
        antiCheat: {
          state: true,
          permission: "admin"
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
      reachA: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        distance: 5
      },
      reachB: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        distance: 5
      },
      reachC: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        distance: 5
      },
      reachD: {
        state: true,
        punishment: "tempkick",
        flags: 10,
        distance: 5
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