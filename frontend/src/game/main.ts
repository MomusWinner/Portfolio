import { Boot } from "./scenes/Boot";
import { Game as MainGame } from "./scenes/Game";
import { AUTO, Game } from "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1880,
  height: 2700,
  parent: "game-container",
  fps: { limit: 60 },
  backgroundColor: "#1b1c1c",
  scene: [Boot, MainGame],
  audio: {
    disableWebAudio: true,
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
