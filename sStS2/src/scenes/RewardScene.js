//import Phaser from "phaser";

export class RewardScene extends Phaser.Scene {
  constructor() {
    super("RewardScene");
  }

  /*
  init(data) {
    this.player = data.player; // BattleScene から受け取った player
  }
  */

  create(data) {
    this.player = data.player; // BattleScene から受け取った player
    this.add.text(200, 50, "戦利品を選択", { fontSize: "32px", color: "#fff" });

    // カード候補（簡易サンプル）
    const rewards = [
      { name: "強撃", type: "attack", cost: 1, damage: 10 },
      { name: "防御強化", type: "block", cost: 1, block: 8 },
      { name: "集中", type: "skill", cost: 0, effect: "エナジー+1" }
    ];

    rewards.forEach((card, i) => {
      const y = 150 + i * 100;
      const btn = this.add.text(200, y, `${card.name}`, {
        fontSize: "24px",
        backgroundColor: "#333",
        padding: { x: 10, y: 5 }
      })
        .setInteractive()
        .on("pointerdown", () => {
          this.player.deck.push(card);
          this.add.text(200, 450, `${card.name} を獲得！`, { color: "#0f0" });
          this.time.delayedCall(1000, () => {
            this.scene.start("MapScene", { player: this.player });
          });
        });
    });

    // スキップボタン
    const skipBtn = this.add.text(200, 450, "スキップ", {
      fontSize: "24px",
      backgroundColor: "#666",
      padding: { x: 10, y: 5 }
    })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("MapScene", { player: this.player });
      });
  }
}
