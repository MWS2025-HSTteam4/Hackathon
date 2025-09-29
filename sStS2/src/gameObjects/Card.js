export class Card {
  constructor({ name, type, cost, damage = 0, block = 0, draw = 0, effect = null }) {
    this.name = name;
    this.type = type;     // "attack", "block", "skill"
    this.cost = cost;
    this.damage = damage;
    this.block = block;
    this.draw = draw;
    this.effect = effect; // 特殊効果（例: 脆弱付与など）
  }

  play(player, enemy, log) {
    if (this.type === "attack") {
      const dmg = enemy.takeDamage(this.damage + (player.strength || 0));
      log.push(`${enemy.name}に${dmg}ダメージ`);
    }

    if (this.type === "block") {
      player.block += this.block;
      log.push(`${player.name}はブロック${this.block}を得た`);
    }

    if (this.draw > 0) {
      player.drawCards(this.draw);
    }

    if (this.effect) {
      this.effect(player, enemy, log);
    }
  }
}

// サンプルカード
export const CARD_LIBRARY = {
  strike: () => new Card({ name: "スラッシュ", type: "attack", cost: 1, damage: 6 }),
  defend: () => new Card({ name: "ガード", type: "block", cost: 1, block: 5 }),
  bash: () =>
    new Card({
      name: "粉砕",
      type: "attack",
      cost: 2,
      damage: 7,
      effect: (player, enemy, log) => {
        enemy.vulnerable = (enemy.vulnerable || 0) + 2;
        log.push(`${enemy.name}に脆弱2を付与`);
      }
    })
};
