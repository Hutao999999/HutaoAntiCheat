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

export const languages = {
  en: {
    theAddonWasAlreadyStart: "The addon was already started",
    resetSuccessfully: "Reseted successfully",
    resetAddonSuccessfully: "The addon reloaded at §e{time} §7！ §7(§e{ms}§7ms)",
    failed: "failed",
    antiCheatType: "Type",
    adminMenuTitle: "§l§7<< §r§dAdmin Menu §l§7>>",
    antiCheat: "Anti Cheat",
    enabled: "Enabled",
    disabled: "Disabled",
    punishment: "Punishment",
    limitOfFlags: "Limit of flags",
    initialization: "Initialization",
    state: "State",
    project: "Project",
    cannotBeEmpty: "Cannot be empty",
    mustBeNumber: "Must be number",
    cannotLessThan1: "Cannot less than 1",
    back: "Back",
    changedSuccessfully: "Changed successfully",
    pleaseEnterTheIdOfTheItem: "Please enter the id of the item",
    repeatIdOfTheItem: "Repeat id of the item",
    addSuccessfully: "Added successfully",
    removeItem: "Remove item",
    areYouSureYouWantToInitializeThisFunction: "Are you sure you want to initialize this function?",
    pleaseEnterTheLimitOfTheFlags: "Please enter the limit of the flags",
    removeSuccessfully: "Removed successfully",
    addItems: "Add items",
    addEntities: "Add entities",
    repeatIdOfTheEntity: "Repeat id of the entity",
    theItemWasRemoved: "The item was removed",
    theEntityWasRemoved: "The entity was removed",
    cannotBePlayer: "Cannot be player",
    commandsWasNotOpened: "The command function was not opened",
    distance: "Distance",
    disabledEnabled: "Disabled / Enabled",
    sure: "Sure",
    thinkAboutIt: "Think about it",
    initializationSuccessfully: "Initialization successfully",
    pleaseEnterTheMaxDistance: "Please enter the max distance",
    pleaseEnterTheIdOfTheEntity: "Please enter the id of the entity",
    pleaseEnterTheMaxAmountOfTheEntities: "Please enter the max amount of the entities",
    pleaseEnterTheMaxCps: "Please enter the max cps",
    commandPlayerMenuSetting: "Player setting",
    commandAdminMenuSetting: "Admin setting",
    commandGetAdminMenu: "Get §dAdmin Menu",
    commandOpenAdminMenu: "Open §dAdmin Menu",
    getAdminMenuSuccessfully: "You have been given §dAdmin Menu",
    closeTheChatBarToOpenAdminMenu: "Close the chat bar to open §dAdmin Menu",
    unknownCommand: "Unknown command",
    deadMessage: "Dead message",
    auraADescription: "Check if the player places the obsidian and changes slot to the ender crystal",
    auraBDescription: "Check if the player places the tnt and changes slot to the flint and steel",
    autoArmorADescription: "Check if the player wears the armor without using right click",
    autoArmorBDescription: "Check if the player wears the armor too fast",
    autoArmorCDescription: "Check if the player places the block and wears the armor",
    autoArmorDDescription: "Check if the player destroys the block and wears the armor",
    autoArmorEDescription: "Check if the player is hitting the entity or the block and wears the armor",
    autoArmorFDescription: "Check if the player is opening the chest and wears the armor",
    autoArmorGDescription: "Check if the player is sleeping and wears the armor",
    autoClickerADescription: "Check if the player hits the entity using high cps",
    autoClickerBDescription: "Check if the player hits the block using high cps",
    autoShieldADescription: "Check if the player wears the shield without using right click",
    autoShieldBDescription: "Check if the player wears the shield too fast",
    autoShieldCDescription: "Check if the player places the block and wears the shield",
    autoShieldDDescription: "Check if the player destroys the block and wears the shield",
    autoShieldEDescription: "Check if the player is hitting the entity or the block and wears the shield",
    autoShieldFDescription: "Check if the player is opening the chest and wears the shield",
    autoShieldGDescription: "Check if the player is sleeping and wears the shield",
    autoToolADescription: "Check if the player hit the block and change slot to the tool",
    autoTotemADescription: "Check if the player wears the totem of undying without using right click",
    autoTotemBDescription: "Check if the player wears the totem of undying too fast",
    autoTotemCDescription: "Check if the player places the block and wears the totem of undying",
    autoTotemDDescription: "Check if the player destroys the block and wears the totem of undying",
    autoTotemEDescription: "Check if the player is hitting the entity or the block and wears the totem of undying",
    autoTotemFDescription: "Check if the player is opening the chest and wears the totem of undying",
    autoTotemGDescription: "Check if the player is sleeping and wears the totem of undying",
    badPacketADescription: "Check if the player's selected slot is unusual",
    badPacketBDescription: "Cehck if the player is using derp",
    crasherADescription: "Check if the player's location is unusual",
    crasherBDescription: "Check if the player is hitting itself",
    entityCheckADescription: "Check if there is illegal entity in the world",
    entityCheckBDescription: "Check if there are too many same entities in the world",
    fastLadderADescription: "Check if the player is climbing ladder too fast",
    fastThrowADescription: "Check if the player is throwing items too fast",
    flyADescription: "Check if the player is flying without mayfly ability",
    invalidSprintADescription: "Check if the player is sprinting with blindness effect",
    invalidSprintBDescription: "Check if the player is sprinting and sneakings",
    invalidSprintCDescription: "Check if the player is sprinting and facing directions expect forward",
    inventoryActionADescription: "Check if the player is using item when opening the chest",
    inventoryActionBDescription: "Check if the player is changing the slot when opening the chest",
    inventoryActionCDescription: "Check if the player is sprinting when opening the chest",
    inventoryActionDDescription: "Check if the player is placing the block when opening the chest",
    inventoryActionEDescription: "Check if the player is destroying the block when opening the chest",
    inventoryActionFDescription: "Check if the player is wearing the armor when opening the chest",
    itemCheckADescription: "Check if the player has ban illegal items",
    itemCheckBDescription: "Check if the player has kick illegal items",
    itemCheckCDescription: "Check if the player has tempkick illegal items",
    itemCheckDDescription: "Check if the player has unusual amount of the items",
    itemCheckEDescription: "Check if the player has keep on death items",
    itemCheckFDescription: "Check if the player has spawn eggs",
    itemCheckGDescription: "Check if the player has elements",
    itemCheckHDescription: "Check if the player has unusual nametag of the items",
    itemCheckIDescription: "Check if the player has unusual lore of the items",
    itemCheckJDescription: "Check if the player has unusual enchantment level of the items",
    itemCheckKDescription: "Check if the player has unusual enchantment of the items",
    killauraADescription: "Check if the player hits different entities in a tick",
    killauraBDescription: "Check if the player hits the entity in an unusual angle(Type 1)",
    killauraCDescription: "Check if the player hits the entity when opening the chest",
    killauraDDescription: "Check if the player hits the entity when sleeping",
    killauraEDescription: "Check if the player hits the entity when placing the block",
    killauraFDescription: "Check if the player hits the entity when destroying the block",
    killauraGDescription: "Check if the player hits the entity when using the item(Type 1)",
    killauraHDescription: "Check if the player hits the enitty when using the item(Type 2)",
    killauraIDescription: "Check if the player hits the entity in an unusual angle(Type 2)",
    movementADescription: "Check if the player's movement is unusual",
    nameSpoofADescription: "Check if the player's name is including unusual word",
    nameSpoofBDescription: "Check if the length of the player's name is unusual",
    noFallADescription: "Check if the player is using No Fall",
    noSlowDownADescription: "Check if the player is using the item in an unusual speed",
    noSlowDownBDescription: "Check if the player is using an unusual speed in the web",
    nukerADescription: "Check if the player is destroying too many blocks in a tick",
    nukerBDescription: "Check if the player is destroying the blocks too fast",
    nukerCDescription: "Check if the player is destroying the blocks when opening the chest",
    nukerDDescription: "Check if the player is destroying the blocks and hitting the entites",
    nukerEDescription: "Check if the player is destroying the blocks when sleeping",
    nukerFDescription: "Check if the player is destroying the blocks when wearing the armor",
    reachADescription: "Check if the player is hitting the entity too far",
    reachBDescription: "Check if the player is hitting the block too far",
    reachCDescription: "Check if the player is placing the block too far",
    reachDDescription: "Check if the player is destroying the block too far",
    scaffoldADescription: "Check if the player is placing the blocks too fast",
    scaffoldBDescription: "Check if the id of the blocks that the player placed is not the same as the item that the player is taking",
    scaffoldCDescription: "Check if the player is placing the blocks under it but looking up",
    scaffoldDDescription: "Check if the player is placing the blocks when its head is in the solid block",
    scaffoldEDescription: "Check if the player is placing the blocks when hitting the entites",
    scaffoldFDescription: "Check if the player is placing the blocks when hitting the blocks",
    scaffoldGDescription: "Check if the player is using Horions bypass scaffold",
    scaffoldHDescription: "Check if the player is placing the blocks and wearing the armor",
    scaffoldIDescription: "Check if the player is sprinting when placing the blocks backward",
    scaffoldJDescription: "Check if the player is placing the blocks unsuaul",
    spammerADescription: "Check if the player is sending the message when sprinting",
    spammerBDescription: "Check if the player is sending the message when opening the chest",
    spammerCDescription: "Check if the player is sending the message when using the item(Type 1)",
    spammerDDescritpion: "Check if the player is sending the message when swing its hand",
    spammerEDescription: "Check if the player is sending the message when using the item(Type 2)",
    spammerFDescription: "Check if the player is sending the message when jumping",
    spammerGDescription: "Check if the player is sending the message when swimming",
    spammerHDescription: "Check if the player is sending the message when changing the slot",
    spammerIDescription: "Check if the player is sending the message when placing the blocks",
    spammerJDescription: "Check if the player is sending the message when destroying the blocks",
    spammerKDescription: "Check if the player is sending the message when hitting the entities or the blocks",
    spammerLDescription: "Check if the player is sending the spammer message of Horion",
    speedADescription: "Check if the player is using an unusual speed to move",
    deadMessageAnvil: "Anvil",
    deadMessageBlockExplosion: "Block Explosion",
    deadMessageDrowning: "Drowning",
    deadMessageEntityAttack: "Entity Attack",
    deadMessageEntityExplosion: "Entity Explosion",
    deadMessageFall: "Fall",
    deadMessageFire: "Fire",
    deadMessageFireTick: "Fire Tick",
    deadMessageFireworks: "Fireworks",
    deadMessageFlyIntoWall: "Fly into Wall",
    deadMessageFreezing: "Freezing",
    deadMessageLava: "Lava",
    deadMessageLightning: "Lightning",
    deadMessageMagic: "Magic",
    deadMessageOther: "Other",
    deadMessageProjectile: "Projectile",
    deadMessageStalactite: "Stalactite",
    deadMessageStalagmite: "Stalagmite",
    deadMessageStarve: "Starve",
    deadMessageVoid: "Void",
    deadMessageWither: "Wither",
    pleaseEnterDeadMessage: "Please enter the dead message of §e{type}\n§e{player} §r- Show who died",
    pleaseEnterDeadMessageWithAttacker: "Please enter the dead message of §e{type}\n§e{player} §r- Show who died\n§e{attacker} §r- Show who attacked",
    commandAntiCheatAuraSetting: "§eAura §7setting",
    commandAntiCheatAutoArmorSetting: "§eAuto Armor §7setting",
    commandAntiCheatAutoClickerSetting: "§eAuto Clicker §7setting",
    commandAntiCheatAutoShieldSetting: "§eAuto Shield §7setting",
    commandAntiCheatAutoToolSetting: "§eAuto Tool §7setting",
    commandAntiCheatAutoTotemSetting: "§eAuto Totem §7setting",
    commandAntiCheatBadPacketSetting: "§eBad Packet §7setting",
    commandAntiCheatCrasherSetting: "§eCrasher §7setting",
    commandAntiCheatEntityCheckSetting: "§eEntity Check §7setting",
    commandAntiCheatFastLadderSetting: "§eFast Ladder §7setting",
    commandAntiCheatFastThrowSetting: "§eFast Throw §7setting",
    commandAntiCheatInvalidSprintSetting: "§eInvalid Sprint §7setting",
    commandAntiCheatInventoryActionSetting: "§eInventory Action §7setting",
    commandAntiCheatItemCheckSetting: "§eItem Check §7setting",
    commandAntiCheatKillauraSetting: "§eKillaura §7setting",
    commandAntiCheatMovementSetting: "§eMovement §7setting",
    commandAntiCheatNameSpoofSetting: "§eName Spoof §7setting",
    commandAntiCheatNoFallSetting: "§eNo Fall §7setting",
    commandAntiCheatNoSlowDownSetting: "§eNo Slow Down §7setting",
    commandAntiCheatNukerSetting: "§eNuker §7setting",
    commandAntiCheatReachSetting: "§eReach §7setting",
    commandAntiCheatScaffoldSetting: "§eScaffold §7setting",
    commandAntiCheatSpammerSetting: "§eSpammer §7setting",
    commandAntiCheatSpeedSetting: "§eSpeed §7settingd",
    entityList: "Entity List",
    itemList: "Item List",
    banItem: "Ban Item",
    kickItem: "Kick Item",
    tempkickItem: "Tempkick Item",

    refresh: "Refresh",
    blinkADescription: "Check if the player is using Blink",
    nukerGDescription: "Check if the player is destroying the block in an unusual angle",
    scaffoldKDescription: "Check if the player is placing the block in an unusual angle",
  },
  "zh-tw": {
    theAddonWasAlreadyStart: "插件已經開啟",
    resetSuccessfully: "重製成功",
    resetAddonSuccessfully: "插件已經在 §e{time} §7刷新！ §7(§e{ms}§7ms)",
    failed: "失敗",
    antiCheatType: "類型",
    adminMenuTitle: "§l§7<< §r§d管理員選單 §l§7>>",
    antiCheat: "防掛",
    enabled: "啟用",
    disabled: "禁用",
    punishment: "懲罰",
    limitOfFlags: "標記上限",
    initialization: "初始化",
    state: "狀態",
    project: "項目",
    cannotBeEmpty: "不可為空白",
    mustBeNumber: "必須為數字",
    cannotLessThan1: "不可少於 1",
    back: "返回",
    changedSuccessfully: "更改成功",
    pleaseEnterTheIdOfTheItem: "請輸入物品的 Id",
    repeatIdOfTheItem: "重複的物品 Id",
    addSuccessfully: "新增成功",
    removeItem: "移除物品",
    areYouSureYouWantToInitializeThisFunction: "你確定要初始化此功能嗎 ?",
    pleaseEnterTheLimitOfTheFlags: "請輸入標記上限",
    removeSuccessfully: "移除成功",
    addItems: "新增物品",
    addEntities: "新增實體",
    repeatIdOfTheEntity: "重複的實體 Id",
    theItemWasRemoved: "此物品已被移除",
    theEntityWasRemoved: "此實體已被移除",
    cannotBePlayer: "不可為玩家",
    commandsWasNotOpened: "指令功能未被開啟",
    distance: "距離",
    disabledEnabled: "禁用 / 啟用",
    sure: "確定",
    thinkAboutIt: "思考一下",
    initializationSuccessfully: "初始化成功",
    pleaseEnterTheMaxDistance: "請輸入最大距離",
    pleaseEnterTheIdOfTheEntity: "請輸入實體 Id",
    pleaseEnterTheMaxAmountOfTheEntities: "請輸入實體的最大數量",
    pleaseEnterTheMaxCps: "請輸入最大 Cps",
    commandPlayerMenuSetting: "玩家設定",
    commandAdminMenuSetting: "管理員設定",
    commandGetAdminMenu: "獲取 §d管理員選單",
    commandOpenAdminMenu: "開啟 §d管理員選單",
    getAdminMenuSuccessfully: "你已被給予 §d管理員選單",
    closeTheChatBarToOpenAdminMenu: "關閉聊天室來開啟 §d管理員選單",
    unknownCommand: "未知的指令",
    deadMessage: "死亡訊息",
    auraADescription: "檢測玩家是否放置黑曜石並切換欄位至終界水晶",
    auraBDescription: "檢測玩家是否放置炸藥並切換欄位至打火石",
    autoArmorADescription: "檢測玩家是否未使用右鍵穿裝備",
    autoArmorBDescription: "檢測玩家是否穿裝備太快",
    autoArmorCDescription: "檢測玩家是否放置方塊並穿裝備",
    autoArmorDDescription: "檢測玩家是否破壞方塊並穿裝備",
    autoArmorEDescription: "檢測玩家是否攻擊實體或方塊並穿裝備",
    autoArmorFDescription: "檢測玩家是否開啟箱子並穿裝備",
    autoArmorGDescription: "檢測玩家是否睡覺時穿裝備",
    autoClickerADescription: "檢測玩家是否已高點擊率攻擊實體",
    autoClickerBDescription: "檢測玩家是否以高點擊率攻擊方塊",
    autoShieldADescription: "檢測玩家是否未使用右鍵攜帶盾牌",
    autoShieldBDescription: "檢測玩家是否攜帶盾牌太快",
    autoShieldCDescription: "檢測玩家是否放置方塊並攜帶盾牌",
    autoShieldDDescription: "檢測玩家是否破壞方塊並攜帶盾牌",
    autoShieldEDescription: "檢測玩家是否攻擊實體或方塊並攜帶盾牌",
    autoShieldFDescription: "檢測玩家是否開啟箱子並攜帶盾牌",
    autoShieldGDescription: "檢測玩家是否睡覺時攜帶盾牌",
    autoToolADescription: "檢測玩家是否攻擊方塊並切換工具",
    autoTotemADescription: "檢測玩家是否未使用右鍵攜帶不死圖騰",
    autoTotemBDescription: "檢測玩家是否攜帶不死圖騰",
    autoTotemCDescription: "檢測玩家是否放置方塊並攜帶不死圖騰",
    autoTotemDDescription: "檢測玩家是否破壞方塊並攜帶不死圖騰",
    autoTotemEDescription: "檢測玩家是否攻擊實體或方塊並攜帶不死圖騰",
    autoTotemFDescription: "檢測玩家是否開啟箱子並攜帶不死圖騰",
    autoTotemGDescription: "檢測玩家是否睡覺時攜帶不死圖騰",
    badPacketADescription: "檢測玩家的選擇欄位是否異常",
    badPacketBDescription: "檢測玩家是否使用Derp",
    crasherADescription: "檢測玩家的座標是否異常",
    crasherBDescription: "檢測玩家是否攻擊自己",
    entityCheckADescription: "檢測世界是否有違法實體",
    entityCheckBDescription: "檢測世界是否有太多相同的實體",
    fastLadderADescription: "檢測玩家攀爬梯子是否太快",
    fastThrowADescription: "檢測玩家投擲物品是否太快",
    flyADescription: "檢測玩家是否在沒有飛行權限飛行",
    invalidSprintADescription: "檢測玩家是否在有失明效果奔跑",
    invalidSprintBDescription: "檢測玩家是否在蹲下時奔跑",
    invalidSprintCDescription: "檢測玩家是否向非前方的方向奔跑",
    inventoryActionADescription: "檢測玩家是否開啟箱子並使用物品",
    inventoryActionBDescription: "檢測玩家是否開啟箱子並切換欄位",
    inventoryActionCDescription: "檢測玩家是否開啟箱子並奔跑",
    inventoryActionDDescription: "檢測玩家是否開啟箱子並放置方塊",
    inventoryActionEDescription: "檢測玩家是否開啟箱子並破壞方塊",
    inventoryActionFDescription: "檢測玩家是否開啟箱子並穿裝備",
    itemCheckADescription: "檢測玩家是否擁有封鎖違法物品",
    itemCheckBDescription: "檢測玩家是否擁有踢出違法物品",
    itemCheckCDescription: "檢測玩家是否擁有強制踢出違法物品",
    itemCheckDDescription: "檢測玩家是否擁有異常數量的物品",
    itemCheckEDescription: "檢測玩家是否擁有死亡不掉落物品",
    itemCheckFDescription: "檢測玩家是否擁有生怪蛋",
    itemCheckGDescription: "檢測玩家是否擁有元素",
    itemCheckHDescription: "檢測玩家是否擁有異常名稱的物品",
    itemCheckIDescription: "檢測玩家是否擁有異常Lore的物品",
    itemCheckJDescription: "檢測玩家是否擁有異常附魔等級的物品",
    itemCheckKDescription: "檢測玩家是否擁有異常附魔的物品",
    killauraADescription: "檢測玩家是否在一個 Tick 攻擊不同的實體",
    killauraBDescription: "檢測玩家是否使用異常角度攻擊實體(類型 1)",
    killauraCDescription: "檢測玩家是否開啟箱子並攻擊實體",
    killauraDDescription: "檢測玩家是否睡覺並攻擊實體",
    killauraEDescription: "檢測玩家是否攻擊實體並放置方塊",
    killauraFDescription: "檢測玩家是否攻擊實體並破壞方塊",
    killauraGDescription: "檢測玩家是否攻擊實體並使用物品(類型 1)",
    killauraHDescription: "檢測玩家是否攻擊實體並使用物品(類型 2)",
    killauraIDescription: "檢測玩家是否使用異常角度攻擊實體(類型 2)",
    movementADescription: "檢測玩家的移動是否異常",
    nameSpoofADescription: "檢測玩家的名稱是否包含異常的字",
    nameSpoofBDescription: "檢測玩家的名稱長度是否異常",
    noFallADescription: "檢測玩家是否使用 No Fall",
    noSlowDownADescription: "檢測玩家的移動速度在使用物品狀態是否異常",
    noSlowDownBDescription: "檢測玩家的移動速度在蜘蛛網是否異常",
    nukerADescription: "檢測玩家是否在一個 Tick 破壞過多的方塊",
    nukerBDescription: "檢測玩家是否破壞方塊過快",
    nukerCDescription: "檢測玩家是否開啟箱子並破壞方塊",
    nukerDDescription: "檢測玩家是否攻擊實體並破壞方塊",
    nukerEDescription: "檢測玩家是否睡覺並破壞方塊",
    nukerFDescription: "檢測玩家是否穿裝備並破壞方塊",
    reachADescription: "檢測玩家攻擊實體是否太遠",
    reachBDescription: "檢測玩家攻擊方塊是否太遠",
    reachCDescription: "檢測玩家放置方塊是否太遠",
    reachDDescription: "檢測玩家破壞方塊是否太遠",
    scaffoldADescription: "檢測玩家放置方塊是否太快",
    scaffoldBDescription: "檢測玩家放置的方塊 Id 是否與此玩家手上的物品 Id 不同",
    scaffoldCDescription: "檢測玩家是否視角朝上並向下放置方塊",
    scaffoldDDescription: "檢測玩家的頭是否有實心方塊並放置方塊",
    scaffoldEDescription: "檢測玩家是否攻擊實體並放置方塊",
    scaffoldFDescription: "檢測玩家是否攻擊方塊並放置方塊",
    scaffoldGDescription: "檢測玩家是否使用 Horion Scaffold Bypass",
    scaffoldHDescription: "檢測玩家是否放置方塊並穿裝備",
    scaffoldIDescription: "檢測玩家是否奔跑並向後放置方塊",
    scaffoldJDescription: "檢測玩家是否放置方塊異常",
    spammerADescription: "檢測玩家是否奔跑時發送訊息",
    spammerBDescription: "檢測玩家是否開啟箱子並發送訊息",
    spammerCDescription: "檢測玩家是否發送訊息並使用物品(類型 1)",
    spammerDDescritpion: "檢測玩家是否發送訊息並揮動手臂",
    spammerEDescription: "檢測玩家是否發送訊息並使用物品(類型 2)",
    spammerFDescription: "檢測玩家是否發送訊息並跳躍",
    spammerGDescription: "檢測玩家是否發送訊息並游泳",
    spammerHDescription: "檢測玩家是否發送訊息並切換欄位",
    spammerIDescription: "檢測玩家是否發送訊息並放置方塊",
    spammerJDescription: "檢測玩家是否發送訊息並破壞方塊",
    spammerKDescription: "檢測玩家是否發送訊息並攻擊實體或方塊",
    spammerLDescription: "檢測玩家是否使用Horion Spammer",
    speedADescription: "檢測玩家的速度是否異常",
    deadMessageAnvil: "鐵砧",
    deadMessageBlockExplosion: "方塊爆炸",
    deadMessageDrowning: "溺水",
    deadMessageEntityAttack: "實體攻擊",
    deadMessageEntityExplosion: "實體爆炸",
    deadMessageFall: "掉落",
    deadMessageFire: "火焰",
    deadMessageFireTick: "火焰後遺症",
    deadMessageFireworks: "煙火",
    deadMessageFlyIntoWall: "動能過大",
    deadMessageFreezing: "冷凍",
    deadMessageLava: "岩漿",
    deadMessageLightning: "雷電",
    deadMessageMagic: "魔法",
    deadMessageOther: "其他",
    deadMessageProjectile: "彈射物",
    deadMessageStalactite: "鐘乳石",
    deadMessageStalagmite: "石筍",
    deadMessageStarve: "飢餓",
    deadMessageVoid: "虛空",
    deadMessageWither: "凋零",
    pleaseEnterDeadMessage: "請輸入 §e{type}§r 的死亡訊息\n§e{player} §r- 顯示誰死亡",
    pleaseEnterDeadMessageWithAttacker: "請輸入 §e{type}§r 的死亡訊息\n§e{player} §r- 顯示誰死亡\n§e{attacker} §r- 顯示誰攻擊",
    entityList: "實體列表",
    itemList: "物品列表",
    banItem: "封鎖物品",
    kickItem: "踢出物品",
    tempkickItem: "強制踢出物品"
  },
  "zh-ch": {
    theAddonWasAlreadyStart: "插件已经开启",
    resetSuccessfully: "重制成功",
    resetAddonSuccessfully: "插件已经在 §e{time} §7刷新！ §7(§e{ms}§7ms)",
    failed: "失敗",
    antiCheatType: "类型",
    adminMenuTitle: "§l§7<< §r§d管理员选单 §l§7>>",
    antiCheat: "反外挂",
    enabled: "启用",
    disabled: "禁用",
    punishment: "惩罚",
    limitOfFlags: "标记上限",
    initialization: "初始化",
    state: "状态",
    project: "项目",
    cannotBeEmpty: "不可为空白",
    mustBeNumber: "必须为数字",
    cannotLessThan1: "不可少于 1",
    back: "返回",
    changedSuccessfully: "更改成功",
    pleaseEnterTheIdOfTheItem: "请输入物品的 Id",
    repeatIdOfTheItem: "重复的物品 Id",
    addSuccessfully: "新增成功",
    removeItem: "移除物品",
    areYouSureYouWantToInitializeThisFunction: "你确定要初始化此功能吗 ?",
    pleaseEnterTheLimitOfTheFlags: "请输入标记上限",
    removeSuccessfully: "移除成功",
    addItems: "新增物品",
    addEntities: "新增实体",
    repeatIdOfTheEntity: "重复的实体 Id",
    theItemWasRemoved: "此物品已被移除",
    theEntityWasRemoved: "此实体已被移除",
    cannotBePlayer: "不可为玩家",
    commandsWasNotOpened: "指令功能未被开启",
    distance: "距离",
    disabledEnabled: "禁用 / 启用",
    sure: "确定",
    thinkAboutIt: "思考一下",
    initializationSuccessfully: "初始化成功",
    pleaseEnterTheMaxDistance: "请输入最大距离",
    pleaseEnterTheIdOfTheEntity: "请输入实体 Id",
    pleaseEnterTheMaxAmountOfTheEntities: "请输入实体的最大数量",
    pleaseEnterTheMaxCps: "请输入最大 Cps",
    commandPlayerMenuSetting: "玩家设定",
    commandAdminMenuSetting: "管理员设定",
    commandGetAdminMenu: "获取 §d管理员选单",
    commandOpenAdminMenu: "开启 §d管理员选单",
    getAdminMenuSuccessfully: "你已被给予 §d管理员选单",
    closeTheChatBarToOpenAdminMenu: "关闭聊天室来开启 §d管理员选单",
    unknownCommand: "未知的指令",
    deadMessage: "死亡信息",
    auraADescription: "检测玩家是否放置黑曜石并切换栏位至终界水晶",
    auraBDescription: "检测玩家是否放置炸药并切换栏位至打火石",
    autoArmorADescription: "检测玩家是否未使用右键穿装备",
    autoArmorBDescription: "检测玩家是否穿装备太快",
    autoArmorCDescription: "检测玩家是否放置方块并穿装备",
    autoArmorDDescription: "检测玩家是否破坏方块并穿装备",
    autoArmorEDescription: "检测玩家是否攻击实体或方块并穿装备",
    autoArmorFDescription: "检测玩家是否开启箱子并穿装备",
    autoArmorGDescription: "检测玩家是否睡觉时穿装备",
    autoClickerADescription: "检测玩家是否已高点击率攻击实体",
    autoClickerBDescription: "检测玩家是否以高点击率攻击方块",
    autoShieldADescription: "检测玩家是否未使用右键携带盾牌",
    autoShieldBDescription: "检测玩家是否携带盾牌太快",
    autoShieldCDescription: "检测玩家是否放置方块并携带盾牌",
    autoShieldDDescription: "检测玩家是否破坏方块并携带盾牌",
    autoShieldEDescription: "检测玩家是否攻击实体或方块并携带盾牌",
    autoShieldFDescription: "检测玩家是否开启箱子并携带盾牌",
    autoShieldGDescription: "检测玩家是否睡觉时携带盾牌",
    autoToolADescription: "检测玩家是否攻击方块并切换工具",
    autoTotemADescription: "检测玩家是否未使用右键携带不死图腾",
    autoTotemBDescription: "检测玩家是否携带不死图腾",
    autoTotemCDescription: "检测玩家是否放置方块并携带不死图腾",
    autoTotemDDescription: "检测玩家是否破坏方块并携带不死图腾",
    autoTotemEDescription: "检测玩家是否攻击实体或方块并携带不死图腾",
    autoTotemFDescription: "检测玩家是否开启箱子并携带不死图腾",
    autoTotemGDescription: "检测玩家是否睡觉时携带不死图腾",
    badPacketADescription: "检测玩家的栏位是否异常",
    badPacketBDescription: "检测玩家是否使用Derp",
    crasherADescription: "检测玩家的座标是否异常",
    crasherBDescription: "检测玩家是否攻击自己",
    entityCheckADescription: "检测世界是否有违法实体",
    entityCheckBDescription: "检测世界是否有太多相同的实体",
    fastLadderADescription: "检测玩家攀爬梯子是否太快",
    fastThrowADescription: "检测玩家投掷物品是否太快",
    flyADescription: "检测玩家是否在没有飞行权限飞行",
    invalidSprintADescription: "检测玩家是否在有失明效果奔跑",
    invalidSprintBDescription: "检测玩家是否在蹲下时奔跑",
    invalidSprintCDescription: "检测玩家是否向非前方的方向奔跑",
    inventoryActionADescription: "检测玩家是否开启箱子并使用物品",
    inventoryActionBDescription: "检测玩家是否开启箱子并切换栏位",
    inventoryActionCDescription: "检测玩家是否开启箱子并奔跑",
    inventoryActionDDescription: "检测玩家是否开启箱子并放置方块",
    inventoryActionEDescription: "检测玩家是否开启箱子并破坏方块",
    inventoryActionFDescription: "检测玩家是否开启箱子并穿装备",
    itemCheckADescription: "检测玩家是否拥有封锁违法物品",
    itemCheckBDescription: "检测玩家是否拥有踢出违法物品",
    itemCheckCDescription: "检测玩家是否拥有强制踢出违法物品",
    itemCheckDDescription: "检测玩家是否拥有异常数量的物品",
    itemCheckEDescription: "检测玩家是否拥有死亡不掉落物品",
    itemCheckFDescription: "检测玩家是否拥有生怪蛋",
    itemCheckGDescription: "检测玩家是否拥有元素",
    itemCheckHDescription: "检测玩家是否拥有异常名称的物品",
    itemCheckIDescription: "检测玩家是否拥有异常Lore的物品",
    itemCheckJDescription: "检测玩家是否拥有异常附魔等级的物品",
    itemCheckKDescription: "检测玩家是否拥有异常附魔的物品",
    killauraADescription: "检测玩家是否在一个 Tick 攻击不同的实体",
    killauraBDescription: "检测玩家是否使用异常角度攻击实体(类型 1)",
    killauraCDescription: "检测玩家是否开启箱子并攻击实体",
    killauraDDescription: "检测玩家是否睡觉并攻击实体",
    killauraEDescription: "检测玩家是否攻击实体并放置方块",
    killauraFDescription: "检测玩家是否攻击实体并破坏方块",
    killauraGDescription: "检测玩家是否攻击实体并使用物品(类型 1)",
    killauraHDescription: "检测玩家是否攻击实体并使用物品(类型 2)",
    killauraIDescription: "检测玩家是否使用异常角度攻击实体(类型 2)",
    movementADescription: "检测玩家的移动是否异常",
    nameSpoofADescription: "检测玩家的名称是否包含异常的字",
    nameSpoofBDescription: "检测玩家的名称长度是否异常",
    noFallADescription: "检测玩家是否使用 No Fall",
    noSlowDownADescription: "检测玩家的移动速度在使用物品状态是否异常",
    noSlowDownBDescription: "检测玩家的移动速度在蜘蛛网是否异常",
    nukerADescription: "检测玩家是否在一个 Tick 破坏过多的方块",
    nukerBDescription: "检测玩家是否破坏方块过快",
    nukerCDescription: "检测玩家是否开启箱子并破坏方块",
    nukerDDescription: "检测玩家是否攻击实体并破坏方块",
    nukerEDescription: "检测玩家是否睡觉并破坏方块",
    nukerFDescription: "检测玩家是否穿装备并破坏方块",
    reachADescription: "检测玩家攻击实体是否太远",
    reachBDescription: "检测玩家攻击方块是否太远",
    reachCDescription: "检测玩家放置方块是否太远",
    reachDDescription: "检测玩家破坏方块是否太远",
    scaffoldADescription: "检测玩家放置方块是否太快",
    scaffoldBDescription: "检测玩家放置的方块 Id 是否与此玩家手上的物品 Id 不同",
    scaffoldCDescription: "检测玩家是否视角朝上并向下放置方块",
    scaffoldDDescription: "检测玩家的头是否有实心方块并放置方块",
    scaffoldEDescription: "检测玩家是否攻击实体并放置方块",
    scaffoldFDescription: "检测玩家是否攻击方块并放置方块",
    scaffoldGDescription: "检测玩家是否使用 Horion Scaffold Bypass",
    scaffoldHDescription: "检测玩家是否放置方块并穿装备",
    scaffoldIDescription: "检测玩家是否奔跑并向后放置方块",
    scaffoldJDescription: "检测玩家是否放置方块异常",
    spammerADescription: "检测玩家是否奔跑时发送信息",
    spammerBDescription: "检测玩家是否开启箱子并发送信息",
    spammerCDescription: "检测玩家是否发送信息并使用物品(类型 1)",
    spammerDDescritpion: "检测玩家是否发送信息并挥动手臂",
    spammerEDescription: "检测玩家是否发送信息并使用物品(类型 2)",
    spammerFDescription: "检测玩家是否发送信息并跳跃",
    spammerGDescription: "检测玩家是否发送信息并游泳",
    spammerHDescription: "检测玩家是否发送信息并切换栏位",
    spammerIDescription: "检测玩家是否发送信息并放置方块",
    spammerJDescription: "检测玩家是否发送信息并破坏方块",
    spammerKDescription: "检测玩家是否发送信息并攻击实体或方块",
    spammerLDescription: "检测玩家是否使用Horion Spammer",
    speedADescription: "检测玩家的速度是否异常",
    deadMessageAnvil: "铁砧",
    deadMessageBlockExplosion: "方块爆炸",
    deadMessageDrowning: "溺水",
    deadMessageEntityAttack: "实体攻击",
    deadMessageEntityExplosion: "实体爆炸",
    deadMessageFall: "掉落",
    deadMessageFire: "火焰",
    deadMessageFireTick: "火焰后遗症",
    deadMessageFireworks: "烟火",
    deadMessageFlyIntoWall: "动能过大",
    deadMessageFreezing: "冷冻",
    deadMessageLava: "岩浆",
    deadMessageLightning: "雷电",
    deadMessageMagic: "魔法",
    deadMessageOther: "其他",
    deadMessageProjectile: "弹射物",
    deadMessageStalactite: "钟乳石",
    deadMessageStalagmite: "石笋",
    deadMessageStarve: "饥饿",
    deadMessageVoid: "虚空",
    deadMessageWither: "凋零",
    pleaseEnterDeadMessage: "请输入 §e{type}§r 的死亡信息\n§e{player} §r- 显示谁死亡",
    pleaseEnterDeadMessageWithAttacker: "请输入 §e{type}§r 的死亡信息\n§e{player} §r- 显示谁死亡\n§e{attacker} §r- 显示谁攻击",
    entityList: "实体列表",
    itemList: "物品列表",
    banItem: "封锁物品",
    kickItem: "踢出物品",
    tempkickItem: "强制踢出物品"
  }
}

export const database = "hutao:database"
export const addonTitle = "§eHutao"