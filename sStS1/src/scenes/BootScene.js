export class BootScene extends Phaser.Scene {
  constructor() { super("BootScene"); }
  preload() {
    // 適当なファイル名でOK。ユーザーが用意してください
    this.load.image("card_back", "assets/phaser.png");
    this.load.image("strike", "assets/phaser.png");
    this.load.image("defend", "assets/phaser.png");
    this.load.image("map_node", "assets/phaser.png");
    this.load.image("enemy", "assets/phaser.png");
    this.load.image("camp", "assets/phaser.png");
    this.load.image("shop", "assets/phaser.png");
  }
  create() {
    this.scene.start("MapScene");
  }
}