export class CampScene extends Phaser.Scene {
  constructor() { super("CampScene"); }
  create() {
    this.add.text(100,100,"休憩所",{fontSize:"24px", fill:"#fff"});
    this.add.image(200,200,"camp").setScale(0.5);

    const restBtn = this.add.text(100,300,"休む（HP回復）",{fontSize:"20px", fill:"#0f0"}).setInteractive();
    restBtn.on("pointerdown", ()=> this.scene.start("MapScene"));

    const upgradeBtn = this.add.text(100,350,"カード強化",{fontSize:"20px", fill:"#0f0"}).setInteractive();
    upgradeBtn.on("pointerdown", ()=> this.scene.start("MapScene"));
  }
}