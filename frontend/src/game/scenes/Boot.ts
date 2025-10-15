import { Scene } from "phaser";
import { resize } from "@/game/utils";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("cell", "/asset/cell.png");
  }

  create() {
    resize(this.game);
    this.scene.start("Game");
  }
}
