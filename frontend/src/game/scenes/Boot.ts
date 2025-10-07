import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("cell", "/asset/cell.png");
  }

  create() {
    this.scene.start("Game");
  }
}
