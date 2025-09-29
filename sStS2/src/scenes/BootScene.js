import { Player } from "../gameObjects/Player.js";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // 必要な画像ロード
    this.load.image("card_back", "assets/phaser.png");
    this.load.image("strike", "assets/phaser.png");
    this.load.image("defend", "assets/phaser.png");
    this.load.image("map_node", "assets/phaser.png");
    this.load.image("enemy", "assets/phaser.png");
    this.load.image("camp", "assets/phaser.png");
    this.load.image("shop", "assets/phaser.png");
  }

  create() {
    // Playerインスタンスを作る
    const player = new Player();
    this.scene.start("MapScene", { player });
  }
}
