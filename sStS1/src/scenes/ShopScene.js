export class ShopScene extends Phaser.Scene {
  constructor() { super("ShopScene"); }
  create() {
    this.add.text(100,100,"ショップ",{fontSize:"24px", fill:"#fff"});
    this.add.image(200,200,"shop").setScale(0.5);

    const buyBtn = this.add.text(100,300,"カード購入",{fontSize:"20px", fill:"#0f0"}).setInteractive();
    buyBtn.on("pointerdown", ()=> alert("カード購入しました！（ダミー）"));

    const leaveBtn = this.add.text(100,350,"出る",{fontSize:"20px", fill:"#f00"}).setInteractive();
    leaveBtn.on("pointerdown", ()=> this.scene.start("MapScene"));
  }
}