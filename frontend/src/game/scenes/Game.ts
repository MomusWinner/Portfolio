import { randomInt } from "crypto";
import { EventBus } from "../EventBus";
import { Scene } from "phaser";

type Cell = Phaser.GameObjects.Image;

const directions: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export class Game extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera;
  // background: Phaser.GameObjects.Image;
  cells!: Cell[][];
  gameText!: Phaser.GameObjects.Text;
  rows: number;
  cols: number;
  timeInterval: number;
  timeLeft!: number;
  cellSize: number;
  cellScale: number;
  cellOffset: number;
  tweenController: CellTweenController;

  constructor() {
    super("Game");
    this.rows = 50;
    this.cols = 70;
    this.timeInterval = 300;
    this.cellSize = 32;
    this.cellOffset = 5;
    this.cellScale = 0.5;
    this.tweenController = new CellTweenController(this.timeInterval * 0.7);
  }

  countNeighbors(x: number, y: number): number {
    let count = 0;
    for (let [dx, dy] of directions) {
      let nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && nx < this.rows && ny >= 0 && ny < this.cols) {
        if (this.cellIsActive(nx, ny)) {
          count++;
        }
      }
    }
    return count;
  }

  create() {
    this.camera = this.cameras.main;

    this.cells = new Array(this.rows);
    for (let x = 0; x < this.rows; x += 1) {
      this.cells[x] = new Array(this.cols);
      for (let y = 0; y < this.cols; y += 1) {
        this.createCell(x, y);
        this.setCellState(x, y, false);
      }
    }

    let rangeStartX = 25;
    let rangeStartY = 15;
    let radius = 7;

    let cX = rangeStartX;
    let cY = rangeStartY;

    for (let x = rangeStartX - radius; x < rangeStartX + radius; x += 1) {
      for (let y = rangeStartY - radius; y < rangeStartY + radius; y += 1) {
        let cx = cX - x;
        let cy = cY - y;
        let len = vec2Length(cx, cy);

        if (len > radius) {
          continue;
        }
        let rand = Math.random();
        if (rand > 0.3) {
          this.setCellState(x, y, true);
        }
      }
    }
    // this.setCellState(1, 1, true)

    EventBus.emit("current-scene-ready", this);
  }

  update(time: number, delta: number): void {
    this.tweenController.update(delta);
    this.timeLeft += delta;
    if (this.timeLeft < this.timeInterval) return;
    this.timeLeft = 0;

    this.tweenController.start();

    const nextState: boolean[][] = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(false)
    );

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const neighbors = this.countNeighbors(i, j);

        if (this.cellIsActive(i, j)) {
          if ([1, 2, 3, 4, 5].includes(neighbors)) {
            nextState[i][j] = true;
          } else {
            nextState[i][j] = false;
          }
        } else {
          if (neighbors === 3) {
            nextState[i][j] = true;
          }
        }
      }
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (nextState[i][j] && !this.cellIsActive(i, j)) {
          this.tweenController.addTweenScale(this.cells[i][j], 0, this.cellScale);
        }
        if (!nextState[i][j] && this.cellIsActive(i, j)) {
          this.tweenController.addTweenScale(this.cells[i][j], this.cellScale, 0);
        }

        this.setCellState(i, j, nextState[i][j]);
      }
    }
  }

  createCell(i: number, j: number) {
    let offset = this.cellSize + this.cellOffset;
    this.cells[i][j] = this.add.image(i * offset + offset, j * offset + offset, "cell");
    this.cells[i][j].setScale(0, 0);
    this.cells[i][j].setTint(0xb3b8b3);
  }

  cellIsActive(i: number, j: number): boolean {
    return this.cells[i][j].active;
  }

  setCellState(i: number, j: number, state: boolean) {
    this.cells[i][j].setActive(state);
    // this.cells[i][j].setVisible(state)
  }

  changeScene() {
    this.scene.start("GameOver");
  }
}

function getRandomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * max);
}

function vec2Length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

interface Tween {
  cell: Cell;
  from: number;
  to: number;
}

class CellTweenController {
  complete: boolean;
  duration: number;
  elapsedTime: number;
  tweens: Tween[];

  constructor(duration: number) {
    this.complete = false;
    this.duration = duration;
    this.tweens = [];
    this.elapsedTime = 0;
  }

  addTweenScale(cell: Cell, from: number, to: number) {
    this.tweens.push({ cell: cell, from: from, to: to });
  }

  start() {
    this.complete = false;
    this.elapsedTime = 0;
  }

  update(delta: number) {
    if (this.complete) return;

    // if (this.tweens.length == 0) {
    // 	this.complete = true
    // 	return
    // }
    this.elapsedTime += delta;

    if (this.elapsedTime > this.duration) {
      this.complete = true;
      for (let tween of this.tweens) {
        tween.cell.setScale(tween.to);
      }
      this.tweens = [];
      return;
    }

    for (let tween of this.tweens) {
      let scale = lerp(tween.from, tween.to, this.elapsedTime / this.duration);
      tween.cell.setScale(scale);
    }
  }
}

function lerp(value1: number, value2: number, t: number) {
  return value1 + (value2 - value1) * t;
}
