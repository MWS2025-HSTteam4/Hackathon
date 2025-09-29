export class BattleScene extends Phaser.Scene {
  constructor() { super("BattleScene"); }
  create() {
    this.add.text(20,20,"戦闘開始！",{fontSize:"20px", fill:"#fff"});

    // 敵
    this.enemyHp = 40;
    this.enemyText = this.add.text(400,100,`敵HP: ${this.enemyHp}`,{fontSize:"18px", fill:"#fff"});
    this.add.image(400,200,"enemy").setScale(0.5);

    // プレイヤーカード
    const cards = [
      {name:"スラッシュ", dmg:6, img:"strike"},
      {name:"ガード", block:5, img:"defend"}
    ];
    cards.forEach((c,i)=>{
      const card = this.add.image(200+i*150,400,c.img).setInteractive();
      card.setScale(0.4);
      card.on("pointerdown", ()=>{
        if(c.dmg){
          this.enemyHp -= c.dmg;
          this.enemyText.setText(`敵HP: ${this.enemyHp}`);
          if(this.enemyHp<=0){
            this.add.text(250,300,"勝利！",{fontSize:"24px", fill:"#0f0"});
            this.time.delayedCall(1000, ()=>this.scene.start("MapScene"));
          }
        }
      });
    });

    // エンドターンボタン
    const endBtn = this.add.text(600,400,"ターン終了",{fontSize:"20px",fill:"#ff0"}).setInteractive();
    endBtn.on("pointerdown", ()=>{
      this.add.text(250,350,"敵の攻撃！",{fontSize:"20px", fill:"#f00"});
    });
  }
}
