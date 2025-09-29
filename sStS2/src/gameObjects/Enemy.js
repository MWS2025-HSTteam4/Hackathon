export class Enemy {
  constructor(template) {
    this.name = template.name;
    this.maxHp = template.hp;
    this.hp = template.hp;
    this.intents = template.intents;
    this.intentIndex = 0;
    this.block = 0;
    this.vulnerable = 0;
  }

  getIntent() {
    const intent = this.intents[this.intentIndex % this.intents.length];
    this.intentIndex++;
    return intent;
  }

  takeDamage(amount) {
    let dmg = amount;
    if (this.vulnerable > 0) dmg = Math.floor(dmg * 1.5);

    const absorbed = Math.min(this.block, dmg);
    this.block -= absorbed;
    dmg -= absorbed;

    this.hp = Math.max(0, this.hp - dmg);
    return dmg;
  }

  gainBlock(amount) {
    this.block += amount;
  }
}

// 敵のテンプレート定義
export const ENEMY_TEMPLATES = {
  grunt: { name: "スライム", hp: 30, intents: [{ type: "attack", val: 6 }, { type: "block", val: 5 }] },
  elite: { name: "衛兵", hp: 80, intents: [{ type: "attack", val: 12 }, { type: "block", val: 10 }] },
  boss: { name: "塔の主", hp: 150, intents: [{ type: "attack", val: 20 }, { type: "block", val: 15 }] }
};
