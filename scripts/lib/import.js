import { Database } from "./Database";
import { Item } from "./Item";
import { Player } from "./Player";
import { Scoreboard } from "./Scoreboard";
import { SetTickTimeOut } from "./SetTickTimeOut";
import { Tools } from "./Tools";
import { World } from "./World";

export class Hutao {
  static Scoreboard(scoreboard) {
    return new Scoreboard(scoreboard)
  }

  static Player = Player
  static Tools = Tools
  static Item = Item
  static World = World
  static Database = Database

  static SetTickTimeOut(
    run,
    ticks = 0,
    times = 1,
    firstRun = false
  ) {
    return new SetTickTimeOut(
      run,
      ticks,
      times,
      firstRun
    )
  }
}