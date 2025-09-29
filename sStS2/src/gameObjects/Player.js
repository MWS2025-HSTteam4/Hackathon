export class Player{
  constructor() {
    this.name = "プレイヤー";
    this.maxHp = 70;
    this.hp = this.maxHp;
    this.maxEnergy = 3;
    this.energy = this.maxEnergy;
    this.block = 0;
    this.drawNum = 5;

    this.gold = 50;

    // デッキ・山札・手札
    this.deck = [
      { name: "Strike1", type: "attack", cost: 1, damage: 6 },
      { name: "Strike2", type: "attack", cost: 1, damage: 6 },
      { name: "Strike3", type: "attack", cost: 1, damage: 6 },
      { name: "Defend1", type: "block", cost: 1, block: 5 },
      { name: "Defend2", type: "block", cost: 1, block: 5 },
      { name: "Defend3", type: "block", cost: 1, block: 5 },
      { name: "Bash", type: "attack", cost: 2, damage: 7, vuln: 2 }
    ];

    this.relics = [];
  }

  takeDamage(amount) {
    let absorbed = Math.min(this.block, amount);
    this.block -= absorbed;
    let dmg = amount - absorbed;
    this.hp -= dmg;
    if (this.hp < 0) this.hp = 0;
    return dmg;
  }

  gainBlock(amount) {
    this.block += amount;
  }

  turnStart(){
    this.energy = this.maxEnergy;
    this.block = 0;
  }
}
