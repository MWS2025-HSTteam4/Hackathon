import { Enemy } from "../gameObjects/Enemy.js";
import { ENEMY_TEMPLATES } from "../gameObjects/Enemy.js";

export class MapScene extends Phaser.Scene {
  constructor() { super("MapScene"); }
  create(data) {
    this.player = data.player;

    this.add.text(100, 20, "マップ - 行き先を選んでください", {fontSize:"20px", fill:"#fff"});

    const nodes = [
      {x:150, y:150, type:"battle"},
      {x:350, y:150, type:"camp"},
      {x:550, y:150, type:"shop"}
    ];

    nodes.forEach(n=>{
      const node = this.add.image(n.x, n.y, "map_node").setInteractive();
      node.setScale(0.3);
      node.on("pointerdown", ()=>{
        //if(n.type==="battle") this.scene.start("BattleScene", { player: this.player, enemy: { name: 'slime', hp: 30 } });
        if(n.type==="battle") this.scene.start("BattleScene", { player: this.player, enemy: new Enemy(ENEMY_TEMPLATES.grunt )});
        if(n.type==="camp") this.scene.start("CampScene", { player: this.player });
        if(n.type==="shop") this.scene.start("ShopScene");
      });
      this.add.text(n.x-30, n.y+40, n.type, {fontSize:"14px", fill:"#fff"});
    });
  }
}