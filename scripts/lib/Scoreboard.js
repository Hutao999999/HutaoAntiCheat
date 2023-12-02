import * as Minecraft from "@minecraft/server"
import { Player } from "./Player"

export class Scoreboard {
  constructor(scoreboard) {
    this.scoreboard = scoreboard
  }

  addObjective(name = "") {
    if (Minecraft.world.scoreboard.getObjective(this.scoreboard)) return console.warn(`§l§c▶ §r§7There is a scoreboard called §r${this.scoreboard}`)

    Minecraft.world.scoreboard.addObjective(this.scoreboard, name)
  }

  removeObjective() {
    if (!Minecraft.world.scoreboard.getObjective(this.scoreboard)) return console.warn(`§l§c▶ §r§7There isn't a scoreboard called §r${this.scoreboard}`)

    Minecraft.world.scoreboard.removeObjective(this.scoreboard)
  }

  setDisplay(display, ascending = false) {
    const displayTypes = {
      sidebar: `Sidebar`,
      list: `List`,
      belowname: `BelowName`
    }

    if (
      this.scoreboard == "" ||
      !this.scoreboard
    ) {
      Minecraft.world.scoreboard.clearObjectiveAtDisplaySlot(displayTypes[display])
    } else {
      if (!Minecraft.world.scoreboard.getObjective(this.scoreboard)) return console.warn(`§l§c▶ §r§7There isn't a scoreboard called §r${this.scoreboard}`)

      Minecraft.world.scoreboard.setObjectiveAtDisplaySlot(displayTypes[display], {
        objective: Minecraft.world.scoreboard.getObjective(this.scoreboard),
        sortOrder: ascending ? 1 : 0
      })
    }
  }

  addScores(player, scores) {
    const lastScore = this.getScores(player)
    scores = Number(scores)

    if (lastScore == undefined) this.setScores(player, 0)
    this.setScores(player, lastScore + scores)
  }

  removeScores(player, scores) {
    const lastScore = this.getScores(player)
    scores = Number(scores)

    if (lastScore == undefined) this.setScores(player, 0)
    this.setScores(player, lastScore - scores)
  }

  setScores(player, scores) {
    scores = Number(scores)

    if (
      scores > 2147483647 ||
      scores < -2147483648
    ) return

    Minecraft.world.scoreboard.getObjective(this.scoreboard).setScore(Player.changePlayerNameTag(player), Math.floor(scores))
  }

  resetScores(player) {
    if (this.getScores(player) != undefined) {
      Minecraft.world.scoreboard.getObjective(this.scoreboard).removeParticipant(player)
    }
  }

  getScores(player) {
    if (!Minecraft.world.scoreboard.getObjective(this.scoreboard)) return console.warn(`§l§c▶ §r§7There isn't a scoreboard called §r${this.scoreboard}`)

    try {
      return Minecraft.world.scoreboard.getObjective(this.scoreboard).getScore(Player.changePlayerNameTag(player))
    } catch { }
  }
}