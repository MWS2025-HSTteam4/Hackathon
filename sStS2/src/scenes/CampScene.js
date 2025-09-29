export class CampScene extends Phaser.Scene {
  constructor() { super("CampScene"); }

  init(data) {
    this.player = data.player;
    console.log("CampScene init player:", this.player); // デバッグ用
  }

  create(data) {
    this.player = data.player;

    this.add.text(100,100,"休憩所",{fontSize:"24px", fill:"#fff"});
    this.add.image(200,200,"camp").setScale(0.5);

    const restBtn = this.add.text(100,300,"休む（HP回復）",{fontSize:"20px", fill:"#0f0"}).setInteractive();
    restBtn.on("pointerdown", ()=> this.rest());

    const upgradeBtn = this.add.text(100,350,"カード強化",{fontSize:"20px", fill:"#0f0"}).setInteractive();
    upgradeBtn.on("pointerdown", ()=> this.selectCard());
  }

  rest(){
    const heal = Math.floor(this.player.maxHp * 0.3);
    this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);

    this.add.text(200, 300, `HPが ${heal} 回復した！（現在HP: ${this.player.hp}）`, {
      fontSize: "20px",
      color: "#0f0"
    });

    this.returnToMapScene();
  }

  selectCard(){
    /*
    this.player.deck.forEach((card, i) => {
      let cardText = this.add.text(100 + i * 100, 100,
        `${card.name}\nCost:${card.cost}`,
        { fontSize: "18px", backgroundColor: "#222", padding: { x: 5, y: 5 } }
      )
      cardText.setInteractive();
      cardText.on("pointerdown", () => this.upgrade(card));
    });
    this.returnToMapScene();
    */

    this.add.text(200, 100, "強化するカードを選んでください", { fontSize: "20px", color: "#ff0" });

    let y = 150;
    this.player.deck.forEach((card, i) => {
      const btn = this.add.text(200, y + i * 40, `${card.name}`, {
        fontSize: "20px",
        backgroundColor: "#555",
        padding: { x: 6, y: 3 }
      })
        .setInteractive()
        .on("pointerdown", () => {
          this.upgrade(card);
        });
    });
  }
  upgrade(card){
    // 攻撃カードはダメージ+3、防御カードはブロック+3のように強化
    if (card.type === "attack") {
      card.damage += 3;
      card.name = card.name + "+";
    } else if (card.type === "block") {
      card.block += 3;
      card.name = card.name + "+";
    }

    this.add.text(200, 400, `${card.name} を強化した！`, { fontSize: "20px", color: "#0ff" });
    this.returnToMapScene();
  }

  returnToMapScene(){
    this.time.delayedCall(1500, () => {
      this.scene.start("MapScene", { player: this.player });
    });
  }
}