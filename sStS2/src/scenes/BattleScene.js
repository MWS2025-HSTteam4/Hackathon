// BattleScene.js
export class BattleScene extends Phaser.Scene {
  constructor() {
    super("BattleScene");
  }

  create(data) {
    this.player = data.player;   // BootSceneから渡されたPlayer
    this.enemy = data.enemy;     // MapSceneから渡される敵データ
    this.enemyNowIntent = this.enemy.getIntent();

    this.drawPile = this.shuffle(this.player.deck);
    this.drawPileGroup = [];
    this.discardPile = [];
    this.discardPileGroup = [];
    this.hand = [];
    this.handGroup = [];

    this.player.turnStart();

    this.add.text(100, 40, "Battle Start!", { fontSize: "24px", fill: "#fff" });
    this.add.text(100, 80, "player", { fontSize: "20px", fill: "#fff" });
    this.add.text(300, 80, this.enemy.name, { fontSize: "20px", fill: "#fff" });

    this.enemyHpText      = this.add.text(300, 100, `Enemy HP: ${this.enemy.hp}`, { fontSize: "20px" });
    this.enemyIntentText  = this.add.text(300, 140, `Intent: ${this.enemyNowIntent.type}(${this.enemyNowIntent.val})`, { fontSize: "20px" });
    this.enemyBlockText   = this.add.text(300, 160, `Block: ${this.enemy.block}`, { fontSize: "20px" });
    this.playerHpText     = this.add.text(100, 100, `HP: ${this.player.hp}`, { fontSize: "20px" });
    this.playerEnergyText = this.add.text(100, 140, `Energy: ${this.player.energy}/${this.player.maxEnergy}`, { fontSize: "20px" });
    this.playerBlockText  = this.add.text(100, 160, `Block: ${this.player.block}`, { fontSize: "20px" });

    this.drawCards(this.player.drawNum);
    //this.hand = this.player.deck.slice(0, 3); // 仮：3枚引く
    //console.log("create: "+this.hand);
    this.renderHand();

    this.endTurnBtn = this.add.text(100, 400, "[ターン終了]", { fontSize: "24px", fill: "#0f0" })
      .setInteractive()
      .on("pointerdown", () => this.endTurn());
    this.drawPileBtn = this.add.text(100, 450, "山札", { fontSize: "20px" })
      .setInteractive()
      .on("pointerdown", () => this.checkDrawPile());
    this.discardPileBtn = this.add.text(100, 500, "捨て札", { fontSize: "20px" })
      .setInteractive()
      .on("pointerdown", () => this.checkDiscardPile());
  }

  renderHand() {
    for(let i = 0; i<this.handGroup.length; i++){
      this.handGroup[i].setVisible(false);
      this.handGroup[i].destroy;
    }
    this.handGroup = [];

    this.hand.forEach((card, i) => {
      let cardText = this.add.text(100 + i * 100, 250,
        `${card.name}\nCost:${card.cost}`,
        { fontSize: "18px", backgroundColor: "#222", padding: { x: 5, y: 5 } }
      )
      cardText.setInteractive();
      cardText.on("pointerdown", () => this.playCard(card, i));
      this.handGroup.push(cardText);
    });
  }

  playCard(card, index) {
    // deal card
    if (this.player.energy < card.cost) {
      console.log("エナジー不足！");
      return;
    }
    this.player.energy -= card.cost;

    if (card.type === "attack") {
      this.enemy.takeDamage(card.damage);
      if (this.enemy.hp < 0) this.enemy.hp = 0;
    } else if (card.type === "block") {
      this.player.gainBlock(card.block);
      //this.player.block += card.block;
    }

    this.updateUI();

    // win checker
    if (this.enemy.hp <= 0) {
      console.log("勝利！");
      //this.scene.start("MapScene", { player: this.player });
      this.victory();
    }

    // card disable: not available
    this.handGroup[index].setAlpha(0.5);
    this.handGroup[index].disableInteractive;
    //this.handGroup[index].setStyle({ color: '#0000ff' });
    this.handGroup[index].destroy;
  }

  endTurn() {
    // enemy behavior
    /*
    const dmg = 6;
    this.player.takeDamage(dmg);
    */
    this.enemy.block = 0;
    this.enemyNowIntent = this.enemy.getIntent();
    if (this.enemyNowIntent.type === "attack") {
      this.player.takeDamage(this.enemyNowIntent.val);
    } else if (this.enemyNowIntent.type === "block") {
      this.enemy.gainBlock(this,enemyNowIntent.val);
      //this.enemy.block += this.enemyNowIntent.val;
    }
    
    // lose checker
    if (this.player.hp <= 0) {
      console.log("敗北…");
      this.scene.start("MapScene", { player: new Player() }); // 初期化して戻す
      return;
    }

    // next turn deal
    this.discardPile = this.discardPile.concat(this.hand);
    this.hand = [];
    this.drawCards(this.player.drawNum);
    this.renderHand();
    this.player.turnStart();
    this.updateUI();
  }

  updateUI() {
    this.enemyHpText.setText(`Enemy HP: ${this.enemy.hp}`);
    this.enemyIntentText.setText(`Intent: ${this.enemyNowIntent.type}(${this.enemyNowIntent.val})`);
    this.enemyBlockText.setText(`Block: ${this.enemy.block}`);
    this.playerHpText.setText(`HP: ${this.player.hp}`);
    this.playerEnergyText.setText(`Energy: ${this.player.energy}/${this.player.maxEnergy}`);
    this.playerBlockText.setText(`Block: ${this.player.block}`);
  }

  shuffle(array){
    let arr = array.slice();
    for(let i=arr.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
  }
  drawCards(n) {
    for (let i = 0; i < n; i++) {
      if (this.drawPile.length === 0) {
        this.drawPile = this.shuffle(this.discardPile.slice());
        this.discardPile = [];
      }
      if (this.drawPile.length > 0) {
        this.hand.push(this.drawPile.pop());
      }
    }
  }
  checkDrawPile(){
    for(let i = 0; i<this.drawPileGroup.length; i++){
      this.drawPileGroup[i].setVisible(false);
      this.drawPileGroup[i].destroy;
    }
    this.drawPileGroup = [];
    //this.add.text(100, 450, "山札", { fontSize: "20px" })
    this.drawPile.forEach((card, i) => {
      let cardText = this.add.text(200 + i * 50, 450,
        `${card.name}\nCost:${card.cost}`,
        { fontSize: "10px", backgroundColor: "#222", padding: { x: 5, y: 5 } }
      )
      this.drawPileGroup.push(cardText);
    });
  }
  checkDiscardPile(){
    for(let i = 0; i<this.discardPileGroup.length; i++){
      this.discardPileGroup[i].setVisible(false);
      this.discardPileGroup[i].destroy;
    }
    this.discardPileGroup = [];
    //this.add.text(100, 500, "捨て札", { fontSize: "20px" })
    this.discardPile.forEach((card, i) => {
      let cardText = this.add.text(200 + i * 50, 500,
        `${card.name}\nCost:${card.cost}`,
        { fontSize: "10px", backgroundColor: "#222", padding: { x: 5, y: 5 } }
      )
      this.discardPileGroup.push(cardText);
    });
  }

  victory() {
    this.add.text(200, 200, "勝利！", { fontSize: "32px", color: "#ff0" });

    this.time.delayedCall(1000, () => {
      this.scene.start("RewardScene", { player: this.player });
    });
  }
}
